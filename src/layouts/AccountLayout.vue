<template>
  <q-layout view="lHh lpr lFf">
    <q-page class="webMenuView row q-pa-sm justify-center">
      <WebMenu class="col-3" :menu1="accountMenu1" :menu2="accountMenu2" />

      <q-page-container class="col q-mx-sm">
        <router-view />
      </q-page-container>
    </q-page>

    <MobileMenu
      :menu1="maccountMenu1"
      :menu2="maccountMenu2"
      class="mobileMenuView"
    />
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
          route: "/orders",
          label: true,
          labelValue: "ordered"
        },
        {
          id: 2,
          btnName: "Received",
          color: "teal",
          icon: "fas fa-people-carry",
          route: "/received"
        },
        {
          id: 3,
          btnName: "Cancelled",
          color: "teal",
          icon: "fas fa-times-circle",
          route: "/cancelled"
        }
      ],
      accountMenu2: [
        {
          id: 4,
          btnName: "Profile",
          color: "teal",
          icon: "fas fa-user-circle",
          route: "/profile"
        },
        {
          id: 5,
          btnName: "Settings",
          color: "teal",
          icon: "fas fa-user-cog",
          route: "/settings"
        },
        {
          id: 6,
          btnName: "Help",
          color: "teal",
          icon: "fas fa-question-circle",
          route: "/help"
        }
      ],
      maccountMenu1: [
        {
          id: 4,
          btnName: "Notification",
          color: "teal",
          icon: "notifications",
          route: "/notification"
        },
        {
          id: 1,
          btnName: "Orders",
          color: "teal",
          icon: "fas fa-shipping-fast",
          route: "/morder",
          label: true,
          labelValue: "ordered.length"
        },
        {
          id: 2,
          btnName: "Received",
          color: "teal",
          icon: "fas fa-people-carry",
          route: "/mreceived",
          label: true
        },
        {
          id: 3,
          btnName: "Cancelled",
          color: "teal",
          icon: "fas fa-times-circle",
          route: "/mcancelled",
          label: true
        }
      ],
      maccountMenu2: [
        {
          id: 5,
          btnName: "Profile",
          color: "teal",
          icon: "fas fa-user-circle",
          route: "/mprofile"
        },
        {
          id: 6,
          btnName: "Settings",
          color: "teal",
          icon: "fas fa-user-cog",
          route: "/msettings"
        },
        {
          id: 7,
          btnName: "Help",
          color: "teal",
          icon: "fas fa-question-circle",
          route: "/mhelp"
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
