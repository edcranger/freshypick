<template>
  <div class="row q-pa-sm justify-center" v-if="$mq !== 'sm'">
    <AdminWeb class="col-3" :menu1="web1" :menu2="web2" />

    <q-page-container class="col q-mx-sm" style="min-height: auto">
      <router-view />
    </q-page-container>
  </div>
</template>

<script>
import AdminWeb from "../admin-page/AdminWeb";
export default {
  props: ["web1", "web2"],
  components: {
    AdminWeb
  }
};
</script>

<style></style>
