<script setup lang="ts">
import ResultsSituationDisplay from '../components/ResultsSituationDisplay.vue';

    useResultsStore().setFinalSituationPerformanceIndicators();
</script>

<template>
    <div id="results-page" class="view">
        <ResultsSituationDisplay
            situationNameI18nKey="results.situations.initialSituation.name"
            situationDescriptionI18nKey="results.situations.initialSituation.description"
            :performanceIndicators="resultsStore.getInitialSituationPerformanceIndicators"/>
        <ResultsSituationDisplay
            situationNameI18nKey="results.situations.finalSituation.name"
            situationDescriptionI18nKey="results.situations.finalSituation.description"
            :performanceIndicators="resultsStore.getFinalSituationPerformanceIndicators"/>
    </div>
</template>

<script lang="ts">
    export default {
    name: "Results",
    components: { ResultsSituationDisplay },
    data() {
        return {
            resultsStore: useResultsStore(),
        };
    },
}
</script>
