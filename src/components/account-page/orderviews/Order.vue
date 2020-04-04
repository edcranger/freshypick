<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
  >
    <q-page class="row">
      <NoItems
        :mobile="mobile"
        :desc="desc"
        :itemLength="filteredOrder.length"
      />

      <div class="col" v-if="filteredOrder.length !== 0">
        <div class="col-12 bg-white">
          <q-list bordered separator>
            <q-item-label header>
              <h5 class="q-my-none">Item Management</h5>
            </q-item-label>

            <q-item
              v-for="item in filteredOrder"
              :key="item.id"
              :to="{
                name: $mq === 'sm' ? 'mview-orders' : 'view-orders',
                params: { itemId: item.id }
              }"
            >
              <q-item-section>
                <q-item-label caption>
                  <div class="row">
                    <div class="col">{{ item.id }}</div>
                    <div class="col text-right">
                      <p v-if="item.stage === 'Delivered'" class="text-green">
                        Completed
                        <q-icon
                          name="fas fa-check-double"
                          color="green"
                          class="q-ml-xs"
                        />
                      </p>
                      <p
                        v-else-if="item.stage === 'Delivering'"
                        class="text-grey"
                      >
                        Delivering
                        <q-icon
                          name="fas fa-truck"
                          color="grey"
                          class="q-ml-xs"
                        />
                      </p>
                    </div>
                  </div>
                </q-item-label>

                <q-item-label overline>
                  <div class="row" v-for="i in item.item" :key="i.purchaseid">
                    <div class="col" v-if="!i.cancelled">
                      <q-img
                        :src="i.photo[0].url"
                        spinner-color="white"
                        style="height: 30px; max-width: 30px"
                      />
                      x {{ i.qty }} {{ i.name }}
                    </div>
                  </div>
                </q-item-label>

                <q-item-label>
                  <div class="col text-right">
                    <p class="text-green">
                      <strong>
                        <span class="q-mr-xs lt-sm">Total:</span>
                        ₱{{ calCulateItem(item.id) }}
                      </strong>
                    </p>
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import NoItems from "../../utils/NoItems";
export default {
  data() {
    return {
      mobile: false,
      desc: "No Pending Orders"
    };
  },
  created() {
    // eslint-disable-next-line no-console
  },
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered"]),
    filteredOrder() {
      const wew = this.ordered.filter(
        i => !i.received && i.stage !== "canceled"
      );
      return wew;
    }
    // filt() {
    //   const filtOrder = this.ordered.map(i =>
    //     i.item.map(e => {
    //       return e.cancelled;
    //     })
    //   );

    //   const wew = filtOrder.map(i => i);
    //   return wew;
    // }
  },
  methods: {
    ...mapActions(["receivedOrder", "editOrder"]),
    calCulateItem(id) {
      const pow = this.ordered.filter(item => item.id === id);

      const notCancelled = pow.map(i => i.item.filter(x => !x.cancelled));

      const totalPrice = notCancelled.map(i =>
        i.reduce((currentTotal, x) => x.price * x.qty + currentTotal, 0)
      );

      return parseInt(totalPrice);
    },
    receive(id) {
      this.receivedOrder(id);
      this.editOrder(this.ordered);
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
