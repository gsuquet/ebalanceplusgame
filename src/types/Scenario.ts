import { EquipmentType, EquipmentTypeLocale } from './EquipmentType';
import { EnergyStorageParameters, EnergyMarketParameters } from './Energy';
import { Consumption } from './Consumption';
import { I18nObject } from './I18nObject';
import { MoneyParameters } from './Money';

export interface Scenario{
    id: string,
    names: I18nObject[],
    season: Season,
    days: I18nObject[],
    descriptions: I18nObject[],
    equipment_types: EquipmentType[],
    initial_consumption: Consumption[],
    energyStorageParameters: EnergyStorageParameters,
    energyMarketParameters: EnergyMarketParameters,
    moneyParameters: MoneyParameters
}

export interface Season {
    id: string,
    names: I18nObject[],
    icon: string,
    color: string
}
