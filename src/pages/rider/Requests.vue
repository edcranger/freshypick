<template>
  <q-page class="bg-white">
    <!-- <RiderTabs /> -->

    <q-list bordered>
      <div class="bg-white q-pa-sm">
        <p class="text-subtitle2 text-grey-9 q-ma-none">New Requests</p>
      </div>
      <div class="bg-white q-pa-sm" v-if="getIncomingRequest.length === 0">
        <h5 class="text-h6 text-center text-grey-9 q-ma-none">No Request</h5>
      </div>
      <q-item
        v-else
        class="q-pa-md"
        clickable
        v-for="i in getIncomingRequest"
        :key="i.id"
      >
        <q-item-section avatar>
          <q-icon name="fas fa-location-arrow" color="red" />
        </q-item-section>
        <q-item-section>
          <div class="row items-center content-center">
            <div class="col-1">
              <q-icon color="grey" name="account_circle" />
            </div>
            <div class="col-11 text-bold">Edison Ocampo</div>
            <div class="col-1">
              <q-icon color="grey" name="location_on" />
            </div>
            <div class="col-11 text-caption">
              {{ i.location.brgy }}
              {{ i.location.city }}
            </div>
            <div class="col-1">
              <q-icon color="grey" name="fas fa-box" />
            </div>
            <div class="col-11 text-caption">{{ i.id }}</div>
          </div>
        </q-item-section>
        <q-item-section side>
          <div class="text-center" v-if="i.confirmedByRider">
            <p class="text-caption q-ma-none" v-html="'Accepted on'" />
            <p
              class="text-caption q-ma-none"
              v-html="datefxn(i.confirmedByRider)"
            />
          </div>

          <q-btn
            v-if="!i.confirmedByRider"
            size="sm"
            color="green"
            class="q-my-xs"
            @click="acceptDelivery(i.id)"
            >Accept</q-btn
          >

          <q-btn
            v-if="!i.confirmedByRider"
            size="sm"
            color="red"
            class="q-my-xs"
            @click="declineDelivery(i.id)"
            >Decline</q-btn
          >
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
// import RiderTabs from "../../components/utils/RiderTabs";
export default {
  data() {
    return {
      id: "fos753"
    };
  },
  props: ["routes"],
  computed: {
    ...mapGetters(["ordered"]),
    getIncomingRequest() {
      return this.ordered.filter(i => i.rider === this.id);
    }
  },
  methods: {
    ...mapActions(["deliveryRequest"]),
    acceptDelivery(id) {
      this.deliveryRequest(id);
    },
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM DD");
    }
  },
  created() {},
  components: {
    // RiderTabs
  }
};
</script>

<style></style>
