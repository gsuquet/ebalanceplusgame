import { Equipment } from './Equipment';

export interface Consumption {
    id: string;
    startIndex: number;
    endIndex: number;
    amount: number;
    color: string;
    equipment: Equipment;
}

export interface ConsumptionCurve {
    consumption: Map<number, number>;
    peak: number;
    peakIndex: number;
    peakTime: string;
}
