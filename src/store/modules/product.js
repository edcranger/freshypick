import { success, error } from "consola";

import Api from "../../api/Api";

const state = {
  cart: [],
  received: [],
  cancelled: [],
  products: []
};

// GETTERS-------------------------------------------------------------------------
const getters = {
  products: state => state.products,
  cart: state => state.cart,
  receivedItems: state => state.received,
  cancelledItems: state => state.cancelled
};

// Actions-------------------------------------------------------------------------
const actions = {
  async initAction({ dispatch }) {
    try {
      dispatch("getAllProducts");
    } catch (err) {
      error(err);
    }
  },
  async getAllProducts({ commit }) {
    try {
      success("getProducts dispatched");
      const products = await Api.get("/api/v1/products");

      products.data.data.map(i => {
        i.confirm = false;
        i.qty = 0;
      });

      commit("getProduct_request", products.data.data);

      return products.data;
    } catch (err) {
      error(err);
    }
  },
  async getCart({ commit }) {
    try {
      const cart = await Api.get("/api/v1/cart/");
      cart.data.cart.map(i => {
        i.product.spinner = false;
        i.selected = false;
        i.deleting = false;
      });
      commit("getCart_request", cart.data);

      return cart;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
  async cartItemFxn({ commit }, cartPayload) {
    try {
      const { productId, cartId, payload } = cartPayload;
      let cartFxn = await Api.post(`/api/v1/cart/${productId}`, payload);

      commit("cartFxn_request", {
        type: payload.cartFxnType,
        cartId: cartId,
        data: cartFxn.data
      });

      return cartFxn;
    } catch (err) {
      error(err);
    }
  },
  async cartSelect({ commit }, cartPayload) {
    try {
      const { selectAll } = cartPayload;

      commit("cartSelect_request", selectAll);
    } catch (err) {
      error(err);
    }
  },

  async deleteToCart({ dispatch, commit }, cartPayload) {
    try {
      commit("delete_Request", cartPayload);

      const deleted = await Api.post("/api/v1/cart/delete", {
        ids: cartPayload
      });

      dispatch("getCart");

      return deleted;
    } catch (err) {
      error(err);
    }
  },

  async editOrder({ commit }, payload) {
    try {
      commit("editOrder_request", payload);
    } catch (err) {
      error(err);
    }
  },
  async receivedOrder({ commit }, payload) {
    try {
      commit("orderReceived", payload);
    } catch (err) {
      error(err);
    }
  },
  async cancelPurchasedItem({ commit }, payload) {
    try {
      commit("cancelRequest", payload);
    } catch (err) {
      error(err);
    }
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  getProduct_request(state, payload) {
    state.products = payload;
  },
  getCart_request(state, cartPayload) {
    state.cart = cartPayload;
  },
  cartFxn_request(state, cartPayload) {
    const { data, type, cartId } = cartPayload;
    const newData = data.cart.find(i => i._id === cartId);
    const fxnType = ["add", "minus", "changeQty"];
    if (fxnType.includes(type) && newData) {
      const cartData = state.cart.cart.find(i => i._id === cartId);
      cartData.total = newData.total;
      cartData.quantity = newData.quantity;
      cartData.product.spinner = false;
    } else if (
      !fxnType.includes(type) ||
      (type === "add" && !newData) ||
      !newData
    ) {
      data.cart.map(e => {
        e.selected = false;
        e.product.spinner = false;
        e.deleting = false;
      });
      const remainSelected = state.cart.cart
        .filter(i => i.selected)
        .map(e => e._id);

      data.cart
        .filter(i => remainSelected.indexOf(i._id) >= 0)
        .map(e => {
          e.selected = true;
          e.product.spinner = false;
          e.deleting = false;
        });
      state.cart = data;
    }
  },
  cartSelect_request(state, payload) {
    if (payload) {
      state.cart.cart.map(i => (i.selected = true));
    } else {
      state.cart.cart.map(i => {
        i.selected = false;
        i.product.spinner = false;
      });
    }
  },
  delete_Request(state, payload) {
    state.cart.cart
      .filter(i => payload.indexOf(i._id) > -1)
      .map(e => {
        e.deleting = true;
        e.product.spinner = true;
      });
  },
  setCartToAllSelectedItem(state, item) {
    state.cart = item;
    // eslint-disable-next-line no-console
    // console.log(state.cart);
  },
  checkout(state) {
    const checking = state.cart.filter(item => item.selected === true);
    state.checkoutCart = checking;
  },

  editOrder_request(state, payload) {
    state.ordered = payload;
  },
  orderReceived(state, payload) {
    // const updateOrdered = state.ordered.filter(i => i.id !== payload);

    const getTheReceived = state.ordered.filter(i => i.id === payload);

    getTheReceived.map(i => {
      i.stage = "Delivered";
      i.received = true;
      i.userNotification = "No";
      i.receivedDate = Date.now();
      i.item.map(x => {
        x.dateReceived = Date.now();
        x.stage = "received";
      });
    });

    const item = getTheReceived.map(i => i);

    state.received.push(...item);

    // state.ordered = updateOrdered;
  },
  cancelRequest(state, payload) {
    const data = { ...payload, datecancelled: Date.now() };
    // eslint-disable-next-line no-console
    state.cancelled.push(data);
  },
  addToProducts(state, payload) {
    state.products.push(payload);
  },
  saveEditProd(state, payload) {
    const index = state.products.findIndex(i => i.id === payload.id);
    state.products.splice(index, 1, payload);
    // eslint-disable-next-line no-console
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
