<template>
  <q-page>
    <div class="row wrap items-center  q-pa-sm">
      <Profile />
      <Address />

      <!-- <Notification /> -->
    </div>
  </q-page>
</template>

<script>
import Profile from "../components/account-page/profileviews/Profile";
import Address from "../components/account-page/profileviews/Address";
// import Notification from "../components/account-page/profileviews/Notification";
export default {
  components: {
    Profile,
    Address
    // Notification
  }
};
</script>

<style></style>
