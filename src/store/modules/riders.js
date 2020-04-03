import consola from "consola";

const state = {
  riders: [
    {
      id: "bvs421",
      name: "Mang Jose",
      vehicle: "Yamaha Mio",
      plateNo: "YZF320",
      itemsInHand: [],
      available: true,
      rating: 3
    },
    {
      id: "fos753",
      name: "Mae Anne Tribunal",
      vehicle: "Honda Dash",
      plateNo: "BZM724",
      itemsInHand: [],
      available: true,
      rating: 4.5
    },
    {
      id: "pfc953",
      name: "Ian Jasper Ocampo",
      vehicle: "Suzuki Skyrush",
      plateNo: "MIG382",
      itemsInHand: [],
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
const actions = {
  async addItemsToRider({ commit }, payload) {
    try {
      commit("addtoRider", payload);
    } catch (err) {
      consola.error(err);
    }
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  addtoRider(state, payload) {
    const { id, rider } = payload;

    const searchRider = state.riders.filter(i => i.id === rider.id);

    // eslint-disable-next-line no-console
    searchRider.map(i => {
      i.itemsInHand.push(id.id);
    });
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
