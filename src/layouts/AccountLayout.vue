<template>
  <q-layout view="lHh lpr lFf">
    <MobileMenu
      v-if="$mq === 'sm'"
      :menu1="maccountMenu1"
      :menu2="maccountMenu2"
    />
    <div class="row q-pa-sm justify-center" v-if="$mq !== 'sm'">
      <WebMenu class="col-3" :menu1="accountMenu1" :menu2="accountMenu2" />

      <q-page-container class="col q-mx-sm">
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
import WebMenu from "../components/account-page/WebMenu";
import MobileMenu from "../components/account-page/MobileMenu";
export default {
  data() {
    return {
      accountMenu1: [
        {
          id: 1,
          btnName: "Orders",
          color: "teal",
          icon: "fas fa-shipping-fast",
          route: "/account/orders",
          label: true,
          labelValue: "ordered"
        },
        {
          id: 2,
          btnName: "Received",
          color: "teal",
          icon: "fas fa-people-carry",
          route: "/account/received"
        },
        {
          id: 3,
          btnName: "Cancelled",
          color: "teal",
          icon: "fas fa-times-circle",
          route: "/account/cancelled"
        }
      ],
      accountMenu2: [
        {
          id: 4,
          btnName: "Profile",
          color: "teal",
          icon: "fas fa-user-circle",
          route: "/account/profile"
        },
        {
          id: 5,
          btnName: "Settings",
          color: "teal",
          icon: "fas fa-user-cog",
          route: "/account/settings"
        },
        {
          id: 6,
          btnName: "Help",
          color: "teal",
          icon: "fas fa-question-circle",
          route: "/account/help"
        }
      ],
      maccountMenu1: [
        {
          id: 0,
          btnName: "Notification",
          color: "green",
          icon: "fas fa-shipping-fast",
          route: "/account/notification",
          label: true
        },
        {
          id: 1,
          btnName: "Orders",
          color: "pink",
          icon: "fas fa-shipping-fast",
          route: "/account/morder"
        },
        {
          id: 2,
          btnName: "Received",
          color: "light-blue-8",
          icon: "fas fa-people-carry",
          route: "/account/mreceived"
        },
        {
          id: 3,
          btnName: "Cancelled",
          color: "grey-10",
          icon: "fas fa-times-circle",
          route: "/account/mcancelled"
        }
      ],
      maccountMenu2: [
        {
          id: 5,
          btnName: "Profile",
          color: "orange-13",
          icon: "fas fa-user-circle",
          route: "/account/mprofile"
        },
        {
          id: 6,
          btnName: "Settings",
          color: "blue-grey-12",
          icon: "fas fa-user-cog",
          route: "/account/msettings"
        },
        {
          id: 7,
          btnName: "Help",
          color: "teal",
          icon: "fas fa-question-circle",
          route: "/account/mhelp"
        }
      ]
    };
  },
  components: {
    MobileMenu,
    WebMenu
  }
};
</script>

<style lang="scss" scoped>
.pow {
  flex: 0 0 155px;
}

@media screen and (min-width: 599px) {
  .mobileMenuView {
    display: none;
  }
}

@media screen and (max-width: 599px) {
  .webMenuView {
    display: none;
  }
}
</style>
