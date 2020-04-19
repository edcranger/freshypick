<template>
  <q-page padding>
    <div class="q-ma-none">
      <p class="text-subtitle2 text-grey-7 q-my-sm q-ml-xs">Customer Details</p>
    </div>
    <q-list bordered separator>
      <q-item
        class="bg-white q-"
        clickable
        v-ripple
        v-for="(i, index) in getCustomerDetails"
        :key="index"
      >
        <q-item-section avatar>
          <q-icon :name="i.icon" :color="i.color" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold text-grey-7">{{
            i.data
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-ma-none">
      <p class="text-subtitle2 text-grey-7 q-my-sm q-ml-xs">Order Details</p>
    </div>
    <q-list bordered separator>
      <q-item
        class="bg-white q-"
        clickable
        v-ripple
        v-for="(i, index) in getOrderDetails"
        :key="index"
      >
        <q-item-section avatar>
          <q-icon :name="i.icon" :color="i.color" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold text-grey-7">{{
            i.data
          }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>

    <div class="q-ma-none">
      <p class="text-subtitle2 text-grey-7 q-my-sm q-ml-xs">Items</p>
    </div>

    <q-list bordered separator>
      <q-item
        class="bg-white q-"
        clickable
        v-ripple
        v-for="i in itemDetails"
        :key="i.id"
      >
        <q-item-section avatar>
          <q-img :src="i.photo[0].url" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold text-grey-7"
            >{{ i.name }} x{{ i.qty }}</q-item-label
          >
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>

    <!-- This is the bottom buttons -->
    <div class="btndown fixed-bottom">
      <div class="row">
        <div class="col-6">
          <q-btn class="full-width q-pa-md" color="red">Decline</q-btn>
        </div>
        <div class="col-6">
          <q-btn class="full-width q-pa-md" color="green">In Progress</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  data() {
    return {
      id: this.$route.params.orderId
    };
  },
  computed: {
    ...mapGetters(["ordered", "getRiders"]),
    getCustomerDetails() {
      const rider = this.getRiders
        .find(i => i.id === "fos753")
        .itemsInHand.find(i => i.id === this.id);

      this.$consola.success("ItemsOnHand", rider.itemsInHand);

      return [
        {
          data: rider.user.name,
          icon: "fas fa-user",
          color: "red-4"
        },
        {
          data: rider.user.phone,
          icon: "phone",
          color: "red-4"
        },
        {
          data: rider.user.email,
          icon: "email",
          color: "blue-4"
        },
        {
          data: `${rider.location.brgy} ${rider.location.city}`,
          icon: "location_on",
          color: "green"
        }
      ];
    },
    getOrderDetails() {
      const item = this.getRiders
        .find(i => i.id === "fos753")
        .itemsInHand.find(e => e.id === this.id);

      return [
        {
          data: item.id,
          icon: "local_mall",
          color: "blue"
        },
        {
          data: `Ordered on ${this.datefxn(item.date)}`,
          icon: "fas fa-calendar-check",
          color: "orange"
        },
        {
          data: this.calculateTotal(item.item),
          icon: "fas fa-dollar-sign",
          color: "green"
        }
      ];
    },
    itemDetails() {
      const item = this.getRiders
        .find(i => i.id === "fos753")
        .itemsInHand.find(e => e.id === this.id).item;

      return item;
    }
  },
  methods: {
    ...mapActions([]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM DD YYYY");
    },
    calculateTotal(arr) {
      return arr.reduce((currentTotal, item) => {
        let perItem = item.qty * item.price;
        return perItem + currentTotal;
      }, 0);
    }
  },
  created() {
    // eslint-disable-next-line no-console
    this.$consola.success("order", this.itemDetails);
  }
};
</script>

<style>
.btndown {
  margin-bottom: 55.5px;
}
</style>
