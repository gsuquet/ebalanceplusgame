import { Equipment } from './Equipment';

export interface Consumption {
    id: string;
    startIndex: number;
    endIndex: number;
    amount: number;
    price: number;
    equipment: Equipment;
}

export interface ConsumptionDTO {
    id: string;
    startIndex: number;
    endIndex: number;
    equipmentID: string;
}

export interface ConsumptionCurve {
    consumption: Map<number, number>;
    peak: number;
    peakIndex: number;
    peakTime: string;
}
