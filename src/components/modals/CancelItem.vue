/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>Cancel</ModalHeader>
    <ModalBody>
      <span class="q-ml-sm">
        Are you sure you want to cancel the
        <span class="text-green">{{ i.name }}</span> order?
      </span>
    </ModalBody>
    <ModalActions>
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn
        flat
        label="Yes"
        color="primary"
        @click="
          (i.cancelled = !i.cancelled), (i.stage = 'cancel'), cancelItem(i)
        "
        v-close-popup
      />
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
      routeParams: this.$route.params.itemId
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
    ...mapActions(["editOrder", "cancelPurchasedItem"]),
    cancelItem(itemData) {
      let data = [];
      this.cancelPurchasedItem(itemData);
      const pow = this.ordered.filter(item => {
        return item.id === this.routeParams;
      });

      for (const item in pow) {
        const iterate = pow[item];
        for (const i in iterate.item) {
          data.push(iterate.item[i]);
        }
      }

      const cancelItem = data.filter(i => {
        return i.cancelled;
      });

      const itemIndex = this.ordered.findIndex(i => {
        return i.id === itemData.purchaseId;
      });

      if (data.length === cancelItem.length) {
        this.ordered.splice(itemIndex, 1);
        this.$router.replace("/account");
      }
      this.editOrder(this.ordered);
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
