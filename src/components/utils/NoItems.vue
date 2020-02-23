<template>
  <div class="col " v-if="react.items === 0">
    <!-- desktop view if no orders -->
    <div
      class="fit row wrap justify-center items-start content-start q-mt-xl"
      v-if="!react.mobile"
    >
      <div class="col-12">
        <p class="text-center text-subtitle1">{{ react.desc }}</p>
      </div>
      <div class="col-12 text-center">
        <q-btn outline style="color: green;" label="Continue Shopping" to="/" />
      </div>
    </div>
    <!-- mobile view if no orders -->
    <div class="absolute-center" v-if="react.mobile">
      <p class="text-center text-subtitle1">{{ react.desc }}</p>
      <q-btn outline style="color: green;" label="Continue Shopping" to="/" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["mobile", "itemLength", "desc"],
  created() {
    // eslint-disable-next-line no-console
    console.log(this.react.items);
  },
  computed: {
    react() {
      const data = {
        mobile: this.mobile,
        items: this.itemLength,
        desc: this.desc
      };
      return data;
    }
  }
};
</script>

<style></style>
