<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      v-model="userAddress.addressTitle"
      label="Address title"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="userAddress.detailedAddress"
      label="Detailed Address"
      hint="House/Unit/Flr #, Bldg Name, Blk or Lot #"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <div class="row">
      <div class="col-6 q-px-sm">
        <q-select
          filled
          v-model="userAddress.region"
          :options="regionList"
          label="Region"
          @input="showProvinces()"
        />
      </div>

      <div class="col-6 q-px-sm">
        <q-select
          filled
          v-model="userAddress.province"
          :options="provinceList"
          label="Province"
          @input="showCityMun()"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6 q-px-sm">
        <q-select
          filled
          v-model="userAddress.cityMun"
          :options="cityMunList"
          label="City/Municipal"
          @input="showBrgy()"
        />
      </div>
      <div class="col-6 q-px-sm">
        <q-select
          filled
          v-model="userAddress.barangay"
          :options="brgyList"
          label="Barangay"
          @input="inputZipcode()"
        />
      </div>
      <div class="col-6 q-px-sm q-mt-md">
        <div v-if="locations.zipcode.length > 1">
          Suggestions:
          <q-chip
            color="red"
            text-color="white"
            v-for="(i, index) in locations.zipcode"
            :key="index"
            >{{ i }}</q-chip
          >
        </div>

        <q-input filled v-model="userAddress.zipcode" label="Zipcode" />
      </div>
    </div>

    <q-toggle
      v-model="userAddress.shippingDefault"
      color="green"
      label="Set as default address"
    />

    <div class="row justify-end">
      <q-btn label="Cancel" color="red" v-close-popup class="q-mr-sm" />
      <q-btn label="Save" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { error, info } from "consola";
import { mapGetters, mapActions } from "vuex";
import { philData, address } from "addresspinas";
export default {
  data() {
    return {
      phone: null,
      email: null,
      userAddress: {
        addressTitle: null,
        region: null,
        province: null,
        cityMun: null,
        barangay: null,
        zipcode: null,
        detailedAddress: null,
        shippingDefault: false
      },
      locations: {
        regions: [],
        provinces: [],
        cityMun: [],
        brgy: [],
        zipcode: []
      }
    };
  },
  props: {
    addressData: {
      type: Object
    },
    type: {
      type: String
    }
  },
  created() {
    this.locations.regions = philData.allRegions.regions;

    if (this.type === "edit") {
      this.userAddress = this.addressData;

      const regCode = philData.allRegions.regions.find(
        e => e.name === this.addressData.region
      ).reg_code;

      const provCode = philData.allProvinces.provinces.find(
        e => e.name === this.addressData.province
      ).prov_code;

      const cityCode = philData.allCitiesAndMunicipal.citiesAndMunicipals.find(
        e => e.name === this.addressData.cityMun
      ).mun_code;

      this.locations.provinces = address.getProvinceOfRegion(regCode).provinces;

      this.locations.cityMun = address.getCityMunOfProvince(
        provCode
      ).cityAndMun;

      this.locations.brgy = address.getBarangaysOfCityMun(cityCode).barangays;
    }
  },
  computed: {
    ...mapGetters(["userAdd"]),
    regionList() {
      return this.locations.regions.map(reg => {
        return { label: reg.name, value: reg.reg_code };
      });
    },
    provinceList() {
      return this.locations.provinces.map(prov => {
        return { label: prov.name, value: prov.prov_code };
      });
    },
    cityMunList() {
      return this.locations.cityMun.map(ctymun => {
        return { label: ctymun.name, value: ctymun.mun_code };
      });
    },
    brgyList() {
      return this.locations.brgy.map(brgy => {
        return { label: brgy.name, value: brgy.mun_code };
      });
    }
  },
  methods: {
    ...mapActions(["shippingAdd", "updateShippingAdd"]),
    showProvinces() {
      this.locations.provinces = this.userAddress.province = this.locations.cityMun = this.userAddress.cityMun = this.locations.brgy = this.userAddress.brgy = [];

      this.locations.provinces = address.getProvinceOfRegion(
        this.userAddress.region.value
      ).provinces;
    },
    showCityMun() {
      this.locations.cityMun = this.userAddress.cityMun = this.locations.brgy = this.userAddress.brgy = [];
      this.locations.cityMun = address.getCityMunOfProvince(
        this.userAddress.province.value
      ).cityAndMun;
      // this.$consola.success("Province", this.userAddress.province.value);
    },
    showBrgy() {
      this.locations.brgy = this.userAddress.brgy = [];
      this.locations.brgy = address.getBarangaysOfCityMun(
        this.userAddress.cityMun.value
      ).barangays;
    },
    inputZipcode() {
      this.userAddress.zipcode = null;
      const { label, value } = this.userAddress.barangay;

      this.locations.zipcode = address.getZipcode({
        name: label,
        mun_code: value
      });

      if (this.locations.zipcode.length === 1) {
        this.userAddress.zipcode = this.locations.zipcode[0];
      }
    },
    onSubmit() {
      const {
        addressTitle,
        detailedAddress,
        region,
        province,
        cityMun,
        barangay,
        zipcode,
        shippingDefault
      } = this.userAddress;

      const addresses = {
        addressTitle: addressTitle,
        detailedAddress: detailedAddress,
        region: region.label,
        province: province.label,
        cityMun: cityMun.label,
        barangay: barangay.label,
        zipcode: zipcode,
        shippingDefault
      };

      if (this.type === "edit") {
        const payload = { id: this.addressData._id, data: addresses };

        return this.updateShippingAdd(payload)
          .then(res => info(res))
          .catch(err => error(err));
      }

      this.shippingAdd(addresses)
        .then(res => info(res))
        .catch(err => error(err));
    },

    onReset() {
      this.name = null;
      this.age = null;
      this.accept = false;
    }
  }
};
</script>

<style></style>
