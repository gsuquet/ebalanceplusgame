<script setup lang="ts">
    import { ResultsPerformanceIndicators } from '../types/Results';
    import ResultsSituationDisplayIndicatorsIndicator from './ResultsSituationDisplayIndicatorsIndicator.vue';
import ResultsSituationDisplayIndicatorsRate from './ResultsSituationDisplayIndicatorsRate.vue';
</script>

<template>
    <div class="indicators">
        <div class="line"/>
        <div class="indicators-section">
            <h3 class="indicators-section-title">{{ $t("results.sections.consumption") }}</h3>
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
        <div class="indicators-section">
            <h3 class="indicators-section-title">{{ $t("results.sections.production") }}</h3>
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
        <div class="indicators-section">
            <h3 class="indicators-section-title">{{ $t("results.sections.ratios") }}</h3>
            <ResultsSituationDisplayIndicatorsRate
                ratioNameI18nKey="results.performanceIndicators.ratios.selfConsumptionRatio"
                :ratioValue="performanceIndicators.selfConsumptionRatio"/>
            <ResultsSituationDisplayIndicatorsRate
                ratioNameI18nKey="results.performanceIndicators.ratios.selfProductionRatio"
                :ratioValue="performanceIndicators.selfProductionRatio"/>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../styles/components/resultsSituationDisplayIndicators.scss";
</style>

<script lang="ts">
    export default {
        name: "ResultsSituationDisplayIndicators",
        components: {
    ResultsSituationDisplayIndicatorsIndicator,
    ResultsSituationDisplayIndicatorsRate
},
        props: {
            performanceIndicators: {
                type: Object as () => ResultsPerformanceIndicators,
                required: true,
            }
        }
    }
</script>
