<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
  >
    <q-page padding>
      <q-table
        title="For Processing"
        :data="tableData"
        :columns="$mq === 'sm' ? columnsMobile : columnsWeb"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              <q-btn
                flat
                dense
                color="blue"
                :to="{
                  name: 'viewItemProcessing',
                  params: { orderId: props.row.name }
                }"
                :label="props.row.name"
              />
            </q-td>

            <q-td key="date" :props="props">{{ props.row.date }}</q-td>
            <q-td key="user" :props="props">{{ props.row.user }}</q-td>
            <q-td key="items" :props="props">{{ props.row.numItems }}</q-td>
            <q-td key="status" :props="props">
              <q-btn color="blue" flat dense>{{ props.row.status }}</q-btn>
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
    </q-page>
  </transition>
</template>

<script>
// import { info } from "consola";
import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";
export default {
  data() {
    return {
      filter: "",
      columnsWeb: [
        {
          name: "name",
          required: true,
          label: "Purchase ID",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "date",
          align: "left",
          label: "Date of Order",
          field: "date",
          sortable: true
        },
        {
          name: "user",
          align: "left",
          label: "User",
          field: "user",
          sortable: false
        },
        {
          name: "items",
          align: "left",
          label: "No. of Items",
          field: "numItems",
          sortable: true
        },
        { name: "status", label: "Status", field: "status", sortable: true }
      ],
      columnsMobile: [
        {
          name: "name",
          required: true,
          label: "Purchase ID",
          align: "left",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "date",
          align: "left",
          label: "Date of Order",
          field: "date",
          sortable: true
        },
        {
          name: "items",
          align: "left",
          label: "Item qty",
          field: "numItems",
          sortable: true
        }
      ],
      tData: [this.tableData]
    };
  },
  async created() {
    this.getAdminOrders();
  },
  computed: {
    ...mapGetters(["AllOrdersByAdmin"]),
    tableData() {
      const forProcessing = this.AllOrdersByAdmin.filter(
        order => order.orderStatus === "Processing"
      );
      return forProcessing
        .map(x => {
          return {
            name: x._id,
            date: this.datefxn(x.dates.orderDate),
            user: "Edison Ocampo",
            numItems: x.orderList.length,
            status: x.orderStatus
          };
        })
        .sort((a, b) => (a.date > b.date ? 1 : -1));
    }
  },
  methods: {
    ...mapActions(["getAdminOrders"]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "M-DD-YYYY h:m A");
    }
  },
  components: {}
};
</script>

<style></style>
