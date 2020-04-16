<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
  >
    <q-page padding>
      <div class="bg-white">
        <q-item-label header>
          <h5 class="q-my-none">Item Management</h5>
        </q-item-label>
      </div>

      <div class="productTabs bg-white">
        <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg">
          <q-tab
            class="text-green"
            icon="fas fa-carrot"
            name="items"
            label="All Products"
          />
          <q-tab
            class="text-orange"
            icon="fas fa-plus"
            name="addItems"
            label="Add Products"
          />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="text-center"
        >
          <q-tab-panel name="items">
            <ItemTable />
          </q-tab-panel>

          <q-tab-panel name="addItems">
            <AddItem />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-page>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddItem from "../../components/admin-page/admin-item/addProduct";
import ItemTable from "../../components/admin-page/admin-item/itemTable";

export default {
  data() {
    return {
      tab: "items",
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "green",
        width: "5px",
        opacity: 0.75
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      },
      filter: "",
      columnsWeb: [
        {
          name: "name",
          required: true,
          label: "Product",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "inventory",
          align: "center",
          label: "Inventory",
          field: "inventory",
          sortable: true
        },
        {
          name: "price",
          align: "center",
          label: "Price",
          field: "price",
          sortable: true
        },
        {
          name: "salePrice",
          align: "center",
          label: "Sale Price",
          field: "salePrice",
          sortable: true
        }
      ],
      tData: [this.product]
    };
  },
  created() {},
  computed: {
    ...mapGetters(["ordered"])
  },
  methods: {
    ...mapActions([]),
    wew() {
      // eslint-disable-next-line no-console
      console.log("wew");
    }
  },
  components: {
    ItemTable,
    AddItem
  }
};
</script>

<style></style>
