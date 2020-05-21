// @ts-nocheck
import { error } from "consola";
import Api from "../../api/Api";

const state = {
  adminOrders: []
};

// GETTERS-------------------------------------------------------------------------
const getters = {
  AllOrdersByAdmin: state => state.adminOrders
};

// Actions-------------------------------------------------------------------------
const actions = {
  async getAdminOrders({ commit }) {
    try {
      const orders = await Api.get("/api/v1/admin/orders");

      commit("getAdminOrders_req", orders.data);

      return orders.data;
    } catch (err) {
      error(err);
    }
  },
  async orderStatusUpdate({ commit }, payload) {
    try {
      const { type, id, rider } = payload;

      let updateData;

      if (type === "processing") {
        updateData = {
          orderStatus: "Preparing",
          "dates.prepDate": new Date()
        };
      } else if (type === "preparing") {
        updateData = {
          orderStatus: "Delivering",
          "dates.deliveringDate": new Date()
        };
      } else if (type === "delivering") {
        updateData = {
          rider: rider,
          riderStatus: "pending-request"
        };
      }

      const order = await Api.put(`/api/v1/admin/orders/${id}`, updateData);

      commit("processingDone_req", order.data);

      return order.data;
    } catch (err) {
      error(err);
    }
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  getAdminOrders_req(state, payload) {
    state.adminOrders = payload.orders;
    state.adminOrders.forEach(
      e =>
        (e.orderList = e.orderList.map(
          i => (i = { ...i, prepared: false, selected: false })
        ))
    );
  },
  processingDone_req() {}
};

export default {
  state,
  actions,
  mutations,
  getters
};
