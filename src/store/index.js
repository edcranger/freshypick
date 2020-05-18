import Vue from "vue";
import Vuex from "vuex";

import Products from "./modules/product";
import User from "./modules/user";
import Riders from "./modules/riders";
import Log from "./modules/logsinfo";
import Orders from "./modules/orders";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const store = new Vuex.Store({
  modules: {
    Riders,
    Log,
    Orders,
    User,
    Products
  },

  state: {},
  mutations: {},
  actions: {},
  getters: {}
});

store.dispatch("initAction");
export default store;
