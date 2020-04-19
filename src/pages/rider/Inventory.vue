<template>
  <q-page class="bg-white">
    <RiderTabs />
    <p class="text-subtitle2">This is the Inventory</p>
  </q-page>
</template>

<script>
import RiderTabs from "../../components/utils/RiderTabs";
export default {
  props: ["routes"],
  components: {
    RiderTabs
  }
};
</script>

<style></style>
