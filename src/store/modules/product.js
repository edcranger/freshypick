import consola from "consola";
import uuid from "uuid/v4";

const state = {
  cart: [],
  checkoutCart: [],
  ordered: [],
  received: [],
  cancelled: [],
  products: [
    {
      id: "wqedfgadasdas",
      name: "Carrots",
      price: 60.0,
      photo: [
        {
          file: "",
          url:
            "https://thegreengrocermanila.com/wp-content/uploads/2015/12/carrots-large-1-500x500.jpg"
        }
      ],
      sale: false,
      salePrice: 0,
      sellingWeight: 1,
      unit: "kg",
      inventory: [
        { name: "Main Store", qty: 55 },
        { name: "Branch 1", qty: 10 }
      ],
      usePercentage: false,
      percentSale: 0,
      sku: "I43205",
      code: "IV320",
      tracking: true,
      purchaseOutOfStock: false,
      description: `<div style="text-align: left;">Fresh from the producers of Baguio and Benget</div>`
    },
    {
      id: "a12g",
      name: "Cabbage",
      price: 180.0,
      photo: [
        {
          file: "",
          url:
            "https://thegreengrocermanila.com/wp-content/uploads/2015/12/organic-cabbage-1-500x500.jpg"
        }
      ],
      sale: false,
      salePrice: 0,
      sellingWeight: 1,
      unit: "kg",
      inventory: [
        { name: "Main Store", qty: 32 },
        { name: "Branch 1", qty: 10 }
      ],
      usePercentage: false,
      percentSale: 0,
      sku: "I43205",
      code: "IV320",
      tracking: true,
      purchaseOutOfStock: false,
      description: "bla bla bla bla cabbage"
    },
    {
      id: "0964038",
      name: "Red Onion (Local)",
      price: 200.0,
      photo: [
        {
          file: "",
          url:
            "https://thegreengrocermanila.com/wp-content/uploads/2015/12/onion-red-local-1-500x500.jpg"
        }
      ],
      sale: false,
      salePrice: 0,
      sellingWeight: 1,
      unit: "kg",
      inventory: [
        { name: "Main Store", qty: 22 },
        { name: "Branch 1", qty: 10 }
      ],
      usePercentage: false,
      percentSale: 0,
      sku: "I43205",
      code: "IV320",
      tracking: true,
      purchaseOutOfStock: false,
      description: "bla bla bla bla Onion"
    },
    {
      id: "1yhgbvc",
      name: "Cucumber",
      price: 120.0,
      photo: [
        {
          file: "",
          url:
            "https://thegreengrocermanila.com/wp-content/uploads/2015/12/cucumber-1-500x500.jpg"
        }
      ],
      sale: false,
      salePrice: 0,
      sellingWeight: 1,
      unit: "kg",
      inventory: [
        { name: "Main Store", qty: 40 },
        { name: "Branch 1", qty: 10 }
      ],
      usePercentage: false,
      percentSale: 0,
      sku: "I43205",
      code: "IV320",
      tracking: true,
      purchaseOutOfStock: false,
      description: "bla bla bla bla Cucumber"
    },
    {
      id: "09012f",
      name: "Bell Pepper",
      price: 140.0,
      photo: [
        {
          file: "",
          url:
            "https://thegreengrocermanila.com/wp-content/uploads/2015/12/bell-pepper-red-conical-1-500x500.jpg"
        }
      ],
      sale: false,
      salePrice: 0,
      sellingWeight: 1,
      unit: "kg",
      inventory: [
        { name: "Main Store", qty: 17 },
        { name: "Branch 1", qty: 10 }
      ],
      usePercentage: false,
      percentSale: 0,
      sku: "I43205",
      code: "IV320",
      tracking: true,
      purchaseOutOfStock: false,
      description: "bla bla bla bla Bell pepper"
    },
    {
      id: "qwefdfbn6934",
      name: "Chayote",
      price: 30.0,
      photo: [
        {
          file: "",
          url:
            "https://thegreengrocermanila.com/wp-content/uploads/2015/12/organic-chayote-1-500x500.jpg"
        }
      ],
      sale: false,
      salePrice: 0,
      sellingWeight: 1,
      unit: "kg",
      inventory: [
        { name: "Main Store", qty: 27 },
        { name: "Branch 1", qty: 10 }
      ],
      usePercentage: false,
      percentSale: 0,
      sku: "I43205",
      code: "IV320",
      tracking: true,
      purchaseOutOfStock: false,
      description: "bla bla bla bla Chayote"
    },
    {
      id: "qpofivnbnurh",
      name: "Chinese Cabbage",
      price: 220.0,
      photo: [
        {
          file: "",
          url:
            "https://thegreengrocermanila.com/wp-content/uploads/2015/12/cabbage-chinese-500x500.png"
        }
      ],
      sale: false,
      salePrice: 0,
      sellingWeight: 1,
      unit: "kg",
      inventory: [
        { name: "Main Store", qty: 33 },
        { name: "Branch 1", qty: 10 }
      ],
      usePercentage: false,
      percentSale: 0,
      sku: "I43205",
      code: "IV320",
      tracking: true,
      purchaseOutOfStock: false,
      description: "bla bla bla bla Bawang"
    },
    {
      id: "qwepouvhfd",
      name: "Squash",
      price: 40.0,
      photo: [
        {
          file: "",
          url:
            "https://thegreengrocermanila.com/wp-content/uploads/2015/12/organic-squash-1-500x500.jpg"
        }
      ],
      sale: false,
      salePrice: 0,
      sellingWeight: 1,
      unit: "kg",
      inventory: [
        { name: "Main Store", qty: 20 },
        { name: "Branch 1", qty: 10 }
      ],
      usePercentage: false,
      percentSale: 0,
      sku: "I43205",
      code: "IV320",
      tracking: true,
      purchaseOutOfStock: false,
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
  receivedItems: state => state.received,
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
  async receivedOrder({ commit }, payload) {
    try {
      commit("orderReceived", payload);
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
  },
  async addProduct({ commit }, payload) {
    try {
      commit("addToProducts", payload);

      const { id } = payload;

      return id;
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
    const checking = state.cart.filter(item => item.selected === true);
    state.checkoutCart = checking;
  },
  addingToOrderedCollection(state) {
    const purchaseId = `${Date.now()}`;
    const finalCart = [];

    state.cart.forEach(item => {
      if (item.selected) {
        item.purchaseId = purchaseId;
        item.stage = "ordered";
        item.selected = false;
        item.cancelled = false;
        item.prepaired = false;
        item.confirm = false;
        item.datePurchased = Date.now();
        finalCart.push(item);
      }
    });

    state.ordered.push({
      id: purchaseId,
      item: [...finalCart],
      received: false,
      receivedDate: null,
      date: Date.now(),
      dateProcessingDone: null,
      datePackingDone: null,
      dateDelivering: null,
      stage: "Processing",
      userNotification: null,
      rider: []
    });

    state.finalCart = [];
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
    console.log(data);
    state.cancelled.push(data);
  },
  addToProducts(state, payload) {
    state.products.push(payload);
    consola.success("Product added ", state.products);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
