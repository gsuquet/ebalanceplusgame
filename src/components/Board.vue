<script setup lang="ts">
import Canvas from '../components/Canvas.vue';
import { Tile } from '../stores/BoardStore';
</script>

<template>
    <section id="board">
        <Canvas :canvas-id="canvasId" :width="canvasWidth" :height="canvasHeight"/>
        <button @click="clearCanvas(0,0,canvasWidth, canvasHeight)">Clear Canvas</button>
        <button @click="drawTilesConsumption(tiles)">Draw Consumption</button>
    </section>
</template>

<script lang="ts">
    export default {
        name: 'Board',
        props: {
            boardWidth: Number,
            boardHeight: Number,
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
            boardWidth : {
                handler(newWidth) {
                    this.canvasWidth=newWidth
                },
                immediate: true
            },
            boardHeight : {
                handler(newHeight) {
                    this.canvasHeight=newHeight
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
