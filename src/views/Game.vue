<script setup lang="ts">
import Alert from '../components/Alert.vue';
import Board from '../components/Board.vue';
import { useConsumptionStore } from '../stores/ConsumptionStore';
import { useBoardStore } from '../stores/BoardStore';
const consumptionStore = useConsumptionStore();
const boardStore = useBoardStore();
const gameParametersStore = useGameParametersStore();
gameParametersStore.setProductionCurve('0');
const testConsumption = { id: "0", startIndex: 1, endIndex: 4, amount: 1000, color: '#00737D' }
const testConsumption2 = { id: "1", startIndex: 2, endIndex: 6, amount: 900, color: '#5BA7A9' }
const testConsumption3 = { id: "2", startIndex: 7, endIndex: 7, amount: 1500, color: '#7d4800' }
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
                <p>{{consumptionStore.overConsumptionMap}}</p>
            </div>
            <button @click="addConsumption()">Add Test Consumption</button>
        </div>
        <Board
            :board-width="boardStore.board.width"
            :board-height="boardStore.board.height"
            :px-size-for15m="boardStore.tileParams.pxSizeFor15min"
            :px-size-for10-w="boardStore.tileParams.pxSizeFor10W"
            :tiles="boardStore.board.tiles"
            :production-curve-points="gameParametersStore.productionCurve.data"/>
    </div>
</template>
