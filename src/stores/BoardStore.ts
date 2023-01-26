import { defineStore } from 'pinia';

export const useBoardStore = defineStore({
    id: 'BoardStore',
    state: () => {
        return {
            board: {
                width: 1440,
                height: 1500,
                tiles: []
            } as Board,
            tileParams: {
                pxSizeFor10W: 5,
                pxSizeFor15min: 15,
            } as TileParams
        };
    },
    actions: {
        setTilesFromConsumptionList() {
            const tiles: Tile[] = [];
            const consumptionList = useConsumptionStore().getConsumptionListSortedByStartIndex;
            let storedY=this.board.height; let storedStopIndex=0; 
            for (const consumption of consumptionList) {
                const tile = {
                    id: consumption.id,
                    x: consumption.startIndex * this.tileParams.pxSizeFor15min,
                    y: this.board.height-((consumption.amount/10) * this.tileParams.pxSizeFor10W),
                    width: ((consumption.endIndex - consumption.startIndex) + 1) * this.tileParams.pxSizeFor15min,
                    height: (consumption.amount/10) * this.tileParams.pxSizeFor10W,
                    color: consumption.color
                } as Tile;

                if(consumption.startIndex <= storedStopIndex) {
                    tile.y = storedY-tile.height;
                } else {
                    storedStopIndex=consumption.endIndex;
                }
                storedY=tile.y;
                tiles.push(tile);
            };
            this.board.tiles = tiles;
        },
        // TODO : define method to sort tiles (according to size on x-axis ?
        removeTileFromBoard(tileId: string) {
            this.board.tiles = this.board.tiles.filter(tile => tile.id !== tileId);
        }
    },
    getters: {
        getProductionCurvePointsInPixels(state) {
            const productionCurvePoints = useGameParametersStore().productionCurve.data;
            if(productionCurvePoints){
                return productionCurvePoints.forEach((element: number) => (element*state.tileParams.pxSizeFor10W)/10);
            }
            return [];
        }
    }
});

interface Board {
    width: number;
    height: number;
    tiles: Tile[];
}

export interface Tile {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

interface TileParams {
    pxSizeFor10W: number;
    pxSizeFor15min: number;
}
