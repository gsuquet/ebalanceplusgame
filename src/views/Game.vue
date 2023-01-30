<script setup lang="ts">
import Alert from '../components/Alert.vue';
import Board from '../components/Board.vue';
import EquipementList from '../components/EquipementList.vue';
import { useConsumptionStore } from '../stores/ConsumptionStore';
import { useBoardStore } from '../stores/BoardStore';
import BoardConsumptionDetails from '../components/BoardConsumptionDetails.vue';
const consumptionStore = useConsumptionStore();
const boardStore = useBoardStore();
const gameParametersStore = useGameParametersStore();
gameParametersStore.setProductionCurve('0');
const testConsumption = { 
    id: '0', startIndex: 1, endIndex: 4, amount: 1000, color: '#00737D', equipment: {
        id:0,
        type_fr: 'Lave-vaisselle',
        type_en: 'Dishwasher',
        energy_class: 'A',
        conso:1000,
        points:0,
        price:0,
        name_icon: 'mdi:dishwasher',
        point_gap:0,
        price_gap:0}};
const testConsumption2 = { id: "1", startIndex: 2, endIndex: 6, amount: 500, color: '#5BA7A9', equipment: {id:1, type_fr: 'Machine à laver', type_en: 'Washing machine', energy_class: 'A',conso:500,points:0,price:0, name_icon: 'mdi:washing-machine',point_gap:[0],price_gap:[0]} };
const testConsumption3 = { id: "2", startIndex: 7, endIndex: 7, amount: 1500, color: '#7d4800', equipment: {id:2, type_fr: 'Lave-vaisselle', type_en: 'Dishwasher', energy_class: 'A',conso:1500,points:0,price:0, name_icon: 'mdi:dishwasher',point_gap:[0],price_gap:[0]} };
function addConsumption() {
    consumptionStore.addToConsumptionList(testConsumption);
    consumptionStore.addToConsumptionList(testConsumption2);
    consumptionStore.addToConsumptionList(testConsumption3);
    boardStore.setTilesFromConsumptionList();
}
</script>

<template>
    <div id="game-page" class="vue">
        <Alert
            :should-display="consumptionStore.isOverConsumption"
            alert-class="danger-alert"
            alert-text="Votre demande dépasse la production !"/>
        <EquipementList />
        <button @click="addConsumption()">Add Test Consumption</button>
        <Board
            :board-width="boardStore.board.width"
            :board-height="boardStore.board.height"
            :px-size-for15m="boardStore.tileParams.pxSizeFor15min"
            :px-size-for10-w="boardStore.tileParams.pxSizeFor10W"
            :tiles-list="boardStore.board.tiles"
            :production-curve="gameParametersStore.productionCurve.data"/>
        <BoardConsumptionDetails 
            v-if="boardStore.clickedTile"
            :consumption="consumptionStore.getConsumptionById(boardStore.clickedTile.id)"/>
    </div>
</template>
