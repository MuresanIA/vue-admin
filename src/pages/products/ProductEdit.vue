<template>
  <form @submit.prevent="submit">
    <div class="form-group">
      <label>Title</label>
      <input type="text" class="form-control" name="title" v-model="title" />
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea
        class="form-control"
        name="description"
        v-model="description"
      ></textarea>
    </div>
    <div class="form-group">
      <label>Image</label>
      <div class="input-group-append">
        <input type="text" class="form-control" name="Image" v-model="image" />
        <ImageUpload @file-uploaded="image = $event" />
      </div>
    </div>
    <div class="form-group">
      <label>Price</label>
      <input type="number" class="form-control" name="price" v-model="price" />
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import ImageUpload from "@/components/ImageUpload.vue";
import { Product } from "@/models/product";

export default {
  name: "ProductsEdit",
  components: { ImageUpload },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const title = ref("");
    const description = ref("");
    const image = ref("");
    const price = ref(0);
    const router = useRouter();
    const { params } = useRoute();

    const getProducts = async () => {
      try {
        const response = await axios.get(`products/${params.id}`);
        const product: Product = response.data.data;
        title.value = product.title;
        description.value = product.description;
        image.value = product.image;
        price.value = product.price;
      } catch (e) {
        console.log(e);
      }
    };

    onMounted(getProducts);
    const submit = async () => {
      try {
        await axios.put(`products/${params.id}`, {
          title: title.value,
          description: description.value,
          image: image.value,
          price: price.value,
        });
        await router.push({ name: "Products1" });
      } catch (e) {
        console.log(e);
      }
    };

    return {
      title,
      description,
      image,
      price,
      submit,
      getProducts
    };
  },
};
</script>