<template>
  <q-page padding>
    <div class="q-ma-none">
      <p class="text-subtitle2 text-grey-7 q-my-sm q-ml-xs">
        Customer Details
        <q-chip color="green" class="text-white" v-if="pageType === 'done'"
          >Completed</q-chip
        >
      </p>
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
          <q-item-label></q-item-label>
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

    <q-footer class="row btndown justify-center" v-if="pageType !== 'done'">
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
          v-if="pageType === 'pending'"
          stack
          class="full-width q-pa-sm"
          color="green"
          :label="buttonType.submit"
          @click="btnSubmitFxn()"
        />
        <q-btn
          v-if="pageType === 'in-progress'"
          stack
          class="full-width q-pa-sm"
          color="green"
          :label="buttonType.submit"
        >
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup class="text-subtitle2">
                <q-item-section>
                  <a
                    class="linkMap"
                    :href="
                      `https://www.google.com.ph/maps/dir/${getLocation.lat},${getLocation.lng}/smdc grass tower 3`
                    "
                    >Start Journey</a
                  >
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="btnSubmitFxn()"
                class="text-subtitle2"
              >
                <q-item-section>Completed</q-item-section>
              </q-item>
              <q-separator />
            </q-list>
          </q-menu>
        </q-btn>
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
      riderId: "fos753",
      getLocation: null
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
          submit: "Action",
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
          this.viewPageSubmit({
            type: this.pageType,
            riderId: this.riderId,
            orderId: this.id
          }).then(() => {
            this.$router.push({ name: "myOrders" });
          });
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
    this.$getLocation({}).then(coordinates => {
      this.getLocation = coordinates;
    });
  }
};
</script>

<style>
.btndown {
  margin-bottom: 55.5px;
}

.linkMap {
  text-decoration: none;
}
</style>
