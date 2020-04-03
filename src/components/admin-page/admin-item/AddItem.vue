<template>
  <q-page>
    <q-form>
      <h6 class="q-mb-none text-left">Info</h6>
      <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">Title</p>
      <q-input outlined v-model="title" label="Product Name" />

      <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
        Description
      </p>
      <q-editor
        v-model="description"
        :definitions="{
          bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
        }"
      />

      <h6 class="q-mb-none text-left">Pricing</h6>
      <!-- Pricing -->
      <div class="row">
        <div class="col-5 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Regular Price
          </p>
          <q-input outlined v-model="regPrice" type="number">
            <template v-slot:prepend>₱</template>
          </q-input>
        </div>
        <div class="col-3 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Weight
          </p>
          <q-input outlined v-model="sellingWeight" type="number">
            <template v-slot:append>{{ unit }}</template>
          </q-input>
        </div>
        <div class="col-4 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Unit
          </p>
          <q-select
            outlined
            v-model="unit"
            :options="['kg', 'gm']"
            label="Unit"
          />
        </div>
      </div>

      <div class="row items-center" v-if="sale">
        <div class="col-4 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Sale Price
          </p>
          <q-input
            outlined
            v-model="minusPercent"
            type="number"
            :disable="!sale || usePercentage"
            v-if="usePercentage"
          >
            <template v-slot:prepend>₱</template>
          </q-input>
          <q-input
            outlined
            v-model="salePrice"
            type="number"
            :disable="!sale"
            v-if="!usePercentage"
          >
            <template v-slot:prepend>₱</template>
          </q-input>
        </div>
        <div class="col-4 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Less Percent
          </p>
          <q-input
            outlined
            v-model="percentSale"
            type="number"
            :disable="!usePercentage"
          >
            <template v-slot:append>%</template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-6 text-left q-pa-sm q-gutter-sm">
          <q-checkbox v-model="sale" label="On Sale" />
          <q-checkbox
            v-model="usePercentage"
            label="Sale Percentage"
            v-if="sale"
          />
        </div>
      </div>
      <h6 class="q-mb-none text-left">Inventory</h6>
      <!-- Inventory -->
      <div class="row">
        <div class="col-6 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            SKU(Stock Keeping Unit)
          </p>
          <q-input outlined v-model="sku" type="number" />
        </div>
        <div class="col-6 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Barcode (ISBN,UPC,GTIN,etc)
          </p>
          <q-input outlined v-model="code" />
        </div>
      </div>
      <div class="row">
        <div class="col-6 q-pa-sm text-left">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Policy
          </p>
          <q-checkbox
            v-model="tracking"
            label="Activate product tracking"
            class="q-ml-none"
          />
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7"></p>
          <q-checkbox
            v-model="purchaseOutOfStock"
            label="Allow customer to order when out of stock"
            class="q-ml-none"
          />
        </div>

        <div class="col-3 q-pa-sm text-left">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Quantity
          </p>
          <q-input outlined v-model="inventory" type="number" dense />
        </div>
      </div>
    </q-form>
    <q-form @submit="uploading">
      <h6 class="q-mb-none text-left">Image</h6>
      <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
        Upload Image
      </p>
      <div class="row items-center">
        <div class="col-6">
          <q-file
            @click="console.log('wew')"
            v-model="pota"
            label="Pick Photos"
            outlined
            multiple
            style="max-width: 300px"
          />
        </div>
        <div class="col-6">
          <q-btn color="green" flat type="submit">Update/Preview</q-btn>
        </div>
      </div>
    </q-form>
    <div v-if="url.length !== 0">
      <!-- <div class="row items-center">
        <div class="col-6 q-pa-xs" v-for="(i, index) in url" :key="index">
          <q-img
            :src="i"
            spinner-color="red"
            style="height: 240px; max-width: 250px"
          />
        </div>
      </div>-->

      <q-carousel
        swipeable
        animated
        v-model="slide"
        thumbnails
        infinite
        class="q-ma-sm"
      >
        <q-carousel-slide
          v-for="(i, index) in url"
          :key="index"
          :name="i"
          :img-src="i"
        />
      </q-carousel>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      slide: "",
      pota: null,
      url: [],
      files: null,
      title: null,
      description: "",
      regPrice: null,
      salePrice: null,
      sale: false,
      usePercentage: false,
      percentSale: null,
      sku: null,
      code: null,
      tracking: true,
      sellingWeight: 1,
      unit: "kg",
      inventory: 0,
      purchaseOutOfStock: false
    };
  },
  computed: {
    minusPercent() {
      let wew = 0;
      if (this.percentSale !== null) {
        wew = this.regPrice - this.regPrice * (this.percentSale / 100);
      }
      return parseInt(wew);
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log(this.minusPercent);
  },
  methods: {
    uploading() {
      this.url = [];
      // eslint-disable-next-line no-console
      console.log(this.url);

      this.pota.map(i => this.url.push(URL.createObjectURL(i)));

      this.slide = this.url[0];
    },
    onFileChange(e) {
      let files = e.target.files;
      let waw = [...files];

      // eslint-disable-next-line no-console
      waw.map(i => this.url.push(URL.createObjectURL(i)));

      // eslint-disable-next-line no-console
      console.log([...this.pota]);
      // eslint-disable-next-line no-console
      console.log(waw);
    }
  }
};
</script>

<style></style>
