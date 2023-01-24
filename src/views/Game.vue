<script setup lang="ts">
import Alert from '../components/Alert.vue';
import Board from '../components/Board.vue';
import { useConsumptionStore } from '../stores/ConsumptionStore';
const consumptionStore = useConsumptionStore();
</script>

<template>
    <Alert :should-display="consumptionStore.isOverConsumption"
        alert-class="danger-alert"
        alert-text="Votre demande dépasse la production !"/>
    <Board />
</template>

