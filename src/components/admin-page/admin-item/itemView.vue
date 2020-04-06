<template>
  <div class="bg-white">
    <q-item-label header>
      <h5 class="q-my-none">Product Profile</h5>
    </q-item-label>
    <div class="row">
      <div class="col-xs-12 col-sm-6 q-pa-sm">
        <q-carousel
          swipeable
          animated
          v-model="slide"
          thumbnails
          infinite
          class="q-ma-sm"
        >
          <q-carousel-slide
            v-for="(i, index) in getProductPhoto"
            :key="index"
            :name="i"
            :img-src="i"
          />
        </q-carousel>
      </div>
      <div class="col-xs-12 col-sm-6 q-pa-md">
        <h3 class="text-h3 text-grey-8 q-ma-none text-italic">
          {{ product[0].name }}
        </h3>
        <q-separator inset />
        <h6 class="text-h6 q-ma-none text-italic text-grey-8 q-ml-sm">
          <span class="text-green text-weight-bolder"
            >₱{{ product[0].price }}</span
          >
          per {{ product[0].unit }}
        </h6>
        <div
          class="text-body2 text-grey-8 q-mt-md q-ml-sm"
          v-html="product[0].description"
        ></div>
        <div class="row">
          <div class="col-6 q-pa-sm text-green text-weight-bold">
            <span class="text-overline text-grey-8">Sale:</span>
            {{ product[0].sale ? "Yes" : "No" }}
          </div>
          <div class="col-6 q-pa-sm text-green text-weight-bold">
            <span class="text-overline text-grey-8">Sale Price:</span>
            {{ product[0].salePrice }}
          </div>
          <div class="col-6 q-pa-sm text-green text-weight-bold">
            <span class="text-overline text-grey-8">Selling Weight:</span>
            {{ product[0].sellingWeight }}/{{ product[0].unit }}
          </div>
          <div class="col-6 q-pa-sm text-grey-8">
            <p class="q-mb-none">
              <span class="text-overline text-grey-8">
                Inventory:
                <span class="text-weight-bolder text-green"
                  >({{ getTotalInventory }})</span
                >
              </span>
            </p>
            <div class="row items-center" v-for="i in product" :key="i.id">
              <div class="col-12">
                <p v-for="x in i.inventory" :key="x.id" class="q-ma-none">
                  {{ x.name }}:
                  <span class="text-weight-bold text-green">{{ x.qty }}</span>
                </p>
              </div>
            </div>
          </div>

          <div class="col-6 q-pa-sm text-green text-weight-bold">
            <span class="text-overline text-grey-8">SKU:</span>
            {{ product[0].sku }}
          </div>
          <div class="col-6 q-pa-sm text-green text-weight-bold">
            <span class="text-overline text-grey-8">Code:</span>
            {{ product[0].code }}
          </div>
          <div class="col-6 q-pa-sm text-green text-weight-bold">
            <span class="text-overline text-grey-8">Inventory Tracking:</span>
            {{ product[0].tracking ? "Yes" : "No" }}
          </div>
          <div class="col-6 q-pa-sm text-green text-weight-bold">
            <span class="text-overline text-grey-8"
              >Out of stock purchase:</span
            >
            {{ product[0].purchaseOutOfStock ? "Yes" : "No" }}
          </div>
        </div>
        <div class="row q-gutter-md justify-end">
          <q-btn color="green" dense rounded icon="fas fa-plus-square" flat />
          <q-btn color="grey" dense rounded icon="fas fa-list" flat />
          <q-btn
            color="blue"
            :to="{
              name: $mq === 'sm' ? 'meditItem' : 'editItem',
              params: { productId: product[0].id }
            }"
            dense
            rounded
            icon="edit"
            flat
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      slide: null,
      product: null,
      routeParams: this.$route.params.productId
    };
  },
  props: [],
  created() {
    this.product = this.products.filter(i => i.id === this.routeParams);

    this.$consola.info("itemView", this.product);
    this.product.map(i => (this.slide = i.photo[0].url));
  },

  computed: {
    ...mapGetters(["products"]),
    getProductPhoto() {
      let photos = [];
      this.product.map(i => i.photo.map(i => photos.push(i.url)));

      return photos;
    },
    getTotalInventory() {
      let counter = 0;
      this.product.map(i => i.inventory.map(e => (counter += e.qty)));
      return counter;
    }
  },
  methods: {
    ...mapActions([])
  },
  components: {}
};
</script>

<style>
.grayscale {
  filter: grayscale(100%);
}
</style>
