<template>
  <q-list class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="fas fa-hand-holding-usd"
      label="Cash on delivery"
      caption="Edison Ocampo"
    >
      <q-card>
        <q-card-section>
          <Cod />
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      icon="fab fa-cc-mastercard"
      label="Credit/Debit Card"
      caption="Unionbank"
    >
      <q-card>
        <q-card-section>
          <CardList />

          <q-btn
            color="primary"
            @click="cardForm = !cardForm"
            class="full-width q-mb-lg"
            label="Add New Card"
          />

          <q-slide-transition>
            <div v-show="cardForm">
              <CardSet />
            </div>
          </q-slide-transition>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      icon="fab fa-cc-amazon-pay"
      label="Payment Gateway"
    >
      <q-card>
        <q-card-section>
          <Payment @clicked="onClickChild" />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
import Payment from "./PaymentGa";
import CardList from "./CardList";
import CardSet from "./CardSet";
import Cod from "./Cod";
export default {
  data() {
    return {
      cardForm: false
    };
  },
  methods: {
    onClickChild(value) {
      // eslint-disable-next-line no-console
      console.log(value); // someValue
    }
  },
  components: {
    Payment,
    CardList,
    CardSet,
    Cod
  }
};
</script>

<style></style>
