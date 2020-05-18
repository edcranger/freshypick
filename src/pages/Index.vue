<template>
  <q-page class="bg-white">
    <q-parallax :height="250" :speed="0.5" class="q-mb-sm">
      <template v-slot:media>
        <img :src="require('../assets/vegies.jpg')" />
      </template>

      <h3 class="text-white text-center">Get Healthy With Our Vegie</h3>
    </q-parallax>
    <div :class="$mq === 'sm' || $mq === 'md' ? 'row wrap ' : 'web row wrap'">
      <div
        class="col-xs-6 col-sm-3 col-md-3 col-xl-3 q-pa-xs q-mb-md"
        v-for="(i, index) in getProducts"
        :key="index"
      >
        <q-card clickable class="my-card zoom" flat>
          <q-card-section @click="viewSingleProduct(i)" class="q-pa-none">
            <q-img :src="`http://localhost:3000/${i.photos[0]}`" />
            <div class="row no-wrap items-center text-center">
              <h6
                class="col text-subtitle2 text-grey-8 q-ma-none text-italic text-bold"
              >
                {{ i.name }}
              </h6>
              <div
                class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
              ></div>
            </div>

            <p class="text-center text-italic text-grey-8">
              <span class="text-green text-bold">₱{{ i.price }}</span>
              /{{ i.unit }}
            </p>
          </q-card-section>
          <q-card-actions
            class="fit row wrap justify-center items-start content-center"
          >
            <q-btn
              label="ADD TO CART"
              color="green"
              @click="i.confirm = !i.confirm"
            />
            <q-dialog v-model="i.confirm" persistent>
              <AddtoCart :product="i" />
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
      newProducts: null,
      viewItem: false
    };
  },
  computed: {
    ...mapGetters(["products", "cart"]),
    getProducts() {
      return this.products;
    }
  },
  methods: {
    ...mapActions(["getAllProducts"]),
    viewSingleProduct(product) {
      // eslint-disable-next-line no-console
      this.$router.push({ name: "product", params: { name: product.name } });
    }
  },
  async created() {
    // eslint-disable-next-line no-console
  },
  components: {
    AddtoCart
  }
};
</script>
<style lang="stylus">
.my-card {
  cursor: pointer;
}
</style>
