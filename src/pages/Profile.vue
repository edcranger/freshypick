<template>
  <q-page>
    <div class="row wrap items-center q-pa-sm">
      <Profile />
      <Address />
    </div>
  </q-page>
</template>

<script>
import Profile from "../components/account-page/profileviews/Profile";
import Address from "../components/account-page/profileviews/Address";

export default {
  created() {
    this.$consola.success("routerName", this.$router.path);
  },
  components: {
    Profile,
    Address
  }
};
</script>

<style></style>
