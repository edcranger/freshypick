<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
  >
    <q-page class="row">
      <q-spinner-hourglass
        color="light-green"
        v-if="loading"
        size="10rem"
        class="fixed-center"
      />
      <NoItems
        v-if="!loading"
        :mobile="mobile"
        :desc="desc"
        :itemLength="filteredOrder.length"
      />

      <div class="col-12" v-if="filteredOrder.length !== 0 && !loading">
        <q-list bordered separator class="bg-white">
          <q-item-label header>
            <h5 class="q-my-none" v-text="dynamicTitle" />
          </q-item-label>

          <q-item
            v-for="order in filteredOrder"
            :key="order._id"
            :to="{
              name: $mq === 'sm' ? 'mview-orders' : 'view-orders',
              params: { itemId: order._id }
            }"
          >
            <q-item-section>
              <q-item-label caption>
                <div class="row">
                  <div class="col">
                    ORDER ID
                    {{
                      order._id
                        .toString()
                        .toUpperCase()
                        .slice(0, 12)
                    }}
                  </div>

                  <div class="col text-right">
                    <p>{{ order.orderStatus }}</p>
                  </div>
                </div>
              </q-item-label>

              <q-item-label overline>
                <div
                  class="row text-grey-8"
                  v-for="list in order.orderList"
                  :key="list._id"
                >
                  <!-- <p>{{ list.products }}</p> -->
                  <div class="col">
                    <q-img
                      :src="`http://localhost:3000/${list.product.photos[0]}`"
                      spinner-color="white"
                      style="height: 30px; max-width: 30px"
                    />
                    x {{ list.quantity }} {{ list.product.name }}
                  </div>
                </div>
              </q-item-label>

              <q-item-label>
                <div class="row text-grey-8">
                  <div class="col-6 text-left text-caption">
                    Date ordered - {{ datefxn(order.dates.orderDate) }}
                  </div>
                  <div class="col-6 text-right">
                    <p class="text-green text-italic">
                      <strong>Total: ₱{{ order.total }}</strong>
                    </p>
                  </div>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NoItems from "../../utils/NoItems";
import { date } from "quasar";
export default {
  data() {
    return {
      mobile: false,
      desc: "No Pending Orders",
      loading: true,
      order: ["ordersWeb", "ordersMobile"],
      receive: ["receivedWeb", "receivedMobile"],
      canceled: ["canceledWeb", "canceledMobile"]
    };
  },
  computed: {
    ...mapGetters(["allOrders"]),
    filteredOrder() {
      let query;

      if (this.order.includes(this.$route.name)) {
        const status = ["Processing", "Preparing", "Delivering"];
        query = this.allOrders.filter(order =>
          status.includes(order.orderStatus)
        );
      }

      if (this.receive.includes(this.$route.name)) {
        query = this.allOrders.filter(
          order => order.orderStatus === "Completed"
        );
      }

      if (this.canceled.includes(this.$route.name)) {
        query = this.allOrders.filter(
          order => order.orderStatus === "Canceled"
        );
      }
      return query;
    },
    dynamicTitle() {
      let title;
      if (this.order.includes(this.$route.name)) {
        title = "My Orders";
      }

      if (this.receive.includes(this.$route.name)) {
        title = "Received";
      }

      if (this.canceled.includes(this.$route.name)) {
        title = "Canceled";
      }

      return title;
    }
  },

  methods: {
    ...mapActions(["getAllOrders"]),

    datefxn(timestamp) {
      return date.formatDate(timestamp, "MM/DD/YYYY ");
    }
  },
  created() {
    if (this.allOrders.length !== 0) {
      this.loading = false;
    } else {
      this.getAllOrders().then(() => {
        this.loading = false;
      });
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
