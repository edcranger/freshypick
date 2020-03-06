<template>
  <q-page>
    <q-list bordered padding class="bg-white">
      <q-item-label header>My Order</q-item-label>

      <q-item class="q-pa-none">
        <q-item-section class="q-pa-none">
          <q-item-label caption>
            <q-stepper
              flat
              v-model="step"
              ref="stepper"
              color="primary"
              animated
              :vertical="$mq === 'sm'"
              class="q-pa-none"
            >
              <q-step
                :name="1"
                title="Processing"
                icon="assignment_late"
                :done="step > 1"
                class="q-my-none q-pa-none"
                >Total cost {{ calCulateItem }}</q-step
              >

              <q-step
                :name="2"
                title="Packing"
                icon="fas fa-box"
                :done="step > 2"
                >Total cost {{ calCulateItem }}</q-step
              >

              <q-step
                :name="3"
                title="Delivering"
                active-icon="fas fa-truck"
                icon="fas fa-truck"
              >
                <span v-if="!orderedItems[0].received"
                  >Your item has been delivered as reported by the courier</span
                >
                <span v-else class="text-green">Completed</span>

                <div class="text-right">
                  <q-btn
                    v-if="orderedItems[0].stage === 'Delivering'"
                    color="deep-orange"
                    dense
                    glossy
                    label="Received"
                    @click="receive(orderedItems[0].id)"
                  />
                </div>
              </q-step>
            </q-stepper>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Items</q-item-label>

      <div v-for="item in orderedItems" :key="item.id">
        <q-item v-for="i in item.item" :key="i.id">
          <q-item-section>
            <q-img
              :class="i.cancelled ? 'grayscale' : ''"
              :src="i.photo"
              spinner-color="white"
              :width="$mq === 'sm' ? '50px' : '100px'"
            />
          </q-item-section>
          <q-item-section :class="i.cancelled ? 'col text-strike' : 'col'">
            <q-item-label>{{ i.name }} x{{ i.qty }}</q-item-label>
          </q-item-section>
          <q-item-section side center>
            <q-btn
              v-if="!item.received"
              :color="!i.cancelled ? `blue` : `grey`"
              :dense="$mq === 'sm'"
              :disable="i.cancelled"
              @click="i.confirm = !i.confirm"
              glossy
              :label="!i.cancelled ? 'Cancel' : 'Cancelled'"
            />
            <q-btn
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
      </div>
    </q-list>
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
    console.log(this.orderedItems[0].id);
  },
  computed: {
    ...mapGetters(["ordered"]),
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
</style>
