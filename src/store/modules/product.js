import consola from "consola";
// import uuid from "uuid/v4";
import Photo from "../../assets/noImage.jpg";
import carrots from "../../assets/carrots.jpg";
import cabbage from "../../assets/cabbage.jpg";
import onion from "../../assets/onion.jpg";
import cucumber from "../../assets/cucumber.jpg";
import bellpeper from "../../assets/bellpeper.jpg";
import chayote from "../../assets/chayote.jpg";
import chinessecabbage from "../../assets/chinessecabbage.png";
import squash from "../../assets/squash.jpg";

import { Notify } from "quasar";

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
          url: carrots
        }
      ],
      sale: false,
      salePrice: 0,
      dummy: true,

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
          url: cabbage
        }
      ],
      sale: false,
      salePrice: 0,
      dummy: true,

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
          url: onion
        }
      ],
      sale: false,
      salePrice: 0,
      dummy: true,

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
          url: cucumber
        }
      ],
      sale: false,
      salePrice: 0,
      dummy: true,

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
          url: bellpeper
        }
      ],
      sale: false,
      salePrice: 0,
      dummy: true,

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
          url: chayote
        }
      ],
      sale: false,
      salePrice: 0,
      dummy: true,

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
          url: chinessecabbage
        }
      ],
      sale: false,
      salePrice: 0,
      dummy: true,

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
          url: squash
        }
      ],
      sale: false,
      salePrice: 0,
      dummy: true,

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
      if (state.cart.find(i => i.name === cartItem.name)) {
        // eslint-disable-next-line no-console
        return Notify.create({
          message: `You already have this item in your cart.`,
          color: "purple",
          progress: true,
          timeout: 2000,
          actions: [
            {
              label: "x",
              color: "white",
              handler: () => {
                /* ... */
              }
            }
          ]
        });
      }
      commit("addToCart_success", cartItem);
    } catch (err) {
      consola.error(err);
    }
  },
  async deleteFromCart({ commit }, payload) {
    try {
      commit("deletetoCart", payload);
    } catch (err) {
      consola.error("deleted to cart", err);
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
  async order({ commit }, payload) {
    try {
      commit("addingToOrderedCollection", payload);
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
      commit("cancelRequest", payload);
    } catch (err) {
      consola.error(err);
    }
  },
  async addProduct({ commit }, payload) {
    try {
      const { id } = payload;

      payload.price = parseInt(payload.price);

      // eslint-disable-next-line no-console
      if (payload.photo.length === 0) {
        payload.photo = [
          {
            file: "",
            url: Photo
          }
        ];
      }

      commit("addToProducts", payload);

      return id;
    } catch (err) {
      consola.error(err);
    }
  },
  async saveEditedProduct({ commit }, payload) {
    try {
      commit("saveEditProd", payload);

      return payload;
    } catch (err) {
      consola.error(err);
    }
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  getProduct_success(state) {
    state.products = state.products.map(item => {
      return { ...item, confirm: false, qty: parseInt(1) };
    });
  },
  addToCart_success(state, item) {
    item.selected = true;

    item.stage = "cart";

    state.cart.push({ ...item });
  },
  deletetoCart(state, payload) {
    if (payload.type === "single") {
      const result = state.cart.findIndex(i => {
        return i.id === payload;
      });

      state.cart.splice(result, 1);
    } else if (payload.type === "selection") {
      payload.item.forEach(i => {
        const result = state.cart.findIndex(e => e.id === i);
        state.cart.splice(result, 1);
      });
    }
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
  addingToOrderedCollection(state, payload) {
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

    state.products.map(i => (i.stage = ""));

    state.ordered.push({
      id: purchaseId,
      user: {
        name: "Edison Ocampo",
        id: 123523312,
        email: "edisonocampo.eo@gmail.com",
        phone: "09958402424"
      },
      item: [...finalCart],
      received: false,
      receivedDate: null,
      date: Date.now(),
      dateProcessingDone: null,
      datePackingDone: null,
      dateDelivering: null,
      stage: "Processing",
      userNotification: null,
      location: payload,
      rider: "",
      confirmedByRider: false,
      riderStatus: "",
      deliveryProgress: ""
    });

    state.finalCart = [];
    state.cart = [];
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
