import { defineStore } from 'pinia';
import { useProductionStore, ProductionCurve } from './ProductionStore';

export const useGameParametersStore = defineStore({
    id: 'GameParametersStore',
    state: () => {
        return {
            id: '',
            date: new Date(),
            language: 'en',
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
        }
    },
    getters: {}
});
