import consola from "consola";

const state = {
  cart: [],
  checkoutCart: [],
  ordered: [],
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

const getters = {
  products: state => state.products,
  cart: state => state.cart,
  totalInCart: state => {
    let total = 0;
    state.cart.map(item => {
      if (item.selected) {
        total += item.qty * item.price;
      }
    });

    return total;
  },
  checkoutCart: state => state.checkoutCart,
  ordered: state => state.ordered
};
const actions = {
  async getItems({ commit }) {
    try {
      commit("getProduct_success");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
  async addToCart({ commit }, cartItem) {
    try {
      commit("addToCart_success", cartItem);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
  async cartToCheckout({ commit }, data) {
    try {
      commit("setCartToAllSelectedItem", data);
      commit("checkout");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
  async order({ commit }) {
    try {
      commit("orderNow");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
};

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

    state.cart.push({ ...item });
    // eslint-disable-next-line no-console
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

    consola.success("checkoutCart", state.checkoutCart);
  },
  orderNow(state) {
    consola.success("inCart", state.checkoutCart);
    state.ordered.push({
      id: Date.now(),
      date: Date.now(),
      items: { ...state.checkoutCart },
      status: "processing"
    });

    consola.success("Orders", state.ordered);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
