<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label>First Name</label>
      <input v-model="form.first_name" class="form-control" name="first_name" />
    </div>

    <div class="mb-3">
      <label>Last Name</label>
      <input v-model="form.last_name" class="form-control" name="last_name" />
    </div>

    <div class="mb-3">
      <label>Email</label>
      <input v-model="form.email" class="form-control" name="email" />
    </div>

    <div class="mb-3">
      <label>Role</label>
      <select v-model="form.role_id" class="form-control" name="role_id">
        <option v-for="role of roles" :key="role.id" :value="role.id">
          {{ role.name }}
        </option>
      </select>
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "UserEdit",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const form = reactive({
      first_name: "",
      last_name: "",
      email: "",
      role_id: "",
    });

    const getRoles = async () => {
      try {
        const rolesReponse = await axios.get("roles");
        roles.value = rolesReponse.data;
        const response = await axios.get(`users/${route.params.id}`);
        form.first_name = response.data.first_name;
        form.last_name = response.data.last_name;
        form.email = response.data.email;
        form.role_id = response.data.role.id;
      } catch (e) {
        console.log(e);
      }
    };

    const roles = ref([]);
    const router = useRouter();
    const route = useRoute();

    onMounted(getRoles);

    const submit = async () => {
      try {
        await axios.put(`users/${route.params.id}`, form);
        await router.push("/users");
      } catch (e) {
        console.log(e);
      }
    };

    return { form, submit, roles, getRoles };
  },
};
</script>

<style>
</style>