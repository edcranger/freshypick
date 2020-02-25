const state = {
  isLoggedIn: false,
  userProfile: {
    name: "Edison Ocampo",
    username: "edisonocampo.eo",
    phone: "09958402424",
    email: "edisonocampo.eo@gmail.com",
    photo:
      "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3072515756104032&height=50&width=50&ext=1582661811&hash=AeRNjxLwXksmqB6G"
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
  userProfile: state => state.userProfile,
  userAdd: state => state.userAddress
};

// Actions-------------------------------------------------------------------------
const actions = {};

// Mutations-------------------------------------------------------------------------
const mutations = {};

export default {
  state,
  actions,
  mutations,
  getters
};
