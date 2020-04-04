<template>
  <div>
    <q-form @submit.prevent="submitProduct">
      <h6 class="q-mb-none text-left">Info</h6>
      <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">Title</p>
      <q-input
        outlined
        v-model="name"
        label="Product Name"
        :rules="[val => !!val || 'Field is required']"
      />

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
          <q-input
            outlined
            v-model="price"
            type="number"
            :rules="[val => !!val || 'Field is required']"
          >
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
          <q-input
            outlined
            v-model="sku"
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
        <div class="col-6 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Barcode (ISBN,UPC,GTIN,etc)
          </p>
          <q-input
            outlined
            v-model="code"
            :rules="[val => !!val || 'Field is required']"
          />
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

        <div class="col-6 q-pa-sm">
          <div class="text-right">
            <q-btn
              dense
              flat
              color="blue"
              @click="editStorageLocation = !editStorageLocation"
              >{{
                editStorageLocation ? "Cancel" : "Edit Storage Location"
              }}</q-btn
            >
          </div>

          <div class="row">
            <div
              class="col-12"
              v-for="(i, index) in storageLocation"
              :key="index"
            >
              <div class="row justify-end items-center">
                <div class="col-7 q-pa-sm text-right">{{ i.name }}</div>
                <div class="col-4 q-pa-sm">
                  <q-input outlined v-model="i.qty" type="number" dense />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 class="q-mb-none text-left">Image</h6>
      <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
        Upload Image
      </p>
      <div class="row items-center">
        <q-file
          v-model="photoSelection"
          label="Pick Photos"
          outlined
          multiple
          use-chips
          :rules="[val => !!val || 'Field is required']"
        />
      </div>

      <div class="row q-mt-sm" v-if="uploadedPhoto.length !== 0">
        <div
          class="col-6 q-pa-xs"
          v-for="(i, index) in uploadedPhoto"
          :key="index"
        >
          Photo {{ index + 1 }}
          <q-img :src="i.url" :ratio="4 / 3" />
        </div>
        <!-- <q-carousel
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
        </q-carousel>-->
      </div>
      <div class="row justify-center q-mt-md q-gutter-sm">
        <q-btn color="blue-6">Save</q-btn>
        <q-btn color="green" type="submit">Submit</q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { uid } from "quasar";
import Photo from "../../../assets/noImage.jpg";
export default {
  data() {
    return {
      photoSelection: [],
      id: null,
      name: null,
      price: null,
      photos: [],
      sale: false,
      salePrice: 0,
      sellingWeight: 1,
      unit: "kg",
      inventory: [],
      description: "",
      usePercentage: false,
      percentSale: 0,
      sku: null,
      code: null,
      tracking: true,
      purchaseOutOfStock: false,
      editStorageLocation: false
    };
  },
  computed: {
    ...mapGetters(["getWareHouse"]),
    minusPercent() {
      let wew = 0;
      if (this.percentSale !== null) {
        wew = this.price - this.price * (this.percentSale / 100);
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.salePrice = parseInt(wew);
      return parseInt(wew);
    },
    uploadedPhoto() {
      let photoList = [];

      this.photoSelection.map(i =>
        photoList.push({ file: i, url: URL.createObjectURL(i) })
      );

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.photos = photoList;

      return photoList;
    },
    storageLocation() {
      let newLoc = [];

      this.getWareHouse.map(i => newLoc.push({ name: i.name, qty: 0 }));

      const arg = this.editStorageLocation ? newLoc : newLoc.slice(0, 1);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.inventory = arg;

      return arg;
    }
  },
  created() {},
  methods: {
    ...mapActions(["addProduct"]),
    submitProduct() {
      let inventory = [];

      this.inventory.map(i => {
        inventory.push({ name: i.name, qty: parseInt(i.qty) });
      });

      this.addProduct({
        id: uid(),
        name: this.name,
        price: parseInt(this.price),
        photo:
          this.photos.length !== 0
            ? this.photos
            : [
                {
                  file: "",
                  url: Photo
                }
              ],
        sale: this.sale,
        salePrice: parseInt(this.salePrice),
        sellingWeight: this.sellingWeight,
        unit: this.unit,
        inventory: inventory,
        description: this.description,
        usePercentage: this.usePercentage,
        percentSale: parseInt(this.percentSale),
        sku: this.sku,
        code: this.code,
        tracking: this.tracking,
        purchaseOutOfStock: this.purchaseOutOfStock
      });
    }
  }
};
</script>

<style></style>
