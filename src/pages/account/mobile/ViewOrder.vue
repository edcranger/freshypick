<template>
  <q-page padding>
    <viewOrder />
  </q-page>
</template>

<script>
import viewOrder from "../../../components/account-page/orderviews/ViewOrder";
import { mapGetters } from "vuex";
export default {
  props: ["itemId"],
  components: {
    viewOrder
  },
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered"])
  }
};
</script>

<style></style>
