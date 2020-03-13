// "async" is optional
export default async ({ store, router }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isLoggedIn) {
        //Redirect to login page
        next("/account/authentication");
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      if (store.getters.isLoggedIn) {
        //Redirect to login page
        next("/account");
      } else {
        next();
      }
    } else {
      next();
    }
  });
};
