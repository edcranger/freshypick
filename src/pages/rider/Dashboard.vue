<template>
  <q-page class="bg-white">
    <RiderTabs />
    <div class="row">
      <div class="menu col-6 text-white" @click="toMyOrder(1)">
        <div
          class="row items-center content-center q-ma-sm bg-blue q-pa-lg shadow-1 rounded-borders"
        >
          <div class="col-xs-12 text-center">
            <q-avatar
              size="100"
              font-size="30px"
              color="white"
              text-color="orange"
              icon="directions_bike"
            >
              <q-badge
                color="red"
                floating
                class="textSize q-pa-xs shadow-1"
                :label="badgeData.inProgress"
                v-if="badgeData.inProgress > 0"
              />
            </q-avatar>
            <h6 class="text-h6 q-mt-sm q-ma-none q-mb-sm">In Progress</h6>
          </div>
        </div>
      </div>

      <div class="menu col-6 text-white" @click="toMyOrder(2)">
        <div
          class="row items-center content-center q-ma-sm bg-orange q-pa-lg shadow-1 rounded-borders"
        >
          <div class="col-xs-12 text-center">
            <q-avatar
              size="100"
              font-size="30px"
              color="white"
              text-color="orange"
              icon="transfer_within_a_station
"
            >
              <q-badge
                color="red"
                floating
                class="textSize q-pa-xs shadow-1"
                :label="badgeData.pending"
                v-if="badgeData.pending > 0"
              />
            </q-avatar>
            <h6 class="text-h6 q-mt-xs q-ma-none q-mb-sm">Pending</h6>
          </div>
        </div>
      </div>

      <div class="menu col-6 text-white" @click="toMyOrder(3)">
        <div
          class="row items-center content-center q-ma-sm bg-green q-pa-lg shadow-1 rounded-borders"
        >
          <div class="col-xs-12 text-center q-mt-sm">
            <q-avatar
              size="100"
              font-size="30px"
              color="white"
              text-color="orange"
              icon="check_box"
            >
              <q-badge
                color="red"
                floating
                class="textSize q-pa-xs shadow-1"
                :label="badgeData.done"
                v-if="badgeData.done > 0"
              />
            </q-avatar>
            <h6 class="text-h6 q-mt-xs q-ma-none q-mb-sm">Done</h6>
          </div>
        </div>
      </div>

      <div class="menu col-6 text-white">
        <div
          class="row items-center content-center q-ma-sm bg-red q-pa-lg shadow-1 rounded-borders"
        >
          <div class="col-xs-12 text-center q-mt-sm">
            <q-avatar
              size="100"
              font-size="30px"
              color="white"
              text-color="orange"
              icon="close"
            >
              <q-badge color="orange" floating class="textSize q-pa-xs"
                >0</q-badge
              >
            </q-avatar>
            <h6 class="text-h6 q-mt-xs q-ma-none q-mb-sm">Canceled</h6>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RiderTabs from "../../components/utils/RiderTabs";
export default {
  data() {
    return {
      riderId: "fos753"
    };
  },
  props: ["routes"],
  computed: {
    ...mapGetters(["getRiders"]),
    badgeData() {
      const data = this.getRiders.find(i => i.id === this.riderId);

      return {
        inProgress: data.itemsInHand.filter(
          i => i.riderStatus === "in-progress"
        ).length,
        pending: data.itemsInHand.filter(i => i.riderStatus === "pending")
          .length,
        done: data.itemsInHand.filter(i => i.riderStatus === "done").length
      };
    }
  },
  methods: {
    ...mapActions([]),
    toMyOrder(i) {
      if (i === 1) {
        return this.$router.push({
          name: "myOrders",
          params: { tabInfo: "in-progress" }
        });
      }

      if (i === 2) {
        return this.$router.push({
          name: "myOrders",
          params: { tabInfo: "pending" }
        });
      }

      if (i === 3) {
        return this.$router.push({
          name: "myOrders",
          params: { tabInfo: "done" }
        });
      }
    }
  },
  created() {},
  components: {
    RiderTabs
  }
};
</script>

<style>
.textSize {
  font-size: 20px;
  margin-top: -7px;
  margin-right: -3px;
}

.menu {
  cursor: pointer;
}
</style>
