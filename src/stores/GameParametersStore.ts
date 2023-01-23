import { defineStore } from "pinia";
import { useProductionStore, ProductionCurve } from "./ProductionStore";

export const useGameParametersStore = defineStore({
    id: "GameParametersStore",
    state: () => {
        return {
            id: "",
            date: new Date(),
            scenario: "",
            productionCurve: null as ProductionCurve | null,
            user: "",
            score: 0,
            moneyWon: 0,
            availableMoney: 0,
        };
    },
    actions: {
        setProductionCurve(productionCurveId: string) {
            this.productionCurve = useProductionStore().getProductionCurveById(productionCurveId);
        },
        setScenario(scenarioId: string) {
        },
    },
    getters: {}
});
