import type { I18nObject } from './I18nObject'

export interface EquipmentType {
  id: string
  names: I18nObject[]
  icon_name: string
  color: string
  isBattery: boolean
  isCharging: boolean
  equipmentTypeDurationParams: EquipmentTypeDurationParams
}

export interface EquipmentTypeDTO {
  id: string
  names: I18nObject[]
  icon_name: string
  color: string
  equipmentTypeDurationParamsId: string
}

export interface EquipmentTypeDurationParams {
  id: string
  isDurationEditable: boolean
  isDurationLengthEditable: boolean
  originalDuration: string
  step: string
  minDuration: string
  maxDuration: string
}
