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
            :checked="checked(permission.id)"
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
import { useRoute, useRouter } from "vue-router";
import { Permission } from "@/models/permission";
export default {
  name: "RoleCreate",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const { push } = useRouter();
    const { params } = useRoute();
    const formData = reactive({
      name: "",
      permissions: [] as number[],
    });

    const permissionList = ref([]);

    const checked = (id: number) => {
      try {
        return formData.permissions.some((p) => p === id);
      } catch (e) {
        console.log(e);
      }
    };

    const getPermissions = async () => {
      try {
        const { data } = await axios.get("permissions");
        permissionList.value = data;
         const response = await axios.get(`roles/${params.id}`);
          formData.name = response.data.name;
          formData.permissions = response.data.permissions.map(
            (p: Permission) => p.id
          );
      } catch (e) {
        console.log(e);
      }
    };

    const selectPermission = async (id: number, checked: boolean) => {
      try {
        if (checked) {
          formData.permissions = [...formData.permissions, id];
        }
        formData.permissions = formData.permissions.filter((p) => p !== id);
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(getPermissions);

    const submit = async () => {
      try {
        await axios.put(`roles/${params.id}`, formData);
        await push({ name: "Roles" });
      } catch (e) {
        console.log(e);
      }
    };
    return { submit, formData, selectPermission, permissionList, checked };
  },
};
</script>

<style>
</style>