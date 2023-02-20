import { Scenario, ScenarioLocale, InternatObject } from '../types/Scenario';
import { errorEnergyStorageParameters } from './entityErrorEnergyStorageParameters';
import { errorEquipmentType, errorEquipmentTypeLocale } from './entityErrorEquipmentType';
import { errorInternatObject } from './entityErrorInternatObject';

export const errorScenario = {
    id: '0',
    names: [errorInternatObject] as InternatObject[],
    days: [errorInternatObject] as InternatObject[],
    season: "Empty",
    icon: "mdi:null",
    color: "#000000", 
    descriptions: [errorInternatObject] as InternatObject[],
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
    energyStorageParameters: errorEnergyStorageParameters
} as ScenarioLocale;
