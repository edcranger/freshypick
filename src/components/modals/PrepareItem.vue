/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>Cancel</ModalHeader>
    <ModalBody>
      <span class="q-ml-sm">
        Are you sure that
        <span class="text-green">{{ i.name }}</span> is prepaired?
      </span>
    </ModalBody>
    <ModalActions>
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn
        flat
        label="Yes"
        color="primary"
        @click="
          (i.prepaired = !i.prepaired), (i.stage = 'prepaired'), cancelItem(i)
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
    cancelItem() {
      let data = [];

      const pow = this.ordered.filter(item => item.id === this.routeParams);

      for (const item in pow) {
        const iterate = pow[item];
        for (const i in iterate.item) {
          iterate.item[i].confirm = false;
          data.push(iterate.item[i]);
        }
      }

      const prepairedItems = data.filter(i => {
        return i.prepaired;
      });

      if (data.length === prepairedItems.length) {
        pow.map(
          i => ((i.stage = "Packing"), (i.dateProcessingDone = Date.now()))
        );

        this.$router.replace("/admin/orders");
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
