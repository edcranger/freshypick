<template>
  <q-page padding>
    <q-list bordered padding class="bg-white">
      <q-item-label header>
        <h5 class="q-my-none">{{ type }}</h5>
      </q-item-label>

      <q-item-label header>Order #{{ routeParams }}</q-item-label>

      <div v-for="item in orderedItems" :key="item.id">
        <q-item v-for="i in item.item" :key="i.id">
          <q-item-section avatar>
            <q-img
              :class="i.cancelled ? 'grayscale' : ''"
              :src="i.photo[0].url"
              spinner-color="white"
              width="40px"
            />
          </q-item-section>
          <q-item-section :class="i.cancelled ? 'col text-strike' : 'col'">
            <q-item-label caption>{{ i.name }}</q-item-label>
            <q-item-label caption>x{{ i.qty }}</q-item-label>
          </q-item-section>
        </q-item>

        <div class="row text-right">
          <div class="col-12">
            <q-btn
              color="green"
              outline
              size="lg"
              disable
              class="q-mx-lg"
              :label="item.stage"
            />
          </div>
        </div>
      </div>
      <q-separator spaced />
      <q-item-label header>Order Info</q-item-label>

      <div v-for="(i, index) in orderedItems" :key="index">
        <q-item>
          <q-item-section>
            <q-item-label caption>Order ID</q-item-label>
            <q-item-label caption>{{ i.id }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label caption>Date Ordered</q-item-label>
            <q-item-label caption>{{ datefxn(i.date) }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="i.received">
          <q-item-section>
            <q-item-label caption>Receive Date</q-item-label>
            <q-item-label caption>{{ datefxn(i.receivedDate) }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>Payment method</q-item-label>
            <q-item-label caption>COD</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="i.dateProcessingDone">
          <q-item-section>
            <q-item-label caption>Processing done</q-item-label>
            <q-item-label caption>{{
              datefxn(i.dateProcessingDone)
            }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="i.datePackingDone">
          <q-item-section>
            <q-item-label caption>Packing done</q-item-label>
            <q-item-label caption>{{
              datefxn(i.datePackingDone)
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
  components: {}
};
</script>

<style>
.grayscale {
  filter: grayscale(100%);
}
</style>
