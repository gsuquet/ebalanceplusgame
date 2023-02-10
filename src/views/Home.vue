<script setup lang="ts">
import { useGameParametersStore } from '../stores/GameParametersStore';
import { useConsumptionStore } from '../stores/ConsumptionStore';
import { useProductionStore } from '../stores/ProductionStore';
import { useEquipmentStore } from '../stores/EquipmentStore';
import { useScenarioStore } from '../stores/ScenarioStore';
import { useEnergyStore } from '../stores/EnergyStore';
import { useBoardStore } from '../stores/BoardStore';
import HomeCreateGame from '../components/HomeCreateGame.vue';
const gameParametersStore = useGameParametersStore();
const consumptionStore = useConsumptionStore();
const productionStore = useProductionStore();
const equipmentStore = useEquipmentStore();
const scenarioStore = useScenarioStore();
const energyStore = useEnergyStore();
const boardStore = useBoardStore();
gameParametersStore.$reset();
consumptionStore.$reset();
productionStore.$reset();
equipmentStore.$reset();
scenarioStore.$reset();
energyStore.$reset();
boardStore.$reset();
gameParametersStore.setLanguageFromBrowser();
gameParametersStore.generateGameId();
</script>

<template>
    <div id="home-page" class="view">
        <HomeCreateGame />
    </div>
</template>
