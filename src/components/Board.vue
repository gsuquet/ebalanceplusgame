<script setup lang="ts">
import Canvas from '../components/Canvas.vue';
import { useGameParametersStore } from '../stores/GameParametersStore';
import { useConsumptionStore } from '../stores/ConsumptionStore';
import { useBoardStore, Tile} from '../stores/BoardStore';
const gameParametersStore = useGameParametersStore();
const consumptionStore = useConsumptionStore();
const boardStore = useBoardStore();
gameParametersStore.setProductionCurve('0');
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
        <Canvas :canvas-id="canvasId" :width="boardStore.board.width" :height="boardStore.board.height"/>
        <button @click="clearCanvas(0,0,boardStore.board.width, boardStore.board.height)">Clear Canvas</button>
        <button @click="drawTilesConsumption(tiles)">Draw Consumption</button>
    </section>
</template>

<script lang="ts">
    export default {
        name: 'Board',
        props: {
            tiles: Tile[]
        },
        components: {
            Canvas
        },
        data() {
            return {
                canvasId: 'canvas',
                canvas: null as CanvasRenderingContext2D | null
            };
        },
        mounted() {
            const canvasHTMLElement = document.getElementById(this.canvasId) as HTMLCanvasElement | null;
            if(canvasHTMLElement){
                const ctx = canvasHTMLElement.getContext("2d");    
                this.canvas = ctx;
            }
        },
        methods: {
            clearCanvas(startX: number, startY: number, endX: number, endY: number) {
                if(this.canvas){
                    this.canvas.clearRect(startX,startY,endX,endY);
                }
            },
            drawTilesConsumption(tiles:Tile[]) {
                for(const tile of tiles){
                    this.drawConsumption(tile.x,tile.y,tile.width,tile.height,tile.color)
                }
            },
            drawConsumption(x: number, y: number, width: number, height: number, color:string) {
                if(this.canvas){
                    this.canvas.fillStyle = color;
                    this.canvas.fillRect(x, y, width, height);
                }
            },
            drawProduction(startX: number, startY: number, endX: number, endY: number) {
                if(this.canvas){
                    this.canvas.beginPath();
                    this.canvas.moveTo(startX, startY);
                    this.canvas.lineTo(endX, endY);
                    this.canvas.stroke();
                }
            }
        },
        watch: {
             tiles : {
                handler(newTiles) {
                    this.clearCanvas(0,0,boardStore.board.width,boardStore.board.height);
                    this.drawTilesConsumption(newTiles);
                },
                immediate: true
             }
        }
    };
</script>
