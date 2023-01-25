<script setup lang="ts">
import Alert from '../components/Alert.vue';
import Board from '../components/Board.vue';
import { useConsumptionStore } from '../stores/ConsumptionStore';
import { useBoardStore } from '../stores/BoardStore';
const consumptionStore = useConsumptionStore();
const boardStore = useBoardStore();
</script>

<template>
    <Alert :should-display="consumptionStore.isOverConsumption"
        alert-class="danger-alert"
        alert-text="Votre demande dépasse la production !"/>
    <Board :tiles="boardStore.board.tiles"/>
</template>

