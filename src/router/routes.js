const routes = [
  {
    path: "/",
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/cart", component: () => import("pages/Cart.vue") },
      { path: "/checkout", component: () => import("pages/Checkout.vue") },
      {
        path: "/account",
        component: () => import("layouts/AccountLayout.vue"),
        children: [
          {
            path: "",
            props: true,
            component: () => import("pages/account/Orders.vue")
          },
          {
            path: "/orders",
            props: true,
            component: () => import("pages/account/Orders.vue")
          },
          {
            path: "/received",
            component: () => import("pages/account/Received.vue")
          },
          {
            path: "/cancelled",
            component: () => import("pages/account/Cancelled.vue")
          },
          {
            path: "/profile",
            component: () => import("pages/account/Profile.vue")
          },
          {
            path: "/settings",
            component: () => import("pages/account/Settings.vue")
          },
          {
            path: "/help",
            component: () => import("pages/account/Help.vue")
          },
          {
            path: "/view-orders/:itemId",
            name: "view-orders",
            props: true,
            component: () => import("pages/account/ViewOrder.vue")
          }
        ]
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
