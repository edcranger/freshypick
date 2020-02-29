<template>
  <div>
    <!-- <div
      class="row shadow-1 q-pa-sm"
      v-for="item in ordered"
      :key="item.id"
      to="/"
    >-->
    <div class="col-xs-12 col-sm-4 text-grey-7 q-mb-sm">
      <div class="row">
        <div class="col-6">
          <q-icon
            name="fas fa-check-double"
            color="green"
            v-if="data.receivedDate"
          />
          {{ data.id }}
        </div>
        <div class="col-6 text-right text-green" v-if="data.receivedDate">
          Completed
        </div>
      </div>
    </div>

    <div class="col-xs-12 col-sm-4">
      <div class="row" v-for="i in data.item" :key="i.purchaseid">
        <div class="col" v-if="!i.cancelled">
          <q-img
            :src="i.photo"
            spinner-color="white"
            style="height: 30px; max-width: 30px"
          />
          x {{ i.qty }} {{ i.name }}
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-sm-4">
      <div class="row q-mt-sm">
        <div class="col-6">
          <p class="q-ml-sm" v-if="!item.received">Status: Delivering</p>
        </div>
        <div class="col-6 text-right">
          <p class="text-green">
            <strong>
              <span class="q-mr-xs lt-sm">Total:</span>
              ₱{{ calCulateItem(item.id) }}
            </strong>
          </p>
        </div>
      </div>
    </div>
    <div class="col-12 text-right">
      <slot name="slot1"></slot>
    </div>
    <slot name="slot2"></slot>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["data"],
  created() {
    this.$consola.success("panget", this.ordered);
  },
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered"])
  }
  //   methods: {
  //     calCulateItem(id) {
  //       const pow = this.ordered.filter(item => item.id === id);

  //       const notCancelled = pow.map(i => {
  //         return i.item.filter(x => {
  //           return !x.cancelled;
  //         });
  //       });

  //       const totalPrice = notCancelled.map(i =>
  //         i.reduce((currentTotal, x) => x.price * x.qty + currentTotal, 0)
  //       );

  //       return parseInt(totalPrice);
  //     }
  //   }
};
</script>

<style></style>
