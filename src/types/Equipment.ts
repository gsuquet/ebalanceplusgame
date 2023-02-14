import { EquipmentType, EquipmentTypeLocale } from './EquipmentType';

export interface Equipment{
    id: number,
    type: EquipmentType,
    energy_class: string, 
    consumption: number,
    points: number,
    price: number,
    point_gap: number[],
    price_gap: number[];
}

export interface EquipmentLocale{
    id: number,
    type: EquipmentTypeLocale,
    energy_class: string,
    consumption: number,
    points: number,
    price: number,
    point_gap: number[],
    price_gap: number[]
}
