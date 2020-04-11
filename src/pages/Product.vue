<template>
  <q-page padding class="bg-white">
    <div class="row text-center items-center content-center">
      <div class="col-xs-12 col-sm-6">
        <q-carousel
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
          class="q-ma-sm"
        >
          <q-carousel-slide
            class="q-pa-none"
            v-for="(i, index) in getProductPhoto"
            :key="index"
            :name="i"
            :img-src="i"
          />
        </q-carousel>
      </div>

      <div class="col-xs-12 col-sm-6 q-pa-md">
        <h3 class="text-h5 text-grey-8 q-mb-none q-mt-md text-italic">
          {{ product.name }}
        </h3>
        <q-separator inset />
        <h6 class="text-h6 q-ma-none text-italic text-grey-8 q-ml-sm">
          <span class="text-green text-weight-bolder"
            >₱{{ product.price }}</span
          >
          per {{ product.unit }}
        </h6>

        <p
          class="text-body2 text-grey-8 q-mt-md q-ml-sm"
          v-html="product.description"
        />
        <div
          class="full-width row wrap justify-center items-start content-center"
        >
          <q-input
            outlined
            bottom-slots
            style="max-width: 150px;"
            v-model="product.qty"
            type="number"
            maxlength="12"
            dense
          >
            <template v-slot:before>
              <q-btn
                flat
                :disable="product.qty < 2"
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

        <div class="q-ml-sm">
          <q-btn
            color="green"
            :outline="cart.find(i => i.id === product.id) ? true : false"
            :disable="cart.find(i => i.id === product.id) ? true : false"
            :label="
              cart.find(i => i.id === product.id)
                ? 'Added to cart'
                : 'ADD TO CART'
            "
            @click="addCart"
          />
        </div>
      </div>
    </div>
    <q-separator style="height: 2px;" />
    <p class="text-grey-8 text-h6 q-ml-md q-mb-none">Recommendations</p>

    <div class="row">
      <div
        class="col-xs-6 col-sm-2"
        v-for="(product, index) in recommendations"
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
export default {
  data() {
    return {
      product: null,
      slide: null
    };
  },
  computed: {
    ...mapGetters(["cart", "products"]),
    getProductPhoto() {
      let photos = [];
      this.product.photo.map(i => photos.push(i.url));

      return photos;
    },
    recommendations() {
      let items = [];

      this.products.map(i => items.push(i));

      items.length = 6;

      return items.sort(() => Math.random() - 0.5);
    }
  },
  methods: {
    ...mapActions(["addToCart", "getItems"]),
    addCart() {
      this.addToCart(this.product).then(() => {});
    },
    viewSingleProduct(product) {
      // eslint-disable-next-line no-console
      this.$router
        .push({ name: "product", params: { name: product.name } })
        .then(() => {
          this.$router.go();
        });
    }
  },
  created() {
    this.getItems();
    this.product = this.products.filter(
      i => i.name === this.$route.params.name
    )[0];

    this.slide = this.product.photo[0].url;

    // eslint-disable-next-line no-console
    this.$consola.info("productPage", this.recommendations);
  },
  components: {}
};
</script>

<style></style>
