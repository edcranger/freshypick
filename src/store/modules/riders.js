const state = {
  riders: [
    {
      id: "bvs421",
      name: "Mang Jose",
      vehicle: "Yamaha Mio",
      plateNo: "YZF320",
      itemsInHand: 5,
      available: true,
      rating: 3
    },
    {
      id: "fos753",
      name: "Mae Anne Tribunal",
      vehicle: "Honda Dash",
      plateNo: "BZM724",
      itemsInHand: 3,
      available: true,
      rating: 4.5
    },
    {
      id: "pfc953",
      name: "Ian Jasper Ocampo",
      vehicle: "Suzuki Skyrush",
      plateNo: "MIG382",
      itemsInHand: 4,
      available: true,
      rating: 1
    }
  ]
};

// GETTERS-------------------------------------------------------------------------
const getters = {
  getRiders: state => state.riders
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
