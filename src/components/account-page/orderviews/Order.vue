<template>
  <q-page padding class="row">
    <NoItems :mobile="mobile" :desc="desc" :itemLength="filteredOrder.length" />

    <div class="col" v-if="filteredOrder.length !== 0">
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
          v-for="item in filteredOrder"
          :key="item.id"
          to="/"
        >
          <!-- OrderList -->
          <div class="col-xs-12 col-sm-4 text-grey-7 q-mb-sm">
            <div class="row">
              <div class="col-6">
                <q-icon
                  name="fas fa-check-double"
                  color="green"
                  v-if="item.receivedDate"
                />
                {{ item.id }}
              </div>
              <div class="col-6 text-right text-green" v-if="item.receivedDate">
                Completed
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
              <div class="col-6">
                <p class="q-ml-sm" v-if="!item.received">Status: Delivering</p>
              </div>
              <div class="col-6 text-right">
                <p class="text-green">
                  <strong>
                    <span class="q-mr-xs lt-sm">Total:</span>
                    ₱{{ calCulateItem(item.id) }}
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <!-- OrderList -->

          <div class="col-12 text-right">
            <q-btn
              class="gt-xs"
              color="deep-orange"
              route
              :to="{ name: 'view-orders', params: { itemId: item.id } }"
              glossy
              label="View order"
            />
            <q-btn
              class="lt-sm"
              color="deep-orange"
              route
              :to="{ name: 'mview-orders', params: { itemId: item.id } }"
              glossy
              label="View order"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import NoItems from "../../utils/NoItems";
export default {
  data() {
    return {
      mobile: false,
      desc: "No Pending Orders"
    };
  },
  created() {
    this.$route.path.startsWith("/m")
      ? (this.mobile = true)
      : (this.mobile = false);

    // eslint-disable-next-line no-console
  },
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered"]),
    filteredOrder() {
      const wew = this.ordered.filter(i => !i.received);
      return wew;
    }
  },
  methods: {
    calCulateItem(id) {
      const pow = this.ordered.filter(item => {
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
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
