const state = {
  isLoggedIn: false,
  userProfile: {
    name: "Edison Ocampo",
    username: "edisonocampo.eo",
    phone: "09958402424",
    email: "edisonocampo.eo@gmail.com",
    photo:
      "https://lh3.googleusercontent.com/proxy/31TUZaklRIi1qlewu0DT0yt9AQhzUQhoLMdBI7ey5hQ_ErU6B1r5hYDc40PhH7pmm4F6UZkbZVZz0D9qyaB07wFrF1_77BLG7_pCOTaiFTF7umvaVu-G9Y8"
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
  userAdd: state => state.userAddress
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
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  regularUserLogin(state) {
    state.isLoggedIn = true;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
