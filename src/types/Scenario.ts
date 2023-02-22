import { EquipmentType, EquipmentTypeLocale } from './EquipmentType';
import { EnergyStorageParameters } from './Energy';
import { Consumption } from './Consumption';
import { I18nObject } from './I18nObject';

export interface Scenario{
    id: string,
    names: I18nObject[],
    days: I18nObject[],
    season: string,
    icon: string,
    color: string,
    descriptions: I18nObject[],
    equipment_types: EquipmentType[],
    initial_consumption: Consumption[],
    energyStorageParameters: EnergyStorageParameters
}


export interface ScenarioLocale {
    id: string;
    name: string,
    day: string,
    season: string,
    icon: string,
    color: string,
    description: string,
    equipment_type_local: EquipmentTypeLocale[], 
    initial_consumption: Consumption[],
    energyStorageParameters: EnergyStorageParameters
}
