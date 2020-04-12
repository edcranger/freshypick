<template>
  <div class="col" v-if="react.items === 0">
    <!-- desktop view if no orders -->
    <div
      class="fit row wrap justify-center items-start content-start q-mt-xl"
      v-if="$mq !== 'sm'"
    >
      <div class="col-12">
        <p class="text-center text-h6 text-grey-8">{{ react.desc }}</p>
      </div>
      <div class="col-12 text-center">
        <q-btn outline style="color: green;" label="Continue Shopping" to="/" />
      </div>
    </div>
    <!-- mobile view if no orders -->
    <div class="absolute-center" v-if="$mq === 'sm'">
      <p class="text-center text-h6 text-grey-8">{{ react.desc }}</p>
      <q-btn outline style="color: green;" label="Continue Shopping" to="/" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["mobile", "itemLength", "desc"],
  created() {},
  computed: {
    react() {
      const data = {
        items: this.itemLength,
        desc: this.desc
      };
      return data;
    }
  }
};
</script>

<style></style>
