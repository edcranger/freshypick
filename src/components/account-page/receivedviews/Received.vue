<template>
  <q-page>
    <NoItems
      :mobile="mobile"
      :desc="desc"
      :itemLength="cancelledItems.length"
    />
  </q-page>
</template>

<script>
import moment from "moment";
import NoItems from "../../utils/NoItems";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      mobile: false,
      desc: "No Received Orders"
    };
  },
  created() {
    this.$route.path.startsWith("/m")
      ? (this.mobile = true)
      : (this.mobile = false);
  },
  computed: {
    ...mapGetters(["cart", "cancelledItems"])
  },
  methods: {
    ...mapActions([""]),
    showDate(date) {
      return moment(date).format("L");
    }
  },
  components: {
    NoItems
  }
};
</script>

<style></style>
