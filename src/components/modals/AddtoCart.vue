/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>Cart</ModalHeader>
    <ModalBody>
      <span class="q-ml-sm">
        Are you sure you want to add
        <span class="text-green">{{ product.name }}</span> to your cart?
      </span>
    </ModalBody>
    <ModalActions>
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn flat label="Yes" color="primary" @click="addCart" v-close-popup />
    </ModalActions>
  </q-card>
</template>

<script>
import ModalHeader from "../modals/shared/ModalHeader";
import ModalBody from "../modals/shared/ModalBody";
import ModalActions from "../modals/shared/ModalActions";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Modal",
  data() {
    return {
      dataItem: null
    };
  },
  props: ["product"],
  created() {},
  computed: {
    ...mapGetters(["cart"])
  },
  methods: {
    ...mapActions(["cartItemFxn"]),
    addCart() {
      // eslint-disable-next-line no-console
      console.log("id", this.product._id);
      this.cartItemFxn({
        productId: this.product._id,
        payload: { quantity: 1, cartFxnType: "add" }
      }).then(() => {
        this.$q.notify({
          message: `Added ${this.product.name} to cart.`,
          color: "green",
          position: "right"
        });
      });
    }
  },
  components: {
    ModalHeader,
    ModalBody,
    ModalActions
  }
};
</script>

<style></style>
