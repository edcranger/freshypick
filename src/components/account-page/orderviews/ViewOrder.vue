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

              <q-step :name="3" title="Delivering" icon="fas fa-truck"
                >Total cost {{ calCulateItem }}</q-step
              >
            </q-stepper>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Items</q-item-label>

      <div v-for="item in orderedItems" :key="item.id">
        <q-item v-for="i in item.item" :key="i.purchaseid">
          <q-item-section>
            <q-img
              :class="i.cancelled ? 'grayscale' : ''"
              :src="i.photo"
              spinner-color="white"
              :width="$mq === 'sm' ? '50px' : '100px'"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ i.name }}</q-item-label>
            <q-item-label caption>x{{ i.qty }}</q-item-label>
          </q-item-section>
          <q-item-section side center>
            <q-btn
              :color="!i.cancelled ? `blue` : `grey`"
              :dense="$mq === 'sm'"
              :disable="i.cancelled"
              @click="i.confirm = !i.confirm"
              glossy
              :label="!i.cancelled ? 'Cancel' : 'Cancelled'"
            />
            <q-dialog v-model="i.confirm" persistent>
              <CancelItem :i="i" />
            </q-dialog>
          </q-item-section>
        </q-item>
      </div>

      <q-separator spaced />
      <q-item-label header>Order Info</q-item-label>

      <div v-for="i in orderedItems" :key="i.id">
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
      </div>

      <!-- <q-separator spaced />
      <q-item-label header>Notifications</q-item-label>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Battery too low</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle color="blue" v-model="notif1" val="battery" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Friend request</q-item-label>
          <q-item-label caption>Allow notification</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="green" v-model="notif2" val="friend" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Picture uploaded</q-item-label>
          <q-item-label caption
            >Allow notification when uploading images</q-item-label
          >
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="red" v-model="notif3" val="picture" />
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Other settings</q-item-label>

      <q-item>
        <q-item-section side>
          <q-icon color="teal" name="volume_down" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="volume" :min="0" :max="10" label color="teal" />
        </q-item-section>
        <q-item-section side>
          <q-icon color="teal" name="volume_up" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-icon color="deep-orange" name="brightness_medium" />
        </q-item-section>
        <q-item-section>
          <q-slider
            v-model="brightness"
            :min="0"
            :max="10"
            label
            color="deep-orange"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-icon color="primary" name="mic" />
        </q-item-section>
        <q-item-section>
          <q-slider v-model="mic" :min="0" :max="50" label />
        </q-item-section>
      </q-item>-->
    </q-list>

    <!-- <div class="row">
      <div class="col-12">
        <p class="text-subtitle2">My Order</p>

        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
          :vertical="$mq === 'sm'"
        >
          <q-step
            :name="1"
            title="Processing"
            icon="assignment_late"
            :done="step > 1"
            >Total cost {{ calCulateItem }}</q-step
          >

          <q-step :name="2" title="Packing" icon="fas fa-box" :done="step > 2"
            >Total cost {{ calCulateItem }}</q-step
          >

          <q-step :name="3" title="Delivering" icon="fas fa-truck"
            >Total cost {{ calCulateItem }}</q-step
          >
        </q-stepper>
      </div>
    </div>-->

    <!-- Ordered Items -->
    <!-- <div
      class="row bg-white shadow-2 q-pa-sm q-mt-md"
      v-for="item in orderedItems"
      :key="item.id"
      to="/"
    >
      <div class="col-12 text-blue-7">
    {{ item.id }}-->
    <!-- <p>Placed on:{{item.date}}</p> -->
    <!-- </div>

      <div class="col-12">
        <div
          class="row items-center"
          v-for="i in item.item"
          :key="i.purchaseid"
        >
          <div :class="i.cancelled ? 'col text-strike' : 'col'">
            <q-img
              :class="i.cancelled ? 'grayscale' : ''"
              :src="i.photo"
              spinner-color="white"
              :width="$mq === 'sm' ? '50px' : '100px'"
            />
            x {{ i.qty }}
            <strong>{{ i.name }}</strong>
          </div>

          <div class="col-4 text-right">
            <q-btn
              :color="!i.cancelled ? `red` : `grey`"
              route
              :dense="$mq === 'sm'"
              :disable="i.cancelled"
              @click="i.confirm = !i.confirm"
              glossy
              :label="!i.cancelled ? 'Cancel' : 'Cancelled'"
            />
            <q-dialog v-model="i.confirm" persistent>
              <CancelItem :i="i" />
            </q-dialog>
          </div>
        </div>
      </div>
    </div>-->
  </q-page>
</template>

<script>
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
import CancelItem from "../../modals/CancelItem";
export default {
  data() {
    return {
      step: 1,
      routeParams: this.$route.params.itemId,
      items: this.orderedItems,
      total: []
    };
  },

  created() {
    // eslint-disable-next-line no-console
    console.log(this.orderedItems);
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
    ...mapActions(["editOrder", "cancelPurchasedItem"]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY h:mmA");
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
