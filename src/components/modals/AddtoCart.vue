/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>Cart</ModalHeader>
    <ModalBody>
      <span class="q-ml-sm">
        Are you sure you want to add
        <span class="text-green">{{ productInfo.name }}</span> to your cart?
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
  },
  components: {
    ModalHeader,
    ModalBody,
    ModalActions
  }
};
</script>

<style></style>
