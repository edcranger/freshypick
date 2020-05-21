<template>
  <q-page padding>
    <q-list bordered padding class="bg-white">
      <q-item-label header>
        <h5 class="q-my-none">Processing</h5>
      </q-item-label>

      <q-item-label header>Order #{{ routeParams }}</q-item-label>

      <q-item v-for="item in orderedItems.orderList" :key="item._id">
        <q-item-section>
          <q-img
            :src="`http://localhost:3000/${item.product.photos[0]}`"
            spinner-color="white"
            width="50px"
          />
        </q-item-section>
        <q-item-section class="col">
          <q-item-label
            >{{ item.product.name }} x{{ item.quantity }}</q-item-label
          >
        </q-item-section>
        <q-item-section side center>
          <q-btn
            :color="!item.prepared ? `blue` : `green`"
            :dense="$mq === 'sm'"
            :disable="item.prepared"
            @click="processDone(item._id)"
            glossy
            :label="!item.prepared ? 'Checked' : 'Done'"
          />
        </q-item-section>
      </q-item>

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
    </q-list>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";

// import ConfirmPacking from "../../components/modals/ConfirmPacking";
// import ConfirmDelivery from "../../components/modals/ComfirmDelivery";
export default {
  data() {
    return {
      confirm: false,
      routeParams: this.$route.params.orderId
    };
  },
  created() {
    this.getAdminOrders();
    // eslint-disable-next-line no-console
  },
  computed: {
    ...mapGetters(["AllOrdersByAdmin"]),
    orderedItems() {
      return this.AllOrdersByAdmin.find(
        order => order._id === this.routeParams
      );
    }
  },
  methods: {
    ...mapActions(["getAdminOrders", "orderStatusUpdate"]),
    processDone(id) {
      this.$q
        .dialog({
          title: "Storage",
          message: "What storage do you want to get the item:",
          options: {
            type: "radio",
            model: "opt1",
            // inline: true
            items: [
              { label: "Option 1", value: "opt1", color: "secondary" },
              { label: "Option 2", value: "opt2" },
              { label: "Option 3", value: "opt3" }
            ]
          },
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          const item = this.orderedItems.orderList.find(
            order => order._id === id
          );
          item.prepared = true;

          const allPrepared = this.orderedItems.orderList.every(
            item => item.prepared
          );

          if (allPrepared) {
            this.orderStatusUpdate({
              type: "processing",
              id: this.routeParams
            }).then(() => this.$router.replace("/admining/processing"));
          }
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
