<script setup lang="ts">
    import { ResultsPerformanceIndicators } from '../types/Results';
    import ResultsSituationDisplayIndicatorsIndicator from './ResultsSituationDisplayIndicatorsIndicator.vue';
</script>

<template>
    <div>
        <div class="line"/>
        <div>
            <h3>Consumption</h3>
            <ResultsSituationDisplayIndicatorsIndicator
                indicatorNameI18nKey="results.performanceIndicators.totalConsumption"
                :indicatorValue="performanceIndicators.totalConsumption"/>
            <ResultsSituationDisplayIndicatorsIndicator
                indicatorNameI18nKey="results.performanceIndicators.totalOverConsumption"
                :indicatorValue="performanceIndicators.totalOverConsumption"/>
            <ResultsSituationDisplayIndicatorsIndicator
                indicatorNameI18nKey="results.performanceIndicators.totalSoldEnergy"
                :indicatorValue="performanceIndicators.totalSoldEnergy"/>
            <ResultsSituationDisplayIndicatorsIndicator
                indicatorNameI18nKey="results.performanceIndicators.totalStoredEnergy"
                :indicatorValue="performanceIndicators.totalStoredEnergy"/>
        </div>
        <div class="line"/>
        <div>
            <h3>Production</h3>
            <ResultsSituationDisplayIndicatorsIndicator
                indicatorNameI18nKey="results.performanceIndicators.totalProduction"
                :indicatorValue="performanceIndicators.totalProduction"/>
            <ResultsSituationDisplayIndicatorsIndicator
                indicatorNameI18nKey="results.performanceIndicators.totalBoughtEnergy"
                :indicatorValue="performanceIndicators.totalBoughtEnergy"/>
            <ResultsSituationDisplayIndicatorsIndicator
                indicatorNameI18nKey="results.performanceIndicators.totalUsedStoredEnergy"
                :indicatorValue="performanceIndicators.totalUsedStoredEnergy"/>
        </div>
        <div class="line"/>
        <div>
            <h3>Ratios</h3>
            
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "ResultsSituationDisplayIndicators",
        components: {
            ResultsSituationDisplayIndicatorsIndicator,
        },
        props: {
            performanceIndicators: {
                type: Object as () => ResultsPerformanceIndicators,
                required: true,
            }
        }
    }
</script>
