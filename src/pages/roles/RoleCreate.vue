<template>
  <form @submit.prevent="submit">
    <div class="mb-3 mt-3 row">
      <label class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input v-model="formData.name" class="form-control" name="name" />
      </div>
    </div>

    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label">Permissions</label>
      <div class="col-sm-10">
        <div
          class="form-check form-check-inline col-3"
          v-for="permission in permissionList"
          :key="permission.id"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :value="permission.id"
            @change="selectPermission(permission.id, $event.target.checked)"
          />
          <label class="form-check-label">{{ permission.name }}</label>
        </div>
      </div>
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import { onMounted } from "@vue/runtime-core";
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "RoleCreate",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { push } = useRouter();
    const formData = reactive({
      name: "",
      permissions: [] as number[],
    });

    const permissionList = ref([]);

    const getPermissions = async () => {
      try {
        const { data } = await axios.get("permissions");
        permissionList.value = data;
      } catch (e) {
        console.log(e);
      }
    };

    const selectPermission = (id: number, checked: boolean) => {
      try {
        if (checked) {
          formData.permissions = [...formData.permissions, id];
          return;
        }
        formData.permissions = formData.permissions.filter((p) => p !== id);
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(getPermissions);

    const submit = async () => {
      try {
        await axios.post("roles", formData);
        await push({ name: "Roles" });
      } catch (e) {
        console.log(e);
      }
    };
    return { submit, formData, selectPermission, permissionList };
  },
};
</script>

<style>
</style>