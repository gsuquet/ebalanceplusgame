import { defineStore } from 'pinia';
import { useProductionStore, ProductionCurve } from './ProductionStore';

export const useGameParametersStore = defineStore({
    id: 'GameParametersStore',
    state: () => {
        return {
            id: '',
            date: new Date(),
            language: 'fr',
            theme: 'light',
            scenario: '',
            productionCurve: {
                id: '0',
                name: 'No production curve',
                solar: [],
                wind: [],
                hydro: [],
                total: []
            } as ProductionCurve,
            user: '',
            score: 0,
            moneyWon: 0,
            availableMoney: 0
        };
    },
    actions: {
        setProductionCurve(productionCurveId: string) {
            const productionCurveImport = useProductionStore().getProductionCurveById(productionCurveId);
            if(productionCurveImport){
                this.productionCurve = productionCurveImport;
            } else{
                this.productionCurve = {
                    id: '0',
                    name: 'No production curve',
                    solar: [],
                    wind: [],
                    hydro: [],
                    total: []
                };
            }
        },
        setScenario(scenarioId: string) {
        },
        setLanguage(languageId: string) {
        },
        storeToLocalStorage() {
            localStorage.setItem('gameParameters', JSON.stringify(this));
        },
        getFromLocalStorage() {
            const gameParameters = JSON.parse(localStorage.getItem('gameParameters') || '{}');
            if(gameParameters){
                this.id = gameParameters.id;
                this.date = gameParameters.date;
                this.language = gameParameters.language;
                this.scenario = gameParameters.scenario;
                this.productionCurve = gameParameters.productionCurve;
                this.user = gameParameters.user;
                this.score = gameParameters.score;
                this.moneyWon = gameParameters.moneyWon;
                this.availableMoney = gameParameters.availableMoney;
            }
        }
    },
    getters: {
        getProductionCurve: (state) => state.productionCurve
    }
});
