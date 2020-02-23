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
            path: "/orders",
            props: true,
            component: () => import("components/account-page/orderviews/Order")
          },
          {
            path: "/view-orders/:itemId",
            name: "view-orders",
            props: true,
            component: () =>
              import("components/account-page/orderviews/ViewOrder")
          },
          {
            path: "/received",
            component: () =>
              import("components/account-page/receivedviews/Received")
          },
          {
            path: "/cancelled",
            component: () =>
              import("components/account-page/cancelviews/Cancelled")
          },
          {
            path: "/profile",
            component: () => import("../pages/Profile")
          },
          {
            path: "/settings",
            component: () =>
              import("components/account-page/settingsview/Settings")
          },
          {
            path: "/help",
            component: () => import("components/account-page/orderviews/Order")
          }
        ]
      },
      {
        path: "/morder",
        component: () => import("components/account-page/orderviews/Order")
      },
      {
        path: "/mview-orders/:itemId",
        name: "mview-orders",
        component: () => import("components/account-page/orderviews/ViewOrder")
      },
      {
        path: "/mreceived",
        component: () =>
          import("components/account-page/receivedviews/Received")
      },
      {
        path: "/mcancelled",
        component: () => import("components/account-page/cancelviews/Cancelled")
      },
      {
        path: "/mprofile",
        component: () => import("../pages/Profile")
      },
      {
        path: "/msettings",
        component: () => import("components/account-page/settingsview/Settings")
      },
      {
        path: "/mhelp",
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
