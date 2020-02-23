<template>
  <div class="col-xs-12 q-px-sm">
    <div class="row wrap content-center bg-white q-px-md shadow-1">
      <div class="col-xs-12 col-sm-6 q-mt-lg">
        <div class="row">
          <div class=" pNotGrow col-3 ">
            <q-avatar
              size="80px"
              font-size="52px"
              color="teal"
              text-color="white"
              icon="fas fa-user-circle"
            />
          </div>
          <div class="col q-mt-sm ">
            <span
              :class="
                mediaQuery === 'sm'
                  ? 'ml-sm text-subtitle1 text-weight-medium'
                  : 'ml-md text-subtitle2  text-weight-medium'
              "
            >
              Edison Ocampo</span
            >
            <div class="">
              <p>My Cart: {{ cart.length }} | My Order: {{ ordered.length }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 q-mt-lg">
        <p class="text-subtitle2 q-mb-sm q-mt-sm">Personal Profile</p>
        <p>
          <q-icon name="mail_outline" size="xs" class="text-green" />:
          edisonocampo.eo@gmail.com
        </p>
        <p>
          <q-icon name="local_phone" size="xs" class="text-green" />:
          +639156870548
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.$consola.success("mq", this.$mq);
  },
  computed: {
    ...mapGetters(["cart", "ordered"]),
    mediaQuery() {
      return this.$mq;
    }
  }
};
</script>

<style>
.pNotGrow {
  flex: 0 0 100px;
}
</style>
