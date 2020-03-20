<template>
  <q-layout style="min-height: auto;">
    <component
      :is="comp"
      :web1="accountMenu1"
      :mobile1="maccountMenu1"
      :mobile2="maccountMenu2"
    ></component>

    <p class="text-center text-grey-5 q-mt-md">Version 1.0</p>
  </q-layout>
</template>

<script>
import AdminMobile from "../components/admin-page/AdminMobile";
import AdminDyna from "../components/admin-page/AdminDyna";
export default {
  data() {
    return {
      compt: null,
      accountMenu1: [
        {
          id: 1,
          btnName: "All Orders",
          color: "teal",
          icon: "fas fa-shipping-fast",
          route: "/admin/orders",
          label: true,
          labelValue: "ordered"
        },
        {
          id: 2,
          btnName: "Processing",
          color: "teal",
          icon: "fas fa-people-carry",
          route: "/admin/processing"
        },
        {
          id: 3,
          btnName: "Packing",
          color: "teal",
          icon: "fas fa-times-circle",
          route: "/admin/packing"
        },
        {
          id: 4,
          btnName: "Delivering",
          color: "teal",
          icon: "fas fa-times-circle",
          route: "/admin/delivering"
        },
        {
          id: 5,
          btnName: "Completed",
          color: "teal",
          icon: "fas fa-times-circle",
          route: "/admin/completed"
        },
        {
          id: 6,
          btnName: "Item Management",
          color: "teal",
          icon: "fas fa-times-circle",
          route: "/admin/item-management"
        }
      ],

      maccountMenu1: [
        {
          id: 0,
          btnName: "Notifications",
          color: "green",
          icon: "fas fa-bell",
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
          color: "red-10",
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
          color: "deep-purple-13",
          icon: "fas fa-user-cog",
          route: "/account/msettings"
        },
        {
          id: 7,
          btnName: "Help",
          color: "indigo-10",
          icon: "fas fa-question-circle",
          route: "/account/mhelp"
        }
      ]
    };
  },
  computed: {
    comp() {
      return this.$mq === "sm" ? "AdminMobile" : "AdminDyna";
    }
  },
  components: {
    AdminMobile,
    AdminDyna
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
