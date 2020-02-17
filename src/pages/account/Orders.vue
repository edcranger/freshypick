<template>
  <q-page>
    <Orderview />
  </q-page>
</template>

<script>
import Orderview from "../../components/account-page/orderviews/Order";
import { mapGetters } from "vuex";
export default {
  props: ["itemId"],
  components: {
    Orderview
  },
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered"])
  }
};
</script>

<style></style>
