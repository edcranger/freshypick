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

    <q-list
      bordered
      separator
      :style="$mq === 'sm' ? 'margin-bottom:60px;' : ''"
    >
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

    <q-footer class="row btndown justify-center">
      <div class="col-6">
        <q-btn
          stack
          class="full-width q-pa-sm"
          color="red"
          :label="buttonType.cancel"
          @click="btnCancelFxn()"
        />
      </div>
      <div class="col-6">
        <q-btn
          stack
          class="full-width q-pa-sm"
          color="green"
          :label="buttonType.submit"
          @click="btnSubmitFxn()"
        />
      </div>
    </q-footer>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  data() {
    return {
      id: this.$route.params.orderId,
      pageType: this.$route.params.orderStatus,
      riderId: "fos753"
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
    deliveryDetails() {
      return this.getRiders
        .find(i => i.id === this.riderId)
        .itemsInHand.find(e => e.id === this.id);
    },
    getOrderDetails() {
      const item = this.deliveryDetails;

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
    },
    buttonType() {
      let btnType;

      if (this.pageType === "pending") {
        return (btnType = { submit: "Start Delivery", cancel: "Decline" });
      }
      if (this.pageType === "in-progress") {
        return (btnType = {
          submit: "Completed",
          cancel: "Cancel"
        });
      }

      return btnType;
    }
  },
  methods: {
    ...mapActions(["viewPageSubmit"]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM DD YYYY");
    },
    calculateTotal(arr) {
      return arr.reduce((currentTotal, item) => {
        let perItem = item.qty * item.price;
        return perItem + currentTotal;
      }, 0);
    },
    btnSubmitFxn() {
      let message =
        this.pageType === "pending"
          ? "You wanted to start the delivery now?"
          : "The package was already been delivered?";
      this.$q
        .dialog({
          title: "Confirm",
          message: message,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          if (this.pageType === "pending") {
            this.viewPageSubmit({
              type: this.pageType,
              riderId: this.riderId,
              orderId: this.id
            }).then(() => {
              this.$router.push({ name: "myOrders" });
            });
          }
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
    btnCancelFxn() {
      if (this.pageType === "in-progress") {
        return;
      } else if (this.pageType === "pending") {
        return;
      }
    }
  },
  created() {
    // eslint-disable-next-line no-console
    this.$consola.success("Order details", this.deliveryDetails);
  }
};
</script>

<style>
.btndown {
  margin-bottom: 55.5px;
}
</style>
