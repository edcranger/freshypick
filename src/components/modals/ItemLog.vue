<template>
  <q-card>
    <ModalHeader>Log</ModalHeader>
    <ModalBody>
      <h5 class="text-subtitle1" v-if="getProductIdLog.length === 0">
        No log data
      </h5>
      <div v-for="(i, index) in getProductIdLog" :key="index">
        <p class="text-caption q-ma-none">{{ dateFxn(i.date) }}</p>
        <p class="text-caption">
          <span class="text-blue-7">{{ i.type }}</span>
          -
          {{ i.message }}
        </p>
      </div>
    </ModalBody>
    <ModalActions>
      <q-btn flat label="close" color="primary" v-close-popup />
    </ModalActions>
  </q-card>
</template>

<script>
import { date } from "quasar";
import ModalHeader from "../modals/shared/ModalHeader";
import ModalBody from "../modals/shared/ModalBody";
import ModalActions from "../modals/shared/ModalActions";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Modal",
  data() {
    return {};
  },
  props: ["product"],
  created() {
    // eslint-disable-next-line no-console
    console.log(this.getProductIdLog);
  },
  computed: {
    ...mapGetters(["getProductLog"]),
    getProductIdLog() {
      return this.getProductLog.filter(i => i.productId === this.product.id);
    }
  },
  methods: {
    ...mapActions([]),
    dateFxn(dateTime) {
      return date.formatDate(dateTime, "M/D/YYYY h:m A");
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
