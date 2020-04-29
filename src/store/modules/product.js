import { success, error } from "consola";
// import uuid from "uuid/v4";
import Photo from "../../assets/noImage.jpg";

import axios from "axios";

import Api from "../../api/Api";

const state = {
  cart: [],
  checkoutCart: [],
  ordered: [],
  received: [],
  cancelled: [],
  products: []
  // products: [
  //   {
  //     id: "wqedfgadasdas",
  //     name: "Carrots",
  //     price: 60.0,
  //     photo: [
  //       {
  //         file: "",
  //         url: carrots
  //       }
  //     ],
  //     sale: false,
  //     salePrice: 0,
  //     dummy: true,

  //     sellingWeight: 1,
  //     unit: "kg",
  //     inventory: [
  //       { name: "Main Store", qty: 55 },
  //       { name: "Branch 1", qty: 10 }
  //     ],
  //     usePercentage: false,
  //     percentSale: 0,
  //     sku: "I43205",
  //     code: "IV320",
  //     tracking: true,
  //     purchaseOutOfStock: false,
  //     description: `<div style="text-align: left;">Fresh from the producers of Baguio and Benget</div>`
  //   },
  //
  // ]
};

// GETTERS-------------------------------------------------------------------------
const getters = {
  products: state => state.products,
  cart: state => state.cart,

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
  async initAction({ dispatch }) {
    try {
      dispatch("getAllProducts");
      dispatch("getCart");
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
      success("getCart dispatched");
      const cart = await Api.get("/api/v1/cart/");
      cart.data.cart.map(i => {
        i.product.spinner = false;
        i.selected = false;
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
      let cartFxn = await axios.post(`/api/v1/cart/${productId}`, payload, {
        withCredentials: true
      });

      // cartFxn.data.cart.map(i => {
      //   i.product.spinner = false;
      //   i.selected = false;
      // });
      commit("cartFxn_request", {
        type: payload.cartFxnType,
        cartId: cartId,
        data: cartFxn.data
      });

      return cartFxn;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
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
  async newOrder({ commit }, payload) {
    try {
      success("payload newOrder", payload.orderedProducts);
      payload.orderedProducts.map(i => delete i["selected"]);

      const orders = await axios.post("/api/v1/orders", payload, {
        withCredentials: true
      });

      commit("newOrder_request", orders);

      return orders;
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
      error(err);
    }
  },
  async saveEditedProduct({ commit }, payload) {
    try {
      commit("saveEditProd", payload);

      return payload;
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
      state.cart.cart.find(i => i._id === cartId).total = newData.total;
      state.cart.cart.find(i => i._id === cartId).quantity = newData.quantity;
      state.cart.cart.find(i => i._id === cartId).product.spinner = false;

      // const newCart = [...state.cart.cart];
      // const cartIndex = state.cart.cart.findIndex(i => i._id === cartId);
      // success("newcart", newCart);
      // newCart[cartIndex].quantity = newSingleItemData.quantity;
      // newCart[cartIndex].total = newSingleItemData.total;
      // newCart[cartIndex].product.spinner = false;
      // return (state.cart.cart = newCart);
    } else if (
      !fxnType.includes(type) ||
      (type === "add" && !newData) ||
      !newData
    ) {
      data.cart.map(e => (e.selected = false));
      const remainSelected = state.cart.cart
        .filter(i => i.selected)
        .map(e => e._id);
      success("remainSelected", remainSelected);
      data.cart
        .filter(i => remainSelected.indexOf(i._id) >= 0)
        .map(e => (e.selected = true));
      state.cart = data;
    }
  },
  cartSelect_request(state, payload) {
    if (payload) {
      state.cart.cart.map(i => (i.selected = true));
    } else {
      state.cart.cart.map(i => {
        i.selected = false;
      });
    }
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
  newOrder_request() {
    // const purchaseId = `${Date.now()}`;
    // const finalCart = [];
    // state.cart.forEach(item => {
    //   if (item.selected) {
    //     item.purchaseId = purchaseId;
    //     item.stage = "ordered";
    //     item.selected = false;
    //     item.cancelled = false;
    //     item.prepaired = false;
    //     item.confirm = false;
    //     item.datePurchased = Date.now();
    //     finalCart.push(item);
    //   }
    // });
    // state.products.map(i => (i.stage = ""));
    // state.ordered.push({
    //   id: purchaseId,
    //   user: {
    //     name: "Edison Ocampo",
    //     id: 123523312,
    //     email: "edisonocampo.eo@gmail.com",
    //     phone: "09958402424"
    //   },
    //   item: [...finalCart],
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
