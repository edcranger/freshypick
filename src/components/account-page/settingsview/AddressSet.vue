<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      v-model="userAdd.name"
      label="Address name"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="userAdd.detailedAdd"
      label="Detailed Address"
      hint="House/Unit/Flr #, Bldg Name, Blk or Lot #"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <div class="row">
      <div class="col-6 q-px-sm">
        <q-input
          filled
          v-model="userAdd.brgy"
          label="Brgy"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="col-6 q-px-sm">
        <q-select
          filled
          v-model="userAdd.city"
          :options="userAddress.cityOption"
          label="City/Municipality"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6 q-px-sm">
        <q-input
          filled
          v-model="userAdd.region"
          label="Region"
          hint="House/Unit/Flr #, Bldg Name, Blk or Lot #"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="col-6 q-px-sm">
        <q-input
          filled
          v-model="userAdd.zipcode"
          label="Zipcode"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
      </div>
    </div>

    <q-toggle
      v-model="userAdd.default"
      color="green"
      label="Set as default address"
    />

    <div>
      <q-btn label="Save" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["userAdd"])
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
