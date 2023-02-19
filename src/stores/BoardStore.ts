import { defineStore } from 'pinia';
import { Consumption } from '../types/Consumption';
import { Board, Tile, TileParams } from '../types/Board';
import { convertValueToPixels, convertValuesListToPixelsList } from '../helpers/drawInPixels';

export const useBoardStore = defineStore({
    id: 'BoardStore',
    state: () => {
        return {
            board: {
                width: 1440,
                height: 1500,
                isProductionCurveSmoothed: true,
                consumptionTiles: [],
                productionTiles: []
            } as Board,
            tileParams: {
                pxSizeFor10W: 5,
                pxSizeFor15min: 15,
            } as TileParams,
            clickedTile: null as Tile | null
        };
    },
    actions: {
        setTilesFromConsumptionList() {
            const tiles: Tile[] = [];
            const occupiedSlotHeightsOnBoardByIndex: number[] = new Array(96).fill(0);
            const consumptionList = useConsumptionStore().getConsumptionListSortedByStartIndex;
            for (const consumption of consumptionList) {
                let consumptionYValuesList: number[] = [];
                let lastCreatedTileIndex = 0;
                let storedYValue = 0;
                let consumptionHeight = convertValueToPixels(consumption.amount, this.tileParams.pxSizeFor10W, 10);
                for (let i=consumption.startIndex; i<=consumption.endIndex; i++) {
                    occupiedSlotHeightsOnBoardByIndex[i] += consumptionHeight;
                    consumptionYValuesList.push(occupiedSlotHeightsOnBoardByIndex[i]);
                }
                storedYValue = consumptionYValuesList[0];
                for (const yValue of consumptionYValuesList) {
                    if (yValue !== storedYValue) {
                        tiles.push(
                            this.generateTile(
                                consumption,
                                consumption.startIndex+lastCreatedTileIndex,
                                consumption.startIndex+lastCreatedTileIndex+consumptionYValuesList.indexOf(yValue)-1,
                                (this.board.height+consumptionHeight) - storedYValue
                            ));
                        lastCreatedTileIndex = consumptionYValuesList.indexOf(yValue);
                    }
                    storedYValue = yValue;
                }
                if (lastCreatedTileIndex !== consumptionYValuesList.length-1 || consumptionYValuesList.length === 1) {
                    tiles.push(
                        this.generateTile(
                            consumption,
                            consumption.startIndex+lastCreatedTileIndex,
                            consumption.endIndex,
                            (this.board.height+consumptionHeight) - storedYValue
                        ));
                }
            };
            this.board.consumptionTiles = tiles;
        },
        TilesFromConsumption(consumptionList: Consumption[]){
            const tiles: Tile[] = [];
            const occupiedSlotHeightsOnBoardByIndex: number[] = new Array(96).fill(0);
            for (const consumption of consumptionList) {
                let consumptionYValuesList: number[] = [];
                let lastCreatedTileIndex = 0;
                let storedYValue = 0;
                let consumptionHeight = convertValueToPixels(consumption.amount, this.tileParams.pxSizeFor10W, 10);
                for (let i=consumption.startIndex; i<=consumption.endIndex; i++) {
                    occupiedSlotHeightsOnBoardByIndex[i] += consumptionHeight;
                    consumptionYValuesList.push(occupiedSlotHeightsOnBoardByIndex[i]);
                }
                storedYValue = consumptionYValuesList[0];
                for (const yValue of consumptionYValuesList) {
                    if (yValue !== storedYValue) {
                        tiles.push(
                            this.generateTile(
                                consumption,
                                consumption.startIndex+lastCreatedTileIndex,
                                consumption.startIndex+lastCreatedTileIndex+consumptionYValuesList.indexOf(yValue)-1,
                                (this.board.height+consumptionHeight) - storedYValue
                            ));
                        lastCreatedTileIndex = consumptionYValuesList.indexOf(yValue);
                    }
                    storedYValue = yValue;
                }
                if (lastCreatedTileIndex !== consumptionYValuesList.length-1 || consumptionYValuesList.length === 1) {
                    tiles.push(
                        this.generateTile(
                            consumption,
                            consumption.startIndex+lastCreatedTileIndex,
                            consumption.endIndex,
                            (this.board.height+consumptionHeight) - storedYValue
                        ));
                }
            };
            this.board.consumptionTiles = tiles;
        },


        generateTile(consumption: Consumption, startIndex: number, endIndex: number, y: number) {
            const height = convertValueToPixels(consumption.amount, this.tileParams.pxSizeFor10W, 10);
            return {
                id: consumption.id,
                x: convertValueToPixels(startIndex, this.tileParams.pxSizeFor15min, 1),
                y: y - height,
                width: convertValueToPixels(endIndex - startIndex + 1, this.tileParams.pxSizeFor15min, 1),
                height: height,
                color: consumption.equipment.type.color,
            } as Tile;
        },
        removeTileFromBoard(tileId: string) {
            this.board.consumptionTiles = this.board.consumptionTiles.filter(tile => tile.id !== tileId);
        },
        setClickedTile(tile: Tile | null) {
            this.clickedTile = tile;
        },
        deleteClickedTileConsumption() {
            if(this.clickedTile) {
                useConsumptionStore().removeFromConsumptionList(this.clickedTile.id);
            }
            this.clickedTile = null;
        },
        modifyClickedTileConsumptionHours(startHour: string, endHour: string) {
            if(this.clickedTile) {
                useConsumptionStore().modifyConsumptionHours(this.clickedTile.id, startHour, endHour);
            }
            this.clickedTile = null;
        }, 
    },
    getters: {
        getProductionCurveInPixels(state) {
            const productionCurve = useGameParametersStore().productionCurve;
            productionCurve.solar = convertValuesListToPixelsList(productionCurve.solar, state.tileParams.pxSizeFor10W, 10);
            productionCurve.wind = convertValuesListToPixelsList(productionCurve.wind, state.tileParams.pxSizeFor10W, 10);
            productionCurve.hydro = convertValuesListToPixelsList(productionCurve.hydro, state.tileParams.pxSizeFor10W, 10);
            productionCurve.total = convertValuesListToPixelsList(productionCurve.total, state.tileParams.pxSizeFor10W, 10);
            return productionCurve;
        }
    }
});
