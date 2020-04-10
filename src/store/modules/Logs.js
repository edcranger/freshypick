import consola from "consola";

const state = {
  productLog: [],
  processLog: []
};

// GETTERS-------------------------------------------------------------------------
const getters = {
  getProductLog: state => state.productLog,
  processLog: state => state.processLog
};

// Actions-------------------------------------------------------------------------
const actions = {
  async addToLog({ commit }, payload) {
    try {
      commit("addLog", payload);
    } catch (err) {
      consola.error("error", err);
    }
  }
};

// Mutations-------------------------------------------------------------------------
const mutations = {
  addLog(state, payload) {
    // const {id, productId, message, date} = payload

    state.productLog.push(payload);

    consola.info("Adding log", state.productLog);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
