<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      v-model="userAddress.name"
      label="Address name"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="userAddress.detailedAdd"
      label="Detailed Address"
      hint="House/Unit/Flr #, Bldg Name, Blk or Lot #"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="userAddress.detailedAdd"
      label="Detailed Address"
      hint="House/Unit/Flr #, Bldg Name, Blk or Lot #"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-select
      filled
      v-model="userAddress.city"
      :options="userAddress.cityOption"
      label="City/Municipality"
    />

    <q-input
      filled
      v-model="userAddress.brgy"
      label="Brgy"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="userAddress.zipcode"
      label="Zipcode"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-toggle
      v-model="userAddress.default"
      color="green"
      label="Set as default address"
    />

    <div>
      <q-btn label="Save" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { cities } from "philippines";
export default {
  data() {
    return {
      phone: null,
      email: null,
      userAddress: {
        name: null,
        region: "National Capital Region",
        province: "Metro Manila",
        city: null,
        cityOption: [],
        brgy: null,
        zipcode: null,
        detailedAdd: null,
        default: false
      }
    };
  },
  created() {
    const mmCities = cities.filter(i => {
      return i.province === "MM";
    });

    mmCities.map(i => {
      this.userAddress.cityOption.push(i.name);
    });
  },
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
      }
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
