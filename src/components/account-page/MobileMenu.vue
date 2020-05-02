<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInLeft ' : 'animated fadeIn'
    "
  >
    <div
      class="fit row wrap justify-center items-center content-center bg-light-green-3"
    >
      <div class="col-12 q-mt-lg">
        <div class="row items-center content-center justify-center">
          <q-avatar
            size="80px"
            font-size="52px"
            color="teal"
            text-color="white"
          >
            <q-img :src="userProfile.photo" />
          </q-avatar>
        </div>
        <div
          class="row items-center content-center justify-center text-grey-8 text-bolder"
        >
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
              <p class="text-grey-8 text-bold text-caption">
                My Cart: {{ cart.length }} | My Order: {{ filterBadge.length }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <q-list bordered class="bg-white">
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
              >
                <q-badge
                  v-if="
                    filterBadge.length !== 0 ? item.label : (item.label = false)
                  "
                  color="red"
                  floating
                  >{{ filterBadge.length }}</q-badge
                >
              </q-avatar>
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
    ...mapGetters(["cart", "allOrders", "receivedItems", "userProfile"]),
    filterBadge() {
      return this.allOrders;
    }
  }
};
</script>

<style></style>
