<template>
  <q-form @submit.prevent="submitProduct">
    <h6 class="q-my-none text-left">Info</h6>
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
          Barcode (ISBN,UPC,etc)
        </p>
        <q-input
          outlined
          v-model="code"
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-6 q-pa-sm text-left">
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

      <div class="col-xs-12 col-sm-6 q-pa-sm" v-if="process !== 'edit'">
        <div>
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

        <div class="row" v-for="(i, index) in storageLocation" :key="index">
          <div class="col-xs-12 col-sm-6">
            <div class="row justify-center items-center">
              <div class="col-xs-7 col-sm-6 q-pa-sm">{{ i.name }}</div>
              <div class="col-xs-5 col-sm-6 q-pa-sm">
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
        <q-img :src="i.url" />
      </div>
      <p>{{ photoSelection[0].size }}</p>
    </div>
    <div class="row justify-center q-mt-md q-gutter-sm">
      <q-btn color="blue-6" v-if="process === 'edit'">Save</q-btn>
      <q-btn color="green" v-else type="submit">Submit</q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { uid } from "quasar";
import Photo from "../../../assets/noImage.jpg";

export default {
  data() {
    return {
      process: "",
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
  props: ["type", "product"],
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
  created() {
    this.process = this.type;

    if (this.process === "edit") {
      const {
        id,
        name,
        price,
        photos,
        sale,
        salePrice,
        sellingWeight,
        unit,
        inventory,
        description,
        usePercentage,
        percentSale,
        sku,
        code,
        tracking,
        purchaseOutOfStock,
        editStorageLocation
      } = this.product[0];

      // eslint-disable-next-line no-console
      (this.id = id),
        (this.name = name),
        (this.price = price),
        (this.photos = photos),
        (this.sale = sale),
        (this.salePrice = salePrice),
        (this.sellingWeight = sellingWeight),
        (this.unit = unit),
        (this.inventory = inventory),
        (this.description = description),
        (this.usePercentage = usePercentage),
        (this.percentSale = percentSale),
        (this.sku = sku),
        (this.code = code),
        (this.tracking = tracking),
        (this.purchaseOutOfStock = purchaseOutOfStock),
        (this.editStorageLocation = editStorageLocation);
    }

    // eslint-disable-next-line no-console
  },
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
        // eslint-disable-next-line no-console
      }).then(res => {
        this.$q
          .dialog({
            title: "Confirm",
            message: `Are you sure you want to add <span class="text-green"> ${this.name}</span> as product?`,
            cancel: true,
            html: true,
            persistent: true
          })
          .onOk(() => {
            const route =
              this.$mq === "sm"
                ? `/admin/mproduct-view/${res}`
                : `/admin/product-view/${res}`;
            this.$router.push(route);
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      });
    }
  }
};
</script>

<style></style>
