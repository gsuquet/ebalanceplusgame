import type { Consumption } from '../types/Consumption'
import { errorEquipment } from './entityErrorEquipment'

export const emptyConsumption: Consumption = {
  id: '',
  startIndex: 0,
  endIndex: 0,
  amount: 0,
  price: 0,
  equipment: errorEquipment,
}
