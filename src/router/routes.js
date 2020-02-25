const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      { path: "", component: () => import("../pages/Index.vue") },
      { path: "/cart", component: () => import("../pages/Cart.vue") },
      { path: "/checkout", component: () => import("pages/Checkout.vue") },
      {
        path: "/account",
        component: () => import("layouts/AccountLayout.vue"),
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
