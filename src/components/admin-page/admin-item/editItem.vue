<template>
  <div class="bg-white q-pa-sm">
    <q-item-label header>
      <h5 class="q-my-none">Edit Product</h5>
    </q-item-label>
    <itemForm :type="type" :product="product" />
  </div>
</template>

<script>
import itemForm from "../admin-item/addProduct";
export default {
  data() {
    return {};
  },
  props: ["type", "product"],
  components: {
    itemForm
  }
};
</script>

<style></style>
