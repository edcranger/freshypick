<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <p class="text-subtitle2">My Order</p>
        <q-stepper
          v-model="step"
          ref="stepper"
          alternative-labels
          color="primary"
          animated
        >
          <q-step :name="1" title="Processing" icon="settings" :done="step > 1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
            exercitationem accusantium atque
          </q-step>

          <q-step
            :name="2"
            title="Packing"
            icon="create_new_folder"
            :done="step > 2"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, vero?
            Beatae.
          </q-step>

          <q-step :name="3" title="Delivering" icon="add_comment">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            quaerat dolor voluptatum.
          </q-step>
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
          <div class="col">
            <q-img
              :src="i.photo"
              spinner-color="white"
              style="height: 100px; max-width: 100px"
            />
            x {{ i.qty }}
            <strong>{{ i.name }}</strong>
            <strong>{{ calCulateItem }}</strong>
          </div>

          <div class="col-4 text-right">
            <q-btn
              color="red"
              route
              :disable="i.cancelled"
              @click="
                (i.cancelled = !i.cancelled), (i.stage = 'cancel'), cancelItem()
              "
              :to="{ name: 'view-orders', params: { itemId: i.id } }"
              glossy
              label="Cancel item"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    ...mapGetters(["checkoutCart", "totalInCart", "ordered", "orderedTotal"]),
    orderedItems() {
      return this.ordered.filter(item => {
        return item.id === this.routeParams;
      });
    },
    calCulateItem() {
      let totalPrice = 0;
      const pow = this.ordered.filter(item => {
        // eslint-disable-next-line no-console
        return item.id === this.routeParams;
      });

      for (const item in pow) {
        let price = 0;
        let size = 0;
        let cancelledSize = 0;

        const iterate = pow[item];
        // eslint-disable-next-line no-console
        this.$consola.info("iterate", iterate.id);

        for (const i in iterate.item) {
          // eslint-disable-next-line no-console

          size += 1;
          if (iterate.item[i].cancelled !== true) {
            price += iterate.item[i].qty * iterate.item[i].price;
          } else {
            cancelledSize += 1;
          }
        }
        // eslint-disable-next-line no-console
        totalPrice = price;
        // eslint-disable-next-line no-console
        console.log(size);
        // eslint-disable-next-line no-console
        console.log(cancelledSize);
      }

      // eslint-disable-next-line no-console
      pow.map(item => {
        item.total = totalPrice;
      });

      // eslint-disable-next-line no-console
      this.$consola.success("ordered", this.ordered);

      return totalPrice;
    }
  },
  methods: {
    ...mapActions(["editOrder"]),
    cancelItem() {
      // eslint-disable-next-line no-console
      this.editOrder(this.ordered);
    }
  }
};
</script>

<style></style>
