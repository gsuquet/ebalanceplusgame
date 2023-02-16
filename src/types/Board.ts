export interface Board {
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

export interface TileParams {
    pxSizeFor10W: number;
    pxSizeFor15min: number;
}
