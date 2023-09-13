import type { EquipmentType } from './EquipmentType'
import type { EnergyMarketParameters, EnergyStorageParameters } from './Energy'
import type { Consumption } from './Consumption'
import type { I18nObject } from './I18nObject'
import type { MoneyParameters } from './Money'

export interface Scenario {
  id: string
  names: I18nObject[]
  season: Season
  day: Day
  descriptions: I18nObject[]
  equipmentTypes: EquipmentType[]
  initialConsumption: Consumption[]
  energyStorageParameters: EnergyStorageParameters
  energyMarketParameters: EnergyMarketParameters
  moneyParameters: MoneyParameters
}

export interface ScenarioDTO {
  id: string
  names: I18nObject[]
  seasonId: string
  dayId: string
  descriptions: I18nObject[]
  additionalEquipmentTypesIds: string[]
  initialConsumptionIds: string[]
  energyStorageParametersId: string
  energyMarketParametersId: string
  moneyParametersId: string
}

export interface Season {
  id: string
  names: I18nObject[]
  icon: string
  color: string
}

export interface Day {
  id: string
  names: I18nObject[]
}
