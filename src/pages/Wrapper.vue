<template>
  <div>
    <Nav />
    <div class="container-fluid">
      <div class="row">
        <Menu />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Nav from "@/components/Nav.vue";
import Menu from "@/components/Menu.vue";
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  components: { Nav, Menu },
  name: "Wrapper",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();

    onMounted(async () => {
      try {
        const { data } = await axios.get("user", { withCredentials: true });
        console.log(data);
      } catch (error) {
        await router.push({ name: "Login" });
        console.log(error);
      }
    });
  },
};
</script>