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
      <NoItems :desc="desc" :itemLength="mixed.length" />

      <div class="col" v-if="mixed.length !== 0">
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

            <!-- <q-item-label header>Items</q-item-label> -->

            <q-item
              v-ripple
              :class="
                !item.notificationClicked ? 'q-py-md bg-green-1' : 'q-py-md'
              "
              @click="touched(item._id)"
              v-for="item in mixed"
              :key="item.id"
              clickable
            >
              <q-item-section
                top
                avatar
                v-for="i in item.orderList.slice(0, 1)"
                :key="i.id"
              >
                <q-avatar>
                  <img :src="`http://localhost:3000/${i.product.photos[0]}`" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-grey-9">
                  <span>
                    Did you receive the order?
                    <q-badge
                      align="top"
                      color="red"
                      v-if="item.userNotification === 'Yes'"
                      >New</q-badge
                    >
                  </span>
                </q-item-label>
                <q-item-label caption>
                  Our courier reported that the order
                  <span class="text-blue">{{ item.id }}</span> has been
                  delivered to you. If you did not receive it please do contact
                  us.
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
                center
                v-if="item.orderStatus === 'Delivering'"
              >
                <q-btn
                  color="deep-orange"
                  dense
                  glossy
                  label="Yes"
                  @click="receive(item._id)"
                />
              </q-item-section>
            </q-item>
          </q-list>
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
  created() {
    this.getAllOrders();
  },
  computed: {
    ...mapGetters(["allOrders", "receivedItems"]),
    mixed() {
      const showIfIncluded = ["Delivering", "Completed"];
      return this.allOrders.filter(
        i => showIfIncluded.includes(i.orderStatus) && i.riderStatus === "done"
      );
      // .sort((a, b) => (a.rider.date.dateCompleted < b.date ? 1 : -1));
    }
  },
  methods: {
    ...mapActions([
      "receivedOrder",
      "editOrder",
      "getAllOrders",
      "updateOrder"
    ]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY");
    },

    receive(id) {
      this.updateOrder({ id, updateType: "confirmReceived" });
    },
    touched(id) {
      this.mixed.find(order => order._id === id).notificationClicked = true;
      this.updateOrder({ id, updateType: "clicked" });
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
