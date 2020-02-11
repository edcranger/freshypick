<template>
  <q-page class="row">
    <div class="col">
      <div class="bg-white q-py-sm">
        <div class="text-subtitle2">
          <q-icon name="fas fa-shopping-cart" class="q-ml-md q-mr-sm"></q-icon>Recent Orders
        </div>
      </div>

      <div class="col-12 bg-white q-my-sm">
        <div class="row text-left q-pa-sm q-ml-md">
          <div class="col-4">Order #</div>

          <div class="col-4">Items</div>
          <div class="col-4 text-right">Total</div>
        </div>

        <div class="row shadow-1 q-pa-sm" v-for="item in ordered" :key="item.id">
          <div class="col-4">
            {{item.id}}
            <!-- <p>Placed on:{{item.date}}</p> -->
          </div>

          <div class="col-4">
            <div class="row" v-for="i in item.item" :key="i.purchaseid">
              <div class="col">
                <q-img :src="i.photo" spinner-color="white" style="height: 30px; max-width: 30px" />
                x {{i.qty}} {{i.name}}
              </div>
            </div>
          </div>
          <div class="col-4 text-right">
            <p>{{item.total}}</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["checkoutCart", "totalInCart", "ordered"])
  }
};
</script>

<style></style>
