<template>
  <q-page class>
    <q-card flat class="bg-white">
      <q-tabs
        v-model="tab"
        class="bg-white text-grey-7"
        active-color="primary"
        indicator-color="purple"
        align="justify"
      >
        <q-tab name="in-progress" label="In Progress" />
        <q-tab name="pending" label="Pending" />
        <q-tab name="done" label="Done" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="bg-white text-dark q-pa-none">
        <q-tab-panel name="in-progress" class="q-pa-none">
          <inProgressTable :dataType="tab" />
        </q-tab-panel>

        <q-tab-panel name="pending" class="q-pa-none">
          <inProgressTable :dataType="tab" />
        </q-tab-panel>

        <q-tab-panel name="done" class="q-pa-none">
          <inProgressTable :dataType="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import inProgressTable from "../../components/rider/in-progressTable";
export default {
  data() {
    return {
      tab: "in-progress"
    };
  },
  props: ["tabInfo"],
  created() {
    if (this.tabInfo) {
      this.tab = this.tabInfo;
    }
  },
  components: {
    inProgressTable
  }
};
</script>

<style></style>
