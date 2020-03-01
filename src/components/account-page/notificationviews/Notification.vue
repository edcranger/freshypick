<template>
  <q-page padding class="row">
    <NoItems :mobile="mobile" :desc="desc" :itemLength="ordered.length" />

    <div class="col" v-if="ordered.length !== 0">
      <div class="q-py-sm">
        <div class="text-subtitle2">
          <q-icon name="notifications_active" class="q-ml-md q-mr-sm"></q-icon
          >Notifications
        </div>
      </div>

      <div class="col-12 bg-white q-my-sm">
        <div class="gt-xs row text-left q-pa-sm">
          <div class="col-4">Order #</div>

          <div class="col-4 text-left">Items</div>
          <div class="col-4 text-right">Total</div>
        </div>

        <div
          class="row shadow-1 q-pa-sm"
          v-for="item in ordered"
          :key="item.id"
          to="/"
        >
          <!-- Orderlist -->
          <div class="col-xs-12 col-sm-4 text-grey-7 q-mb-sm">
            <div class="row">
              <div class="col-6">{{ item.id }}</div>
              <div class="col-6 text-right">
                <p v-if="item.stage === 'Delivered'" class="text-green">
                  Completed
                  <q-icon
                    name="fas fa-check-double"
                    color="green"
                    class="q-ml-xs"
                  />
                </p>
                <p v-else-if="item.stage === 'Delivering'" class="text-grey">
                  Delivering
                  <q-icon name="fas fa-truck" color="grey" class="q-ml-xs" />
                </p>
              </div>
            </div>
          </div>

          <div class="col-xs-12 col-sm-4">
            <div class="row" v-for="i in item.item" :key="i.purchaseid">
              <div class="col" v-if="!i.cancelled">
                <q-img
                  :src="i.photo"
                  spinner-color="white"
                  style="height: 30px; max-width: 30px"
                />
                x {{ i.qty }} {{ i.name }}
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="row q-mt-sm">
              <div class="col text-right">
                <p class="text-green">
                  <strong>
                    <span class="q-mr-xs lt-sm">Total:</span>
                    ₱{{ calCulateItem(item.id) }}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <!-- Orderlist -->
          <div class="col-12 text-right">
            <q-btn
              v-if="!item.received"
              color="deep-orange"
              route
              glossy
              label="Received"
              @click="receive(item.id)"
            />
          </div>
          <div
            class="col-12 text-left q-mt-sm"
            v-if="item.receivedDate !== null"
          >
            <p class="text-caption text-grey-6 q-ma-none">
              <q-badge color="blue">Delivered</q-badge>
              on {{ datefxn(item.receivedDate) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
import NoItems from "../../utils/NoItems";
export default {
  data() {
    return {
      mobile: false,
      desc: "No New Notifications"
    };
  },
  created() {
    this.$route.path.startsWith("/m")
      ? (this.mobile = true)
      : (this.mobile = false);
  },
  computed: {
    ...mapGetters(["ordered", "receivedItems"])
  },
  methods: {
    ...mapActions(["receivedOrder", "editOrder"]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY");
    },
    calCulateItem(id) {
      const pow = this.ordered.filter(item => item.id === id);

      const notCancelled = pow.map(i => i.item.filter(x => !x.cancelled));

      const totalPrice = notCancelled.map(i =>
        i.reduce((currentTotal, x) => x.price * x.qty + currentTotal, 0)
      );

      return parseInt(totalPrice);
    },
    receive(id) {
      this.receivedOrder(id);
      this.editOrder(this.ordered);
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
