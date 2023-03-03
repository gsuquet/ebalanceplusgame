import { defineStore } from 'pinia';
import { Scenario } from '../types/Scenario';
import { errorScenario } from '../assets/entityErrorScenario';
import { EquipmentType } from '../types/EquipmentType';


export const useScenarioStore = defineStore({ id: "ScenarioStore", 
    state: () => {
        return {
            scenarios: [errorScenario] as Scenario[],
            clickedScenario: null as null | Scenario
        };
    },

    actions: {
        async fetchAllScenarios() {
            const data = (await import ('../data/scenario.json')).default;
            this.scenarios = data as Scenario[];
            this.clickedScenario = this.scenarios[0];
        },
        setClickedScenario(scenario: Scenario | null){
            this.clickedScenario = scenario;
        },
    },
    getters: {
        getScenarioById:(state)=>(id: string) => {
            return state.scenarios.find(scenario => scenario.id === id);
        }, getEquipmentBySeasonId:(state)=>(seasonId: string) => {
            return state.scenarios.find(scenario => scenario.season.id === seasonId);
        },
        getEquipmentTypeFromScenario:(state)=>(scenario : Scenario) => {
            const equipmentByTypes : EquipmentType[] = [];
            for(const equipment of scenario.equipment_types){
                if(!equipmentByTypes.includes(equipment)){
                    equipmentByTypes.push(equipment);
                }
            }
            return equipmentByTypes;
        },
        getClickedScenario: state => () => state.clickedScenario,
        getRandomScenario: state => () => state.scenarios[Math.floor(Math.random() * state.scenarios.length)],
        getInitialConsumptionCopy: state => () => {
            if(state.clickedScenario){
                return JSON.parse(JSON.stringify(state.clickedScenario.initial_consumption));
            }
            return [];
        }
    },
});
