<template>
  <div :class="$mq !== 'sm' ? 'q-mx-lg' : ''">
    <q-table
      flat
      :data="getRiderItems"
      :columns="columns"
      row-key="id"
      :grid="$q.screen.xs"
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <q-btn
            flat
            :to="{
              name: 'orderView',
              params: { orderId: props.row.id }
            }"
            :label="props.row.user.name"
            color="primary"
            @click="update(props.row.name)"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-location="props">
        <q-td :props="props">
          {{ props.row.location.brgy }}
          {{ props.row.location.city }} City
        </q-td>
      </template>

      <template v-slot:body-cell-price="props">
        <q-td :props="props">₱ {{ props.row.price }}</q-td>
      </template>

      <template v-slot:item="props">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-list bordered>
            <q-item
              class="q-pa-md"
              clickable
              @click="viewOrderRoute(props.row.id)"
            >
              <q-item-section avatar>
                <q-icon
                  size="40px"
                  :name="changeIcon.name"
                  :color="changeIcon.color"
                />
              </q-item-section>
              <q-item-section>
                <p class="q-ma-none">
                  <q-icon color="grey" class="q-mr-xs" name="account_circle" />
                  <span class="text-bold">{{ props.row.user.name }}</span>
                </p>
                <p class="q-ma-none">
                  <q-icon color="grey" class="q-mr-xs" name="location_on" />
                  {{ props.row.location.brgy }}
                  {{ props.row.location.city }} City
                </p>
                <p class="q-ma-none">
                  <q-icon color="grey" class="q-mr-xs" name="fas fa-box" />
                  {{ props.row.id }}
                </p>
              </q-item-section>
              <q-item-section side>
                <div>
                  <q-btn round flat color="green"
                    >₱ {{ calculateTotal(props.row.item) }}</q-btn
                  >
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      riderId: "fos753",

      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          sortable: true,
          align: "center"
        },
        {
          name: "location",
          label: "Location",
          field: "location",
          sortable: true,
          align: "center"
        },

        { name: "id", label: "Package #", field: "id" },
        { name: "price", label: "Price", field: "price" }
      ]
    };
  },
  props: ["dataType"],
  computed: {
    ...mapGetters(["getRiders"]),
    getRiderItems() {
      const rider = this.getRiders
        .find(i => i.id === this.riderId)
        .itemsInHand.filter(e => e.riderStatus === this.dataType);

      return rider;
    },
    changeIcon() {
      let icon = {
        name: "",
        color: ""
      };
      if (this.dataType === "in-progress") {
        icon.name = "directions_bike";
        icon.color = "green";
      } else if (this.dataType === "pending") {
        icon.name = "av_timer";
        icon.color = "orange";
      } else if (this.dataType === "done") {
        icon.name = "check";
        icon.color = "blue";
      }

      return icon;
    }
  },
  methods: {
    ...mapActions([]),
    update(id) {
      // eslint-disable-next-line no-console
      console.log("id is " + id);
    },
    calculateTotal(arr) {
      return arr.reduce((currentTotal, item) => {
        let perItem = item.qty * item.price;
        return perItem + currentTotal;
      }, 0);
    },
    viewOrderRoute(id) {
      this.$router.push({
        name: "orderView",
        params: { orderStatus: this.dataType, orderId: id }
      });
    }
  },
  created() {
    // eslint-disable-next-line no-console
    //console.log(this.calculateTotal);
  }
};
</script>

<style></style>
