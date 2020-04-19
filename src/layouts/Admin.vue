<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-dark" elevated>
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="drawer = !drawer"
          v-if="$mq !== 'sm'"
        />

        <q-toolbar-title class="q-mt-sm">
          <span class="text-h6" v-html="`Freshypick Admin`" />
          <!-- <img height="60" :src="require('../assets/fp.png')" class="q-pa-sm" /> -->
        </q-toolbar-title>
        <div class="q-gutter-md">
          <q-btn
            flat
            color="purple"
            icon="home"
            round
            to="/"
            class="text-right"
          />
          <q-btn
            flat
            color="purple"
            icon="fas fa-motorcycle"
            round
            to="/rider"
            class="text-right"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      mini-to-overlay
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-white"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            clickable
            :to="i.route"
            v-ripple
            v-for="i in routes"
            :key="i.id"
          >
            <q-item-section avatar>
              <q-icon :name="i.icon" :color="i.color" />
            </q-item-section>

            <q-item-section class="text-caption">{{
              i.btnName
            }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      elevated
      class="bg-white text-dark text-center q-pa-sm"
      v-if="$mq === 'sm'"
    >
      <!-- <q-btn
        class="text-center"
        @click="drawer = !drawer"
        rounded
        flat
        icon="home"
      />-->
      <q-btn
        v-for="i in routes"
        :key="i.id"
        class="text-center"
        :to="i.route"
        rounded
        flat
        :icon="i.icon"
      />
      <!-- <q-toolbar>
        <q-toolbar-title>Admin Page</q-toolbar-title>
      </q-toolbar>-->
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      miniState: true,
      routes: [
        {
          id: 1,
          btnName: " Dashboard",
          color: "teal",
          icon: "dashboard",
          route: "/admining/dashboard"
        },
        {
          id: 2,
          btnName: " Processing",
          color: "teal",
          icon: "av_timer",
          route: "/admining/processing"
        },
        {
          id: 3,
          btnName: " Packing",
          color: "teal",
          icon: "fas fa-box-open",
          route: "/admining/packing"
        },
        {
          id: 4,
          btnName: " Delivering",
          color: "teal",
          icon: "fas fa-truck",
          route: "/admining/delivering"
        },
        {
          id: 5,
          btnName: "Completed",
          color: "teal",
          icon: "fas fa-check-square",
          route: "/admining/completed"
        },
        {
          id: 6,
          btnName: "Item Management",
          color: "teal",
          icon: "fas fa-store",
          route: "/admining/item-management"
        }
      ]
    };
  }
};
</script>
