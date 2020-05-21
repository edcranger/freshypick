<template>
  <q-page padding>
    <q-list bordered padding class="bg-white">
      <q-item-label header>
        <h5 class="q-my-none">Delivering</h5>
      </q-item-label>

      <q-item-label header>Order #{{ routeParams }}</q-item-label>

      <div>
        <div class="row">
          <div>
            <q-item>
              <q-item-section>
                <q-item-label caption>Order ID</q-item-label>
                <q-item-label caption>{{
                  orderedItems._id || ""
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label caption>Date Ordered</q-item-label>
                <q-item-label caption>{{
                  datefxn(orderedItems.dates.orderDate || "")
                }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label caption>Receive Date</q-item-label>
                <q-item-label caption>{{
                  datefxn(orderedItems.dates.receivedDate)
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>Payment method</q-item-label>
                <q-item-label caption>COD</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label caption>Processing done</q-item-label>
                <q-item-label caption>{{
                  datefxn(orderedItems.dates.prepDate)
                }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-if="orderedItems.dates.deliveringData">
              <q-item-section>
                <q-item-label caption>Packing done</q-item-label>
                <q-item-label caption>{{
                  datefxn(orderedItems.dates.deliveringData)
                }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="row text-right">
            <div class="col-12">
              <q-btn
                @click="confirm = !confirm"
                :color="orderedItems.riderStatus === 'na' ? 'blue' : 'green'"
                class="q-mx-lg"
                :disable="!orderedItems.riderStatus === 'na'"
                :outline="!orderedItems.riderStatus === 'na'"
                :label="
                  orderedItems.riderStatus === 'na'
                    ? 'To Courier'
                    : 'Delivering'
                "
              />
              <q-dialog v-model="confirm" persistent>
                <ConfirmDelivery />
              </q-dialog>
            </div>
          </div>
        </div>
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";

import ConfirmDelivery from "../../components/modals/ComfirmDelivery";
export default {
  data() {
    return {
      confirm: false,
      routeParams: this.$route.params.orderId
    };
  },

  created() {},
  beforeDestroy() {},
  computed: {
    ...mapGetters(["AllOrdersByAdmin"]),
    checkIfAllselected() {
      const watiw = this.orderedItems.map(x =>
        x.item.every(y => y.selected === true)
      );
      return watiw[0];
    },
    orderedItems() {
      return this.AllOrdersByAdmin.find(
        order => order._id === this.routeParams
      );
    }
  },
  methods: {
    ...mapActions(["getAdminOrders", "orderStatusUpdate"]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY h:mmA");
    }
  },
  components: {
    ConfirmDelivery
  }
};
</script>

<style>
.grayscale {
  filter: grayscale(100%);
}
</style>
