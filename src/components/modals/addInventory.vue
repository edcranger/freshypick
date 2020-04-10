/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>Add to Inventory</ModalHeader>
    <ModalBody>
      <q-form>
        <div
          class="row items-center"
          v-for="(i, index) in inventories"
          :key="index"
        >
          <div class="col-6 q-pa-sm">{{ i.name }}</div>
          <div class="col-6 q-pa-sm">
            <q-input outlined v-model="i.qty" type="number" dense />
          </div>
        </div>
      </q-form>
    </ModalBody>
    <ModalActions>
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn
        flat
        label="Yes"
        color="primary"
        @click="submitInventory"
        v-close-popup
      />
    </ModalActions>
  </q-card>
</template>

<script>
import { uid } from "quasar";
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
  created() {
    this.product.inventory.map(i =>
      this.inventories.push({ name: i.name, qty: 0 })
    );
  },
  computed: {
    ...mapGetters(["getWareHouse", "userProfile"])
  },
  methods: {
    ...mapActions(["addToLog"]),
    submitInventory() {
      let storageLog = [];
      this.product.inventory.map(i => {
        this.inventories.map(e => {
          if (i.name === e.name && e.qty !== 0) {
            storageLog.push(` ${e.qty}${this.product.unit} to ${e.name}`);

            const logData = {
              id: uid(),
              type: "Inventory",
              productId: this.product.id,
              message:
                `${this.userProfile.name} added `.concat(storageLog) + ".",
              date: new Date()
            };

            this.addToLog(logData);
            // eslint-disable-next-line no-console
            i.qty += parseInt(e.qty);
          }
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
