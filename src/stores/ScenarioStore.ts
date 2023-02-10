import { defineStore } from "pinia";
import { Consumption } from "../stores/ConsumptionStore"
import { EquipmentType, EquipmentTypeLocale, EquipmentTypeName } from "../stores/EquipmentStore";


export const useScenarioStore = defineStore({ id: "ScenarioStore", 
    state: () => {
        return {
            scenarios: [{
                id: "0",
                names: [{text: "vide", lang: "fr"},{text: "empty", lang: "en"}] as InternatObject[],
                days: [{text: "vide", lang: "fr"},{text: "empty", lang: "en"}] as InternatObject[],
                season: "Empty",
                icon: "mdi:null",
                color: "#000000", 
                descriptions: [{text:"vide", lang:"fr"}, {text:"Empty", lang:"en"}] as InternatObject[],
                equipment_types: [{
                    id:"vide",
                    names:[{name:"vide",lang:"fr"},{name:"Dishwasher",lang:"en"}] as EquipmentTypeName[],
                    icon_name:"Vide",
                    color:"#000000"
                }] as EquipmentType[],
                initial_consumption: [{}] as Consumption[]
            }] as Scenario[],
            scenariosLocale: [] as ScenarioLocale[],
            clickedScenario: null as null | ScenarioLocale
        };
    },

    actions: {
        async getAllScenario() {
            const data = (await import ('../data/scenario.json')).default;
            this.scenarios = data as Scenario[];
            this.convertScenarioListToScenarioLocaleList();
            this.clickedScenario = this.scenariosLocale[0];
        },
        setClickedScenario(scenario: ScenarioLocale | null){
            this.clickedScenario = scenario
        },
        getListOfEquipmentTypeLocale(listEquipmentTypes: EquipmentType[]) {
            const listEquipmentTypesLocales: EquipmentTypeLocale[] = []
            const locale = useGameParametersStore().language;
            for(const equipmentType of listEquipmentTypes ) {
                for(const name of equipmentType.names) {
                    if(name.lang === locale) {
                        listEquipmentTypesLocales.push({name: name.name, icon_name: equipmentType.icon_name, color: equipmentType.color, id: equipmentType.id} as EquipmentTypeLocale); 
                    }
                }
                listEquipmentTypesLocales.push({name: equipmentType.names[0].name, icon_name: equipmentType.icon_name, color: equipmentType.color, id: equipmentType.id} as EquipmentTypeLocale); 
            }
            return listEquipmentTypesLocales;
        },
        //Not sure if it is really best practice
        convertNameToNameLocale(scenario: Scenario) {
            const locale = useGameParametersStore().language;
            for(const name of scenario.names) {
                if(name.lang === locale) {
                    return name.text;
                }
            }
            return scenario.names[0].text;
        },
        convertDayToDayLocale(scenario: Scenario) {
            const locale = useGameParametersStore().language;
            for(const day of scenario.days) {
                if(day.lang === locale) {
                    return day.text;
                }
            }
            return scenario.days[0].text;
        },
        convertDescriptionToDescriptionLocale(scenario: Scenario){
            const locale = useGameParametersStore().language;
            for(const description of scenario.descriptions) {
                if(description.lang === locale) {
                    return description.text;
                }
            }
            return scenario.descriptions[0].text;
        },
        convertScenarioToScenarioLocale(scenario: Scenario) {
            const listEquipmentLocale: EquipmentTypeLocale[] = this.getListOfEquipmentTypeLocale(scenario.equipment_types); 
            const name: string = this.convertNameToNameLocale(scenario);
            const day: string = this.convertDayToDayLocale(scenario);
            const description: string = this.convertDescriptionToDescriptionLocale(scenario);
            const scenarioLocale: ScenarioLocale = {id: scenario.id,
                                                    name: name, 
                                                    day: day, 
                                                    season: scenario.season, 
                                                    icon: scenario.icon, 
                                                    color: scenario.color,
                                                    description: description,
                                                    equipment_type_local: listEquipmentLocale,
                                                    initial_consumption: [{}] as Consumption[]  
                                                }; 
            return scenarioLocale;
        },
        convertScenarioListToScenarioLocaleList(){
            const listScenarioLocale: ScenarioLocale[] = [];
            for(const scenario of this.scenarios) {
                listScenarioLocale.push(this.convertScenarioToScenarioLocale(scenario));
            }
            this.scenariosLocale = listScenarioLocale;
        },
        //TODO: Add the internationalisation handler 
    }, 
    getters: {
        getScenarioById:(state)=>(id: string) => {
            return state.scenarios.find(scenario => scenario.id === id);
        }, getEquipmentBySeason:(state)=>(season: string) => {
            return state.scenarios.find(scenario => scenario.season === season);
        },
        getEquipmentTypeFromScenario:(state)=>(scenarioLocale : ScenarioLocale) => {
            const equipmentByTypes : EquipmentTypeLocale[] = [];
            for(const equipment of scenarioLocale.equipment_type_local){
                if(!equipmentByTypes.includes(equipment)){
                    equipmentByTypes.push(equipment);
                }
            }
            return equipmentByTypes;
        },
        getClickedScenario: state => () => state.clickedScenario,
        getRandomLocaleScenario: state => () => state.scenariosLocale[Math.floor(Math.random() * state.scenariosLocale.length)],
    },
});

export interface Scenario{
    id: string,
    names: InternatObject[],
    days: InternatObject[],
    season: string,
    icon: string,
    color: string,
    descriptions: InternatObject[],
    equipment_types: EquipmentType[],
    initial_consumption: Consumption[],
}


export interface ScenarioLocale {
    id: string;
    name: string,
    day: string,
    season: string,
    icon: string,
    color: string,
    description: string,
    equipment_type_local: EquipmentTypeLocale[], 
    initial_consumption: Consumption[]
}

export interface InternatObject{
    text: string,
    lang: string,
}
