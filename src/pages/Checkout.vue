<template>
  <q-page padding class="fit row wrap justify-start items-start content-start">
    <!-- This is the cart items with the toolbar select all -->
    <div class="col-12 col-sm-8 col-md-8 q-mb-xl">
      <div class="row">
        <!-- Address bar -->
        <div class="col-12 shadow-1 q-mt-md bg-white" v-if="$mq === 'sm'">
          <q-list class="rounded-borders">
            <q-expansion-item
              default-opened
              group="generalGroup"
              icon="fas fa-shipping-fast"
              label="Shipping Info"
            >
              <q-card>
                <q-card-section>
                  <ShippingAdd />
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              group="generalGroup"
              icon="fas fa-credit-card"
              label="Payment Method"
              :caption="paymentMethod"
            >
              <q-card>
                <q-card-section>
                  <q-list class="rounded-borders">
                    <q-item
                      clickable
                      @click="
                        (paymentMethod = 'COD'), $refs.expandableItem1.hide();
                        $refs.expandableItem2.hide();
                      "
                    >
                      <q-item-section avatar>
                        <q-icon name="fas fa-hand-holding-usd" />
                      </q-item-section>
                      <q-item-section>Cash On Delivery</q-item-section>
                    </q-item>

                    <q-expansion-item
                      ref="expandableItem1"
                      group="billingGroup"
                      icon="fab fa-cc-mastercard"
                      label="Credit/Debit Card"
                    >
                      <q-card>
                        <q-card-section>
                          <CardList @clicked="onClickChild" />
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>

                    <q-expansion-item
                      ref="expandableItem2"
                      group="billingGroup"
                      icon="fab fa-cc-amazon-pay"
                      label="Payment Gateway"
                    >
                      <q-card>
                        <q-card-section>
                          <PaymentGa @clicked="onClickChild" />
                        </q-card-section>
                      </q-card>
                    </q-expansion-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>

        <!-- Items list -->

        <div class="col-12 bg-white q-my-sm shadow-1">
          <div class="text-subtitle2 q-pa-sm">
            <q-icon name="fas fa-shopping-cart" class="q-ml-md q-mr-sm"></q-icon
            >Items
          </div>
          <q-separator />

          <div class="row q-pa-sm" v-for="item in checkoutCart" :key="item.id">
            <div class="col-md-3 col-4">
              <q-img
                :src="item.photo"
                spinner-color="white"
                style="height: 100px; max-width: 100px"
              />
            </div>
            <div class="col">
              <div class="q-mt-lg">
                <strong>{{ item.name }}</strong>
              </div>
              <div class="q-ma-none">₱{{ item.price }}/kg</div>

              <div
                class="fit row wrap justify-end items-start content-start q-mt-md q-mb-none"
              >
                <div class="col">
                  <p>Qty: {{ item.qty }}</p>
                </div>
                <div class="col text-right">
                  <div>
                    <q-btn flat round dense icon="delete" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- This is for the side checkout pane md and greater view -->
    <div
      class="col bg-white shadow-1 q-my-lg q-mx-sm q-pa-md"
      v-if="$mq !== 'sm'"
    >
      <q-banner class="bg-white q-pa-none">
        <ShippingAdd />
      </q-banner>
      <h6 class="q-my-sm">Order Summary</h6>
      <div class="row q-mt-none">
        <div class="col-8">
          <p class="q-mt-none">Subtotal ({{ checkoutCart.length }} items)</p>
        </div>
        <div class="col-4 text-right">₱{{ totalInCart }}</div>
        <div class="col-8">
          <p>Shipping cost</p>
        </div>
        <div class="col-4 text-right">₱50.00</div>
        <q-separator inset />
      </div>

      <div class="row q-mb-md">
        <div class="col-8 q-mt-lg">
          <p class="text-subtitle2">Total</p>
        </div>
        <div class="col-4 q-mt-lg">
          <p class="text-right text-green text-subtitle2">₱{{ totalInCart }}</p>
        </div>
      </div>
      <div class="row justify-center">
        <q-btn
          color="purple"
          @click="ordering()"
          to="/account/orders"
          label="Order now"
          size="md"
        />
      </div>
    </div>

    <div class="bg-white orderSummaryButtomCol fixed-bottom">
      <!-- Order summary buttom -->
      <q-banner>
        <div class="fit row wrap">
          <div class="col-8">
            <div class="row">
              <h6 class="col-12 text-right q-ma-none">
                Total: ₱{{ totalInCart }}
              </h6>
            </div>
          </div>

          <div class="col-4">
            <div class="row justify-end">
              <q-btn
                color="purple"
                @click="ordering()"
                to="/account/orders"
                dense
                >Order now</q-btn
              >
            </div>
          </div>
        </div>
      </q-banner>
    </div>
  </q-page>
</template>

<script>
import ShippingAdd from "../components/utils/Shipping";
import CardList from "../components/account-page/settingsview/CardList";
import PaymentGa from "../components/account-page/settingsview/PaymentGa";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      val: false,
      paymentMethod: "COD",
      DailyInApp: true,
      cardForm: false,
      emailMarketing: true,
      smsMarketing: false,
      chatActivated: true,
      chatMarketing: false,
      language: "English"
    };
  },
  created() {
    // consola.success("checkoutcart", this.checkoutCart);
  },
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered"])
  },
  methods: {
    ...mapActions(["order"]),
    ordering() {
      this.order();
    },
    onClickChild(value) {
      this.paymentMethod = value;
      this.$refs.expandableItem1.hide();
      this.$refs.expandableItem2.hide();
    }
  },
  components: {
    ShippingAdd,
    CardList,
    PaymentGa
  }
};
</script>
<style lang="scss" scoped>
#pow {
  flex: 0 0 155px;
}

@media screen and (min-width: 599px) {
  .orderSummaryButtomCol {
    display: none;
  }
}

.orderSummaryButtomCol {
  margin-bottom: 55.5px;
}
</style>
