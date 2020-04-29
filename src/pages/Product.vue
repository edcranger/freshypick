<template>
  <q-page
    padding
    :class="$mq === 'sm' || $mq === 'md' ? 'bg-white' : 'web web bg-white'"
  >
    <q-spinner-hourglass
      color="light-green"
      v-if="loading"
      size="10rem"
      class="fixed-center"
    />
    <div class="row text-center" v-if="!loading">
      <div class="col-xs-12 col-sm-6">
        <!-- <q-spinner
          color="primary"
          size="3em"
          :thickness="10"
          v-if="slide === null"
        />-->
        <q-img
          :src="`http://localhost:3000/${changeProdPic}`"
          spinner-color="white"
          style="height: 300px; max-width: 400px"
        >
          <template v-slot:error>
            <div class="absolute-full flex flex-center bg-negative text-white">
              Cannot load image
            </div>
          </template>
        </q-img>

        <div class="row justify-center items-center content-center q-pa-sm">
          <q-img
            v-for="(i, index) in getProduct.photos"
            @click="slide = index"
            :key="index"
            :src="`http://localhost:3000/${i}`"
            spinner-color="white"
            style="height: 40px; max-width: 50px"
          />
        </div>
      </div>

      <div class="col-xs-12 col-sm-6 q-pa-md">
        <h3 class="text-h5 text-grey-8 q-mb-none q-mt-md text-italic">
          {{ getProduct.name }}
        </h3>
        <q-separator inset />
        <h6 class="text-h6 q-ma-none text-italic text-grey-8 q-ml-sm">
          <span class="text-green text-weight-bolder"
            >₱{{ getProduct.price }}</span
          >
          per {{ getProduct.unit }}
        </h6>

        <p
          class="text-body2 text-grey-8 q-mt-md q-ml-sm"
          v-html="getProduct.description"
        />
        <div
          class="full-width row wrap justify-center items-start content-center"
        >
          <q-input
            outlined
            bottom-slots
            style="max-width: 150px;"
            v-model="getProduct.qty"
            type="number"
            maxlength="12"
            dense
          >
            <template v-slot:before>
              <q-btn
                flat
                :disable="getProduct.qty < 2"
                @click="getProduct.qty--"
                round
                icon="fas fa-minus-square"
              />
            </template>

            <template v-slot:after>
              <q-btn
                flat
                round
                icon="fas fa-plus-square"
                @click="getProduct.qty++"
              />
            </template>
          </q-input>
        </div>

        <div class="q-ml-sm">
          <q-btn color="green" label="ADD TO CART" @click="addCart" />
        </div>
      </div>
    </div>
    <q-separator style="height: 3px;" inset v-if="!loading" />
    <p class="text-grey-8 text-h6 q-ml-md q-mb-none" v-if="!loading">
      Recommendations
    </p>

    <div class="row" v-if="!loading">
      <div
        class="col-xs-6 col-sm-2"
        v-for="(product, index) in recommendations"
        :key="index"
      >
        <q-card clickable class="my-card zoom q-mt-xl" flat>
          <q-card-section @click="viewSingleProduct(product)" class="q-pa-none">
            <q-img :src="`http://localhost:3000/${product.photos[0]}`" />
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
          </q-card-section>
          <q-card-actions
            class="fit row wrap justify-center items-start content-center"
          >
            <q-btn
              label="ADD TO CART"
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
  data() {
    return {
      vueProducts: null,
      param: this.$route.params.name,
      slide: 0,
      loading: true
    };
  },
  computed: {
    ...mapGetters(["products"]),
    getProduct() {
      return this.products.find(i => i.name === this.param);
    },
    changeProdPic() {
      return this.getProduct.photos[this.slide];
    },
    recommendations() {
      let items = [];

      this.products.map(i => items.push(i));

      items.length = 6;

      return items.sort(() => Math.random() - 0.5);
    }
  },
  methods: {
    ...mapActions(["getAllProducts"]),
    async addCart() {
      await this.addToCart(this.product).then(() => {});
    },
    viewSingleProduct(product) {
      // eslint-disable-next-line no-console
      this.$router.push({ name: "product", params: { name: product.name } });
      this.param = product.name;
      this.$route.params.name = product.name;
    }
  },

  async created() {
    // eslint-disable-next-line no-console
    if (this.products.length !== 0) {
      this.loading = false;
    }
  },
  watch: {
    param: function(newValue, oldValue) {
      // eslint-disable-next-line no-console
      console.log(newValue);
      // eslint-disable-next-line no-console
      console.log(oldValue);

      window.scrollTo(0, 0);
    },
    getProduct: function(newValue) {
      if (newValue) {
        this.loading = false;
      }
    }
  },
  components: {
    AddtoCart
  }
};
</script>

<style>
.my-card {
  cursor: pointer;
}
</style>
