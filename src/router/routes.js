import store from "../store/modules/user";

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next();
    return;
  }
  next("/account");
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      { path: "", component: () => import("../pages/Index.vue") },
      {
        path: "/cart",
        component: () => import("../pages/Cart.vue")
      },
      {
        path: "/checkout",
        meta: {
          requiresAuth: true
        },
        beforeEnter: ifAuthenticated,
        component: () => import("pages/Checkout.vue")
      },
      {
        path: "/account",
        component: () => import("layouts/AccountLayout.vue"),
        meta: {
          requiresAuth: true
        },
        beforeEnter: ifAuthenticated,
        children: [
          {
            path: "",
            props: true,
            component: () => import("components/account-page/orderviews/Order")
          },
          {
            path: "/account/orders",
            props: true,
            component: () => import("components/account-page/orderviews/Order")
          },
          {
            path: "/account/view-orders/:itemId",
            name: "view-orders",
            props: true,
            component: () =>
              import("components/account-page/orderviews/ViewOrder")
          },
          {
            path: "/account/received",
            component: () =>
              import("components/account-page/receivedviews/Received")
          },
          {
            path: "/account/cancelled",
            component: () =>
              import("components/account-page/cancelviews/Cancelled")
          },
          {
            path: "/account/profile",
            component: () => import("../pages/Profile")
          },
          {
            path: "/account/settings",
            component: () => import("../pages/Settings")
          },
          {
            path: "/account/help",
            component: () => import("components/account-page/orderviews/Order")
          }
        ]
      },
      {
        path: "/admin",
        component: () => import("layouts/AdminLayout.vue"),
        meta: {
          requiresAuth: true
        },
        beforeEnter: ifAuthenticated,
        children: [
          {
            path: "",
            props: true,
            component: () =>
              import("components/admin-page/admin-dashboard/AdminDashboard")
          },
          {
            path: "/admin/orders",
            props: true,
            component: () =>
              import("components/admin-page/admin-order-views/Orders")
          },
          {
            path: "/admin/processing",
            props: true,
            component: () =>
              import("components/admin-page/admin-processing/Processing")
          },
          {
            path: "/admin/packing",
            props: true,
            component: () =>
              import("components/admin-page/admin-packing/Packing")
          },
          {
            path: "/admin/delivering",
            props: true,
            component: () =>
              import("components/admin-page/admin-delivering/Delivering")
          },
          {
            path: "/admin/completed",
            props: true,
            component: () =>
              import("components/admin-page/admin-completed/Completed")
          },
          {
            path: "/admin/item-management",
            props: true,
            component: () =>
              import("components/admin-page/admin-item/AdminItemMngt")
          },
          {
            path: "/admin/order-view/:productId",
            name: "adminViewOrder",
            props: true,
            component: () =>
              import("components/admin-page/admin-order-views/View-order")
          }
        ]
      },
      {
        path: "/account/notification",
        component: () =>
          import("../components/account-page/notificationviews/Notification")
      },
      {
        path: "/account/morder",
        component: () => import("components/account-page/orderviews/Order")
      },
      {
        path: "/account/mview-orders/:itemId",
        name: "mview-orders",
        component: () => import("components/account-page/orderviews/ViewOrder")
      },
      {
        path: "/account/mreceived",
        component: () =>
          import("components/account-page/receivedviews/Received")
      },
      {
        path: "/account/mcancelled",
        component: () => import("components/account-page/cancelviews/Cancelled")
      },
      {
        path: "/account/mprofile",
        component: () => import("../pages/Profile")
      },
      {
        path: "/account/msettings",
        component: () => import("../pages/Settings")
      },
      {
        path: "/account/mhelp",
        component: () => import("components/account-page/cancelviews/Cancelled")
      },
      {
        path: "/account/authentication",
        component: () => import("../pages/Authentication")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
