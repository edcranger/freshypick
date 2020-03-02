<template>
  <div class="row q-pa-sm justify-center" v-if="$mq !== 'sm'">
    <WebMenu class="col-3" :menu1="web1" :menu2="web2" />

    <q-page-container class="col q-mx-sm" style="min-height: auto">
      <router-view />
    </q-page-container>
  </div>
</template>

<script>
import WebMenu from "../account-page/WebMenu";
export default {
  props: ["web1", "web2"],
  components: {
    WebMenu
  }
};
</script>

<style></style>
