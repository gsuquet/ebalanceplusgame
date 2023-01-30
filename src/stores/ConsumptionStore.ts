import { defineStore } from 'pinia';
import { Equipment } from './EquipmentStore';
import { useGameParametersStore } from './GameParametersStore';

export const useConsumptionStore = defineStore({
    id: 'ConsumptionStore',
    state: () => {
        return {
            consumptionCurve: {
                consumption: new Map<number, number>(),
                peak: 0,
                peakIndex: 0,
                peakTime: "00:00"
            } as ConsumptionCurve,
            consumptionList: [] as Consumption[],
            overConsumptionMap: new Map() as Map<number, number>
        };
    },

    actions: {
        addToConsumptionList(newConsumption:Consumption) {
            this.consumptionList.push(newConsumption)
            for(let i=newConsumption.startIndex; i<=newConsumption.endIndex; i++){
                this.addToConsumptionCurve(i,newConsumption.amount)
            }
            this.setListOfOverConsumption();
        },
        removeFromConsumptionList(consumptionId:string) {
            const consumptionToRemove = this.consumptionList.find(consumption => consumption.id === consumptionId);
            if(consumptionToRemove){
                for(let i=consumptionToRemove.startIndex; i<=consumptionToRemove.endIndex; i++){
                    this.removeFromConsumptionCurve(i,consumptionToRemove.amount)
                }
                this.consumptionList = this.consumptionList.filter(consumption => consumption.id !== consumptionId);
                this.setListOfOverConsumption();
            }
        },
        addToConsumptionCurve(index:number, value:number) {
            const existingConsumption = this.consumptionCurve.consumption.get(index)
            if(existingConsumption){
                value = value + existingConsumption;
            }
            this.consumptionCurve.consumption.set(index, value);
        },
        removeFromConsumptionCurve(index:number, value:number) {
            const existingConsumption = this.consumptionCurve.consumption.get(index)
            if(existingConsumption){
                this.consumptionCurve.consumption.set(index, existingConsumption - value);
            }
        },
        setListOfOverConsumption() {
            const productionCurve = useGameParametersStore().productionCurve;
            if (productionCurve) {
                for (const [time, consumption] of this.consumptionCurve.consumption) {
                    if (consumption > productionCurve.data[time]) {
                        this.overConsumptionMap.set(time, consumption - productionCurve.data[time]);
                    }
                }
            }
        }
    },

    getters: {
        isOverConsumption(state) {
            return state.overConsumptionMap.size > 0;
        },
        getConsumptionListSortedByStartIndex(state) {
            // return List of consumptions in ConsumptionList ordered by start index (asc)
            return state.consumptionList.sort((a,b) => (a.startIndex > b.startIndex) ? 1 : -1)
        },
        getConsumptionById(state) {
            return (id:string) => {
                return state.consumptionList.find(consumption => consumption.id === id)
            }
        }
    }
});

export interface Consumption {
    id: string;
    startIndex: number;
    endIndex: number;
    amount: number;
    color: string;
    equipment: Equipment;
}

interface ConsumptionCurve {
    consumption: Map<number, number>;
    peak: number;
    peakIndex: number;
    peakTime: string;
}
