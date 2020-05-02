<template>
  <transition
    appear
    :enter-active-class="$mq === 'sm' ? 'animated fadeIn ' : 'animated fadeIn'"
  >
    <q-page>
      <q-spinner-hourglass
        color="light-green"
        v-if="loading"
        size="10rem"
        class="fixed-center"
      />
      <div
        v-else
        :class="
          $mq === 'sm' || $mq === 'md'
            ? ' row wrap justify-start items-start content-start q-px-sm'
            : 'web row wrap justify-start items-start content-start q-px-sm'
        "
      >
        <!-- This is the cart items with the toolbar select all -->
        <div class="absolute-center" v-if="getCartItems.cartCount === 0">
          <p
            class="text-center text-h6 text-grey-8"
            v-html="`No Items in the cart`"
          />
          <q-btn
            outline
            style="color: green;"
            label="Continue Shopping"
            to="/"
          />
        </div>

        <div
          class="col-12 col-sm-8 col-md-8 q-mb-xl shadow-1 bg-white q-mt-sm"
          v-if="getCartItems.cartCount !== 0"
        >
          <q-breadcrumbs class="text-brown q-ma-md" v-if="$mq !== 'sm'">
            <template v-slot:separator>
              <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>

            <q-breadcrumbs-el label="Home" icon="fas fa-carrot" />
            <q-breadcrumbs-el label="Cart" icon="shopping_cart" />
          </q-breadcrumbs>

          <div class="row">
            <q-toolbar class="col-12">
              <q-checkbox
                v-model="selectAllItem"
                @click.native="allSelected"
                label="All"
              />

              <q-space />

              <q-btn
                flat
                round
                dense
                icon="delete"
                @click="deleteItem(selectedItems.map(e => e._id))"
              />
            </q-toolbar>
            <q-separator inset />

            <div
              class="col-12 bg-white"
              v-for="item in getCartItems.cart"
              :key="item._id"
            >
              <div class="row q-pa-sm">
                <div class="col-1 col-md-1 q-mr-md">
                  <q-checkbox
                    class="q-ml-xs"
                    v-model="item.selected"
                    @click.native="selectOneCheckbox(item.id)"
                  />
                </div>
                <div class="col-md-3 col-4">
                  <q-skeleton
                    width="100px"
                    height="50px"
                    class="q-mt-md"
                    v-if="item.deleting"
                  />
                  <q-img
                    v-else
                    :src="`http://localhost:3000/${item.product.photos[0]}`"
                    spinner-color="white"
                    style="height: 100px; max-width: 100px"
                  />
                </div>
                <div class="col">
                  <div class="q-mt-md">
                    <q-skeleton
                      type="text"
                      width="100px"
                      v-if="item.deleting"
                    />
                    <strong class v-else>{{ item.product.name }}</strong>
                  </div>
                  <div class="q-ma-none">
                    <q-skeleton
                      type="text"
                      width="100px"
                      v-if="item.deleting"
                    />
                    <span v-else>₱{{ item.product.price }}/kg</span>
                  </div>

                  <div
                    class="fit row wrap justify-end items-start content-start q-mt-md"
                  >
                    <q-spinner-ball
                      v-if="item.product.spinner"
                      color="green"
                      size="60px"
                      class="q-mr-xl q-pb-md"
                    />
                    <div id="pow" v-else>
                      <q-input
                        outlined
                        bottom-slots
                        type="number"
                        maxlength="2"
                        dense
                        v-model="item.quantity"
                        @change="
                          cartAction(
                            item.product._id,
                            item.quantity,
                            'changeQty'
                          )
                        "
                      >
                        <template v-slot:before>
                          <q-btn
                            flat
                            round
                            icon="fas fa-minus-square"
                            @click="cartAction(item.product._id, 1, 'minus')"
                          />
                        </template>

                        <template v-slot:after>
                          <q-btn
                            flat
                            round
                            icon="fas fa-plus-square"
                            @click="cartAction(item.product._id, 1, 'add')"
                          />
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
              </div>
              <q-separator inset />
            </div>
          </div>
        </div>

        <!-- This is for the side checkout pane -->

        <div
          class="orderSummaryCol col text-grey-10 q-mt-sm q-mx-sm q-pa-md shadow-1 bg-white"
          v-if="getCartItems.cartCount !== 0"
        >
          <h6 class="q-my-sm" v-text="`Order Summary`" />
          <div class="row q-mt-none">
            <p
              class="col-8 q-mt-none"
              v-html="`Subtotal ( ${selectedItems.length} items)`"
            />

            <p class="col-4 text-right">₱{{ selectedTotal }}</p>

            <p class="col-8">Shipping cost</p>

            <p class="col-4 text-right">₱50.00</p>
            <q-separator inset />
          </div>

          <div class="row q-mb-md">
            <p class="col-8 q-mt-lg text-subtitle2" v-html="`Total`" />
            <p
              class="col-4 q-mt-lg text-right text-green text-subtitle2"
              v-html="`₱ ${selectedTotal} `"
            />
          </div>
          <div class="row justify-center">
            <q-btn
              color="purple"
              @click="checkOut()"
              label="Proceed to checkout"
              size="md"
              :disable="selectedItems.length === 0"
            />
          </div>
        </div>

        <!-- Order summary buttom -->
        <q-banner
          class="orderSummaryButtomCol bg-white fixed-bottom"
          v-if="getCartItems.cartCount !== 0"
        >
          <div class="fit row wrap">
            <div class="col-8">
              <div class="row">
                <div class="col-12 text-right">
                  SubTotal: ₱{{ selectedTotal }}
                </div>
                <div class="col-12 text-right">Points:0</div>
              </div>
            </div>

            <div class="col-4">
              <div class="row justify-end">
                <q-btn
                  color="purple"
                  :disable="selectedItems.length === 0"
                  @click="checkOut()"
                  dense
                  >Check out</q-btn
                >
              </div>
            </div>
          </div>
        </q-banner>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      selectAllItem: false,
      cartItems: null,
      total: null,
      count: null,
      loading: true
    };
  },

  computed: {
    ...mapGetters(["cart"]),
    getCartItems() {
      return this.cart;
    },
    selectedItems() {
      return this.getCartItems.cart.filter(i => i.selected);
    },
    selectedTotal() {
      return this.selectedItems.reduce(
        (total, items) => items.total + total,
        0
      );
    }
  },
  methods: {
    ...mapActions(["getCart", "cartItemFxn", "cartSelect", "deleteToCart"]),

    cartAction(id, qty, type) {
      const lookForSpin = this.getCartItems.cart
        .map(i => i.product)
        .find(e => e._id === id);

      if (type === "add" || type === "minus" || type === "changeQty") {
        var search = this.getCartItems.cart.find(i => i.product._id === id)._id;
      }

      lookForSpin.spinner = true;

      this.cartItemFxn({
        productId: id,
        cartId: search,
        payload: { quantity: qty, cartFxnType: type }
      });
    },
    allSelected() {
      this.cartSelect({ selectAll: this.selectAllItem });
    },
    selectOneCheckbox() {
      this.selectAllItem = false;
    },

    deleteItem(ids) {
      this.deleteToCart(ids).then(res => this.$consola.success("deleted", res));
    },

    checkOut() {
      this.$router.push({
        name: "checkout",
        params: { selectedFromCart: this.selectedItems }
      });
    }
  },
  created() {
    if (this.cart.length !== 0) {
      this.loading = false;
    }
  },
  watch: {
    cart: function(newValue) {
      if (newValue) {
        this.loading = false;
      }
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
