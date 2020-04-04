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
        <q-card clickable class="my-card q-mt-xl" flat>
          <q-img :src="product.photo[0].url" />

          <q-card-section class="q-pa-none">
            <div class="row no-wrap items-center text-center">
              <div class="col text-h6 ellipsis">{{ product.name }}</div>
              <div
                class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
              ></div>
            </div>

            <p class="text-center">₱{{ product.price }}</p>

            <div
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
            </div>
            <div class="fit row wrap justify-center items-start content-center">
              <q-btn
                dense
                label="Add to cart"
                color="primary"
                @click="product.confirm = !product.confirm"
              />
              <q-dialog v-model="product.confirm" persistent>
                <AddtoCart :productInfo="product" />
              </q-dialog>
            </div>
          </q-card-section>

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
      power: null
    };
  },
  computed: {
    ...mapGetters(["products"])
  },
  created() {
    this.getItems();
  },
  components: {
    AddtoCart
  },
  methods: {
    ...mapActions(["getItems"])
  }
};
</script>
