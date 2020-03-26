<template>
  <q-layout
    view="hHh lpR fFf"
    :class="$mq === 'lg' ? 'web' : ''"
    style="min-height: auto;"
  >
    <q-header elevated :class="$mq === 'lg' ? 'web bg-green' : 'bg-green'">
      <q-toolbar>
        <q-toolbar-title class="q-mt-sm q-ml-md">
          <img height="50" :src="require('../assets/fp.png')" />
        </q-toolbar-title>

        <q-btn
          color="red"
          round
          icon="fas fa-user-lock"
          class="q-ml-md q-mx-sm"
          to="/admin"
        />

        <q-btn
          dense
          color="purple"
          round
          icon="message"
          class="q-ml-md q-mx-sm"
        />

        <q-btn round flat>
          <q-avatar v-if="isLoggedIn">
            <img :src="userProfile.photo" />
          </q-avatar>
          <q-avatar v-else icon="fas fa-user" color="primary" />
          <q-menu v-if="isLoggedIn">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Settings</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logOut()">
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>

      <div class="row justify-end items-center">
        <div class="col-xs-12 col-sm-3" v-if="$mq !== 'sm'">
          <div class="row items-center">
            <div class="col-4 text-center">
              <q-btn
                size="12px"
                dense
                flat
                stack
                icon="fas fa-carrot"
                label="Produce"
                to="/"
              />
            </div>
            <div class="col-4 text-center" v-if="userRole !== 'admin'">
              <q-btn
                size="12px"
                dense
                stack
                flat
                label="My Cart"
                icon="fas fa-shopping-cart"
                to="/Cart"
              >
                <q-badge
                  color="red"
                  v-if="cart.length > 0"
                  floating
                  class="q-pa-xs q-ml-xs"
                  >{{ cart.length }}</q-badge
                >
              </q-btn>
            </div>
            <div class="col-4 text-center" v-if="userRole !== 'admin'">
              <q-btn
                stack
                size="12px"
                label="account"
                dense
                flat
                icon="fas fa-user-circle"
                to="/account"
              />
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-9">
          <q-toolbar inset class="q-pa-sm">
            <q-input rounded outlined bg-color="white" dense style="width:100%">
              <template v-slot:prepend>
                <q-avatar>
                  <q-icon name="search" />
                </q-avatar>
              </template>
            </q-input>
          </q-toolbar>
        </div>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-green">
      <div class="q-pa-lg" v-if="$mq !== 'sm'">By Vertive Interactive</div>
      <q-toolbar v-if="$mq === 'sm'">
        <q-toolbar-title>
          <q-tabs dense indicator-color="yellow" :breakpoint="100">
            <q-route-tab
              name="produce"
              icon="fas fa-carrot"
              label="Produce"
              to="/"
            ></q-route-tab>
            <q-route-tab
              name="cart"
              icon="fas fa-shopping-cart"
              label="Cart"
              to="/Cart"
            >
              <q-badge color="red" v-if="cart.length > 0" floating>
                {{ cart.length }}
              </q-badge>
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MyLayout",

  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cart", "userProfile", "isLoggedIn", "userRole"])
  },
  methods: {
    ...mapActions(["logoutUser"]),
    logOut() {
      this.logoutUser().then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
<style lang="stylus">
.web {
  padding-left: 300px;
  padding-right: 300px;
}
</style>
