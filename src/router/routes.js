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
        path: "/product/:name",
        name: "product",
        component: () => import("pages/Product.vue")
      },
      {
        path: "/cart",
        meta: {
          requiresAuth: true
        },
        beforeEnter: ifAuthenticated,
        component: () => import("../pages/Cart.vue")
      },
      {
        path: "/checkout",
        props: true,
        name: "checkout",
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
            name: "ordersWeb",
            props: true,
            component: () => import("components/account-page/orderviews/Order")
          },
          {
            path: "/account/notification",
            props: true,
            component: () =>
              import("components/account-page/notificationviews/Notification")
          },
          {
            path: "/account/orders",
            name: "ordersWeb",
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
            name: "receivedWeb",
            component: () => import("components/account-page/orderviews/Order")
          },
          {
            path: "/account/cancelled",
            name: "canceledWeb",
            component: () => import("components/account-page/orderviews/Order")
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
        path: "/account/mnotification",
        component: () =>
          import("../components/account-page/notificationviews/Notification")
      },
      {
        path: "/account/morder",
        name: "ordersMobile",
        component: () => import("components/account-page/orderviews/Order")
      },
      {
        path: "/account/mview-orders/:itemId",
        name: "mview-orders",
        component: () => import("components/account-page/orderviews/ViewOrder")
      },
      {
        path: "/account/mreceived",
        name: "receivedMobile",
        component: () => import("components/account-page/orderviews/Order")
      },
      {
        path: "/account/mcancelled",
        name: "canceledMobile",
        component: () => import("components/account-page/orderviews/Order")
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
        component: () => import("../pages/Settings")
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
