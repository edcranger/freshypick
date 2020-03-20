const state = {
  isLoggedIn: true,
  role: "admin",
  userProfile: {
    name: "Edison Ocampo",
    username: "edisonocampo.eo",
    phone: "09958402424",
    email: "edisonocampo.eo@gmail.com",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQc3ubLuqk5JB2XQLklC5fCEUTUejV-DNLgTFY0-9HeI-W6MJEr"
  },
  userAddress: {
    name: "Home",
    region: "NCR",
    province: "Metro Manila",
    city: "Caloocan",
    brgy: "Brgy 117",
    zipcode: 1442,
    detailedAdd: "Blk 22 Lot 12 Hibiscus Street Castle Spring Heights Camarin",
    default: true
  }
};

// GETTERS-------------------------------------------------------------------------
const getters = {
  isLoggedIn: state => !!state.isLoggedIn,
  userProfile: state => state.userProfile,
  userAdd: state => state.userAddress,
  userRole: state => state.role
};

// Actions-------------------------------------------------------------------------
const actions = {
  async loginUser({ commit }) {
    try {
      commit("regularUserLogin");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  },
  async logoutUser({ commit }) {
    try {
      commit("regularUserOut");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  regularUserLogin(state) {
    state.isLoggedIn = true;
  },
  regularUserOut(state) {
    state.isLoggedIn = false;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
