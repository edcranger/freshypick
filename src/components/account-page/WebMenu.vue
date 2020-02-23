<template>
  <q-page>
    <q-list bordered padding class="rounded-borders bg-white">
      <q-item-label header>Transactions</q-item-label>

      <q-item
        clickable
        v-ripple
        v-for="item in menu1"
        :key="item.id"
        :to="item.route"
      >
        <q-item-section avatar top>
          <q-avatar :icon="item.icon" color="primary" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ item.btnName }}</q-item-label>
        </q-item-section>

        <q-item-section
          side
          v-if="ordered.length !== 0 ? item.label : (item.label = false)"
        >
          <q-badge color="orange" text-color="black" :label="ordered.length" />
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <q-item-label header>Account Info</q-item-label>

      <q-item
        clickable
        v-ripple
        v-for="item in menu2"
        :key="item.id"
        :to="item.route"
      >
        <q-item-section avatar top>
          <q-avatar :icon="item.icon" color="grey" text-color="white" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{ item.btnName }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["menu1", "menu2"],
  computed: {
    ...mapGetters(["ordered"])
  }
};
</script>

<style></style>
