<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#"
      >Company name</a
    >
    <nav class="my-2 my-md-0 mr-md-3">
      <router-link :to="{ name: 'Profile' }" class="p-2 text-white">
        {{ name }}
      </router-link>

      <router-link
        :to="{ name: 'Login' }"
        class="p-2 text-white"
        href="javascript:void(0)"
        @click="logout"
        >Sign out</router-link
      >
    </nav>
  </nav>
</template>
<script lang="ts">
import { ref, computed, watch } from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";
export default {
  name: "Nav",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const name = ref("");
    const store = useStore();
    const user = computed(() => store.state.User.user);

    watch(user, () => {
      name.value = user.value.first_name + " " + user.value.last_name;
    });

    const logout = async () => {
      try {
        await axios.post("logout");
      } catch (error) {
        console.log(error);
      }
    };

    return { name, logout };
  },
};
</script>