<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      v-model="username"
      label="Username*"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />
    <q-input
      filled
      v-model="name"
      label="Your name *"
      hint="Name and surname"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="phone"
      label="Phone"
      mask="(####) ### - ####"
      hint="Use: (09##) ### - ####"
    />

    <q-input
      v-model="email"
      filled
      type="email"
      hint="Example: edison@gmail.com"
      label="Email"
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
      username: null,
      name: null,
      email: null,
      phone: null
    };
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
