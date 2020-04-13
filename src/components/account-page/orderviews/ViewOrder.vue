<template>
  <q-page>
    <div bordered padding class="bg-white">
      <q-item-label header>My Order</q-item-label>

      <q-item-label header>Order ID: {{ orderedItems[0].id }}</q-item-label>

      <div v-for="item in orderedItems" :key="item.id">
        <q-item v-for="i in item.item" :key="i.id">
          <q-item-section>
            <q-img
              :class="i.cancelled ? 'grayscale' : ''"
              :src="i.photo[0].url"
              spinner-color="white"
              :width="$mq === 'sm' ? '50px' : '100px'"
            />
          </q-item-section>
          <q-item-section :class="i.cancelled ? 'col text-strike' : 'col'">
            <q-item-label class="text-grey-8 text-subtitle1"
              >{{ i.name }} x{{ i.qty }}</q-item-label
            >
          </q-item-section>
          <q-item-section side center>
            <q-btn
              flat
              v-if="!item.received"
              :color="!i.cancelled ? `red` : `grey`"
              :dense="$mq === 'sm'"
              :disable="i.cancelled"
              @click="i.confirm = !i.confirm"
              :label="!i.cancelled ? 'Cancel' : 'Cancelled'"
            />
            <q-btn
              flat
              dense
              disable
              v-else-if="item.received"
              :label="!i.cancelled ? 'Received' : 'Canceled'"
            ></q-btn>
            <q-dialog v-model="i.confirm" persistent>
              <CancelItem :i="i" />
            </q-dialog>
          </q-item-section>
        </q-item>
      </div>

      <q-separator inset />

      <q-item class="q-pa-none">
        <q-item-section class="q-pa-none">
          <q-item-label caption>
            <div class="row q-px-lg">
              <div class="col-xs-12 col-sm-6 q-px-sm">
                <q-timeline color="secondary">
                  <q-timeline-entry
                    :subtitle="
                      orderedItems[0].dateProcessingDone
                        ? datefxn(orderedItems[0].dateProcessingDone)
                        : datefxn(orderedItems[0].date)
                    "
                    icon="fas fa-clipboard-check"
                    color="grey"
                  >
                    <div v-if="orderedItems[0].dateProcessingDone === null">
                      Product is still for processing.
                    </div>
                    <div v-else>Product was processed.</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="orderedItems[0].datePackingDone"
                    :subtitle="datefxn(orderedItems[0].datePackingDone)"
                    icon="fas fa-box-open"
                    color="grey"
                  >
                    <div>Item is already packed</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="orderedItems[0].dateDelivering"
                    :subtitle="datefxn(orderedItems[0].dateDelivering)"
                    icon="fas fa-truck"
                    color="grey"
                  >
                    <div>Item is on the way.</div>
                  </q-timeline-entry>
                  <q-timeline-entry
                    v-if="orderedItems[0].received"
                    :subtitle="datefxn(orderedItems[0].receivedDate)"
                    icon="fas fa-check-square"
                    color="green"
                  >
                    <div class="text-green">Item is delivered</div>
                    <h6 class="text-green text-subtitle2 q-ma-none">
                      Completed
                    </h6>
                  </q-timeline-entry>
                </q-timeline>
              </div>
              <div class="col-xs-12 col-sm-6 q-mb-md">
                <q-separator inset v-if="$mq === 'sm'"></q-separator>
                <div
                  v-for="(i, index) in orderedItems"
                  :key="index"
                  class="q-mt-xs q-mx-md q-mt-sm"
                >
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
                        >Date Ordered</q-item-label
                      >
                      <q-item-label caption>{{ datefxn(i.date) }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item v-if="i.received">
                    <q-item-section>
                      <q-item-label caption class="text-bold"
                        >Receive Date</q-item-label
                      >
                      <q-item-label caption>{{
                        datefxn(i.receivedDate)
                      }}</q-item-label>
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
                </div>
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
import CancelItem from "../../modals/CancelItem";
export default {
  data() {
    return {
      step: 3,
      routeParams: this.$route.params.itemId
    };
  },

  created() {
    // eslint-disable-next-line no-console
    console.log(this.ordered);
  },
  computed: {
    ...mapGetters(["ordered", "userAdd"]),
    stepperOrientation() {
      return this.$mq === "sm" ? true : false;
    },

    orderedItems() {
      return this.ordered.filter(item => item.id === this.routeParams);
    },
    calCulateItem() {
      const pow = this.ordered.filter(item => item.id === this.routeParams);

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
  methods: {
    ...mapActions(["editOrder", "cancelPurchasedItem", "receivedOrder"]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY h:mmA");
    },
    receive(id) {
      this.$consola.info("iddd", id);
      this.receivedOrder(id);
    }
  },
  components: {
    CancelItem
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
