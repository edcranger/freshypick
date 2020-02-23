<template>
  <q-list class="rounded-borders">
    <q-expansion-item expand-separator icon="fas fa-bell" label="Notification">
      <q-card>
        <q-card-section>
          <q-toggle
            v-model="DailyInApp"
            color="green"
            icon="apps"
            label="Daily In App Notifications"
            size="xl"
          />
          <q-toggle
            v-model="emailMarketing"
            size="xl"
            color="green"
            icon="mail"
            label="Email Notifications"
          />
          <q-toggle
            v-model="smsMarketing"
            size="xl"
            color="green"
            icon="fas fa-sms"
            label="SMS Notifications"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      icon="fab fa-rocketchat"
      label="Chat Settings"
    >
      <q-card>
        <q-card-section>
          <q-toggle
            v-model="chatActivated"
            size="xl"
            color="green"
            icon="chat_bubble"
            label="Chat Messaging System"
          />
          <q-toggle
            v-model="chatMarketing"
            size="xl"
            color="green"
            icon="money"
            label="Allow Chat Marketing"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item expand-separator icon="fas fa-cog" label="App Settings">
      <q-card>
        <q-card-section>
          <q-select
            filled
            v-model="language"
            :options="[
              'English',
              'Korean 한국어',
              'Japanese 中文',
              'Arabin عربى',
              'Chinese 日本語',
              'Italian',
              'Filipino Tagalog',
              'Filipino Bisaya'
            ]"
            label="Language"
          />
          <div class="text-center">
            <q-btn class="q-mt-lg q-mb-md ">Deactive Account</q-btn>
          </div>
          <div class="text-center">
            <q-btn class="q-my-md">Request Account Deletion</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      DailyInApp: true,
      cardForm: false,
      emailMarketing: true,
      smsMarketing: false,
      chatActivated: true,
      chatMarketing: false,
      language: "English"
    };
  },
  methods: {
    onClickChild(value) {
      // eslint-disable-next-line no-console
      console.log(value); // someValue
    }
  },
  components: {}
};
</script>

<style></style>
