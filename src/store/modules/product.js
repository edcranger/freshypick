import consola from "consola";
import uuid from "uuid/v4";

const state = {
  cart: [],
  checkoutCart: [],
  ordered: [],
  cancelled: [],
  products: [
    {
      id: "wqedfgadasdas",
      name: "Carrots",
      price: 60.0,
      photo:
        "https://thegreengrocermanila.com/wp-content/uploads/2015/12/carrots-large-1-500x500.jpg",
      sale: 0,
      description: "bla bla bla bla carrots"
    },
    {
      id: "a12g",
      name: "Cabbage",
      price: 180.0,
      photo:
        "https://thegreengrocermanila.com/wp-content/uploads/2015/12/organic-cabbage-1-500x500.jpg",
      sale: 0,
      description: "bla bla bla bla cabbage"
    },
    {
      id: "0964038",
      name: "Red Onion (Local)",
      price: 200.0,
      photo:
        "https://thegreengrocermanila.com/wp-content/uploads/2015/12/onion-red-local-1-500x500.jpg",
      sale: 0,
      description: "bla bla bla bla Onion"
    },
    {
      id: "1yhgbvc",
      name: "Cucumber",
      price: 120.0,
      photo:
        "https://thegreengrocermanila.com/wp-content/uploads/2015/12/cucumber-1-500x500.jpg",
      sale: 0,
      description: "bla bla bla bla Cucumber"
    },
    {
      id: "09012f",
      name: "Bell Pepper",
      price: 140.0,
      photo:
        "https://thegreengrocermanila.com/wp-content/uploads/2015/12/bell-pepper-red-conical-1-500x500.jpg",
      sale: 0,
      description: "bla bla bla bla Bell pepper"
    },
    {
      id: "qwefdfbn6934",
      name: "Chayote",
      price: 30.0,
      photo:
        "https://thegreengrocermanila.com/wp-content/uploads/2015/12/organic-chayote-1-500x500.jpg",
      sale: 0,
      description: "bla bla bla bla Chayote"
    },
    {
      id: "qpofivnbnurh",
      name: "Chinese Cabbage",
      price: 220.0,
      photo:
        "https://thegreengrocermanila.com/wp-content/uploads/2015/12/cabbage-chinese-500x500.png",
      sale: 0,
      description: "bla bla bla bla Bawang"
    },
    {
      id: "qwepouvhfd",
      name: "Squash",
      price: 40.0,
      photo:
        "https://thegreengrocermanila.com/wp-content/uploads/2015/12/organic-squash-1-500x500.jpg",
      sale: 0,
      description: "bla bla bla bla Bawang"
    }
  ]
};

// GETTERS-------------------------------------------------------------------------
const getters = {
  products: state => state.products,
  cart: state => {
    return state.cart.filter(item => {
      return item.stage === "cart";
    });
  },
  totalInCart: state => {
    let total = 0;
    state.cart.map(item => {
      if (item.selected) {
        total += item.qty * item.price;
      }
    });

    return total;
  },
  checkoutCart: state => {
    return state.cart.filter(item => {
      return item.selected === true;
    });
  },

  ordered: state => {
    return state.ordered.filter(item => {
      return item;
    });
  },
  orderedTotal: state => {
    return state.ordered.map(item => {
      return item.item;
    });
  },
  cancelledItems: state => state.cancelled
};

// Actions-------------------------------------------------------------------------
const actions = {
  async getItems({ commit }) {
    try {
      commit("getProduct_success");
    } catch (err) {
      consola.error(err);
    }
  },
  async addToCart({ commit }, cartItem) {
    try {
      commit("addToCart_success", cartItem);
    } catch (err) {
      consola.error(err);
    }
  },
  async cartToCheckout({ commit }, data) {
    try {
      commit("setCartToAllSelectedItem", data);
      commit("checkout");
    } catch (err) {
      consola.error(err);
    }
  },
  async order({ commit }) {
    try {
      commit("addingToOrderedCollection");
    } catch (err) {
      consola.error(err);
    }
  },
  async editOrder({ commit }, payload) {
    try {
      commit("editOrder_request", payload);
    } catch (err) {
      consola.error(err);
    }
  },
  async cancelPurchasedItem({ commit }, payload) {
    try {
      consola.success("cancelitem ", payload);
      commit("cancelRequest", payload);
    } catch (err) {
      consola.error(err);
    }
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  getProduct_success(state) {
    state.products = state.products.map(item => {
      return { ...item, confirm: false, qty: parseInt(0) };
    });
  },
  addToCart_success(state, item) {
    if (item.qty < 1) {
      item.qty = 1;
    }
    item.selected = true;
    item.id = uuid();
    item.stage = "cart";

    state.cart.push({ ...item });
  },
  setCartToAllSelectedItem(state, item) {
    state.cart = item;
    // eslint-disable-next-line no-console
    // console.log(state.cart);
  },
  checkout(state) {
    const checking = state.cart.filter(item => {
      return item.selected === true;
    });
    state.checkoutCart = checking;
  },
  addingToOrderedCollection(state) {
    const purchaseId = `${Date.now()}`;
    const finalCart = [];
    let totalCost = 0;

    state.cart.forEach(item => {
      if (item.selected) {
        // totalCost += item.qty * item.price;
        item.purchaseId = purchaseId;
        item.stage = "ordered";
        item.selected = false;
        item.cancelled = false;
        item.confirm = false;
        item.datePurchased = Date.now();
        finalCart.push(item);
      }
    });

    state.ordered.push({
      id: purchaseId,
      item: [...finalCart],
      total: parseInt(totalCost),
      date: Date.now()
    });

    state.finalCart = [];
    consola.trace("ordered", state.ordered);
  },
  editOrder_request(state, payload) {
    state.ordered = payload;
  },
  cancelRequest(state, payload) {
    const data = { ...payload, datecancelled: Date.now() };
    // eslint-disable-next-line no-console
    console.log(data);
    state.cancelled.push(data);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
