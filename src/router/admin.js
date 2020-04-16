const routes = [
  {
    path: "/admining",
    component: () => import("layouts/Admin.vue"),
    children: [
      {
        path: "",
        component: () => import("../pages/admin/Dashboard")
      },
      {
        path: "/admining/dashboard",
        component: () => import("../pages/admin/Dashboard")
      },
      {
        path: "/admining/processing",
        component: () => import("../pages/admin/Processing")
      },
      {
        path: "/admining/packing",
        component: () => import("../pages/admin/Packing")
      },
      {
        path: "/admining/delivering",
        component: () => import("../pages/admin/Delivering")
      },
      {
        path: "/admining/completed",
        component: () => import("../pages/admin/Completed")
      },
      {
        path: "/admining/item-management",
        component: () => import("../pages/admin/ItemManagement")
      },
      {
        path: "/admining/item-management",
        component: () => import("../pages/admin/ItemManagement")
      },
      {
        path: "/admining/item-processing/:productOrderId",
        name: "viewItemProcessing",
        component: () => import("../pages/admin/ViewItemProcessing")
      },
      {
        path: "/admining/item-packing/:productOrderId",
        name: "viewItemPacking",
        component: () => import("../pages/admin/ViewItemPacking")
      },
      {
        path: "/admining/item-delivering/:productOrderId",
        name: "viewItemDelivering",
        component: () => import("../pages/admin/ViewItemDelivering")
      },
      {
        path: "/admining/product-completed/:productOrderId",
        name: "viewItemCompleted",
        component: () => import("../pages/admin/ViewItemCompleted")
      },
      {
        path: "/admining/product-view/:productId",
        name: "productView",
        component: () => import("../pages/admin/ProductView")
      },
      {
        path: "/admining/product-edit/:productId",
        name: "productEdit",
        component: () => import("../pages/admin/ProductEdit")
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
