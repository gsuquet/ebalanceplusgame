export interface Board {
  width: number
  height: number
  boardVisualParams: BoardVisualParams
  consumptionTiles: Tile[]
  productionTiles: Tile[]
}

export interface BoardVisualParams {
  isProductionCurveSmoothed: boolean
  shouldDisplayProductionCurve: boolean
  shouldDisplayConsumptionCurve: boolean
  shouldDisplayKWLines: boolean
  shouldDisplayHoursLines: boolean
  is3kWLineRed: boolean
}

export interface Tile {
  id: string
  x: number
  y: number
  width: number
  height: number
  color: string
}

export interface TileParams {
  pxSizeFor10W: number
  pxSizeFor15min: number
}
