<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link :to="{name: 'ProductCreate'}" class="btn btn-sm btn-outline-secondary"
      >Add</router-link
    >
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link
                :to="`/products/${product.id}/edit`"
                class="btn btn-sm btn-outline-secondary"
                >Edit</router-link
              >
              <a
                class="btn btn-sm btn-outline-secondary"
                @click="deleteProduct(product.id)"
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

<script lang="ts">
import axios from "axios";
import { ref } from "@vue/reactivity";
import { Product } from "@/models/product";
import { onMounted } from "vue";
import Paginator from "@/components/Paginator.vue";
export default {
  name: "Products",
  components: { Paginator },

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const products = ref([]);
    const lastPage = ref(0);

    const deleteProduct = async (id: number) => {
      try {
        if (confirm("Are you sure?")) {
          await axios.delete(`products/${id}`);
          products.value = products.value.filter(
            (product: Product) => product.id !== id
          );
        }
      } catch (e) {
        console.log(e);
      }
    };
    const load = async (page = 1) => {
      try {
        const { data } = await axios.get(`products?page=${page}`);
        products.value = data.data;
        lastPage.value = data.meta.last_page;
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(load);
    return { products, deleteProduct, lastPage, load };
  },
};
</script>

<style>
</style>