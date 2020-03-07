<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
  >
    <q-page class="row">
      <NoItems :desc="desc" :itemLength="receivedOrders.length" />

      <div class="col" v-if="receivedOrders.length !== 0">
        <div class="col-12 bg-white">
          <q-list bordered separator padding>
            <div class="q-ml-md">
              <q-icon name="notifications_active" class="q-mr-sm"></q-icon
              >Received
            </div>

            <q-item
              v-ripple
              v-for="item in receivedOrders"
              :key="item.id"
              clickable
              :to="{
                name: $mq === 'sm' ? 'mview-orders' : 'view-orders',
                params: { itemId: item.id }
              }"
            >
              <q-item-section>
                <q-item-label caption>
                  <div class="row">
                    <div class="col">{{ item.id }}</div>
                    <div class="col text-right">
                      <p v-if="item.stage === 'Delivered'" class="text-green">
                        Completed
                        <q-icon
                          name="fas fa-check-double"
                          color="green"
                          class="q-ml-xs"
                        />
                      </p>
                      <p
                        v-else-if="item.stage === 'Delivering'"
                        class="text-grey"
                      >
                        Delivering
                        <q-icon
                          name="fas fa-truck"
                          color="grey"
                          class="q-ml-xs"
                        />
                      </p>
                    </div>
                  </div>
                </q-item-label>

                <q-item-label overline>
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
                </q-item-label>

                <q-item-label>
                  <div class="col text-right">
                    <p class="text-green">
                      <strong>
                        <span class="q-mr-xs lt-sm">Total:</span>
                        ₱{{ calCulateItem(item.id) }}
                      </strong>
                    </p>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { date } from "quasar";

import { mapGetters } from "vuex";
import NoItems from "../../utils/NoItems";
export default {
  data() {
    return {
      desc: "No Received Orders"
    };
  },
  created() {
    // eslint-disable-next-line no-console
  },
  computed: {
    ...mapGetters(["receivedItems"]),
    receivedOrders() {
      return this.receivedItems
        .filter(i => i.stage !== "canceled")
        .sort((a, b) => (a.receivedDate < b.receivedDate ? 1 : -1));
    }
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
