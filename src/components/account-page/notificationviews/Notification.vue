<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
    :leave-active-class="
      $mq === 'sm' ? 'animated slideOutRight' : 'animated fadeOut'
    "
  >
    <q-page class="row">
      <NoItems :desc="desc" :itemLength="ordered.length" />

      <div class="col" v-if="ordered.length !== 0">
        <div class="col-12 bg-white">
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <q-item-label overline>
                  <q-icon name="notifications_active" class="q-mr-sm"></q-icon
                  >Notifications
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item-label header>Items</q-item-label>

            <q-item
              v-for="item in mixed"
              :key="item.id"
              clickable
              @click="$consola.success('id', item.id)"
            >
              <q-item-section
                top
                avatar
                v-for="i in item.item.slice(0, 1)"
                :key="i.id"
              >
                <q-avatar>
                  <img :src="i.photo" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-grey-6"
                  >Did you receive the order?</q-item-label
                >
                <q-item-label caption>
                  Our courier reported that the order
                  <span class="text-blue">{{ item.id }}</span> has been
                  delivered to you. If you did not receive it please do contact
                  us.
                </q-item-label>
              </q-item-section>

              <q-item-section side center v-if="!item.received">
                <q-btn
                  color="deep-orange"
                  dense
                  glossy
                  label="Yes"
                  @click="receive(item.id)"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <!-- Orderlist -->
          <!-- <div
            class="row shadow-1 q-pa-sm"
            v-for="item in ordered"
            :key="item.id"
            to="/"
          >
            <div class="col-xs-12 col-sm-4 text-grey-7 q-mb-sm">
              <div class="row">
                <div class="col-6">{{ item.id }}</div>
                <div class="col-6 text-right">
                  <p v-if="item.stage === 'Delivered'" class="text-green">
                    Completed
                    <q-icon
                      name="fas fa-check-double"
                      color="green"
                      class="q-ml-xs"
                    />
                  </p>
                  <p v-else-if="item.stage === 'Delivering'" class="text-grey">
                    Delivering
                    <q-icon name="fas fa-truck" color="grey" class="q-ml-xs" />
                  </p>
                </div>
              </div>
            </div>

            <div class="col-xs-12 col-sm-4">
              <div class="row" v-for="i in item.item" :key="i.purchaseid">
                <div class="col" v-if="!i.cancelled">
                  <q-img
                    :src="i.photo"
                    spinner-color="white"
                    style="height: 30px; max-width: 30px"
                  />
                  x {{ i.qty }} {{ i.name }}
                </div>
              </div>
            </div>
            <div class="col-xs-12 col-sm-4">
              <div class="row q-mt-sm">
                <div class="col text-right">
                  <p class="text-green">
                    <strong>
                      <span class="q-mr-xs lt-sm">Total:</span>
                      ₱{{ calCulateItem(item.id) }}
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            <div class="col-12 text-right">
              <q-btn
                v-if="!item.received"
                color="deep-orange"
                route
                glossy
                label="Received"
                @click="receive(item.id)"
              />
            </div>
            <div
              class="col-12 text-left q-mt-sm"
              v-if="item.receivedDate !== null"
            >
              <p class="text-caption text-grey-6 q-ma-none">
                <q-badge color="blue">Delivered</q-badge>
                on {{ datefxn(item.receivedDate) }}
              </p>
            </div>
          </div>-->
          <!-- Orderlist -->
        </div>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { date } from "quasar";
import { mapGetters, mapActions } from "vuex";
import NoItems from "../../utils/NoItems";
export default {
  data() {
    return {
      desc: "No New Notifications"
    };
  },
  created() {},
  computed: {
    ...mapGetters(["ordered", "receivedItems"]),
    mixed: function() {
      const arr = [...this.ordered, ...this.receivedItems];
      const newArray = new Set(arr);
      return [...newArray].sort((a, b) => (a.date < b.date ? 1 : -1));
    }
  },
  methods: {
    ...mapActions(["receivedOrder", "editOrder"]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY");
    },
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
