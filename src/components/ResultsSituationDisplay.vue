<script setup lang="ts">
import { emptyResultsPerformanceIndicators } from '../assets/entityEmptyResults'
import type { ResultsPerformanceIndicators } from '../types/Results'
import ResultsSituationDisplayIndicators from './ResultsSituationDisplayIndicators.vue'
</script>

<script lang="ts">
export default {
  name: 'ResultsSituationDisplay',
  components: {
    ResultsSituationDisplayIndicators,
  },
  props: {
    situationNameI18nKey: {
      type: String,
      required: true,
    },
    situationDescriptionI18nKey: {
      type: String,
      required: true,
    },
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
  computed: {
    situationName(): string {
      return this.$t(this.situationNameI18nKey)
    },
    situationDescription(): string {
      return this.$t(this.situationDescriptionI18nKey)
    },
  },
}
</script>

<template>
  <section class="results-situation-display">
    <div class="situation-title">
      <h2>{{ situationName }}</h2>
    </div>
    <div class="situation-description">
      <p>{{ situationDescription }}</p>
    </div>
    <ResultsSituationDisplayIndicators
      :performance-indicators="performanceIndicators"
      :is-initial-situation="isInitialSituation"
      :initial-performance-indicators="initialPerformanceIndicators"
    />
  </section>
</template>

<style lang="scss">
    @import "../styles/components/resultsSituationDisplay.scss";
</style>
