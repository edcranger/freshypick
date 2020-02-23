<template>
  <q-page>
    <WebMenu class="webMenuView" />
    <MobileMenu
      :menu1="accountMenu1"
      :menu2="accountMenu2"
      class="mobileMenuView"
    />
  </q-page>
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
          route: "/cart"
        },
        {
          id: 2,
          btnName: "Received",
          color: "teal",
          icon: "fas fa-people-carry",
          route: "/cart"
        },
        {
          id: 3,
          btnName: "Cancelled",
          color: "teal",
          icon: "fas fa-times-circle",
          route: "/cart"
        }
      ],
      accountMenu2: [
        {
          id: 4,
          btnName: "Profile",
          color: "teal",
          icon: "fas fa-user-circle",
          route: "/cart"
        },
        {
          id: 5,
          btnName: "Settings",
          color: "teal",
          icon: "fas fa-user-cog",
          route: "/cart"
        },
        {
          id: 6,
          btnName: "Help",
          color: "teal",
          icon: "fas fa-question-circle",
          route: "/cart"
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
