<script setup lang="ts">
    import { ResultsPerformanceIndicators } from '../types/Results';
    import ResultsSituationDisplayIndicators from './ResultsSituationDisplayIndicators.vue';
</script>

<template>
    <section class="">
        <div class="">
            <h2>{{ situationName }}</h2>
        </div>
        <div>
            <p>{{ situationDescription }}</p>
        </div>
        <ResultsSituationDisplayIndicators
            :performanceIndicators="performanceIndicators"/>
    </section>
</template>

<script lang="ts">
    export default {
        name: "ResultsSituationDisplay",
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
                required: true,}
        },
        computed: {
            situationName(): string {
                return this.$t(this.situationNameI18nKey);
            },
            situationDescription(): string {
                return this.$t(this.situationDescriptionI18nKey);
            },
        },
    }
</script>
