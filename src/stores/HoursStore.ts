import {defineStore} from "pinia"


export const useHourStore = defineStore({id :'EquipmentStore',
    state: () => {
        return {
            hour: Date
        };
    },
    actions: {
        getNewHour(hour: Date) {
            const newHour: Date = hour;
            return newHour;
        }
    }, 
    getters: {

    },

});

