<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight ' : 'animated fadeIn'
    "
  >
    <q-page>
      <q-list bordered>
        <q-expansion-item
          group="somegroup"
          icon="account_circle"
          label="Profile"
          default-opened
          header-class="bg-white text-grey-8"
          expand-icon-class="text-grey"
        >
          <q-card class="bg-white">
            <q-card-section>
              <ProfileSet />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          group="somegroup"
          icon="fas fa-map-marked-alt"
          label="Address"
          header-class="bg-white text-grey-8"
          expand-icon-class="text-grey"
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

        <q-separator />

        <q-expansion-item
          group="somegroup"
          icon="fas fa-money-check-alt"
          label="Billing"
          header-class="bg-white text-grey-8"
          expand-icon-class="text-grey"
        >
          <q-card class="bg-white">
            <q-card-section>
              <BillingSet />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          group="somegroup"
          icon="fas fa-cogs"
          label="General"
          header-class="bg-white text-grey-8"
          expand-icon-class="text-grey"
        >
          <q-card class="bg-white">
            <q-card-section>
              <General />
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator />
      </q-list>

      <div class="row wrap items-center q-pa-sm"></div>
    </q-page>
  </transition>
</template>

<script>
import ProfileSet from "../components/account-page/settingsview/ProfileSet";
import AddressSet from "../components/account-page/settingsview/AddressSet";
import AddressList from "../components/account-page/settingsview/AddressList";
import BillingSet from "../components/account-page/settingsview/BillingSet";
import General from "../components/account-page/settingsview/General";
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
