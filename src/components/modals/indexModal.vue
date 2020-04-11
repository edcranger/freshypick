/* eslint-disable no-undef */
<template>
  <q-card>
    <ModalHeader>Item</ModalHeader>
    <ModalBody>
      {{ getProductPhoto }}
      <q-carousel
        swipeable
        animated
        v-model="slide"
        thumbnails
        infinite
        class="q-ma-sm"
      >
        <q-carousel-slide
          class="q-pa-none"
          v-for="(i, index) in getProductPhoto"
          :key="index"
          :name="i"
          :img-src="i"
        />
      </q-carousel>
    </ModalBody>
    <ModalActions>
      <q-btn flat label="No" color="primary" v-close-popup />
      <q-btn flat label="Yes" color="primary" v-close-popup />
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
      slide: null
    };
  },
  props: ["product"],
  created() {
    // eslint-disable-next-line no-console
    this.slide = this.product.photo[0].url;
  },
  computed: {
    ...mapGetters([]),
    getProductPhoto() {
      let photos = [];
      this.product.photo.map(i => photos.push(i.url));

      return photos;
    }
  },
  methods: {
    ...mapActions([])
  },
  components: {
    ModalHeader,
    ModalBody,
    ModalActions
  }
};
</script>

<style></style>
