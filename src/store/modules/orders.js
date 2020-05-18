import { error } from "consola";
import Api from "../../api/Api";

const state = {
  orders: []
};

// GETTERS-------------------------------------------------------------------------
const getters = {
  allOrders: state => state.orders
};

// Actions-------------------------------------------------------------------------
const actions = {
  async getAllOrders({ commit }) {
    try {
      const orders = await Api.get("/api/v1/orders");

      // eslint-disable-next-line no-console
      //   console.log(allOrders);
      commit("getAllOrders_mut", orders.data.orders);
      return orders;
    } catch (err) {
      error(err);
    }
  },
  async newOrder({ commit }, payload) {
    try {
      payload.orderedProducts.map(i => {
        delete i["selected"];
        delete i["deleting"];
      });

      const orders = await Api.post("/api/v1/orders", payload);

      commit("newOrder_request", orders.data);

      return orders;
    } catch (err) {
      error(err);
    }
  },

  async updateOrder({ commit }, payload) {
    try {
      const { id, updateType } = payload;

      const order = await Api.put(`/api/v1/orders/${id}`, { updateType });

      commit("updateOrder_req", {
        type: updateType,
        orders: order.data.order
      });

      return order;
    } catch (err) {
      error(err);
    }
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  getAllOrders_mut(state, ordersPayload) {
    state.orders = ordersPayload;
  },

  newOrder_request(state, orderPayload) {
    state.orders.push({ ...orderPayload.order });

    //   location: payload,
    //   rider: "",
    //   confirmedByRider: false,
    //   riderStatus: "",
    //   deliveryProgress: ""
  },

  updateOrder_req(state, payload) {
    const { type, orders } = payload;

    const update = state.orders.find(order => order._id === orders._id);

    if (type === "clicked") {
      update.notificationClicked = true;
    } else if (type === "cancel") {
      update.orderStatus = "Canceled";
    } else if (type === "confirmReceived") {
      update.orderStatus = "Completed";
    }
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
