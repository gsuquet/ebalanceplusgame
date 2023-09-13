<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { convertI18nObjectToLocale } from '../helpers/translation'
</script>

<script lang="ts">
export default {
  name: 'SetupProductionResume',
  components: {
    Icon,
  },
  data() {
    return {
      productionStore: useProductionStore(),
      gameParametersStore: useGameParametersStore(),
    }
  },
  methods: {
    isEmpty(listProd: number[]) {
      let empty: boolean
      if (listProd.length == 0)
        empty = true
      else
        empty = false
      return empty
    },
  },
}
</script>

<template>
  <div class="recap-container">
    <div v-if="productionStore.clickedProductionCurve" class="card-content">
      <h1 class="name">
        {{ convertI18nObjectToLocale(productionStore.clickedProductionCurve.names, gameParametersStore.language) }}
      </h1>

      <div class="svg-container">
        <img :src="productionStore.clickedProductionCurve.svg" alt="curve">
      </div>

      <div class="icon-container">
        <div v-if="!isEmpty(productionStore.clickedProductionCurve.solar)" class="icon-type-prod">
          <Icon icon="mdi:solar-power" />
        </div>
        <div v-if="!isEmpty(productionStore.clickedProductionCurve.hydro)" class="icon-type-prod">
          <Icon icon="mdi:hydro-power" />
        </div>
        <div v-if="!isEmpty(productionStore.clickedProductionCurve.wind)" class="icon-type-prod">
          <Icon icon="mdi:wind-power" />
        </div>
      </div>
      <div class="explanation-container">
        <p>{{ convertI18nObjectToLocale(productionStore.clickedProductionCurve.descriptions, gameParametersStore.language) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
    @import "../styles/components/setupProductionAndScenarioResume.scss";
</style>
