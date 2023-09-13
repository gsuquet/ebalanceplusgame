<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useProductionStore } from '../stores/ProductionStore'
import type { ProductionCurve } from '../types/Production'
import { convertI18nObjectToLocale } from '../helpers/translation'
</script>

<script lang="ts">
export default {
  name: 'SetupProductionList',
  components: {
    Icon,
  },
  data() {
    return {
      productionStore: useProductionStore(),
      gameParametersStore: useGameParametersStore(),
    }
  },
  computed: {
    productionCurves() {
      return this.productionStore.productionCurves
    },
  },
  methods: {
    isClicked(productionCurve: ProductionCurve) {
      this.productionStore.setClickedProductionCurve(productionCurve)
    },
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
  <section class="list-container">
    <div v-for="curve in productionCurves" class="boucle" @click="isClicked(curve)">
      <div class="box-container">
        <h1>{{ convertI18nObjectToLocale(curve.names, gameParametersStore.language) }}</h1>
        <div class="svg-container">
          <img :src="curve.svg" alt="curve">
        </div>
        <div class="icon-container">
          <div v-if="!isEmpty(curve.solar)" class="icon-type-prod">
            <Icon icon="mdi:solar-power" style="color:orange" />
          </div>
          <div v-if="!isEmpty(curve.hydro)" class="icon-type-prod">
            <Icon icon="mdi:hydro-power" style="color:blue" />
          </div>
          <div v-if="!isEmpty(curve.wind)" class="icon-type-prod">
            <Icon icon="mdi:wind-power" style="color:darkcyan" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
    @import "../styles/components/setupProductionAndScenarioList.scss";
</style>
