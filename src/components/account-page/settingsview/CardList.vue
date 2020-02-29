<template>
  <q-list class="col-xs-12 q-pa-sm">
    <q-item
      clickable
      @click="selectThis('Unionbank')"
      class="row wrap shadow-1 bg-white q-pa-sm"
    >
      <div class="col-xs-12 q-pa-sm">
        <div class="row">
          <div class="col-12 q-my-none">
            <span class="text-green text-caption q-my-none">DEFAULT</span>
          </div>
          <div class="col-12">
            <p class="text-subtitle1 q-my-none">
              Union Bank of the Philippines
            </p>
          </div>
        </div>

        <p class="q-my-none">*** **** 1030</p>
        <p class="text-caption q-my-none">Edison Ocampo</p>
      </div>
    </q-item>
  </q-list>
</template>

<script>
export default {
  methods: {
    selectThis(type) {
      this.paymentType = type;
      this.$emit("clicked", type);
    }
  }
};
</script>

<style></style>
