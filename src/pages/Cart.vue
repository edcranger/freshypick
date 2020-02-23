<template>
  <q-page padding class="fit row wrap justify-start items-start content-start">
    <!-- This is the cart items with the toolbar select all -->
    <div class="absolute-center" v-if="cart.length === 0">
      <p class="text-center text-subtitle1">No Items in the cart</p>
      <q-btn outline style="color: green;" label="Continue Shopping" to="/" />
    </div>

    <div class="col-12 col-sm-8 col-md-8 q-mb-xl" v-if="cart.length !== 0">
      <div class="row">
        <div class="col-12 shadow-1 q-my-md">
          <q-toolbar class="bg-white">
            <q-checkbox
              v-model="selectAllItem"
              @click.native="allSelected"
              label="All"
            />

            <q-space />

            <q-btn flat round dense icon="delete" />
          </q-toolbar>
        </div>

        <div class="col-12 bg-white" v-for="item in cart" :key="item.id">
          <div class="row shadow-1 q-pa-sm">
            <div class="col-1 col-md-1 q-mr-md">
              <q-checkbox
                v-model="item.selected"
                @click.native="selectOneCheckbox(item.id)"
              />
            </div>
            <div class="col-md-3 col-4">
              <q-img
                :src="item.photo"
                spinner-color="white"
                style="height: 100px; max-width: 100px"
              />
            </div>
            <div class="col">
              <div class="q-ma-none">
                <strong>{{ item.name }}</strong>
              </div>
              <div class="q-ma-none">₱{{ item.price }}/kg</div>
              <div class="q-ma-none">
                Sample text: Bili na mga suki masarap to hahha
              </div>
              <div
                class="fit row wrap justify-end items-start content-start q-mt-md"
              >
                <div id="pow">
                  <q-input
                    outlined
                    bottom-slots
                    type="number"
                    maxlength="2"
                    dense
                    v-model="item.qty"
                  >
                    <template v-slot:before>
                      <q-btn
                        flat
                        round
                        icon="fas fa-minus-square"
                        @click="item.qty--"
                      />
                    </template>

                    <template v-slot:after>
                      <q-btn
                        flat
                        round
                        icon="fas fa-plus-square"
                        @click="item.qty++"
                      />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- This is for the side checkout pane -->
    <div
      class="orderSummaryCol col bg-white shadow-1 q-ma-md q-pa-md"
      v-if="cart.length !== 0"
    >
      <h6 class="q-my-sm">Order Summary</h6>
      <div class="row q-mt-none">
        <div class="col-8">
          <p class="q-mt-none">Subtotal ({{ cart.length }} items)</p>
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
          to="/checkout"
          @click="checkOut()"
          label="Proceed to checkout"
          size="md"
        />
      </div>
    </div>

    <!-- Order summary buttom -->
    <q-banner
      class="orderSummaryButtomCol bg-white fixed-bottom"
      v-if="cart.length !== 0"
    >
      <div class="fit row wrap">
        <div class="col-8">
          <div class="row">
            <div class="col-12 text-right">SubTotal: ₱{{ totalInCart }}</div>
            <div class="col-12 text-right">Points:0</div>
          </div>
        </div>

        <div class="col-4">
          <div class="row justify-end">
            <q-btn color="purple" to="/checkout" @click="checkOut()" dense
              >Check out</q-btn
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
      selectAllItem: false
    };
  },
  created() {},
  computed: {
    ...mapGetters(["cart", "totalInCart"])
  },
  methods: {
    ...mapActions(["cartToCheckout"]),
    allSelected() {
      if (this.selectAllItem) {
        this.cart.map(item => {
          item.selected = true;
        });
      } else if (!this.selectAllItem) {
        this.cart.map(item => {
          item.selected = false;
        });
      }
      // eslint-disable-next-line no-console
      console.log(this.cart);
    },
    selectOneCheckbox() {
      this.selectAllItem = false;
      // eslint-disable-next-line no-console
    },
    deleteFromCart(id) {
      const result = this.cart.findIndex(cartItem => {
        return cartItem.id === id;
      });

      // eslint-disable-next-line no-console
      this.cart.splice(result, 1);
    },
    checkOut() {
      this.cartToCheckout(this.cart);
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

@media screen and (min-width: 599px) {
  .orderSummaryButtomCol {
    display: none;
  }
}

.q-banner {
  margin-bottom: 55.5px;
}
</style>
