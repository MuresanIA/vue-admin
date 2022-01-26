<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/roles/create" class="btn btn-sm btn-outline-secondary"
      >Add</router-link
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td>{{ role.id }}</td>
          <td>{{ role.name }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link
                :to="`/roles/${role.id}/edit`"
                class="btn btn-sm btn-outline-secondary"
                >Edit</router-link
              >
              <a
                class="btn btn-sm btn-outline-secondary"
                @click="deleteRole(role.id)"
                >Delete</a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { Role } from "@/models/role";

export default {
  name: "Roles",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const roles = ref([]);
    const getRoles = async () => {
      try {
        const { data } = await axios.get("roles");
        roles.value = data;
      } catch (e) {
        console.log(e);
      }
    };

    const deleteRole = async (id: number) => {
      try {
        if (confirm("Are you sure?")) {
          await axios.delete(`roles/${id}`);
          roles.value = roles.value.filter((role: Role) => role.id !== id);
        }
      } catch (e) {
        console.log(e);
      }
    };
    onMounted(getRoles);
    return { roles, deleteRole };
  },
};
</script>

<style>
</style>