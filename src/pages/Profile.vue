<template>
  <q-page>
    <div class="row wrap items-center  q-pa-sm">
      <Profile />
      <Address />
    </div>
  </q-page>
</template>

<script>
import Profile from "../components/account-page/profileviews/Profile";
import Address from "../components/account-page/profileviews/Address";

export default {
  components: {
    Profile,
    Address
  }
};
</script>

<style></style>
