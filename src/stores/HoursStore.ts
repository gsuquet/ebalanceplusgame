import {defineStore} from "pinia"
import { Consumption } from "./ConsumptionStore";

//TODO delete this file 

export const useHourStore = defineStore({id :'HoursStore',
    state: () => {
        return {
        };
    },
    actions: {
        getTimeToIndex(hour: string): (number) {
            let index: number;
            let h:number;
            let m: number;
            let listHour: string[] = hour.split(":", 2);
            h = Number(listHour[0]);
            m = Number(listHour[1]);
            index = h*4+ m/4;
            console.log(index);
            return index;
        },

        getObject(consumption: Consumption) {

        }

    }, 
    getters: {

    },
});
