import type { EquipmentType } from './EquipmentType'

export interface Equipment {
  id: string
  energy_class: string
  type: EquipmentType
  isBought: boolean
  equipmentCostParams: EquipmentCostParams
  equipmentConsumptionParams: EquipmentConsumptionParams
}

export interface EquipmentDTO {
  id: string
  energy_class: string
  typeID: string
  equipmentCostParams: EquipmentCostParams
  equipmentConsumptionParams: EquipmentConsumptionParams
}

export interface EquipmentCostParams {
  originalPrice: number
  hasCost: boolean
  isCostEditable: boolean
  step: number
  minCost: number
  maxCost: number
}

export interface EquipmentConsumptionParams {
  originalConsumption: number
  isConsumptionEditable: boolean
  step: number
  minConsumption: number
  maxConsumption: number
}
