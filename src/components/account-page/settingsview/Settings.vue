<template>
  <q-page padding>
    <q-list bordered>
      <q-expansion-item
        group="somegroup"
        icon="account_circle"
        label="Profile"
        default-opened
        header-class="bg-green text-white"
        expand-icon-class="text-white"
      >
        <q-card class="bg-white">
          <q-card-section>
            <ProfileSet />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="somegroup"
        icon="fas fa-map-marked-alt"
        label="Address"
        header-class="bg-green text-white"
        expand-icon-class="text-white"
      >
        <q-card class="bg-white">
          <q-card-section>
            <AddressList />
            <q-btn
              color="primary"
              @click="addressForm = !addressForm"
              class="full-width q-mb-lg"
              label="New Address"
            />
            <q-slide-transition>
              <div v-show="addressForm">
                <AddressSet />
              </div>
            </q-slide-transition>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="somegroup"
        icon="fas fa-money-check-alt"
        label="Billing"
        header-class="bg-green text-white"
        expand-icon-class="text-white"
      >
        <q-card class="bg-white">
          <q-card-section> <BillingSet /> </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        group="somegroup"
        icon="fas fa-cogs"
        label="General"
        header-class="bg-green text-white"
        expand-icon-class="text-white"
      >
        <q-card class="bg-white">
          <q-card-section>
            <General />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>

    <div class="row wrap items-center  q-pa-sm"></div>
  </q-page>
</template>

<script>
import ProfileSet from "../settingsview/ProfileSet";
import AddressSet from "../settingsview/AddressSet";
import AddressList from "../settingsview/AddressList";
import BillingSet from "../settingsview/BillingSet";
import General from "../settingsview/General";
export default {
  data() {
    return {
      tab: "mails",
      addressForm: false
    };
  },
  components: {
    ProfileSet,
    AddressSet,
    AddressList,
    BillingSet,
    General
  }
};
</script>

<style></style>
