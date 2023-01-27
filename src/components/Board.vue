<script setup lang="ts">
import Canvas from '../components/Canvas.vue';
import { Tile } from '../stores/BoardStore';
</script>

<template>
    <section id="game-board" class="board">
        <Canvas :canvas-id="canvasId" :width="canvasWidth" :height="canvasHeight"/>
        <button @click="clearCanvas(0,0,canvasWidth, canvasHeight)">Clear Canvas</button>
        <button @click="drawTilesConsumption(tiles)">Draw Consumption</button>
    </section>
</template>

<style lang="scss">
@import '../styles/components/board.scss';
</style>

<script lang="ts">
    export default {
        name: 'Board',
        props: {
            boardWidth: Number,
            boardHeight: Number,
            pxSizeFor15m: Number,
            pxSizeFor10W: Number,
            productionCurvePoints: null,
            tiles: null
        },
        components: {
            Canvas
        },
        data() {
            return {
                canvasId: 'canvas',
                canvas: null as CanvasRenderingContext2D | null,
                canvasWidth: 1440,
                canvasHeight: 1500
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
                // TODO : Un-comment this line when production curve is ready
                //this.drawProductionCurve(this.productionCurvePoints);
            },
            drawConsumption(x: number, y: number, width: number, height: number, color:string) {
                if(this.canvas){
                    this.canvas.fillStyle = color;
                    this.canvas.fillRect(x, y, width, height);
                }
            },
            drawProductionCurve(points:number[]) {
                const xSize = this.pxSizeFor15m ? this.pxSizeFor15m : 15;
                const pxSize = this.pxSizeFor10W ? this.pxSizeFor10W : 5;
                const pointsInPx = points.map((point: number) => (point*pxSize)/10);
                let x=0;
                for(let i =0; i<pointsInPx.length-1; i++) {
                    this.drawProduction(x,this.canvasHeight-pointsInPx[i],x+xSize,this.canvasHeight-pointsInPx[i+1]);
                    x=x+xSize;
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
            boardWidth : {
                handler(newWidth) {
                    this.canvasWidth=newWidth;
                },
                immediate: true
            },
            boardHeight : {
                handler(newHeight) {
                    this.canvasHeight=newHeight;
                },
                immediate: true
            },
            productionCurvePoints : {
                handler(newProductionCurvePoints) {
                    this.drawProductionCurve(newProductionCurvePoints);
                },
                immediate: true
            },
            tiles : {
                handler(newTiles) {
                    this.clearCanvas(0,0,this.canvasWidth,this.canvasHeight);
                    this.drawTilesConsumption(newTiles);
                },
                immediate: true
            }
        }
    };
</script>
