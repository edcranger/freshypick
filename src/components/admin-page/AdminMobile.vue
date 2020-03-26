<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInLeft ' : 'animated fadeIn'
    "
  >
    <div class="fit row wrap justify-center">
      <div class="col-12 q-mt-lg">
        <div class="row items-center content-center justify-center">
          <q-avatar
            size="80px"
            font-size="52px"
            color="red"
            text-color="white"
            icon="fas fa-user-lock"
          />
        </div>
        <div class="row items-center content-center justify-center">
          <div class="q-mt-sm text-center">
            <span
              :class="
                $mq === 'sm'
                  ? 'ml-sm text-subtitle1 text-weight-medium'
                  : 'ml-md text-subtitle2  text-weight-medium'
              "
              >Edison Ocampo</span
            >
            <div>
              <p class="text-grey-9">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <q-list bordered class="bg-white">
          <div class="row justify-center">
            <div class="col-4 bg-red-12 text-center q-pa-sm">
              <q-btn
                color="red-12"
                class="full-width"
                stack
                flat
                text-color="white"
                :label="AdminBadge[0]"
                >New order</q-btn
              >
            </div>
            <div class="col-4 bg-amber-5 text-center q-pa-sm">
              <q-btn
                color="red-12"
                class="full-width"
                stack
                flat
                text-color="white"
                :label="AdminBadge[1]"
                >for Packing</q-btn
              >
            </div>
            <div class="col-4 bg-light-green-6 text-center q-pa-sm">
              <q-btn
                color="red-12"
                class="full-width"
                stack
                flat
                text-color="white"
                :label="AdminBadge[2]"
                >For Delivery</q-btn
              >
            </div>
          </div>
          <q-item
            clickable
            v-ripple
            v-for="item in mobile1"
            :key="item.id"
            :to="item.route"
          >
            <q-item-section avatar>
              <q-avatar
                rounded
                :color="item.color"
                size="50px"
                text-color="white"
                :icon="item.icon"
              />
            </q-item-section>

            <q-item-section>{{ item.btnName }}</q-item-section>

            <q-item-section side>
              <q-icon name="fas fa-angle-right" color="grey-5" />
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            v-for="item in mobile2"
            :key="item.id"
            :to="item.route"
          >
            <q-item-section avatar>
              <q-avatar
                rounded
                size="50px"
                :color="item.color"
                text-color="white"
                :icon="item.icon"
              />
            </q-item-section>

            <q-item-section>{{ item.btnName }}</q-item-section>

            <q-item-section side>
              <q-icon name="fas fa-angle-right" color="grey-5" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["mobile1", "mobile2"],
  computed: {
    ...mapGetters(["cart", "ordered", "receivedItems"]),
    filterBadge() {
      return this.ordered.filter(i => i.stage === "Delivering");
    },
    AdminBadge() {
      const newOrder = this.ordered.filter(i => i.stage === "Processing");
      const forPacking = this.ordered.filter(i => i.stage === "Packing");
      const forDelivery = this.ordered.filter(i => i.stage === "Delivering");

      return [newOrder.length, forPacking.length, forDelivery.length];
    }
  }
};
</script>

<style></style>
