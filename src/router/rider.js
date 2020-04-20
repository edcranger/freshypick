const routes = [
  {
    path: "/rider",
    component: () => import("layouts/Rider.vue"),
    children: [
      {
        path: "",
        component: () => import("../pages/rider/Dashboard")
      },
      {
        path: "/rider/dashboard",
        component: () => import("../pages/rider/Dashboard")
      },
      {
        path: "/rider/my-orders",
        name: "myOrders",
        props: true,
        component: () => import("../pages/rider/MyOrders")
      },
      {
        path: "/rider/inventory",
        component: () => import("../pages/rider/Inventory")
      },
      {
        path: "/rider/requests",
        component: () => import("../pages/rider/Requests")
      },
      {
        path: "/rider/completed",
        component: () => import("../pages/rider/Completed")
      },
      {
        path: "/rider/canceled",
        component: () => import("../pages/rider/Canceled")
      },
      {
        path: "/rider/view-order/:orderStatus/:orderId",
        name: "orderView",
        component: () => import("../pages/rider/OrderView")
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
