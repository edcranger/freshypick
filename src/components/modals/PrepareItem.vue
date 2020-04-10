/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>Confirm</ModalHeader>
    <ModalBody>
      <div class="row">
        <div class="col-12 q-gutter-sm">
          <p>What storage do you want to get the item:</p>
        </div>
        <div class="col-12 q-gutter-sm">
          <q-option-group
            :options="storageOption"
            label="Notifications"
            type="radio"
            v-model="storageValue"
          />
        </div>
      </div>

      <!-- <span class="q-ml-sm">
        Are you sure that
        <span class="text-green">{{ i.name }}</span>
        is prepaired ?
      </span>-->
    </ModalBody>
    <ModalActions>
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn
        flat
        label="Yes"
        color="primary"
        @click="
          (i.prepaired = !i.prepaired), (i.stage = 'prepaired'), prepaire(i)
        "
        v-close-popup
      />
    </ModalActions>
  </q-card>
</template>

<script>
import ModalHeader from "../modals/shared/ModalHeader";
import ModalBody from "../modals/shared/ModalBody";
import ModalActions from "../modals/shared/ModalActions";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Modal",
  data() {
    return {
      routeParams: this.$route.params.productId,
      storageValue: null
    };
  },
  props: ["i", "dataTitle"],
  created() {
    this.$consola.success("prepaire", this.i);
  },
  computed: {
    ...mapGetters(["ordered", "products"]),
    storageOption() {
      let option = [];
      this.i.inventory.map(i => option.push({ label: i.name, value: i.name }));
      return option;
    }
  },
  methods: {
    ...mapActions(["editOrder"]),
    prepaire() {
      let data = [];

      this.i.inventory.map(i => {
        if (i.name === this.storageValue) {
          i.qty -= this.i.qty;
        }
      });

      this.$consola.success("after prepaire", this.i);

      const pow = this.ordered.filter(item => item.id === this.routeParams);

      for (const item in pow) {
        const iterate = pow[item];
        for (const i in iterate.item) {
          iterate.item[i].confirm = false;
          data.push(iterate.item[i]);
        }
      }

      const prepairedItems = data.filter(i => {
        return i.prepaired;
      });

      if (data.length === prepairedItems.length) {
        pow.map(
          i => ((i.stage = "Packing"), (i.dateProcessingDone = new Date()))
        );
        if (this.dataTitle === "Processing" && this.$mq !== "sm") {
          this.$router.replace("/admin/processing");
        } else if (this.dataTitle === "Processing" && this.$mq === "sm") {
          this.$router.replace("/admin/mprocessing");
        }
      }
      this.editOrder(this.ordered);
    }
  },
  components: {
    ModalHeader,
    ModalBody,
    ModalActions
  }
};
</script>

<style></style>
