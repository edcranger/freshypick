<template>
  <q-page padding>
    <div class=" absolute-center" v-if="cancelledItems.length === 0">
      <p class="text-center text-subtitle1">No Cancelled Orders</p>
      <q-btn outline style="color: green;" label="Continue Shopping" to="/" />
    </div>
    <div class="col-12 bg-white q-my-sm" v-if="cancelledItems.length !== 0">
      <div
        class="row shadow-1 q-pa-sm"
        v-for="item in cancelledItems"
        :key="item.id"
      >
        <div class="col-12">
          <strong>{{ showDate(item.datecancelled) }}</strong>
        </div>
        <div class="col-12">
          <strong class="text-blue">Order #{{ item.purchaseId }}</strong>
        </div>
        <div class="col-md-3 col-4">
          <q-img
            :src="item.photo"
            spinner-color="white"
            style="height: 100px; max-width: 100px"
          />
        </div>
        <div class="col">
          <div class="q-mt-lg">
            <strong>{{ item.name }}</strong>
          </div>
          <div class="q-ma-none">₱{{ item.price }}/kg</div>

          <div
            class="fit row wrap justify-end items-start content-start q-mt-md q-mb-none"
          >
            <div class="col">
              <p>Qty: {{ item.qty }}</p>
              <q-btn color="red" disable label="Cancelled" />
            </div>
            <div class="col text-right">
              <div>
                <q-btn flat round dense icon="delete" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.$consola.info("cancelledArray", this.cancelledItems);
  },
  computed: {
    ...mapGetters(["cart", "cancelledItems"])
  },
  methods: {
    ...mapActions([""]),
    showDate(date) {
      return moment(date).format("L");
    }
  }
};
</script>

<style></style>
