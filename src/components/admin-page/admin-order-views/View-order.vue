<template>
  <div>
    <q-list bordered padding class="bg-white">
      <q-item-label header>
        <h5 class="q-my-none">{{ type }}</h5>
      </q-item-label>

      <q-item-label header>Order #{{ routeParams }}</q-item-label>

      <div v-for="item in orderedItems" :key="item.id">
        <div v-if="type === `All Orders` || type === `Completed`">
          <q-item v-for="i in item.item" :key="i.id">
            <q-item-section avatar>
              <q-img
                :class="i.cancelled ? 'grayscale' : ''"
                :src="i.photo"
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
              <q-dialog v-model="confirm" persistent v-if="type === 'Packing'">
                <ConfirmPacking />
              </q-dialog>
            </div>
          </div>
        </div>

        <!-- If the display is for processing purposes -->

        <div v-if="type === `Processing`">
          <q-item v-for="i in item.item" :key="i.id">
            <q-item-section>
              <q-img
                :class="i.cancelled ? 'grayscale' : ''"
                :src="i.photo"
                spinner-color="white"
                width="50px"
              />
            </q-item-section>
            <q-item-section :class="i.cancelled ? 'col text-strike' : 'col'">
              <q-item-label>{{ i.name }} x{{ i.qty }}</q-item-label>
            </q-item-section>
            <q-item-section side center>
              <q-btn
                v-if="!item.received"
                :color="!i.prepaired ? `blue` : `green`"
                :dense="$mq === 'sm'"
                :disable="i.prepaired"
                @click="i.confirm = !i.confirm"
                glossy
                :label="!i.prepaired ? 'Checked' : 'Done'"
              />
              <q-dialog v-model="i.confirm" persistent>
                <Prepaired :i="i" :dataTitle="'Processing'" />
              </q-dialog>
            </q-item-section>
          </q-item>
        </div>

        <!-- If the display is for packing purposes -->

        <div v-if="type === `Packing`">
          <q-item v-for="i in item.item" :key="i.id">
            <q-item-section avatar>
              <q-checkbox v-model="i.selected">
                <q-img
                  :class="i.cancelled ? 'grayscale' : ''"
                  :src="i.photo"
                  spinner-color="white"
                  width="40px"
                />
              </q-checkbox>
            </q-item-section>
            <q-item-section :class="i.cancelled ? 'col text-strike' : 'col'">
              <q-item-label caption>{{ i.name }}</q-item-label>
              <q-item-label caption>x{{ i.qty }}</q-item-label>
            </q-item-section>
          </q-item>
          <div class="row text-right">
            <div class="col-12">
              <q-btn
                @click="confirm = !confirm"
                color="blue"
                :disable="!checkIfAllselected"
                class="q-mx-lg"
                label="Packaging Done"
              />
              <q-dialog v-model="confirm" persistent v-if="type === 'Packing'">
                <ConfirmPacking :dataTitle="'Packing'" />
              </q-dialog>
            </div>
          </div>
        </div>

        <!-- If the display is for delivering purposes -->

        <div v-if="type === `Delivering`" class="row">
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
        </div>
        <div class="row text-right">
          <div class="col-12">
            <q-btn
              v-if="type === 'Delivering'"
              @click="confirm = !confirm"
              :color="item.dateDelivering === null ? 'blue' : 'green'"
              class="q-mx-lg"
              :disable="item.dateDelivering !== null"
              :outline="item.dateDelivering !== null"
              :label="
                item.dateDelivering === null ? 'To Courier' : 'Delivering'
              "
            />
            <q-dialog v-model="confirm" persistent v-if="type === 'Delivering'">
              <ConfirmDelivery :dataTitle="'Delivering'" />
            </q-dialog>
          </div>
        </div>
      </div>
      <!--  -->
      <div v-if="type !== 'Delivering'">
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
      </div>
    </q-list>
  </div>
</template>

<script>
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
import Prepaired from "../../modals/PrepareItem";
import ConfirmPacking from "../../modals/ConfirmPacking";
import ConfirmDelivery from "../../modals/ComfirmDelivery";
export default {
  data() {
    return {
      eds: "eds",
      confirm: false,
      routeParams: this.$route.params.productId
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
    Prepaired,
    ConfirmPacking,
    ConfirmDelivery
  }
};
</script>

<style>
.grayscale {
  filter: grayscale(100%);
}
</style>
