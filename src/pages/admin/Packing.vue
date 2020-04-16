<template>
  <transition
    appear
    :enter-active-class="
      $mq === 'sm' ? 'animated slideInRight' : 'animated fadeIn'
    "
  >
    <q-page padding class="bg-white">
      <q-table
        title="For Packing"
        :data="tableData"
        :columns="$mq === 'sm' ? columnsMobile : columnsWeb"
        row-key="name"
        :filter="filter"
        :dense="$mq === 'sm'"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              <q-btn
                flat
                dense
                color="blue"
                :to="{
                  name: 'viewItemPacking',
                  params: { productOrderId: props.row.name }
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
          label: "No. of Items",
          field: "numItems",
          sortable: true
        }
      ],
      tData: [this.tableData]
    };
  },
  created() {},
  computed: {
    ...mapGetters(["ordered"]),
    tableData() {
      const forProcessing = this.ordered.filter(x => x.stage === "Packing");
      const wew = forProcessing.map(x => {
        const itemNum = x.item.filter(i => !i.cancelled);
        return {
          name: x.id,
          date: this.datefxn(x.date),
          processDone: x.dateProcessingDone,
          packingDone: x.datePackingDone,
          user: "Edison Ocampo",
          numItems: itemNum.length,
          status: x.stage
        };
      });

      return wew.sort((a, b) => (a.processDone > b.processDone ? 1 : -1));
    }
  },
  methods: {
    ...mapActions([]),
    datefxn(timestamp) {
      return date.formatDate(timestamp, "M-DD-YYYY h:m A");
    }
  },
  components: {}
};
</script>

<style></style>
