<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      v-model="name"
      label="Name"
      hint="Name and surname"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="dob"
      label="Birthday"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
    />

    <q-input
      filled
      v-model="relationship"
      label="Relationship"
      lazy-rules
      :rules="[val => (val && val.length > 0) || 'Please type something']"
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
      name: null,
      dob: null,
      relationship: null
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
