<template>
  <q-page class="">
    <q-banner rounded class="bg-white q-pa-md">
      <div class="row">
        <div class="col-xs-3 col-sm-1 col-md-1 text-center">
          <q-icon
            name="fas fa-user-alt"
            class="text-orange"
            style="font-size: 3em;"
          />
        </div>
        <div class="col text-left">
          <p class="text-subtitle2 q-my-none">Edison Ocampo</p>

          <p class="q-my-none">Points 0 | Rank 0</p>
        </div>
      </div>
    </q-banner>
    <q-list bordered class="bg-white">
      <q-item
        class="q-my-xl"
        clickable
        v-ripple
        v-for="item in menu1"
        :key="item.id"
        :to="item.route"
      >
        <q-item-section avatar>
          <q-avatar
            :color="item.color"
            text-color="white"
            size="60px"
            :icon="item.icon"
          />
        </q-item-section>

        <q-item-section>{{ item.btnName }}</q-item-section>
      </q-item>

      <q-item
        class="q-my-xl"
        clickable
        v-ripple
        v-for="item in menu2"
        :key="item.id"
        :to="item.route"
      >
        <q-item-section avatar>
          <q-avatar
            :color="item.color"
            text-color="white"
            size="60px"
            :icon="item.icon"
          />
        </q-item-section>

        <q-item-section>{{ item.btnName }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["menu1", "menu2"]
};
</script>

<style></style>
