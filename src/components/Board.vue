<script setup lang="ts">
import Canvas from '../components/Canvas.vue';
import { useGameParametersStore } from '../stores/GameParametersStore';
import { useConsumptionStore } from '../stores/ConsumptionStore';
const gameParametersStore = useGameParametersStore();
const consumptionStore = useConsumptionStore();
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
        <Canvas :canvas-id="canvasId" :width="width" :height="height"/>
        <button @click="clearCanvas()">Clear Canvas</button>
        <button @click="drawConsumption(0,1400,15,100,'red')">Draw Consumption</button>
        <button @click="drawConsumption(15,1000,60,500,'blue')">Draw Consumption 2</button>
        <button @click="drawConsumption(0,800,15,600,'green')">Draw Consumption 3</button>
    </section>
</template>

<script lang="ts">
    export default {
        name: 'Board',
        components: {
            Canvas
        },
        data() {
            return {
                canvasId: 'canvas',
                width: 1500,
                height: 1500,
                canvas: null as CanvasRenderingContext2D | null,
            };
        },
        mounted() {
            const c = document.getElementById(this.canvasId) as HTMLCanvasElement | null;
            if(c){
                const ctx = c.getContext("2d");    
                this.canvas = ctx;
            }
        },
        methods: {
            clearCanvas() {
                if(this.canvas){
                    this.canvas.clearRect(0, 0, this.width, this.height);
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
        }
    };
</script>
