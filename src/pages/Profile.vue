<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
  >
    <q-page>
      <!-- <div class="row"> -->
      <Profile />
      <!-- <Address /> -->
      <!-- </div> -->
    </q-page>
  </transition>
</template>

<script>
import Profile from "../components/account-page/profileviews/Profile";
// import Address from "../components/account-page/profileviews/Address";

export default {
  created() {
    this.$consola.success("routerName", this.$router.path);
  },
  components: {
    Profile
    // Address
  }
};
</script>

<style></style>
