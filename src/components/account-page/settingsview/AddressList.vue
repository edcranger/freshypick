<template>
  <div class="row justify-center">
    <q-card
      exact
      class="col-xs-12 col-sm-12 row wrap shadow-1 bg-white q-pa-md q-ma-sm"
      v-for="address in showAddresses"
      :key="address._id"
    >
      <div class="col-xs-12 q-pa-sm">
        <p class="text-subtitle1 q-ma-none">
          {{ address.addressTitle }}
          <q-chip
            color="green"
            text-color="white"
            class="float-right"
            label="Default"
            v-if="address.shippingDefault"
          />
        </p>

        <p class="text-caption q-my-none">
          {{
            ` ${address.detailedAddress}, ${address.region} ${address.province} ${address.cityMun} ${address.barangay} ${address.zipcode}`
          }}
        </p>

        <q-btn
          round
          class="float-right"
          color="primary"
          icon="edit"
          size="12px"
          @click="editDialog(address._id)"
        />
        <q-btn
          round
          class="float-right q-mx-md"
          color="red"
          icon="delete"
          size="12px"
          @click="deleteDialog(address._id)"
        />
      </div>
    </q-card>
    <q-dialog v-model="edit" persistent>
      <editAddress :addressData="addressData" :type="'edit'" />
    </q-dialog>
  </div>
</template>

<script>
import { success, error } from "consola";
import editAddress from "../../modals/editAddress";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      edit: false,
      addressData: {}
    };
  },
  computed: {
    ...mapGetters(["user", "user_addresses"]),
    showAddresses() {
      return this.user_addresses;
    }
  },
  methods: {
    ...mapActions(["deleteShippingAdd"]),
    editDialog(id) {
      this.edit = true;
      this.addressData = this.showAddresses.find(e => e._id === id);
    },
    deleteDialog(id) {
      this.$q
        .dialog({
          title: "Delete",
          message: "Would you like to Delete these shipping address?",
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteShippingAdd(id)
            .then(res => success(res))
            .catch(err => error(err));
        });
    }
  },
  components: {
    editAddress
  }
};
</script>

<style></style>
