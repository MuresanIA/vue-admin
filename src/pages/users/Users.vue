<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link :to="{name: 'UserCreate'}" class="btn btn-sm btn-outline-secondary"
      >Add</router-link
    >
  </div>
  <h2>Users</h2>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role.name }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link
                :to="`/users/${user.id}/edit`"
                class="btn btn-sm btn-outline-secondary"
                @click="update(user.id)"
                >Edit</router-link
              >
              <a class="btn btn-sm btn-outline-secondary" @click="del(user.id)"
                >Delete</a
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Paginator :lastPage="lastPage" @page-changed="load($event)" />
</template>

<script lang='ts'>
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import axios from "axios";
import { User } from "@/models/user";
import Paginator from "@/components/Paginator.vue";
export default {
  name: "Users",
  components: { Paginator },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const users = ref([]);
    const lastPage = ref(0);

    const load = async (page = 1) => {
      try {
        const { data } = await axios.get(`users?page=${page}`);
        users.value = data.data;
        lastPage.value = data.meta.last_page;
      } catch (error) {
        console.log(error);
      }
    };

    const del = async (id: number) => {
      try {
        if (confirm("Are you sure?")) {
          await axios.delete(`users/${id}`);
          users.value = users.value.filter((user: User) => user.id !== id);
        }
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(load);

    return { del, users, load, lastPage };
  },
};
</script>