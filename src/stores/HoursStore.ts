import {defineStore} from "pinia"

export const useHourStore = defineStore({id :'HoursStore',
    state: () => {
        return {
            hours: [] as Date[]
        };
    },
    actions: {
        getNewHour(hour: Date) {
            const newHour: Date = hour;
            return newHour;
        },

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
        }

    }, 
    getters: {

    },
});