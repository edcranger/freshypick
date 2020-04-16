<template>
  <q-page padding>
    <q-list bordered padding class="bg-white">
      <q-item-label header>
        <h5 class="q-my-none">{{ type }}</h5>
      </q-item-label>

      <q-item-label header>Order #{{ routeParams }}</q-item-label>

      <div v-for="item in orderedItems" :key="item.id">
        <div class="row">
          <div class="col-4 q-ml-md q-pa-md">
            <q-item-section>
              <q-item-label caption>
                <strong>Order ID:</strong>
              </q-item-label>
              <q-item-label caption>{{ item.id }}</q-item-label>
            </q-item-section>
          </div>
          <div class="col-4 q-ml-md q-pa-md">
            <q-item-section>
              <q-item-label caption>
                <strong>Items:</strong>
              </q-item-label>
              <q-item-label caption v-for="i in item.item" :key="i.id"
                >{{ i.name }} x{{ i.qty }}</q-item-label
              >
            </q-item-section>
          </div>
          <div class="col-4 q-ml-md q-pa-md">
            <q-item-section>
              <q-item-label caption>
                <strong>Payment Method</strong>
              </q-item-label>
              <q-item-label caption>COD</q-item-label>
            </q-item-section>
          </div>
          <div class="col-4 q-ml-md q-pa-md">
            <q-item-section>
              <q-item-label caption>
                <strong>Date Ordered</strong>
              </q-item-label>
              <q-item-label caption>{{ datefxn(item.date) }}</q-item-label>
            </q-item-section>
          </div>
          <div class="col-4 q-ml-md q-pa-md" v-if="item.dateProcessingDone">
            <q-item-section>
              <q-item-label caption>
                <strong>Date Processed</strong>
              </q-item-label>
              <q-item-label caption>
                {{ datefxn(item.dateProcessingDone) }}
              </q-item-label>
            </q-item-section>
          </div>
          <div class="col-4 q-ml-md q-pa-md" v-if="item.datePackingDone">
            <q-item-section>
              <q-item-label caption>
                <strong>Date Packed</strong>
              </q-item-label>
              <q-item-label caption>
                {{ datefxn(item.datePackingDone) }}
              </q-item-label>
            </q-item-section>
          </div>
          <div class="col-4 q-ml-md q-pa-md" v-if="item.dateDelivering">
            <q-item-section>
              <q-item-label caption>
                <strong>Date Delivering</strong>
              </q-item-label>
              <q-item-label caption>
                {{ datefxn(item.dateDelivering) }}
              </q-item-label>
            </q-item-section>
          </div>

          <div class="row text-right">
            <div class="col-12">
              <q-btn
                @click="confirm = !confirm"
                :color="item.dateDelivering === null ? 'blue' : 'green'"
                class="q-mx-lg"
                :disable="item.dateDelivering !== null"
                :outline="item.dateDelivering !== null"
                :label="
                  item.dateDelivering === null ? 'To Courier' : 'Delivering'
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
      eds: "eds",
      confirm: false,
      routeParams: this.$route.params.productOrderId
    };
  },
  props: ["type"],
  created() {
    // eslint-disable-next-line no-console
    console.log(this.orderedItems);

    // eslint-disable-next-line no-console
    console.log(this.checkIfAllselected);
  },
  beforeDestroy() {
    // eslint-disable-next-line no-console
    this.orderedItems.map(x => x.item.map(y => (y.selected = false)));
  },
  computed: {
    ...mapGetters(["ordered"]),
    checkIfAllselected() {
      const watiw = this.orderedItems.map(x =>
        x.item.every(y => y.selected === true)
      );
      return watiw[0];
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
    ...mapActions(["editOrder"]),
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
