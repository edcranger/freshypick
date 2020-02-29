<template>
  <div class="row wrap">
    <div class="col">
      <div class="row">
        <q-toolbar class="bg-white q-px-none" v-if="$mq !== 'sm'">
          <div class="text-subtitle2">
            <q-icon
              name="fas fa-shipping-fast"
              class="q-mr-sm q-ml-none"
            ></q-icon
            >Shipping Address
          </div>

          <q-space />

          <q-btn flat round dense icon="fas fa-edit" />
        </q-toolbar>
      </div>

      <div class="row text-caption text-grey-7 q-mt-xs">
        <div class="col-2 noGrow">
          <q-icon name="home" />
        </div>
        <div class="col">
          Blk 22 Lot 12 hibiscus street castle spring heights camarin caloocan
          city.
        </div>
        <!-- Home Address -->
      </div>
      <!-- Number -->
      <div class="row text-caption text-grey-7 q-mt-xs">
        <div class="col-2 noGrow">
          <q-icon name="local_phone" />
        </div>
        <div class="col">09156870548</div>
      </div>

      <!-- Email -->
      <div class="row text-caption text-grey-7 q-mt-xs">
        <div class="col-2 noGrow">
          <q-icon name="email" class="q-mr-sm" />
        </div>
        <div class="col">edisonocampo.eo@gmail.com</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.noGrow {
  flex: 0 0 20px;
}
</style>
