<script setup lang="ts">
import BaseMenuIcon from './BaseMenuIcon.vue'
</script>

<script lang="ts">
export default {
  name: 'MarketMenuIcon',
  components: {
    BaseMenuIcon,
  },
  data() {
    return {
      energyStore: useEnergyStore(),
    }
  },
}
</script>

<template>
  <BaseMenuIcon
    menu-icon-id="market-menu-icon"
    class-name="market"
    icon-string="mdi:home-currency-usd"
    :has-amount="false"
    :is-displayed="energyStore.displayMarketIcon"
    @click="energyStore.clickOnMarketIcon()"
  />
</template>
