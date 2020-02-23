<template>
  <div class="col-xs-12  q-pa-sm">
    <div class="row">
      <div class="col-4">
        <p class="text-subtitle1">
          Ship to:
        </p>
      </div>
      <div class="col-8">
        <p class="float-right q-mb-none">
          Home <span class="text-green text-caption q-mt-sm">DEFAULT</span>
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <p class="q-mb-none text-subtitle1">Proxy:</p>
        <p style="font-size: 12px;">
          Person(s) who is allowed to received the item.
        </p>
      </div>
      <div class="col-8">
        <div class="row">
          <div class="col-12 q-mb-none">
            <p class=" float-right q-mt-sm q-mb-none">
              Juan DelaCruz
            </p>
          </div>
          <div class="col-12 q-mb-none">
            <p class=" float-right q-mt-sm q-mb-none">
              Dodong DelaCruz
            </p>
          </div>
          <div class="col-12 q-mb-none">
            <p class=" float-right q-mt-sm q-mb-none">
              Inday DelaCruz
            </p>
          </div>
        </div>
      </div>
    </div>

    <q-btn
      color="primary"
      @click="proxyForm = !proxyForm"
      class="full-width q-mb-lg"
      label="Add Proxy"
    />
    <q-slide-transition>
      <div v-show="proxyForm">
        <ProxySet />
      </div>
    </q-slide-transition>
  </div>
</template>

<script>
import ProxySet from "./ProxySet";
export default {
  data() {
    return {
      proxyForm: false
    };
  },
  components: {
    ProxySet
  }
};
</script>

<style></style>
