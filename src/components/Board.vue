<script setup lang="ts">
import Canvas from '../components/Canvas.vue';
import { Tile, useBoardStore } from '../stores/BoardStore';
import { ProductionCurve } from '../stores/ProductionStore';
</script>

<template>
    <section id="game-board" class="board">
        <Canvas
            :canvas-id="canvasId"
            :width="canvasWidth"
            :height="canvasHeight"
            @click="canvasClick"
            @mousemove="canvasMouseMove"/>
    </section>
</template>

<style lang="scss">
@import '../styles/components/board.scss';
</style>

<script lang="ts">
    const boardStore = useBoardStore();
    export default {
        name: 'Board',
        props: {
            boardWidth: Number,
            boardHeight: Number,
            pxSizeFor15m: Number,
            pxSizeFor10W: Number,
            productionCurveProps: null,
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
                productionCurve: null as ProductionCurve | null,
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
                const clickedTile = this.tiles.filter((tile: Tile) => this.isInsideTile(x, y, tile));
                if(clickedTile.length){
                    boardStore.setClickedTile(clickedTile[0]);
                } else{
                    boardStore.setClickedTile(null);
                }
            },
            canvasMouseMove(event: MouseEvent) {
                const x = event.offsetX;
                const y = event.offsetY;
                this.lastPosition = { x, y };
            },
            clearCanvas(startX: number, startY: number, endX: number, endY: number) {
                if(this.canvas){
                    this.canvas.clearRect(startX,startY,endX,endY);
                }
            },
            drawTilesConsumption(tiles:Tile[]) {
                for(const tile of tiles){
                    this.drawRectangle(tile.x,tile.y,tile.width,tile.height,tile.color)
                }
            },
            drawRectangle(x: number, y: number, width: number, height: number, color:string) {
                if(this.canvas){
                    this.canvas.fillStyle = color;
                    this.canvas.fillRect(x, y, width, height);
                }
            },
            drawProductionCurve(productionCurve: ProductionCurve | null) {
                if(productionCurve){
                    const pxSize = this.pxSizeFor10W ? this.pxSizeFor10W : 5;
                    if(productionCurve.solar.length>0){
                        this.drawCurve(this.getPointsInPixels(productionCurve.solar,pxSize), 'yellow');
                    }
                    if(productionCurve.wind.length>0){
                        this.drawCurve(this.getPointsInPixels(productionCurve.wind,pxSize), 'green');
                    }
                    if(productionCurve.hydro.length>0){
                        this.drawCurve(this.getPointsInPixels(productionCurve.hydro,pxSize), 'blue');
                    }
                    if(productionCurve.total.length>0){
                        this.drawCurve(this.getPointsInPixels(productionCurve.total,pxSize), 'black');
                    }
                }
            },
            getPointsInPixels(points: number[], pxSize: number) {
                let pointsInPixels = [];
                for(const point of points) {
                    pointsInPixels.push(point*pxSize/10);
                }
                return pointsInPixels;
            },
            drawKWLines() {
                const ySize = (this.pxSizeFor10W ? this.pxSizeFor10W : 5)*100;
                let y=0;
                for(let i =0; i<(this.canvasHeight/ySize); i++) {
                    this.drawLine(0,y,this.canvasWidth,y, '#DBEBE7');
                    y=y+ySize;
                }
            },
            drawHoursLines() {
                const xSize = this.pxSizeFor15m ? this.pxSizeFor15m : 15;
                let x=0;
                for(let i =0; i<=24; i++) {
                    this.drawLine(x,0,x,this.canvasHeight, '#DBEBE7');
                    x=x+xSize*4;
                }
            },
            drawCurve(points: number[], color: string){
                const xSize = this.pxSizeFor15m ? this.pxSizeFor15m : 15;
                let x=0;
                for(let i =0; i<points.length-1; i++) {
                    this.drawLine(x,this.canvasHeight-points[i],x+xSize,this.canvasHeight-points[i+1], color);
                    x=x+xSize;
                }
            },
            drawLine(startX: number, startY: number, endX: number, endY: number, color: string) {
                if(this.canvas){
                    this.canvas.strokeStyle = color;
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
                this.drawHoursLines();
                this.drawKWLines();
                this.drawTilesConsumption(this.tiles);
                this.drawProductionCurve(this.productionCurve);
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
            productionCurveProps : {
                handler(newProductionCurve) {
                    this.productionCurve=newProductionCurve;
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
