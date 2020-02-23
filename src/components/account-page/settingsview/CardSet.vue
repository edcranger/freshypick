<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      v-model="accName"
      label="Account Name"
      hint="Full Name in the Bank Account"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="cardNumber"
      label="Card"
      mask="#### #### #### ####"
      fill-mask="#"
      hint="Enter the long number of your card"
    />

    <q-input
      filled
      v-model="cvv"
      label="CVV"
      mask="###/##"
      fill-mask
      hint="You can see it at the back of your card"
    />

    <q-select
      filled
      v-model="bankName"
      :options="bankOptions"
      label="Bank Name"
    />

    <div>
      <q-btn label="Save" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
export default {
  data() {
    return {
      accName: null,
      cardNumber: null,
      bankName: null,
      cvv: null,
      bankOptions: [
        "BANCO DE OCAMPO",
        "BPI",
        "UNIONBANK",
        "BDO",
        "SECURITY",
        "METROBANK",
        "BPI",
        "HSBC",
        "CITIBANK",
        "RCBC"
      ]
    };
  },
  created() {},
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
