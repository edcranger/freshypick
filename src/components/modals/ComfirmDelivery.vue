/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>Delivery Status</ModalHeader>
    <ModalBody>
      <div class="row">
        <div class="col-12">
          <div class="q-pa-md" style="max-height: 350px">
            <q-list style="min-width: 450px">
              <p v-if="error" class="text-red text-caption">{{ error }}</p>
              Riders
              <q-item tag="label" v-for="i in getRiders" :key="i.id">
                <q-item-section avatar>
                  <q-radio v-model="sel" :val="i" color="green" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ i.name }}</q-item-label>
                  <q-item-label caption>{{ i.plateNo }}</q-item-label>
                  <q-item-label caption>{{ i.vehicle }}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-item-label caption
                    >On hand: {{ i.itemsInHand }}</q-item-label
                  >
                  <div class="text-orange">
                    <q-rating
                      v-model="i.rating"
                      max="5"
                      size="1.3em"
                      color="green-5"
                      icon="star_border"
                      icon-selected="star"
                      icon-half="star_half"
                    />
                  </div>
                </q-item-section>
              </q-item>

              <q-separator spaced inset />
            </q-list>
          </div>

          <!-- 
          <p class="text-caption">Handled to</p>
          <q-input outlined v-model="userID" label="Delivery Personel" />-->
        </div>
      </div>
    </ModalBody>
    <ModalActions>
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn flat label="Yes" color="primary" @click="confirmDelivery(sel)" />
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
      sel: null,
      error: null,
      userID: null,
      routeParams: this.$route.params.productId,
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      },

      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2
      }
    };
  },
  props: ["i", "dataTitle"],
  created() {
    this.$consola.success("cancelview", this.dataTitle);
  },
  computed: {
    ...mapGetters(["ordered", "getRiders"])
  },
  methods: {
    ...mapActions(["editOrder"]),
    confirmDelivery(i) {
      // eslint-disable-next-line no-console
      console.log(i);
      let data = [];

      const pow = this.ordered.filter(item => item.id === this.routeParams);

      for (const item in pow) {
        const iterate = pow[item];
        for (const i in iterate.item) {
          iterate.item[i].confirm = false;
          data.push(iterate.item[i]);
        }
      }

      if (this.sel !== null) {
        pow.forEach(i => {
          (i.stage = "Delivering"),
            (i.dateDelivering = new Date()),
            (i.userNotification = "Yes");
        });

        this.editOrder(this.ordered);
        if (this.dataTitle === "Delivering" && this.$mq !== "sm") {
          this.$router.replace("/admin/delivering");
        } else if (this.dataTitle === "Delivering" && this.$mq === "sm") {
          this.$router.replace("/admin/mdelivering");
        }
      } else {
        this.error = "Credentials Invalid";
      }
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
