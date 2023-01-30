<script setup lang="ts">
import Canvas from '../components/Canvas.vue';
import { Tile } from '../stores/BoardStore';
</script>

<template>
    <section id="game-board" class="board">
        <Canvas
            :canvas-id="canvasId"
            :width="canvasWidth"
            :height="canvasHeight"
            @click="canvasClick"
            @mousemove="canvasMouseMove"/>
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
            productionCurve: null,
            tilesList: null
        },
        components: {
            Canvas
        },
        data() {
            return {
                canvasId: 'canvas',
                canvas: null as CanvasRenderingContext2D | null,
                canvasWidth: 1440,
                canvasHeight: 1500,
                lastPosition: { x: 0, y: 0 } as { x: number, y: number },
                productionCurvePoints: [] as number[],
                tiles: [] as Tile[]
            };
        },
        mounted() {
            const canvasHTMLElement = document.getElementById(this.canvasId) as HTMLCanvasElement | null;
            if(canvasHTMLElement){
                const ctx = canvasHTMLElement.getContext("2d");    
                this.canvas = ctx;
            }
            this.render();
        },
        methods: {
            canvasClick(event: MouseEvent) {
                const x = event.offsetX;
                const y = event.offsetY;
                console.log(`x: ${x}, y: ${y}`);
                const clickedTile = this.tiles.filter((tile: Tile) => this.isInsideTile(x, y, tile));
                if(clickedTile.length){
                    console.log(clickedTile[0]);
                }
            },
            canvasMouseMove(event: MouseEvent) {
                const x = event.offsetX;
                const y = event.offsetY;
                this.lastPosition = { x, y };
                this.render();
            },
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
            },
            isInsideTile(x: number, y: number, tile: Tile) {
                return (x >= tile.x && x <= tile.x + tile.width) && (y >= tile.y && y <= tile.y + tile.height);
            },
            render() {
                this.clearCanvas(0,0,this.canvasWidth,this.canvasHeight);
                this.drawTilesConsumption(this.tiles);
                this.drawProductionCurve(this.productionCurvePoints);
            }
        },
        watch: {
            boardWidth : {
                handler(newWidth) {
                    this.canvasWidth=newWidth;
                    this.render();
                },
                immediate: true
            },
            boardHeight : {
                handler(newHeight) {
                    this.canvasHeight=newHeight;
                    this.render();
                },
                immediate: true
            },
            productionCurve : {
                handler(newProductionCurvePoints) {
                    this.productionCurvePoints=newProductionCurvePoints;
                    this.render();
                },
                immediate: true
            },
            tilesList : {
                handler(newTiles) {
                    this.tiles=newTiles;
                    this.render();
                },
                immediate: true
            }
        }
    };
</script>
