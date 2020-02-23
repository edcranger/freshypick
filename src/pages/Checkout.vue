<template>
  <q-page padding class="fit row wrap justify-start items-start content-start">
    <!-- This is the cart items with the toolbar select all -->
    <div class="col-12 col-sm-8 col-md-8 q-mb-xl">
      <div class="row">
        <!-- Address bar -->
        <div class="shippingBilling col-12 shadow-1 q-mt-md">
          <q-banner class="bg-white">
            <div class="fit row wrap">
              <div class="col">
                <div class="row">
                  <q-toolbar class="bg-white q-px-none">
                    <div class="text-subtitle2">
                      <q-icon
                        name="fas fa-shipping-fast"
                        class="q-mr-sm q-ml-none"
                      ></q-icon
                      >Shipping & Billing
                    </div>

                    <q-space />

                    <q-btn flat round dense icon="fas fa-edit" />
                  </q-toolbar>
                </div>
                <div class="row">
                  <!-- Home Address -->
                  <p>
                    <q-icon name="home" class="q-mr-sm"></q-icon>Blk 22 Lot 12
                    hibiscus street castle spring heights camarin caloocan city.
                  </p>
                </div>
                <div class="row">
                  <!-- Number -->
                  <p>
                    <q-icon name="local_phone" class="q-mr-sm"></q-icon
                    >09156870548
                  </p>
                </div>

                <div class="row">
                  <!-- Email -->
                  <p>
                    <q-icon name="email" class="q-mr-sm"></q-icon
                    >edisonocampo.eo@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </q-banner>
        </div>

        <!-- Items list -->
        <div class="col-12 q-mt-lg shadow-1 bg-white q-py-sm">
          <div class="text-subtitle2">
            <q-icon name="fas fa-shopping-cart" class="q-ml-md q-mr-sm"></q-icon
            >Items
          </div>
        </div>

        <div class="col-12 bg-white q-my-sm">
          <div
            class="row shadow-1 q-pa-sm"
            v-for="item in checkoutCart"
            :key="item.id"
          >
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

    <!-- This is for the side checkout pane -->
    <div class="orderSummaryCol col bg-white shadow-1 q-my-lg q-mx-sm q-pa-md">
      <q-banner class="bg-white q-pa-none">
        <div class="fit row wrap">
          <div class="col">
            <div class="row">
              <q-toolbar class="bg-white q-px-none">
                <div class="text-subtitle2">
                  <q-icon
                    name="fas fa-shipping-fast"
                    class="q-mr-sm q-ml-none"
                  ></q-icon
                  >Shipping & Billing
                </div>

                <q-space />

                <q-btn flat round dense icon="fas fa-edit" />
              </q-toolbar>
            </div>
            <div class="row">
              <!-- Home Address -->
              <p>
                <q-icon name="home" class="q-mr-sm"></q-icon>Blk 22 Lot 12
                hibiscus street castle spring heights camarin caloocan city.
              </p>
            </div>
            <div class="row">
              <!-- Number -->
              <p>
                <q-icon name="local_phone" class="q-mr-sm"></q-icon>09156870548
              </p>
            </div>

            <div class="row">
              <!-- Email -->
              <p>
                <q-icon name="email" class="q-mr-sm"></q-icon
                >edisonocampo.eo@gmail.com
              </p>
            </div>
          </div>
        </div>
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
          to="/orders"
          label="Order now"
          size="md"
        />
      </div>
    </div>

    <!-- Order summary buttom -->
    <q-banner class="orderSummaryButtomCol bg-white fixed-bottom">
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
            <q-btn color="purple" @click="ordering()" to="/orders" dense
              >Order now</q-btn
            >
          </div>
        </div>
      </div>
    </q-banner>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      val: false
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
    }
  }
};
</script>
<style lang="scss" scoped>
#pow {
  flex: 0 0 155px;
}

@media screen and (max-width: 599px) {
  .orderSummaryCol {
    display: none;
  }
}

@media screen and (max-width: 599px) {
}

@media screen and (min-width: 599px) {
  .orderSummaryButtomCol {
    display: none;
  }

  .shippingBilling {
    display: none;
  }
}

.orderSummaryButtomCol {
  margin-bottom: 55.5px;
}
</style>
