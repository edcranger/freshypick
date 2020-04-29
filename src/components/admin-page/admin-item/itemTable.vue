<template>
  <q-table
    flat
    title="All Products"
    :data="products"
    :columns="$mq === 'sm' ? columnsMobile : columnsWeb"
    row-key="name"
    :filter="filter"
    :dense="$mq === 'sm'"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="name" :props="props">
          <div class="row items-center">
            <div class="col-5">
              <q-img
                :src="props.row.photo[0].url"
                spinner-color="white"
                style="height: 70px; max-width: 80px"
              />
            </div>
            <div class="col-7 text-left">
              <q-btn
                flat
                dense
                color="blue"
                :to="{
                  name: 'productView',
                  params: {
                    productId: props.row.id
                  }
                }"
                :label="props.row.name"
              />
            </div>
          </div>
        </q-td>
        <q-td key="inventory" :props="props">{{
          countingInventory(props.row.inventory)
        }}</q-td>

        <q-td key="price" :props="props">{{ props.row.price }}</q-td>
        <q-td key="salePrice" :props="props">{{ props.row.salePrice }}</q-td>

        <q-td key="description" :props="props">
          {{ props.row.description }}
        </q-td>
        <q-td key="status" :props="props">
          <q-btn color="red" flat dense>hey</q-btn>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
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
      columnsMobile: [
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
        }
      ],
      tData: [this.product]
    };
  },
  created() {},
  computed: {
    ...mapGetters(["products"])
  },
  methods: {
    ...mapActions(["addProduct"]),
    countingInventory(item) {
      let counter = 0;

      item.map(i => (counter += i.qty));

      return counter;
    }
  },
  components: {}
};
</script>

<style></style>
