<template>
  <q-page padding>
    <q-list bordered padding class="bg-white">
      <q-item-label header>
        <h5 class="q-my-none">Preparing</h5>
      </q-item-label>

      <q-item-label header>Order #{{ routeParams }}</q-item-label>

      <q-item v-for="item in orderedItems.orderList" :key="item._id">
        <q-item-section avatar>
          <q-checkbox v-model="item.selected">
            <q-img
              :src="`http://localhost:3000/${item.product.photos[0]}`"
              spinner-color="white"
              width="50px"
            />
          </q-checkbox>
        </q-item-section>
        <q-item-section class="col">
          <q-item-label caption>{{ item.product.name }}</q-item-label>
          <q-item-label caption>x{{ item.quantity }}</q-item-label>
        </q-item-section>
      </q-item>
      <div class="row text-right">
        <div class="col-12">
          <q-btn
            @click="preparingDone()"
            color="blue"
            :disable="!checkIfAllselected"
            class="q-mx-lg"
            label="Packaging Done"
          />
        </div>
      </div>

      <q-separator spaced />
      <q-item-label header>Order Info</q-item-label>

      <div>
        <q-item>
          <q-item-section>
            <q-item-label caption>Order ID</q-item-label>
            <q-item-label caption>{{ orderedItems._id || "" }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>Date Ordered</q-item-label>
            <q-item-label caption>
              {{ datefxn(orderedItems.dates.orderDate || "") }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>Receive Date</q-item-label>
            <q-item-label caption>
              {{ datefxn(orderedItems.dates.receivedDate) }}
            </q-item-label>
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
            <q-item-label caption>
              {{ datefxn(orderedItems.dates.prepDate) }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="orderedItems.dates.deliveringData">
          <q-item-section>
            <q-item-label caption>Packing done</q-item-label>
            <q-item-label caption>
              {{ datefxn(orderedItems.dates.deliveringData) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      eds: "eds",
      confirm: false,
      routeParams: this.$route.params.orderId
    };
  },
  created() {
    this.getAdminOrders();
  },

  computed: {
    ...mapGetters(["AllOrdersByAdmin"]),
    checkIfAllselected() {
      return this.orderedItems.orderList.every(item => item.selected);
    },
    orderedItems() {
      return this.AllOrdersByAdmin.find(
        order => order._id === this.routeParams
      );
    }
  },
  methods: {
    ...mapActions(["getAdminOrders", "orderStatusUpdate"]),
    preparingDone() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Is the order ready for delivery?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.orderStatusUpdate({
            type: "preparing",
            id: this.routeParams
          }).then(() => this.$router.replace("/admining/packing"));
        });
    },
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY h:mmA");
    }
  },
  components: {}
};
</script>

<style>
.grayscale {
  filter: grayscale(100%);
}
</style>
