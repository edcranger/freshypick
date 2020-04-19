<template>
  <div class="row bg-white shadow-1">
    <div class="col-12 bg-grey-1 q-pa-md">
      <div class="row items-center">
        <div class="notShrik col-3 text-center">
          <q-avatar size="70px">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </div>
        <div class="col">
          <h5 class="text-h6 text-grey-9 q-ma-none">{{ getRider.name }}</h5>
          <p class="text-overline text-grey-9 q-my-none">
            In progress: 3 || Pending: 4
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      routes: [
        {
          id: 1,
          btnName: " Dashboard",
          color: "teal",
          icon: "dashboard",
          route: "/rider/dashboard"
        },
        {
          id: 2,
          btnName: "Inventory",
          color: "teal",
          icon: "fas fa-shopping-bag",
          route: "/rider/inventory"
        },
        {
          id: 3,
          btnName: "Requests",
          color: "teal",
          icon: "move_to_inbox",
          route: "/rider/requests"
        },

        {
          id: 5,
          btnName: "Canceled",
          color: "teal",
          icon: "fas fa-window-close",
          route: "/rider/canceled"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getRiders"]),
    getRider() {
      return this.getRiders.find(i => i.name === "Mae Anne Tribunal");
    }
  },
  created() {
    // eslint-disable-next-line no-console
    console.log("getRider -> getRider", this.getRider);
  }
};
</script>

<style>
.notShrik {
  flex: 0 0 100px;
}
</style>
