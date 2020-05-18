/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>{{ addressData.addressTitle }}</ModalHeader>
    <ModalBody>
      <updateAddress class="q-pa-sm" :addressData="addressData" :type="type" />
    </ModalBody>
    <ModalActions></ModalActions>
  </q-card>
</template>

<script>
import updateAddress from "../account-page/settingsview/AddressSet";
import ModalHeader from "../modals/shared/ModalHeader";
import ModalBody from "../modals/shared/ModalBody";
import ModalActions from "../modals/shared/ModalActions";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Modal",
  data() {
    return {
      dataItem: null
    };
  },
  props: {
    addressData: {
      type: Object
    },
    type: {
      type: String
    }
  },
  created() {},
  computed: {
    ...mapGetters(["cart"])
  },
  methods: {
    ...mapActions(["cartItemFxn"])
  },
  components: {
    ModalHeader,
    ModalBody,
    ModalActions,
    updateAddress
  }
};
</script>

<style></style>
