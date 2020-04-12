<template>
  <q-layout
    :class="$mq === 'sm' || $mq === 'md' ? '' : 'web'"
    style="min-height: auto;"
  >
    <component
      :is="comp"
      :web1="webAdminMenu"
      :mobile1="mobileAdminMenu"
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
      webAdminMenu: [
        // {
        //   id: 1,
        //   btnName: "All Orders",
        //   color: "teal",
        //   icon: "fas fa-shopping-basket",
        //   route: "/admin/orders",
        //   label: true,
        //   labelValue: "ordered"
        // },
        {
          id: 2,
          btnName: "For Processing",
          color: "teal",
          icon: "fas fa-clipboard-check",
          route: "/admin/processing"
        },
        {
          id: 3,
          btnName: "For Packing",
          color: "teal",
          icon: "fas fa-box-open",
          route: "/admin/packing"
        },
        {
          id: 4,
          btnName: "For Delivering",
          color: "teal",
          icon: "fas fa-truck",
          route: "/admin/delivering"
        },
        {
          id: 5,
          btnName: "Completed",
          color: "teal",
          icon: "fas fa-check-square",
          route: "/admin/completed"
        },
        {
          id: 6,
          btnName: "Item Management",
          color: "teal",
          icon: "fas fa-store",
          route: "/admin/item-management"
        }
      ],

      mobileAdminMenu: [
        // {
        //   id: 1,
        //   btnName: "All Orders",
        //   color: "teal",
        //   icon: "fas fa-shopping-basket",
        //   route: "/admin/morders",
        //   label: true,
        //   labelValue: "ordered"
        // },
        {
          id: 2,
          btnName: "For Processing",
          color: "teal",
          icon: "fas fa-clipboard-check",
          route: "/admin/mprocessing"
        },
        {
          id: 3,
          btnName: "For Packing",
          color: "teal",
          icon: "fas fa-box-open",
          route: "/admin/mpacking"
        },
        {
          id: 4,
          btnName: "For Delivering",
          color: "teal",
          icon: "fas fa-truck",
          route: "/admin/mdelivering"
        },
        {
          id: 5,
          btnName: "Completed",
          color: "teal",
          icon: "fas fa-check-square",
          route: "/admin/mcompleted"
        },
        {
          id: 6,
          btnName: "Item Management",
          color: "teal",
          icon: "fas fa-store",
          route: "/admin/mitem-management"
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

<style lang="scss">
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
