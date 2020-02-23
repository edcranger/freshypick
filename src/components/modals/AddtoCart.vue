/* eslint-disable no-undef */
<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Cart</div>
    </q-card-section>
    <q-card-section class="row items-center">
      <span class="q-ml-sm">
        Are you sure you want to add
        <span class="text-green">{{ productInfo.name }}</span> to your cart?
      </span>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn flat label="Yes" color="primary" @click="addCart" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Modal",
  data() {
    return {
      dataItem: null
    };
  },
  props: ["productInfo"],
  created() {
    this.dataItem = { ...this.productInfo };
  },
  computed: {
    ...mapGetters(["cart"])
  },
  methods: {
    ...mapActions(["addToCart"]),
    addCart() {
      // eslint-disable-next-line no-console

      // eslint-disable-next-line no-console
      this.addToCart(this.dataItem).then(() => {
        this.productInfo.qty = 0;
      });
    }
  }
};
</script>

<style></style>
