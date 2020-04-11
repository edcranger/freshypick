<template>
  <q-page padding class="bg-white">
    <q-parallax :height="250" :speed="0.5" class="q-mb-sm">
      <template v-slot:media>
        <img :src="require('../assets/vegies.jpg')" />
      </template>

      <h3 class="text-white text-center">Get Healthy With Our Vegie</h3>
    </q-parallax>
    <div class="row wrap">
      <div
        class="col-xs-6 col-sm-3 col-md-3 col-xl-2 q-pa-xs"
        v-for="(product, index) in products"
        :key="index"
      >
        <q-card clickable class="my-card zoom q-mt-xl" flat>
          <q-card-section @click="viewSingleProduct(product)" class="q-pa-none">
            <q-img :src="product.photo[0].url" />
            <div class="row no-wrap items-center text-center">
              <h6
                class="col text-subtitle2 text-grey-8 q-ma-none text-italic text-bold"
              >
                {{ product.name }}
              </h6>
              <div
                class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
              ></div>
            </div>

            <p class="text-center text-italic text-grey-8">
              <span class="text-green text-bold">₱{{ product.price }}</span>
              /{{ product.unit }}
            </p>

            <!-- <div
              class="full-width row wrap justify-center items-start content-center"
            >
              <q-input
                outlined
                bottom-slots
                v-model="product.qty"
                type="number"
                maxlength="12"
                dense
              >
                <template v-slot:before>
                  <q-btn
                    flat
                    @click="product.qty--"
                    round
                    icon="fas fa-minus-square"
                  />
                </template>

                <template v-slot:after>
                  <q-btn
                    flat
                    round
                    icon="fas fa-plus-square"
                    @click="product.qty++"
                  />
                </template>
              </q-input>
            </div>-->
          </q-card-section>
          <q-card-actions
            class="fit row wrap justify-center items-start content-center"
          >
            <q-btn
              :outline="cart.find(i => i.id === product.id) ? true : false"
              :disable="cart.find(i => i.id === product.id) ? true : false"
              :label="
                cart.find(i => i.id === product.id)
                  ? 'PLACED ON CART'
                  : 'ADD TO CART'
              "
              color="green"
              @click="product.confirm = !product.confirm"
            />
            <q-dialog v-model="product.confirm" persistent>
              <AddtoCart :productInfo="product" />
            </q-dialog>
          </q-card-actions>

          <!-- <q-separator /> -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddtoCart from "../components/modals/AddtoCart";

export default {
  name: "PageIndex",
  data() {
    return {
      viewItem: false
    };
  },
  computed: {
    ...mapGetters(["products", "cart"])
  },
  methods: {
    ...mapActions(["getItems"]),
    viewSingleProduct(product) {
      // eslint-disable-next-line no-console
      this.$router.push({ name: "product", params: { name: product.name } });
    }
  },
  created() {
    this.getItems();
  },
  components: {
    AddtoCart
  }
};
</script>
<style lang="stylus" scoped>
.my-card {
  cursor: pointer;
}
</style>
