import { error } from "consola";
import Api from "../../api/Api";
import { Cookies } from "quasar";

const state = {
  token: Cookies.get("token") || "",
  role: "user",
  user: {}
};

// GETTERS-------------------------------------------------------------------------

const getters = {
  isLoggedIn: state => !!state.token,
  user: state => state.user,
  user_addresses: state => state.user.addresses
};

// Actions-------------------------------------------------------------------------
const actions = {
  async loginUser({ commit }, loginPayload) {
    try {
      const user = await Api.post("/api/v1/users/login", loginPayload);

      commit("regularUserLogin", user.data);

      return user;
    } catch (err) {
      // eslint-disable-next-line no-console
      error(err);
    }
  },
  async getUser({ commit }) {
    try {
      const user = await Api.get("/api/v1/users/authenticate");

      if (user.data.success) {
        commit("getUser_request", user.data);
      }
      return user;
    } catch (err) {
      error(err);
    }
  },
  async logoutUser({ commit }) {
    try {
      const user = await Api.post("/api/v1/users/logout");
      commit("logout_request");
      return user;
    } catch (err) {
      error(err);
    }
  },
  async shippingAdd({ commit }, payload) {
    try {
      error("errrror", payload);
      const address = await Api.post("/api/v1/users/address", { ...payload });

      commit("shippingAdd_req", address.data);

      return address;
    } catch (err) {
      error(err);
    }
  },
  async updateShippingAdd({ commit }, payload) {
    try {
      const { id, data } = payload;
      const address = await Api.put(`/api/v1/users/address/${id}`, { ...data });

      commit("UpdateShippingAdd_req", address.data);

      return address;
    } catch (err) {
      error(err);
    }
  },
  async deleteShippingAdd({ commit }, payload) {
    try {
      const address = await Api.delete(`/api/v1/users/address/${payload}`);

      commit("deleteShippingAdd", address.data);

      return address;
    } catch (err) {
      error(err);
    }
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  regularUserLogin(state, user) {
    state.token = Cookies.get("token");

    state.user = user.user;
  },
  getUser_request(state, payload) {
    state.user = payload.user;
    state.user.addresses.sort((a, b) =>
      a.shippingDefault < b.shippingDefault ? 1 : -1
    );
  },
  logout_request(state, rootState) {
    error("rootState", rootState);
    Cookies.remove("token");
    state.token = "";
    state.user = {};
    state.profile = {};
    state.userAddress = {};
  },
  shippingAdd_req() {},
  UpdateShippingAdd_req() {},
  deleteShippingAdd() {}
};

export default {
  state,
  actions,
  mutations,
  getters
};
