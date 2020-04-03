<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
  >
    <q-page>
      <NoItems :desc="desc" :itemLength="cancelledItems.length" />
      <div class="col-12" v-if="cancelledItems.length !== 0">
        <q-list bordered separator class="bg-white">
          <div class="q-ml-md">
            <q-icon name="remove_shopping_cart" class="q-mr-sm"></q-icon
            >Canceled
          </div>

          <q-item v-for="item in filterCancelled" :key="item.id" clickable>
            <q-item-section>
              <q-item-label caption>
                <div class="row">
                  <div class="col">{{ item.id }}</div>
                  <div class="col text-right">
                    <p class="text-red">
                      Canceled
                      <q-icon name="close" color="red" class="q-ml-xs" />
                    </p>
                  </div>
                </div>
              </q-item-label>

              <q-item-label overline>
                <div class="row" v-for="i in item.item" :key="i.purchaseid">
                  <div class="col" v-if="i.cancelled">
                    <q-img
                      :src="i.photo"
                      spinner-color="white"
                      style="height: 30px; max-width: 30px"
                    />
                    x {{ i.qty }} {{ i.name }}
                    <div class="row">
                      <div class="col q-ml-xl">
                        Date canceled:{{ datefxn(i.canceledDate) }}
                      </div>
                    </div>
                  </div>
                </div>
              </q-item-label>

              <q-item-label>
                <div class="col text-right">
                  <p class="text-red">
                    <!-- <strong>
                      <span class="q-mr-xs lt-sm">Date canceled: {{item.date}}</span>
                    
                    </strong>-->
                  </p>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { date } from "quasar";
import NoItems from "../../utils/NoItems";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      desc: "No Canceled Orders"
    };
  },
  created() {
    this.$consola.info("cancelledItems", this.filterCancelled);
  },
  computed: {
    ...mapGetters(["ordered", "cancelledItems"]),
    filterCancelled() {
      let arrList = [];
      const wew = this.ordered
        .map(i => i.item.filter(e => e.cancelled))
        .filter(x => x.length !== 0);

      wew.map(i => i.map(e => arrList.push(e.purchaseId)));

      const newList = [...new Set(arrList)];

      let newItem = [];

      this.ordered.filter(i => {
        newList.filter(e => {
          if (i.id === e) {
            newItem.push(i);
          }
        });
      });

      return newItem;
    }
  },
  methods: {
    ...mapActions([""]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "MMM-DD-YYYY");
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
