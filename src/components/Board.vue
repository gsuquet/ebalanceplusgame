<script setup lang="ts">
import { useGameParametersStore } from '../stores/GameParametersStore';
import { useConsumptionStore } from '../stores/ConsumptionStore';
const gameParametersStore = useGameParametersStore();
const consumptionStore = useConsumptionStore();
gameParametersStore.setProductionCurve("0");
consumptionStore.addToConsumptionCurve(0,2);
consumptionStore.addToConsumptionCurve(1,0);
</script>

<template>
    <section id="board">
        <div>
            <div>
                <h1>Production Curve</h1>
                <p>{{gameParametersStore.productionCurve.data}}</p>
            </div>
            <div>
                <h1>Consumption Curve</h1>
                <p>{{consumptionStore.consumptionCurve.consumption}}</p>
            </div>
            <div>
                <h1>Over Consumption Curve</h1>
                <button @click="consumptionStore.getListOfOverConsumption()">Get OverConsumption</button>
                <p>{{consumptionStore.overConsumptionMap}}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
    export default {
        props: {
            width: Number,
            height: Number,
        }
    }
</script>
