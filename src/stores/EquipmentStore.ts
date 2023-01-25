import { defineStore } from "pinia";
import equipmentsData from "../data/equipments.json"


export const useEquipmentStore = defineStore("equipmentStore", {
    state: () => {
        return {
            equipments: [] as Equipment[],
            type: [] as Type[],
        };
    },

    actions: {
        async fill() {
            this.equipments  = equipmentsData;
        },
    },

    getters: {
        getEquipmentById: (state) => {
            return (equipmentId) => state.equipments.find(equipment) => equipmentsData.id === equipmentId)
        }
    }
});

interface Equipment{
    id: number;
    type_fr: String;
    type_en: String;
    energy_class: String;
    points: number;
    price: number;
    name_icon: String;
}


interface Type{
    type: String;
    name_icon: String;
}
