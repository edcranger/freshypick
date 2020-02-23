<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <p class="text-subtitle2">My Order</p>
        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
          class="gt-xs"
        >
          <q-step :name="1" title="Processing" icon="settings" :done="step > 1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
            quaerat quia quis, nobis corporis illo excepturi corrupti voluptatem
            veniam atque a necessitatibus.
          </q-step>

          <q-step
            :name="2"
            title="Packing"
            icon="create_new_folder"
            :done="step > 2"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
            quaerat quia quis, nobis corporis illo excepturi corrupti voluptatem
            veniam atque a necessitatibus.
          </q-step>

          <q-step :name="3" title="Delivering" icon="add_comment">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste
            quaerat quia quis, nobis corporis illo excepturi corrupti voluptatem
            veniam atque a necessitatibus.
          </q-step>
        </q-stepper>

        <q-stepper
          v-model="step"
          ref="stepper"
          color="primary"
          animated
          vertical
          class="lt-sm"
        >
          <q-step :name="1" title="Processing" icon="settings" :done="step > 1"
            >Total cost {{ calCulateItem }}</q-step
          >

          <q-step
            :name="2"
            title="Packing"
            icon="create_new_folder"
            :done="step > 2"
            >Total cost {{ calCulateItem }}</q-step
          >

          <q-step :name="3" title="Delivering" icon="add_comment"
            >Total cost {{ calCulateItem }}</q-step
          >
        </q-stepper>
      </div>
    </div>

    <!-- Ordered Items -->
    <div
      class="row bg-white shadow-2 q-pa-sm q-mt-md"
      v-for="item in orderedItems"
      :key="item.id"
      to="/"
    >
      <div class="col-12 text-blue-7">
        {{ item.id }}
        <!-- <p>Placed on:{{item.date}}</p> -->
      </div>

      <div class="col-12">
        <div
          class="row items-center"
          v-for="i in item.item"
          :key="i.purchaseid"
        >
          <div :class="i.cancelled ? 'col text-strike' : 'col'">
            <q-img
              :class="i.cancelled ? 'grayscale' : ''"
              :src="i.photo"
              spinner-color="white"
              style="height: 100px; max-width: 100px"
            />
            x {{ i.qty }}
            <strong>{{ i.name }}</strong>
          </div>

          <div class="col-4 text-right">
            <q-btn
              :color="!i.cancelled ? `red` : `grey`"
              route
              :disable="i.cancelled"
              @click="i.confirm = !i.confirm"
              glossy
              :label="!i.cancelled ? 'Cancel Item' : 'Cancelled'"
            />
            <q-dialog v-model="i.confirm" persistent>
              <CancelItem :i="i" />
            </q-dialog>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CancelItem from "../../modals/CancelItem";
export default {
  data() {
    return {
      step: 1,
      routeParams: this.$route.params.itemId,
      items: this.orderedItems,
      total: []
    };
  },

  created() {
    // eslint-disable-next-line no-console
  },
  computed: {
    ...mapGetters(["ordered"]),

    orderedItems() {
      return this.ordered.filter(item => {
        return item.id === this.routeParams;
      });
    },
    calCulateItem() {
      const pow = this.ordered.filter(item => {
        return item.id === this.routeParams;
      });

      const notCancelled = pow.map(i => {
        return i.item.filter(x => {
          return !x.cancelled;
        });
      });

      const totalPrice = notCancelled.map(i => {
        return i.reduce((currentTotal, x) => {
          return x.price + currentTotal;
        }, 0);
      });

      return parseInt(totalPrice);
    }
  },
  methods: {
    ...mapActions(["editOrder", "cancelPurchasedItem"])
    // cancelItem(itemData) {
    //   let data = [];
    //   this.cancelPurchasedItem(itemData);
    //   const pow = this.ordered.filter(item => {
    //     return item.id === this.routeParams;
    //   });

    //   for (const item in pow) {
    //     const iterate = pow[item];
    //     for (const i in iterate.item) {
    //       data.push(iterate.item[i]);
    //     }
    //   }

    //   const cancelItem = data.filter(i => {
    //     return i.cancelled;
    //   });

    //   const itemIndex = this.ordered.findIndex(i => {
    //     return i.id === itemData.purchaseId;
    //   });

    //   if (data.length === cancelItem.length) {
    //     this.ordered.splice(itemIndex, 1);
    //     this.$router.replace("/account");
    //   }
    //   this.editOrder(this.ordered);
    // }
  },
  components: {
    CancelItem
  }
};
</script>

<style>
.grayscale {
  filter: grayscale(100%);
}
</style>
