import { defineStore } from "pinia";
import { Consumption } from "../stores/ConsumptionStore"

import { EquipmentType } from "./EquipmentTypeStore";

export const useScenarioStore = defineStore({ id: "ScenarioStore", 
    state: () => {
        return {

        };
    },

    actions: {

    }, 
    getters: {

    }

});

export interface Scenario{
    id: string,
    name: string,
    day: string,
    season: string,
    icon: string,
    color: string,
    description: [Map<number, string>],
    equipment_types: EquipmentType[],
    initial_consumption: Consumption[],
}