<template>
  <q-page
    :class="
      $mq === 'sm' || $mq === 'md'
        ? ' fit row wrap justify-start items-start content-start q-px-sm'
        : 'web fit row wrap justify-start items-start content-start q-px-sm'
    "
  >
    <!-- This is the cart items with the toolbar select all -->
    <div class="col-12 col-sm-8 col-md-8 q-mb-xl q-mt-sm">
      <div class="row">
        <!-- Address bar -->
        <div class="col-12 shadow-1 bg-white" v-if="$mq === 'sm'">
          <q-list class="rounded-borders" separator>
            <q-expansion-item
              default-opened
              header-class="text-grey-9"
              group="generalGroup"
              label="Shipping Info"
            >
              <q-card>
                <q-card-section>
                  <ShippingAdd />
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              default-opened
              header-class="text-grey-9"
              group="itemGroup"
              label="Items"
            >
              <q-card>
                <q-card-section>
                  <div
                    class="row q-pa-sm"
                    v-for="item in checkoutCartComp"
                    :key="item.id"
                  >
                    <div class="col-md-3 col-4">
                      <q-img
                        :src="item.photo[0].url"
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
                            <q-btn
                              flat
                              round
                              dense
                              @click="deleteItem(item)"
                              icon="delete"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              header-class="text-grey-9"
              group="generalGroup"
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
                        <q-icon
                          class="text-grey-9"
                          name="fas fa-hand-holding-usd"
                        />
                      </q-item-section>
                      <q-item-section>Cash On Delivery</q-item-section>
                    </q-item>

                    <q-expansion-item
                      header-class="text-grey-9"
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
                      header-class="text-grey-8"
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
        <template v-if="$mq !== 'sm'">
          <div class="col-12 shadow-1 bg-white">
            <q-breadcrumbs class="text-brown q-ma-md" v-if="$mq !== 'sm'">
              <template v-slot:separator>
                <q-icon size="1.5em" name="chevron_right" color="primary" />
              </template>

              <q-breadcrumbs-el label="Home" icon="fas fa-carrot" />
              <q-breadcrumbs-el label="Check Out" icon="shopping_cart" />
            </q-breadcrumbs>
          </div>

          <div class="col-12 bg-white">
            <div
              class="row shadow-1 q-pa-sm"
              v-for="item in checkoutCartComp"
              :key="item.id"
            >
              <div class="col-md-3 col-4">
                <q-img
                  :src="item.photo[0].url"
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
                      <q-btn
                        flat
                        round
                        dense
                        icon="delete"
                        @click="deleteItem(item)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- This is for the side checkout pane md and greater view -->
    <div
      class="col bg-white shadow-1 q-mx-sm q-px-md q-mt-sm"
      v-if="$mq !== 'sm'"
    >
      <q-banner class="bg-white q-pa-none">
        <ShippingAdd />
      </q-banner>
      <h6 class="q-my-sm">Order Summary</h6>
      <div class="row q-mt-none">
        <div class="col-8">
          <p class="q-mt-none">
            Subtotal ({{ checkoutCartComp.length }} items)
          </p>
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
          class="q-mb-md"
          color="purple"
          @click="ordering()"
          to="/account/orders"
          label="Order now"
        />
      </div>
    </div>

    <div class="bg-white orderSummaryButtomCol fixed-bottom">
      <!-- Order summary buttom -->
      <q-banner v-if="$mq === 'sm'" class>
        <div class="fit row wrap">
          <div class="col-8">
            <div class="row">
              <h6 class="col-12 text-right text-grey-8 text-h6 q-ma-none">
                Total: ₱
                <span class="text-green">{{ totalInCart }}</span>
              </h6>
            </div>
          </div>

          <div class="col-4">
            <div class="row justify-end q-mb-sm">
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

  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered", "userAdd"]),
    checkoutCartComp() {
      return this.checkoutCart;
    }
  },
  methods: {
    ...mapActions(["order", "deleteFromCart"]),

    ordering() {
      //const { province, city, brgy, zipcode, detailedAdd } = this.userAdd;
      //const address = `${detailedAdd} ${brgy} ${city}, ${zipcode} ${province}`;
      this.order(this.userAdd);
    },
    onClickChild(value) {
      this.paymentMethod = value;
      this.$refs.expandableItem1.hide();
      this.$refs.expandableItem2.hide();
    },
    deleteItem(item) {
      this.deleteFromCart({ type: "single", item: item.id });
    }
  },
  created() {
    if (this.checkoutCart.length === 0) {
      this.$router.replace("/");
    }
  },
  watch: {
    checkoutCartComp(newCount, oldCount) {
      if (newCount.length === 0 || oldCount.length === 0) {
        // eslint-disable-next-line no-console
        this.$router.replace("/");
      }
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

.orderSummaryButtomCol {
  margin-bottom: 55.5px;
}
</style>
