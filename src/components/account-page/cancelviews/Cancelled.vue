<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
  >
    <q-page class="q-pa-sm">
      <NoItems :desc="desc" :itemLength="cancelledItems.length" />
      <div class="col-12" v-if="cancelledItems.length !== 0">
        <div class="q-py-sm">
          <div class="text-subtitle2">
            <q-icon name="remove_shopping_cart" class="q-ml-md q-mr-sm"></q-icon
            >Canceled
          </div>
        </div>

        <div
          class="row shadow-1 q-pa-sm q-my-sm bg-white"
          v-for="item in cancelledItems"
          :key="item.id"
        >
          <div class="col-12">
            <strong class="text-grey-6">Order #{{ item.purchaseId }}</strong>
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
              </div>
              <div class="col text-right">
                <div>
                  <q-btn flat round dense icon="delete" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 text-left q-mt-sm">
            <p class="text-caption text-grey-6 q-ma-none">
              <q-badge color="red">Canceled</q-badge>
              on {{ datefxn(item.datecancelled) }}
            </p>
          </div>
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { date } from "quasar";
import NoItems from "../../utils/NoItems";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      desc: "No Canceled Orders"
    };
  },
  created() {},
  computed: {
    ...mapGetters(["cart", "cancelledItems"])
  },
  methods: {
    ...mapActions([""]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY");
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
