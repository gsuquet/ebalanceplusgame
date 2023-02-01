import { defineStore } from 'pinia';
import { Equipment } from './EquipmentStore';
import { useGameParametersStore } from './GameParametersStore';
import { useBoardStore } from './BoardStore';

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
            useBoardStore().setTilesFromConsumptionList();
        },
        removeFromConsumptionList(consumptionId:string) {
            const consumptionToRemove = this.consumptionList.find(consumption => consumption.id === consumptionId);
            if(consumptionToRemove){
                for(let i=consumptionToRemove.startIndex; i<=consumptionToRemove.endIndex; i++){
                    this.removeFromConsumptionCurve(i,consumptionToRemove.amount)
                }
                this.consumptionList = this.consumptionList.filter(consumption => consumption.id !== consumptionId);
                this.setListOfOverConsumption();
                useBoardStore().setTilesFromConsumptionList();
            }
        },
        modifyConsumptionHours(consumptionId:string, startHour:string, endHour:string) {
            const consumptionToModify = this.consumptionList.find(consumption => consumption.id === consumptionId);
            if(consumptionToModify){
                for(let i=consumptionToModify.startIndex; i<=consumptionToModify.endIndex; i++){
                    this.removeFromConsumptionCurve(i,consumptionToModify.amount)
                }
                consumptionToModify.startIndex = this.getTimeToIndex(startHour);
                consumptionToModify.endIndex = this.getTimeToIndex(endHour);
                for(let i=consumptionToModify.startIndex; i<=consumptionToModify.endIndex; i++){
                    this.addToConsumptionCurve(i,consumptionToModify.amount)
                }
                this.setListOfOverConsumption();
                useBoardStore().setTilesFromConsumptionList();
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
            this.overConsumptionMap.clear();
            const productionCurve = useGameParametersStore().getProductionCurve;
            if (productionCurve) {
                for (const [time, consumption] of this.consumptionCurve.consumption) {
                    if (consumption > productionCurve.total[time]) {
                        this.overConsumptionMap.set(time, consumption - productionCurve.total[time]);
                    }
                }
            }
        },
        getTimeToIndex(hour: string): (number) {
            let listHour: string[] = hour.split(":", 2);
            let h:number = Number(listHour[0]);
            let m:number = Number(listHour[1]);
            let index:number = h*4+ m/15;
            return index;
        },
        addConsumption(indexStart: number, indexEnd: number, equipment: Equipment) {
            let amount: number = equipment.conso;
            let color: string = equipment.color;
            let id: string = Math.floor(Math.random() * (1000000)).toString();
            let newConsumption: Consumption = { id:id,
                startIndex:indexStart,
                endIndex: indexEnd,
                amount:amount,
                color:color,
                equipment:equipment };
            this.addToConsumptionList(newConsumption);
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
        },
        getIndexToTime() {
            return (index:number) => {
                let h:number = Math.floor(index/4);
                let m:number = (index%4)*15;
                let time:string = h.toString().padStart(2, '0') + ":" + m.toString().padStart(2, '0');
                return time;
            }
        },
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
