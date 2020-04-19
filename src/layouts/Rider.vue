<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white text-dark" elevated>
      <q-toolbar class="row justify-center">
        <q-toolbar-title class="col-sm-8 q-mt-sm">
          <div class="row">
            <span class="col-4 text-h6">Freshy Rider</span>
            <div class="col text-right">
              <q-btn-group class="col-12" flat v-if="$mq !== 'sm'">
                <q-btn
                  flat
                  round
                  v-for="i in routes"
                  :key="i.id"
                  color="accent"
                  :to="i.route"
                  :icon="i.icon"
                />
              </q-btn-group>
              <q-btn-group class="col-12" flat>
                <q-btn
                  flat
                  round
                  color="purple"
                  icon="home"
                  to="/"
                  class="text-right"
                />
                <q-btn
                  flat
                  round
                  color="purple"
                  icon="fas fa-user-secret"
                  to="/admining"
                  class="text-right"
                />
              </q-btn-group>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <div class="row justify-center">
      <div class="col-xs-12 col-sm-8">
        <q-page-container>
          <!-- <RiderTabs :routes="routes" /> -->
          <router-view />
        </q-page-container>
      </div>
    </div>

    <q-footer
      elevated
      class="bg-white text-dark text-center q-pa-sm"
      v-if="$mq === 'sm'"
    >
      <q-btn
        v-for="i in routes"
        :key="i.id"
        class="text-center"
        :to="i.route"
        rounded
        flat
        :icon="i.icon"
      />
    </q-footer>
  </q-layout>
</template>

<script>
// import RiderTabs from "../components/utils/RiderTabs";
export default {
  data() {
    return {
      routes: [
        // {
        //   id: 1,
        //   btnName: "My Orders",
        //   color: "teal",
        //   icon: "dashboard",
        //   route: "/rider/my-orders"
        // },

        {
          id: 1,
          btnName: "Requests",
          color: "teal",
          icon: "move_to_inbox",
          route: "/rider/requests"
        },
        {
          id: 2,
          btnName: "Dashboard",
          color: "teal",
          icon: "dashboard",
          route: "/rider/dashboard"
        },
        {
          id: 3,
          btnName: "Inventory",
          color: "teal",
          icon: "fas fa-shopping-bag",
          route: "/rider/inventory"
        }
      ]
    };
  },
  components: {
    // RiderTabs
  }
};
</script>

<style lang="scss" scoped>
.web {
  padding-left: 250px;
  padding-right: 250px;
}
</style>
