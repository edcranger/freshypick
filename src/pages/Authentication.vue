<template>
  <q-page class="bg-white text-center text-grey-9">
    <div class="row justify-center items-center content-center">
      <div
        :class="
          $mq === 'sm' ? 'col-md-8 col-xs-12' : 'col-md-8 col-xs-12  q-mt-xl'
        "
      >
        <q-tabs v-model="tab" class="text-green bg-white">
          <q-tab name="signup" label="Sign Up" />
          <q-tab name="login" label="Login" />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          transition-next="jump-up"
          transition-prev="jump-down"
          class="bg-white"
          style="height: 430px"
        >
          <q-tab-panel name="signup">
            <div class="text-h6">Sign Up</div>
            <q-form class="q-gutter-md">
              <div class="row">
                <div class="col-12">
                  <q-input color="teal" v-model="fullname" label="Full Name" />
                  <q-input color="teal" v-model="email" label="Email" />
                  <q-input color="teal" v-model="password" label="Password" />
                  <q-checkbox
                    class="float-left q-mt-sm"
                    v-model="customModel"
                    color="secondary"
                    label="Subscribe to Freshypick Promotions"
                  />
                </div>
              </div>

              <div class="row justify-center">
                <q-btn size="18px" class="full-width" color="green"
                  >Sign Up</q-btn
                >
              </div>
            </q-form>
            <div class="row justify-center q-mt-md">
              <div class="col-12">Or sign up with</div>
              <div class="col-12">
                <q-btn
                  color="blue"
                  size="15px"
                  icon="fab fa-facebook"
                  class="q-ma-sm"
                >
                  <span class="q-ml-sm">facebook</span>
                </q-btn>
                <q-btn size="15px" icon="fab fa-google" class="q-ma-sm">
                  <span class="q-ml-sm">Google</span>
                </q-btn>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="login">
            <div class="text-h6">Login</div>
            <q-form class="q-gutter-md">
              <div class="row">
                <div class="col-12">
                  <q-input color="teal" v-model="email" label="Email" />
                  <q-input color="teal" v-model="password" label="Password" />
                  <span class="text-caption text-teal float-right q-mt-sm"
                    >Forgot Password?</span
                  >
                </div>
              </div>

              <div class="row justify-center">
                <q-btn
                  size="18px"
                  class="full-width"
                  :type="password"
                  color="green"
                  >Login</q-btn
                >
              </div>
            </q-form>
            <div class="row justify-center q-mt-md">
              <div class="col-12">Or login with</div>
              <div class="col-12">
                <q-btn
                  color="blue"
                  size="15px"
                  icon="fab fa-facebook"
                  class="q-ma-sm"
                  @click="loginRegUser()"
                  to="/account"
                >
                  <span class="q-ml-sm">facebook</span>
                </q-btn>
                <q-btn size="15px" icon="fab fa-google" class="q-ma-sm">
                  <span class="q-ml-sm">Google</span>
                </q-btn>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      fullname: null,
      email: null,
      password: null,
      tab: "login",
      customModel: false
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    loginRegUser() {
      this.loginUser();
    }
  }
};
</script>

<style></style>
