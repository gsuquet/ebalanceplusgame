import { Scenario, ScenarioLocale, InternatObject } from '../types/Scenario';
import { errorEnergyMarketParameters } from './entityErrorEnergyMarketParameters';
import { errorEnergyStorageParameters } from './entityErrorEnergyStorageParameters';
import { errorEquipmentType, errorEquipmentTypeLocale } from './entityErrorEquipmentType';
import { errorI18nObject } from './entityErrorInternatObject';
import { errorMoneyParameters } from './entityErrorMoneyParameters';

export const errorScenario = {
    id: '0',
    names: [errorI18nObject] as InternatObject[],
    days: [errorI18nObject] as InternatObject[],
    season: "Empty",
    icon: "mdi:null",
    color: "#000000", 
    descriptions: [errorI18nObject] as InternatObject[],
    equipment_types: [errorEquipmentType]
} as Scenario;

export const errorScenarioLocale = {
    id: '0',
    name: 'No scenario',
    day: '',
    season: '',
    icon: '',
    color: '',
    description: '',
    equipment_type_local: [errorEquipmentTypeLocale],
    initial_consumption: [],
    energyStorageParameters: errorEnergyStorageParameters,
    energyMarketParameters: errorEnergyMarketParameters,
    moneyParameters: errorMoneyParameters
} as ScenarioLocale;
