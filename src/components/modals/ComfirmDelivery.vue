/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>Delivery Status</ModalHeader>
    <ModalBody>
      <div class="row">
        <div class="col-12">
          <span v-if="error" class="text-red text-caption">{{ error }}</span>
          <p class="text-caption">Handled to</p>
          <q-input outlined v-model="userID" label="Delivery Personel" />
        </div>
      </div>
    </ModalBody>
    <ModalActions>
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn flat label="Yes" color="primary" @click="confirmDelivery()" />
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
      error: null,
      userID: null,
      routeParams: this.$route.params.productId
    };
  },
  props: ["i"],
  created() {
    this.$consola.success("cancelview", this.i);
  },
  computed: {
    ...mapGetters(["ordered"])
  },
  methods: {
    ...mapActions(["editOrder"]),
    confirmDelivery() {
      let data = [];

      const pow = this.ordered.filter(item => item.id === this.routeParams);

      for (const item in pow) {
        const iterate = pow[item];
        for (const i in iterate.item) {
          iterate.item[i].confirm = false;
          data.push(iterate.item[i]);
        }
      }

      if (this.userID !== null) {
        pow.forEach(
          i => ((i.stage = "Delivering"), (i.dateDelivering = new Date()))
        );

        this.editOrder(this.ordered);

        this.$router.replace("/admin/orders");
      } else {
        this.error = "Credentials Invalid";
      }
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
