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
    <Board :board-width="boardStore.board.width" :board-height="boardStore.board.height" :tiles="boardStore.board.tiles"/>
</template>

