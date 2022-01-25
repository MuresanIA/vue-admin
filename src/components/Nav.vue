<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#"
      >Company name</a
    >

    <nav class="my-2 my-md-0 mr-md-3">
      <!-- <router-link to="/profile" class="p-2 text-white">{{
        user
      }}</router-link> -->
      <router-link to="/login" class="p-2 text-white" href="javascript:void(0)" @click="logout"
        >Sign out</router-link
      >
    </nav>
  </nav>
</template>
<script lang="ts">
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
export default {
  name: "Nav",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const name = ref("");

    const logout = async () => {
      try {
        await axios.post("logout");
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(async () => {
      const { data } = await axios.get("user", { withCredentials: true });
      name.value = data.first_name + " " + data.last_name;
    });

    return { name, logout };
  },
};
</script>