import {defineStore} from "pinia"


export const useHourStore = defineStore({id :'EquipmentStore',
    state: () => {
        return {
            hours: {
                hour: 0,
                min: 0,
            } as Hour,
        };
    },
});

//     actions: {
//         getNewHour(hour: number, min: number) {
//             const newHour: Hour = {hour, min}
//             return newHour
//         }
//     }, 
//     getters: {

//     },

// });

 export interface Hour{
     hour: number, 
     min: number,
}