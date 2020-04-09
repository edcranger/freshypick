<template>
  <q-card>
    <ModalHeader>Log</ModalHeader>
    <ModalBody>
      <div>
        <p class="text-caption">
          {{ dateFxn(new Date()) }} - Product
          <span class="text-green">Banana</span> was recently edited by Edison
          (32123)
        </p>
      </div>
    </ModalBody>
    <ModalActions>
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn flat label="Yes" color="primary" v-close-popup />
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
    return {
      inventories: []
    };
  },
  props: ["product"],
  created() {},
  computed: {
    ...mapGetters([])
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
