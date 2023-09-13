import type { EquipmentType, EquipmentTypeDurationParams } from '../types/EquipmentType'

const errorEquipmentTypeDurationParams = {
  id: 'error',
  isDurationEditable: false,
  isDurationLengthEditable: false,
  originalDuration: '00:15',
  step: '00:15',
  minDuration: '00:15',
  maxDuration: '23:45',
} as EquipmentTypeDurationParams

export const errorEquipmentType = {
  id: 'error',
  names: [{ lang: 'en', text: 'Error' }],
  icon_name: 'mdi:null',
  color: '#000000',
  isBattery: false,
  isCharging: false,
  equipmentTypeDurationParams: errorEquipmentTypeDurationParams,
} as EquipmentType
