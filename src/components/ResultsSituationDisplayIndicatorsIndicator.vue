<script setup lang="ts">
    import { convertWattsPer15minToWattsPerHour, convertWattsPer15minToKilowattsPerHour } from '../helpers/power'  
</script>

<template>
    <div class="indicator-container">
        <div class="indicator-name">
            <h4>{{ indicatorName }}</h4>
        </div>
        <div class="indicator-value">
            <p>{{ indicatorValueWithUnit }}</p>
        </div>
        <div class="indicator-unit-switch">
            <div class="indicator-unit-switch-container">
                <button
                    class="indicator-unit-switch-button"
                    :class="{ 'indicator-unit-switch-button-active': isUnitWh }"
                    @click="switchUnitToWh">
                    <p>{{ unitWh }}</p>
                </button>
                <button
                    class="indicator-unit-switch-button"
                    :class="{ 'indicator-unit-switch-button-active': !isUnitWh }"
                    @click="switchUnitToKwh">
                    <p>{{ unitKWh }}</p>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "ResultsSituationDisplayIndicatorsIndicator",
        props: {
            indicatorNameI18nKey: {
                type: String,
                required: true,
            },
            indicatorValue: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                unitWh: "W/h",
                unitKWh: "kW/h",
                isUnitWh: true,
            };
        },
        computed: {
            indicatorName(): string {
                return this.$t(this.indicatorNameI18nKey);
            },
            indicatorValueWithUnit(): number {
                return this.isUnitWh ? convertWattsPer15minToWattsPerHour(this.indicatorValue) : convertWattsPer15minToKilowattsPerHour(this.indicatorValue);
            },
        },
        methods: {
            switchUnitToWh(): void {
                this.isUnitWh = true;
            },
            switchUnitToKwh(): void {
                this.isUnitWh = false;
            },
        },
    }
</script>
