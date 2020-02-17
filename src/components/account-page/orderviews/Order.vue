<template>
  <q-page class="row">
    <div class="col">
      <div class="bg-white q-py-sm">
        <div class="text-subtitle2">
          <q-icon name="fas fa-shopping-cart" class="q-ml-md q-mr-sm"></q-icon
          >Recent Orders
        </div>
      </div>

      <div class="col-12 bg-white q-my-sm">
        <div class="row text-left q-pa-sm">
          <div class="col-4">Order #</div>

          <div class="col-4 text-left">Items</div>
          <div class="col-4 text-right">Total</div>
        </div>

        <div
          class="row shadow-1 q-pa-sm"
          v-for="item in ordered"
          :key="item.id"
          to="/"
        >
          <div class="col">
            <div class="col-12 text-blue-7">
              {{ item.id }}
              <!-- <p>Placed on:{{item.date}}</p> -->
            </div>

            <div class="col-4">
              <div class="row" v-for="i in item.item" :key="i.purchaseid">
                <div class="col" v-if="!i.cancelled">
                  <q-img
                    :src="i.photo"
                    spinner-color="white"
                    style="height: 30px; max-width: 30px"
                  />
                  x {{ i.qty }} {{ i.name }}
                </div>
              </div>
            </div>
            <div class="col-4 text-right">
              <p class="text-green">
                <strong>₱{{ calCulateItem(item.id) }}</strong>
              </p>
            </div>
            <div class="col-12 text-right">
              <q-btn
                color="deep-orange"
                route
                :to="{ name: 'view-orders', params: { itemId: item.id } }"
                glossy
                label="View order"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    const wew = this.ordered.find(item => {
      return item.price === 0;
    });

    // eslint-disable-next-line no-console
    console.log(wew);
  },
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered"])
  },
  methods: {
    calCulateItem(id) {
      let totalPrice = 0;
      const pow = this.ordered.filter(item => {
        // eslint-disable-next-line no-console
        return item.id === id;
      });

      for (const item in pow) {
        let price = 0;
        const iterate = pow[item];

        for (const i in iterate.item) {
          if (iterate.item[i].cancelled !== true) {
            price += iterate.item[i].qty * iterate.item[i].price;
          }
        }
        // eslint-disable-next-line no-console
        totalPrice = price;
      }

      // eslint-disable-next-line no-console
      pow.map(item => {
        item.total = totalPrice;
      });

      // eslint-disable-next-line no-console
      console.log(this.ordered);

      return totalPrice;
    }
  }
};
</script>

<style></style>
