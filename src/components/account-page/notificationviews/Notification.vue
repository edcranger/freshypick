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
                item.userNotification === 'Yes'
                  ? 'q-py-md bg-green-1'
                  : 'q-py-md'
              "
              @click="touched(item.id)"
              v-for="item in mixed"
              :key="item.id"
              clickable
            >
              <q-item-section
                top
                avatar
                v-for="i in item.item.slice(0, 1)"
                :key="i.id"
              >
                <q-avatar>
                  <img :src="i.photo[0].url" />
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
      return [...newArray]
        .filter(
          i =>
            (i.stage !== "canceled" &&
              i.riderStatus === "done" &&
              i.userNotification === "Yes") ||
            i.userNotification === "No"
        )
        .sort((a, b) => (a.date < b.date ? 1 : -1));
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
    },
    touched(id) {
      this.ordered
        .filter(i => i.id === id)
        .map(x => {
          if (x.userNotification === "Yes") {
            x.userNotification = "No";

            this.editOrder(this.ordered);
          }
        });
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
