import { success, error } from "consola";

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
      itemsInHand: [
        {
          user: {
            name: "Mark soliz",
            id: 123523312,
            email: "mark.so@gmail.com",
            phone: "023451234"
          },
          confirmedByRider:
            "Sat Apr 18 2020 16:31:41 GMT+0800 (Philippine Standard Time)",
          date: 1587198670894,
          dateDelivering:
            "Sat Apr 18 2020 16:31:30 GMT+0800 (Philippine Standard Time)",
          datePackingDone:
            "Sat Apr 18 2020 16:31:27 GMT+0800 (Philippine Standard Time)",
          dateProcessingDone:
            "Sat Apr 18 2020 16:31:22 GMT+0800 (Philippine Standard Time)",
          id: "1587198670893",
          item: [
            {
              cancelled: false,
              code: "IV320",
              confirm: false,
              datePurchased: 1587198670894,
              description: "bla bla bla bla cabbage",
              dummy: true,
              id: "a12g",
              inventory: Array(2),
              name: "Cabbage",
              percentSale: 0,
              photo: [{ file: "", url: "img/cabbage.jpg" }],
              prepaired: true,
              price: 180,
              purchaseId: "1587198670893",
              purchaseOutOfStock: false,
              qty: 1,
              sale: false,
              salePrice: 0,
              selected: false,
              sellingWeight: 1,
              sku: "I43205",
              stage: "prepaired",
              tracking: true,
              unit: "kg",
              usePercentage: false
            }
          ],

          location: {
            brgy: "Brgy 117",
            city: "Caloocan",
            default: true,
            detailedAdd:
              "Blk 22 Lot 12 Hibiscus Street Castle Spring Heights Camarin",
            name: "Home",
            province: "Metro Manila",
            region: "NCR",
            zipcode: 1442
          },

          received: false,
          receivedDate: null,
          rider: "fos753",
          riderStatus: "pending",
          stage: "Delivering",
          userNotification: "Yes"
        },
        {
          user: {
            name: "Angela Devila",
            id: 123523312,
            email: "angel.de@gmail.com",
            phone: "09452143324"
          },
          confirmedByRider:
            "Sat Apr 18 2020 16:31:41 GMT+0800 (Philippine Standard Time)",
          date: 1587198670894,
          dateDelivering:
            "Sat Apr 18 2020 16:31:30 GMT+0800 (Philippine Standard Time)",
          datePackingDone:
            "Sat Apr 18 2020 16:31:27 GMT+0800 (Philippine Standard Time)",
          dateProcessingDone:
            "Sat Apr 18 2020 16:31:22 GMT+0800 (Philippine Standard Time)",
          id: "1587198672325",
          item: [
            {
              cancelled: false,
              code: "IV320",
              confirm: false,
              datePurchased: 1587198670894,
              description: "bla bla bla bla cabbage",
              dummy: true,
              id: "a12g",
              inventory: Array(2),
              name: "Cabbage",
              percentSale: 0,
              photo: [{ file: "", url: "img/cabbage.jpg" }],
              prepaired: true,
              price: 180,
              purchaseId: "1587198670893",
              purchaseOutOfStock: false,
              qty: 1,
              sale: false,
              salePrice: 0,
              selected: false,
              sellingWeight: 1,
              sku: "I43205",
              stage: "prepaired",
              tracking: true,
              unit: "kg",
              usePercentage: false
            }
          ],

          location: {
            brgy: "Brgy 117",
            city: "Caloocan",
            default: true,
            detailedAdd:
              "Blk 22 Lot 12 Hibiscus Street Castle Spring Heights Camarin",
            name: "Home",
            province: "Metro Manila",
            region: "NCR",
            zipcode: 1442
          },

          received: false,
          receivedDate: null,
          rider: "fos753",
          riderStatus: "in-progress",
          stage: "Delivering",
          userNotification: "Yes"
        }
      ],
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
      error({ message: err, badge: true });
    }
  },
  async deliveryRequest({ rootState }, payload) {
    try {
      const order = rootState.Products.ordered.filter(i => i.id === payload);

      order.map(i => {
        i.confirmedByRider = new Date();
        i.riderStatus = "pending";
      });
    } catch (err) {
      error({ message: err, badge: true });
    }
  },
  async viewPageSubmit({ commit, rootState }, payload) {
    try {
      const { type, orderId } = payload;

      if (type === "pending") {
        const product = rootState.Products.ordered.find(i => i.id === orderId);

        success("product", product);
        return commit("startDelivery_mut", payload);
      }
    } catch (err) {
      error(err);
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
      i.itemsInHand.push(id);
    });
  },
  startDelivery_mut(state, payload) {
    const getRider = state.riders.find(i => i.id === payload.riderId);

    getRider.itemsInHand.find(i => i.id === payload.orderId).riderStatus =
      "in-progress";
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
