import { defineStore } from 'pinia';

export const useBoardStore = defineStore({
    id: 'BoardStore',
    state: () => {
        return {
            board: {
                width: 1440,
                height: 1000,
                tiles: []
            } as Board,
            tileParams: {
                pxSizeFor10W: 5,
                pxSizeFor15min: 15,
            } as TileParams
        };
    },
    actions: {
        getTilesFromConsumptionMap() {
            const tiles: Tile[] = [];
            const consumptionMap = useConsumptionStore().consumptionMap;
            consumptionMap.forEach((consumption) => {
                const tile = {
                    id: consumption.id,
                    x: consumption.startIndex * this.tileParams.pxSizeFor15min,
                    y: 0,
                    height: consumption.amount * this.tileParams.pxSizeFor10W,
                    width: (consumption.endIndex - consumption.startIndex) * this.tileParams.pxSizeFor15min,
                    color: consumption.color
                } as Tile;
                tiles.push(tile);
            });
            this.board.tiles = tiles;
        },
        getTilesYAxisPosition() {
            // Sort tiles by y axis
            // TODO : only sort tiles that have a conflicting x axis position
            const tiles = this.board.tiles;
            const tilesByY = tiles.sort((a, b) => a.y - b.y);
            let currentY = 0;
            let currentHeight = 0;
            tilesByY.forEach((tile) => {
                if (tile.y > currentY) {
                    currentY = tile.y;
                    currentHeight = tile.height;
                } else {
                    tile.y = currentY + currentHeight;
                    currentHeight = tile.height;
                }
            });
            this.board.tiles = tilesByY;
        }
    },
    getters: {
    }
});

interface Board {
    width: number;
    height: number;
    tiles: Tile[];
}

interface Tile {
    id: string;
    x: number;
    y: number;
    height: number;
    width: number;
    color: string;
}

interface TileParams {
    pxSizeFor10W: number;
    pxSizeFor15min: number;
}
