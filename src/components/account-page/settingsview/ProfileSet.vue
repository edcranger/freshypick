<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <div class="row">
      <div class="col-6 q-px-sm">
        <q-input
          filled
          v-model="user.name"
          label="Username*"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="col-6 q-px-sm">
        <q-input
          filled
          v-model="user.phone"
          label="Phone"
          mask="(####) ### - ####"
          hint="Ex: (09##) ### - ####"
        />
      </div>
    </div>

    <q-input
      filled
      v-model="user.name"
      label="Your name *"
      hint="Name and surname"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      v-model="user.email"
      filled
      type="email"
      hint="Example: edison@gmail.com"
      label="Email"
    />

    <div class="text-right">
      <q-btn label="Save" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"])
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
