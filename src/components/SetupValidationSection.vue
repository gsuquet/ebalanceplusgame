<script setup lang="ts">
    import { useProductionStore } from '../stores/ProductionStore';
    import { useScenarioStore } from '../stores/ScenarioStore';
    import { useGameParametersStore } from '../stores/GameParametersStore';
</script>

<template>
    <section class="validation-section">
        <h2 class="section-title">{{ $t("setup.launchNewGame") }}</h2>
        <p class="description">
            {{ $t("setup.setupExplanation") }}
        </p>
        <div class="btn-container">
            <button
                class="btn random-btn"
                @click="gameParametersStore.setRandomProductionCurveAndScenario()">
                <Router-Link to="/game">
                    {{ $t("button.random") }}
                </Router-Link>
            </button>
            <button
                class="btn play-btn"
                @click="gameParametersStore.setProductionCurveAndScenario(productionStore.clickedProductionCurve, scenarioStore.clickedScenario)">
                <Router-Link to="/game">
                    {{ $t("button.play") }}
                </Router-Link>
            </button>
        </div>
    </section>
</template>

<style lang="scss">
    @import "../styles/components/setupValidationSection.scss";
</style>

<script lang="ts">
    const productionStore = useProductionStore();
    const scenarioStore = useScenarioStore();
    const gameParametersStore = useGameParametersStore();
    export default {
        name: 'SetupValidationSection',
        methods:{

        }
    }
</script>
