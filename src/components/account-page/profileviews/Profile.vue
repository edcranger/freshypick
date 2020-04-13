<template>
  <div>
    <q-list padding class="bg-white text-grey-7">
      <q-item-label header>
        <h5 class="q-my-none">My Profile</h5>
      </q-item-label>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label caption>Username</q-item-label>
          <q-item-label>edisonocampo.eo</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label caption>Name</q-item-label>
          <q-item-label>Edison Ocampo</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label caption>Phone</q-item-label>
          <q-item-label>09958402424</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label caption>Email</q-item-label>
          <q-item-label>edisonocampo.eo@gmail.com</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label caption>Address</q-item-label>
          <q-item-label class="text-green" caption>Default</q-item-label>
          <q-item-label>
            Blk 22 Lot 12 Hibiscus Street castle spring heights camarin caloocan
            city
          </q-item-label>
          <q-item-label
            >Metro Manila~Caloocan - Caloocan City - Barangay 177</q-item-label
          >
          <q-item-label>(+63) 958402424</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label caption>Billing</q-item-label>
          <q-item-label class="text-green">Cash on Delivery</q-item-label>
          <q-item-label>Credit/Debit Card</q-item-label>
          <q-item-label>Payment Gateway</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label caption>Proxy</q-item-label>
          <q-item-label>Juan Dela Cruz</q-item-label>
          <q-item-label>Dodong Dela Cruz</q-item-label>
          <q-item-label>Inday Dela Cruz</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {},
  computed: {
    ...mapGetters(["cart", "ordered"])
  }
};
</script>

<style>
.pNotGrow {
  flex: 0 0 100px;
}
</style>
