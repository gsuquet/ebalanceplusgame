import { defineStore } from 'pinia';
import { useGameParametersStore } from './GameParametersStore';

export const useConsumptionStore = defineStore({
    id: 'ConsumptionStore',
    state: () => {
        return {
            consumptionCurve: {
                consumption: new Map<number, number>(),
                peak: null,
                peakIndex: null,
                peakTime: null
            } as ConsumptionCurve,
            consumptionMap: new Map() as Map<string, Consumption>,
            overConsumptionMap: new Map() as Map<number, number>
        };
    },

    actions: {
        getListOfOverConsumption() {
            const productionCurve = useGameParametersStore().productionCurve;
            if (productionCurve) {
                for (const [time, consumption] of this.consumptionCurve.consumption) {
                    if (consumption > productionCurve.data[time]) {
                        this.overConsumptionMap.set(time, consumption - productionCurve.data[time]);
                    }
                }
            }
            return this.overConsumptionMap;
        },
        addToConsumptionCurve(index:number, value:number) {
            this.consumptionCurve.consumption.set(index, value);
        }

    },

    getters: {
        isOverConsumption(): boolean {
            return this.overConsumptionMap.size > 0;
        }
    }
});

interface Consumption{
    id: string;
    startIndex: number;
    endIndex: number;
    amount: number;
    color: string;
}

interface ConsumptionCurve {
    consumption: Map<number, number>;
    peak: number | null;
    peakIndex: number | null;
    peakTime: number | null;
}
