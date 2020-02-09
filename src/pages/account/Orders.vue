<template>
  <q-page class="row ">
    <div class="col">
      <div class=" bg-white q-py-sm">
        <div class="text-subtitle2">
          <q-icon name="fas fa-shopping-cart" class="q-ml-md q-mr-sm"></q-icon
          >Items
        </div>
      </div>

      <div class="col-12 bg-white q-my-sm">
        <div
          class="row shadow-1 q-pa-sm"
          v-for="item in ordered"
          :key="item.id"
        >
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
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered"])
  }
};
</script>

<style></style>
