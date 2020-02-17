<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-green">
      <q-toolbar>
        <q-toolbar-title class="q-mt-sm q-ml-md">
          <img height="50" :src="require('../assets/fp.png')" />
        </q-toolbar-title>

        <q-btn
          dense
          color="purple"
          round
          to="/message"
          icon="message"
          class="q-ml-md q-mx-sm"
        ></q-btn>

        <q-btn dense round flat>
          <q-avatar>
            <img
              src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3072515756104032&height=50&width=50&ext=1582661811&hash=AeRNjxLwXksmqB6G"
            />
          </q-avatar>
        </q-btn>
      </q-toolbar>

      <q-toolbar inset class="q-pa-sm">
        <q-input rounded outlined bg-color="white" dense style="width:100%">
          <template v-slot:prepend>
            <q-avatar>
              <q-icon name="search" />
            </q-avatar>
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-green">
      <q-toolbar>
        <q-toolbar-title>
          <q-tabs dense indicator-color="yellow" :breakpoint="100">
            <q-route-tab
              name="alarms"
              icon="dashboard"
              label="Dashboard"
              to="/"
            ></q-route-tab>
            <q-route-tab
              name="cart"
              icon="fas fa-shopping-cart"
              label="Cart"
              to="/Cart"
            >
              <q-badge color="red" v-if="cart.length > 0" floating>{{
                cart.length
              }}</q-badge>
            </q-route-tab>
            <q-route-tab
              name="account"
              icon="fas fa-user-circle"
              label="Account"
              to="/account"
            ></q-route-tab>
          </q-tabs>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MyLayout",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cart"])
  }
};
</script>
