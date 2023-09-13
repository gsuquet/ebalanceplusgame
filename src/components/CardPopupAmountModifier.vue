<script lang="ts">
export default {
  name: 'CardPopupAmountModifier',
  props: {
    amount: {
      type: Number,
      required: true,
    },
    maxAmount: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
      required: true,
    },
    stepAmount: {
      type: Number,
      required: true,
    },
    i18nKey: {
      type: String,
      required: true,
    },
  },
  emits: ['amount'],
  data() {
    return {
      inputErrorMin: false as boolean,
      inputErrorMax: false as boolean,
      amountPlus: false as boolean,
      amountMinus: false as boolean,
    }
  },
  computed: {
    i18nKeyProcessed(): string {
      return this.$t(this.i18nKey)
    },
  },
  watch: {
    amount: {
      handler(newAmount: number) {
        if (newAmount >= this.maxAmount)
          this.amountPlus = true
        else
          this.amountPlus = false

        if (newAmount <= this.minAmount)
          this.amountMinus = true
        else
          this.amountMinus = false

        if (newAmount > this.maxAmount) {
          this.inputErrorMax = true
          this.inputErrorMin = false
        }
        else if (newAmount < this.minAmount) {
          this.inputErrorMax = false
          this.inputErrorMin = true
        }
        else {
          this.inputErrorMax = false
          this.inputErrorMin = false
        }
      },
      immediate: true,
    },
  },
  methods: {
    updateAmount(event: Event) {
      const newAmount = (event.target as HTMLInputElement).value
      if (newAmount === '' || newAmount === null) {
        this.$emit('amount', 0)
      }
      else {
        const newAmountNb = Number.parseInt(newAmount)
        if (newAmountNb < this.minAmount) {
          this.inputErrorMin = true
          this.inputErrorMax = false
        }
        else if (newAmountNb > this.maxAmount) {
          this.inputErrorMax = true
          this.inputErrorMin = false
        }
        else {
          this.inputErrorMax = false
          this.inputErrorMin = false
          this.$emit('amount', newAmountNb)
        }
      }
    },
    addStepAmountToTotalAmount() {
      if (this.amount + this.stepAmount <= this.maxAmount)
        this.$emit('amount', this.amount + this.stepAmount)
    },
    removeStepAmountFromTotalAmount() {
      if (this.amount - this.stepAmount >= this.minAmount)
        this.$emit('amount', this.amount - this.stepAmount)
    },
  },
}
</script>

<template>
  <div class="card-amount-modifier">
    <div class="amount-container">
      <p>{{ i18nKeyProcessed }}</p>
      <div
        class="amount-modifier-container"
        :class="{ 'input-error': inputErrorMin || inputErrorMax }"
      >
        <button
          class="btn remove"
          :class="{ disabled: amountMinus }"
          @click="removeStepAmountFromTotalAmount"
        >
          -
        </button>
        <div class="input-container" :class="{ 'input-error-min': inputErrorMin, 'input-error-max': inputErrorMax }">
          <input
            id="amount"
            type="number"
            class="amount-input"
            :step="stepAmount"
            :value="amount"
            @input="updateAmount"
          >
        </div>
        <button
          class="btn add"
          :class="{ disabled: amountPlus }"
          @click="addStepAmountToTotalAmount"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
    @import '../styles/components/cardPopupAmountModifier.scss';
</style>
