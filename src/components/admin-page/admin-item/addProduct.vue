<template>
  <q-form @submit.prevent="submitProduct">
    <h6 class="q-my-none text-left">Info</h6>
    <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">Title</p>
    <q-input
      outlined
      v-model="formData.name"
      label="Product Name"
      :rules="[val => !!val || 'Field is required']"
    />

    <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
      Description
    </p>
    <q-editor
      v-model="formData.description"
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
          v-model="formData.price"
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
        <q-input outlined v-model="formData.sellingWeight" type="number">
          <template v-slot:append>{{ formData.unit }}</template>
        </q-input>
      </div>
      <div class="col-4 q-pa-sm">
        <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
          Unit
        </p>
        <q-select
          outlined
          v-model="formData.unit"
          :options="['kg', 'gm']"
          label="Unit"
        />
      </div>
    </div>

    <div class="row items-center" v-if="formData.sale">
      <div class="col-4 q-pa-sm">
        <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
          Sale Price
        </p>
        <q-input
          outlined
          v-model="minusPercent"
          type="number"
          :disable="!formData.sale || formData.usePercentage"
          v-if="formData.usePercentage"
        >
          <template v-slot:prepend>₱</template>
        </q-input>
        <q-input
          outlined
          v-model="formData.salePrice"
          type="number"
          :disable="!formData.sale"
          v-if="!formData.usePercentage"
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
          v-model="formData.percentSale"
          type="number"
          :disable="!formData.usePercentage"
        >
          <template v-slot:append>%</template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-6 text-left q-pa-sm q-gutter-sm">
        <q-checkbox v-model="formData.sale" label="On Sale" />
        <q-checkbox
          v-model="formData.usePercentage"
          label="Sale Percentage"
          v-if="formData.sale"
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
          v-model="formData.sku"
          :rules="[val => !!val || 'Field is required']"
        />
      </div>
      <div class="col-6 q-pa-sm">
        <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
          Barcode (ISBN,UPC,GTIN,etc)
        </p>
        <q-input
          outlined
          v-model="formData.code"
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
          v-model="formData.tracking"
          label="Activate product tracking"
          class="q-ml-none"
        />
        <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7"></p>
        <q-checkbox
          v-model="formData.purchaseOutOfStock"
          label="Allow customer to order when out of stock"
          class="q-ml-none"
        />
      </div>

      <div class="col-xs-12 col-sm-6 q-pa-sm">
        <div>
          <q-btn
            dense
            flat
            color="blue"
            @click="
              formData.editStorageLocation = !formData.editStorageLocation
            "
          >
            {{
              formData.editStorageLocation ? "Cancel" : "Edit Storage Location"
            }}
          </q-btn>
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
      <q-btn color="blue-6">Save</q-btn>
      <q-btn color="green" type="submit">Submit</q-btn>
    </div>
  </q-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { uid } from "quasar";
// import Photo from "../../../assets/noImage.jpg";

export default {
  data() {
    return {
      photoSelection: [],
      formData: {
        name: null,
        price: null,
        photo: [],
        sale: false,
        salePrice: 0,
        dummy: false,
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
      }
    };
  },
  props: [],
  computed: {
    ...mapGetters(["getWareHouse"]),
    minusPercent() {
      let wew = 0;
      if (this.formData.percentSale !== null) {
        wew =
          this.formData.price -
          this.formData.price * (this.formData.percentSale / 100);
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
      this.formData.photo = photoList;

      return photoList;
    },
    storageLocation() {
      let newLoc = [];

      this.getWareHouse.map(i => newLoc.push({ name: i.name, qty: 0 }));

      const arg = this.formData.editStorageLocation
        ? newLoc
        : newLoc.slice(0, 1);
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.formData.inventory = arg;

      return arg;
    }
  },
  created() {
    // eslint-disable-next-line no-console
  },
  methods: {
    ...mapActions(["addProduct"]),
    submitProduct() {
      let inventory = [];

      this.formData.inventory.map(i => {
        inventory.push({ name: i.name, qty: parseInt(i.qty) });
      });

      this.addProduct({ id: uid(), ...this.formData }).then(res => {
        this.$consola.info("submit response", res);
        this.$q
          .dialog({
            title: "Confirm",
            message: `Are you sure you want to add <span class="text-green"> ${this.formData.name}</span> as product?`,
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
