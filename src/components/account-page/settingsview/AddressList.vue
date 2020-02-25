<template>
  <q-list class="col-xs-12 q-pa-sm">
    <q-item exact to="/" class="row wrap shadow-1 bg-white q-pa-md">
      <div class="col-xs-12 q-pa-sm">
        <p class="text-subtitle1">
          {{ userAdd.name }}
          <span class="text-green text-caption float-right q-mt-sm"
            >DEFAULT</span
          >
        </p>

        <p class="text-caption q-my-none">{{ userAdd.detailedAdd }}</p>
        <p class="text-caption q-my-none">
          {{ userAdd.region }}~{{ userAdd.province }}- {{ userAdd.city }}-
          {{ userAdd.brgy }}
        </p>
        <p class="text-caption q-my-none">{{ userProfile.phone }}</p>
      </div>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userAdd", "userProfile"])
  }
};
</script>

<style></style>
