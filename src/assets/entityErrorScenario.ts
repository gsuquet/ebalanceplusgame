import type { I18nObject } from '../types/I18nObject'
import type { Scenario } from '../types/Scenario'
import { errorEnergyStorageParameters } from './entityErrorEnergyStorageParameters'
import { errorEquipmentType } from './entityErrorEquipmentType'
import { errorI18nObject } from './entityErrorI18nObject'
import { errorMoneyParameters } from './entityErrorMoneyParameters'
import { errorEnergyMarketParameters } from './entityErrorEnergyMarketParameters'

export const errorScenario = {
  id: '0',
  names: [errorI18nObject] as I18nObject[],
  day: {
    id: '0',
    names: [errorI18nObject] as I18nObject[],
  },
  season: {
    id: '0',
    names: [errorI18nObject] as I18nObject[],
    icon: 'mdi:null',
    color: '#000000',
  },
  descriptions: [errorI18nObject] as I18nObject[],
  equipmentTypes: [errorEquipmentType],
  initialConsumption: [],
  energyStorageParameters: errorEnergyStorageParameters,
  energyMarketParameters: errorEnergyMarketParameters,
  moneyParameters: errorMoneyParameters,
} as Scenario
