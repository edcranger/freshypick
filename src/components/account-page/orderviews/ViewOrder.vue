<template>
  <q-page>
    <q-spinner-hourglass
      color="light-green"
      v-if="loading"
      size="10rem"
      class="fixed-center"
    />
    <div bordered padding class="bg-white" v-else>
      <q-item-label header v-text="`My Order`" />

      <q-item-label header>
        ORDER ID:
        {{
          orderedInfo._id
            .toString()
            .toUpperCase()
            .slice(0, 12)
        }}
        <q-chip
          class="q-ml-sm q-pa-sm text-white text-bold q-pa-sm"
          :color="colorFxn"
          :label="orderedInfo.orderStatus"
        />
      </q-item-label>

      <q-item v-for="item in orderedInfo.orderList" :key="item._id">
        <q-item-section>
          <!-- :class="i.cancelled ? 'grayscale' : ''" -->
          <q-img
            :src="`http://localhost:3000/${item.product.photos[0]}`"
            spinner-color="white"
            :width="$mq === 'sm' ? '50px' : '100px'"
          />
        </q-item-section>
        <!-- :class="i.cancelled ? 'col text-strike' : 'col'" -->
        <q-item-section class="col">
          <q-item-label
            class="text-grey-9 text-subtitle1"
            v-html="`${item.product.name} x${item.quantity}`"
          />
        </q-item-section>
        <q-item-section side center>
          <q-item-label
            class="text-grey-9 text-subtitle1"
            v-html="` ₱ ${item.total}/${item.product.unit}`"
          />
        </q-item-section>
      </q-item>
      <div class="row justify-end q-pa-sm">
        <p class="col-xs-4 text-h6 text-right q-mr-md text-green">
          Total ₱{{ orderedInfo.total }}
        </p>
      </div>
      <div
        class="row justify-end q-pa-sm"
        v-if="orderedInfo.orderStatus === 'Processing'"
      >
        <q-btn
          color="red"
          class="col-xs-12 col-sm-3"
          @click="cancel()"
          label="Cancel"
        />
      </div>

      <q-separator inset />

      <q-item class="q-pa-none">
        <q-item-section class="q-pa-none">
          <q-item-label caption>
            <div class="row q-px-sm">
              <!-- End of Time line -->
              <div class="col-xs-12 col-sm-6 q-mb-md">
                <q-separator inset v-if="$mq === 'sm'" />
                <div class="q-mt-xs q-mt-sm">
                  <q-item>
                    <q-item-section>
                      <q-item-label caption class="text-bold"
                        >Shipping Address</q-item-label
                      >
                      <q-item-label caption>
                        {{ userAdd.detailedAdd }} {{ userAdd.city }} City
                        {{ userAdd.brgy }}
                        {{ userAdd.province }}
                        {{ userAdd.zipcode }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label caption class="text-bold"
                        >Payment method</q-item-label
                      >
                      <q-item-label caption>COD</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label caption class="text-bold"
                        >Date Ordered</q-item-label
                      >
                      <q-item-label caption>
                        {{ datefxn(orderedInfo.dates.orderDate) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item>
                    <q-item-section>
                      <q-item-label caption class="text-bold"
                        >Receive Date</q-item-label
                      >
                      <q-item-label caption>
                        {{ datefxn(orderedInfo.dates.orderDate) }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 q-px-sm">
                <!-- Start of Time line -->
                <q-timeline color="secondary" class="q-ml-md">
                  <q-timeline-entry
                    v-for="(i, index) in timeLine"
                    :key="index"
                    :subtitle="datefxn(i.data)"
                    :icon="i.icon"
                    :color="i.color"
                  >
                    <p v-html="i.message" />
                  </q-timeline-entry>
                </q-timeline>
              </div>
            </div>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      routeParams: this.$route.params.itemId,
      loading: true
    };
  },

  created() {
    if (this.allOrders.length !== 0) {
      this.loading = false;
    } else {
      this.getAllOrders().then(() => {
        this.loading = false;
        this.$consola.info("badge", this.timeLine);
      });
    }
  },
  computed: {
    ...mapGetters(["allOrders", "userAdd"]),
    orderedInfo() {
      return this.allOrders.find(item => item._id === this.routeParams);
    },
    timeLine() {
      const timeLineData = [];
      const {
        orderDate,
        prepDate,
        deliveringDate,
        completedDate,
        canceledDate
      } = this.orderedInfo.dates;

      if (orderDate) {
        timeLineData.push({
          data: orderDate,
          message: "Processing order.",
          icon: "fas fa-clipboard-check",
          color: "orange"
        });
      }

      if (prepDate) {
        timeLineData.push({
          data: prepDate,
          message: "Preparing for delivery.",
          icon: "fas fa-box-open",
          color: "cyan"
        });
      }

      if (deliveringDate) {
        timeLineData.push({
          data: deliveringDate,
          message: "Your order is on its way.",
          icon: "fas fa-truck",
          color: "blue"
        });
      }

      if (completedDate) {
        timeLineData.push({
          data: completedDate,
          message: "Order completed.",
          icon: "fas fa-check-square",
          color: "green"
        });
      }

      if (canceledDate) {
        timeLineData.push({
          data: canceledDate,
          message: "Order is canceled.",
          icon: "close",
          color: "red"
        });
      }

      return timeLineData;
    },
    colorFxn() {
      const colors = [
        { type: "Processing", color: "blue" },
        { type: "Preparing", color: "blue" },
        { type: "Delivering", color: "cyan" },
        { type: "Completed", color: "green" },
        { type: "Canceled", color: "red" }
      ];

      return colors.find(i => i.type === this.orderedInfo.orderStatus).color;
    }
  },
  methods: {
    ...mapActions(["getAllOrders", "cancelOrder"]),
    cancel() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Would you like to cancel the order?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.cancelOrder(this.orderedInfo._id).then(() =>
            this.$q.notify({
              message: "Order Canceled.",
              color: "red",
              position: "right"
            })
          );
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY h:mmA");
    }
  },
  components: {
    // CancelItem
  }
};
</script>

<style>
.grayscale {
  filter: grayscale(100%);
}
.q-timeline_content {
  padding: 0px 0px 0px;
}
</style>
