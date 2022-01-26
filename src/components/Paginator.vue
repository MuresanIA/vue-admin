<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" @click="prev">Previous</a>
      </li>
      <li class="page-item">
        <a class="page-link" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { ref } from "@vue/reactivity";
import { SetupContext, watch } from "vue";
export default {
  name: "Paginator",
  emits: ["page-changed"],
  props: {
    lastPage: Number,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup(props: { lastPage: number }, context: SetupContext) {
    const page = ref(1);

    const next = () => {
      if (page.value < props.lastPage) {
        page.value++;
      }
    };

    const prev = () => {
      if (page.value > 1) {
        page.value--;
      }
    };

    watch(page, () => {
      context.emit("page-changed", page.value);
    });
    return { next, prev };
  },
};
</script>
