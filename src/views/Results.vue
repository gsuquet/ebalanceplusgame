<script setup lang="ts">
import ResultsSituationDisplay from '../components/ResultsSituationDisplay.vue'

useResultsStore().setFinalSituationPerformanceIndicators()
</script>

<script lang="ts">
export default {
  name: 'Results',
  components: { ResultsSituationDisplay },
  data() {
    return {
      resultsStore: useResultsStore(),
    }
  },
}
</script>

<template>
  <div id="results-page" class="view">
    <div class="results-situations-container">
      <ResultsSituationDisplay
        situation-name-i18n-key="results.situations.initialSituation.name"
        situation-description-i18n-key="results.situations.initialSituation.description"
        :is-initial-situation="true"
        :performance-indicators="resultsStore.getInitialSituationPerformanceIndicators"
      />
      <ResultsSituationDisplay
        situation-name-i18n-key="results.situations.finalSituation.name"
        situation-description-i18n-key="results.situations.finalSituation.description"
        :is-initial-situation="false"
        :performance-indicators="resultsStore.getFinalSituationPerformanceIndicators"
        :initial-performance-indicators="resultsStore.getInitialSituationPerformanceIndicators"
      />
    </div>
  </div>
</template>

<style lang="scss">
    @import "../styles/views/results.scss";
</style>
