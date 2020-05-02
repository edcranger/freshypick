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
  async cancelOrder({ commit }, payload) {
    try {
      const order = await Api.put(`/api/v1/orders/cancel/${payload}`);

      if (order.data.success) {
        commit("cancelOrder_request", payload);
      }
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
    // eslint-disable-next-line no-console
    console.log("newOrder_request -> state.orders", orderPayload);
    state.orders.push({ ...orderPayload.order });

    //   received: false,
    //   receivedDate: null,
    //   date: Date.now(),
    //   dateProcessingDone: null,
    //   datePackingDone: null,
    //   dateDelivering: null,
    //   stage: "Processing",
    //   userNotification: null,
    //   location: payload,
    //   rider: "",
    //   confirmedByRider: false,
    //   riderStatus: "",
    //   deliveryProgress: ""
    // });
    // state.finalCart = [];
    // state.cart = [];
  },
  cancelOrder_request(state, payload) {
    const waa = state.orders.find(i => i._id === payload);

    waa.orderStatus = "Canceled";
    // const index = state.orders.findIndex(i => i._id === payload);

    // const item = state.orders[index];

    // item.orderStatus = "Canceled";
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
