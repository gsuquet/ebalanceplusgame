import { EquipmentType, EquipmentTypeLocale } from './EquipmentType';
import { Consumption } from './Consumption';

export interface Scenario{
    id: string,
    names: InternatObject[],
    days: InternatObject[],
    season: string,
    icon: string,
    color: string,
    descriptions: InternatObject[],
    equipment_types: EquipmentType[],
    initial_consumption: Consumption[],
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
    initial_consumption: Consumption[]
}

export interface InternatObject{
    text: string,
    lang: string,
}
