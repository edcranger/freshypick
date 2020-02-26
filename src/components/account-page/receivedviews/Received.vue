<template>
  <q-page padding class="row">
    <NoItems :desc="desc" :itemLength="receivedItems.length" />

    <div class="col" v-if="receivedItems.length !== 0">
      <div class="q-py-sm">
        <div class="text-subtitle2">
          <q-icon name="fas fa-shopping-cart" class="q-ml-md q-mr-sm"></q-icon
          >Recent Orders
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
          v-for="item in receivedItems"
          :key="item.id"
          to="/"
        >
          <div class="col-xs-12 col-sm-4 text-blue-7 q-mb-sm">
            {{ item.id }}
            <!-- <p>Placed on:{{item.date}}</p> -->
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
          <div class="col-xs-12 col-sm-4 text-right">
            <p class="text-green">
              <strong>
                <span class="q-mr-xs lt-sm">Total:</span>
                ₱{{ calCulateItem(item.id) }}
              </strong>
            </p>
          </div>
          <div
            class="col-12 text-left"
            v-for="i in item.item"
            :key="i.purchaseid"
          >
            <p class="text-caption text-blue q-ma-none">
              Received on {{ datefxn(i.dateReceived) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";

import { mapGetters } from "vuex";
import NoItems from "../../utils/NoItems";
export default {
  data() {
    return {
      mobile: false,
      desc: "No Received Orders"
    };
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this.receivedItems);
  },
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered", "receivedItems"])
  },
  methods: {
    calCulateItem(id) {
      const pow = this.receivedItems.filter(item => {
        return item.id === id;
      });

      const notCancelled = pow.map(i => {
        return i.item.filter(x => {
          return !x.cancelled;
        });
      });

      const totalPrice = notCancelled.map(i => {
        return i.reduce((currentTotal, x) => {
          return x.price * x.qty + currentTotal;
        }, 0);
      });

      return parseInt(totalPrice);
    },
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY h:mmA");
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
