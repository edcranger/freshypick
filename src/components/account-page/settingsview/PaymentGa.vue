<template>
  <q-list>
    <q-item clickable @click="selectThis('Gcash')" v-ripple>
      <q-item-section avatar>
        <q-avatar square>
          <img
            src="https://dronthego.net/wp-content/uploads/2019/05/Gcash.png"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>Gcash</q-item-section>
    </q-item>

    <q-item clickable @click="selectThis('PayMaya')" v-ripple>
      <q-item-section avatar>
        <q-avatar square>
          <img
            src="https://pbs.twimg.com/profile_images/1136827706727780354/86je_Bl7_400x400.png"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>PayMaya</q-item-section>
    </q-item>

    <q-item clickable @click="selectThis('Bayad Center')" v-ripple>
      <q-item-section avatar>
        <q-avatar square>
          <img
            src="https://www.bworldonline.com/wp-content/uploads/2017/05/bayad-center-logo-e1569327665179.jpg"
          />
        </q-avatar>
      </q-item-section>
      <q-item-section>Bayad Center</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      paymentType: null
    };
  },
  methods: {
    selectThis(type) {
      this.paymentType = type;
      this.$emit("clicked", type);
    }
  }
};
</script>

<style></style>
