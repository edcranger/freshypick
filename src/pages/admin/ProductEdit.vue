<template>
  <q-page padding>
    <q-item-label header class="bg-white">
      <h5 class="q-my-none">Edit Product</h5>
    </q-item-label>
    <q-form @submit.prevent="saveEdit()" class="bg-white q-pa-md">
      <h6 class="q-my-none text-left">Info</h6>
      <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">Title</p>
      <q-input
        outlined
        v-model="formData[0].name"
        label="Product Name"
        :rules="[val => !!val || 'Field is required']"
      />

      <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
        Description
      </p>
      <q-editor
        v-model="formData[0].description"
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
            v-model="formData[0].price"
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
          <q-input outlined v-model="formData[0].sellingWeight" type="number">
            <template v-slot:append>{{ formData[0].unit }}</template>
          </q-input>
        </div>
        <div class="col-4 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Unit
          </p>
          <q-select
            outlined
            v-model="formData[0].unit"
            :options="['kg', 'gm']"
            label="Unit"
          />
        </div>
      </div>

      <div class="row items-center" v-if="formData[0].sale">
        <div class="col-4 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Sale Price
          </p>
          <q-input
            outlined
            v-model="minusPercent"
            type="number"
            :disable="!formData[0].sale || formData[0].usePercentage"
            v-if="formData[0].usePercentage"
          >
            <template v-slot:prepend>₱</template>
          </q-input>
          <q-input
            outlined
            v-model="formData[0].salePrice"
            type="number"
            :disable="!formData[0].sale"
            v-if="!formData[0].usePercentage"
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
            v-model="formData[0].percentSale"
            type="number"
            :disable="!formData[0].usePercentage"
          >
            <template v-slot:append>%</template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col-6 text-left q-pa-sm q-gutter-sm">
          <q-checkbox v-model="formData[0].sale" label="On Sale" />
          <q-checkbox
            v-model="formData[0].usePercentage"
            label="Sale Percentage"
            v-if="formData[0].sale"
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
            v-model="formData[0].sku"
            :rules="[val => !!val || 'Field is required']"
          />
        </div>
        <div class="col-6 q-pa-sm">
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7">
            Barcode (ISBN,UPC,GTIN,etc)
          </p>
          <q-input
            outlined
            v-model="formData[0].code"
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
            v-model="formData[0].tracking"
            label="Activate product tracking"
            class="q-ml-none"
          />
          <p class="text-left q-mt-md q-mb-none text-subtitle text-grey-7"></p>
          <q-checkbox
            v-model="formData[0].purchaseOutOfStock"
            label="Allow customer to order when out of stock"
            class="q-ml-none"
          />
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
      </div>
      <div class="row justify-center q-mt-md q-gutter-sm">
        <q-btn color="blue-6" type="submit">Save</q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { uid } from "quasar";
export default {
  data() {
    return {
      photoSelection: [],
      formData: null
    };
  },
  props: [],
  computed: {
    ...mapGetters(["products", "userProfile"]),
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

      if (this.formData[0].dummy) {
        this.formData[0].photo.map(i =>
          photoList.push({ file: "", url: i.url })
        );
      } else {
        this.photoSelection.map(i =>
          photoList.push({ file: i, url: URL.createObjectURL(i) })
        );
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.photos = photoList;

      return photoList;
    }
  },
  created() {
    this.formData = this.products.filter(
      i => i.id === this.$route.params.productId
    );

    if (!this.formData[0].dummy) {
      const list = this.formData[0].photo.map(i => i.file);

      this.photoSelection = list;
    }

    this.$consola.info("editItem", this.formData);
  },
  methods: {
    ...mapActions(["saveEditedProduct", "addToLog"]),

    saveEdit() {
      // eslint-disable-next-line no-console

      this.saveEditedProduct({
        ...this.formData[0]
        // eslint-disable-next-line no-console
      }).then(() => {
        this.$q.notify({
          message: `This item has been edited`,
          color: "purple"
        });

        const logData = {
          id: uid(),
          type: "Update",
          productId: this.formData[0].id,
          message: `This product was edited by ${this.userProfile.name}`,
          date: new Date()
        };

        this.addToLog(logData);
      });
    }
  },
  watch: {}
};
</script>

<style></style>
