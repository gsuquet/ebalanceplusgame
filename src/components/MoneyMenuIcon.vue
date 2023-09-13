<script setup lang="ts">
import BaseMenuIcon from './BaseMenuIcon.vue'
</script>

<script lang="ts">
export default {
  name: 'MoneyMenuIcon',
  components: {
    BaseMenuIcon,
  },
  data() {
    return {
      moneyStore: useMoneyStore(),
    }
  },
}
</script>

<template>
  <BaseMenuIcon
    menu-icon-id="money-menu-icon"
    class-name="money"
    :icon-string="moneyStore.getMoneyCurrencyIcon"
    :has-amount="true"
    :amount="`${moneyStore.getMoneyAmountToDisplay} ${moneyStore.getMoneyCurrency}`"
    :is-displayed="moneyStore.displayMoneyIcon"
  />
</template>
