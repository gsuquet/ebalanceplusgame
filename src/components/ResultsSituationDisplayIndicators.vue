<script setup lang="ts">
import { emptyResultsPerformanceIndicators } from '../assets/entityEmptyResults'
import type { ResultsPerformanceIndicators } from '../types/Results'
import ResultsSituationDisplayIndicatorsIndicator from './ResultsSituationDisplayIndicatorsIndicator.vue'
import ResultsSituationDisplayIndicatorsRate from './ResultsSituationDisplayIndicatorsRate.vue'
</script>

<script lang="ts">
export default {
  name: 'ResultsSituationDisplayIndicators',
  components: {
    ResultsSituationDisplayIndicatorsIndicator,
    ResultsSituationDisplayIndicatorsRate,
  },
  props: {
    performanceIndicators: {
      type: Object as () => ResultsPerformanceIndicators,
      required: true,
    },
    initialPerformanceIndicators: {
      type: Object as () => ResultsPerformanceIndicators,
      required: false,
      default: emptyResultsPerformanceIndicators,
    },
    isInitialSituation: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<template>
  <div class="indicators">
    <div class="line" />
    <div class="indicators-section">
      <h3 class="indicators-section-title">
        {{ $t("results.sections.consumption") }}
      </h3>
      <ResultsSituationDisplayIndicatorsIndicator
        indicator-name-i18n-key="results.performanceIndicators.totalConsumption"
        :indicator-value="performanceIndicators.totalConsumption"
        :is-initial-value="isInitialSituation"
        :initial-value="initialPerformanceIndicators.totalConsumption"
      />
      <ResultsSituationDisplayIndicatorsIndicator
        indicator-name-i18n-key="results.performanceIndicators.totalOverConsumption"
        :indicator-value="performanceIndicators.totalOverConsumption"
        :is-initial-value="isInitialSituation"
        :initial-value="initialPerformanceIndicators.totalOverConsumption"
      />
      <ResultsSituationDisplayIndicatorsIndicator
        indicator-name-i18n-key="results.performanceIndicators.totalSoldEnergy"
        :indicator-value="performanceIndicators.totalSoldEnergy"
        :is-initial-value="isInitialSituation"
        :initial-value="initialPerformanceIndicators.totalSoldEnergy"
      />
      <ResultsSituationDisplayIndicatorsIndicator
        indicator-name-i18n-key="results.performanceIndicators.totalStoredEnergy"
        :indicator-value="performanceIndicators.totalStoredEnergy"
        :is-initial-value="isInitialSituation"
        :initial-value="initialPerformanceIndicators.totalStoredEnergy"
        :reverse-color-indicators="true"
      />
    </div>
    <div class="line" />
    <div class="indicators-section">
      <h3 class="indicators-section-title">
        {{ $t("results.sections.production") }}
      </h3>
      <ResultsSituationDisplayIndicatorsIndicator
        indicator-name-i18n-key="results.performanceIndicators.totalProduction"
        :indicator-value="performanceIndicators.totalProduction"
        :is-initial-value="isInitialSituation"
        :initial-value="initialPerformanceIndicators.totalProduction"
      />
      <ResultsSituationDisplayIndicatorsIndicator
        indicator-name-i18n-key="results.performanceIndicators.totalBoughtEnergy"
        :indicator-value="performanceIndicators.totalBoughtEnergy"
        :is-initial-value="isInitialSituation"
        :initial-value="initialPerformanceIndicators.totalBoughtEnergy"
      />
      <ResultsSituationDisplayIndicatorsIndicator
        indicator-name-i18n-key="results.performanceIndicators.totalUsedStoredEnergy"
        :indicator-value="performanceIndicators.totalUsedStoredEnergy"
        :is-initial-value="isInitialSituation"
        :initial-value="initialPerformanceIndicators.totalUsedStoredEnergy"
        :reverse-color-indicators="true"
      />
    </div>
    <div class="line" />
    <div class="indicators-section">
      <h3 class="indicators-section-title">
        {{ $t("results.sections.ratios") }}
      </h3>
      <ResultsSituationDisplayIndicatorsRate
        ratio-name-i18n-key="results.performanceIndicators.ratios.selfConsumptionRatio"
        :ratio-value="performanceIndicators.selfConsumptionRatio"
      />
      <ResultsSituationDisplayIndicatorsRate
        ratio-name-i18n-key="results.performanceIndicators.ratios.selfProductionRatio"
        :ratio-value="performanceIndicators.selfProductionRatio"
      />
    </div>
  </div>
</template>

<style lang="scss">
    @import "../styles/components/resultsSituationDisplayIndicators.scss";
</style>
