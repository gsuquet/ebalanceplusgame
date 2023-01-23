import { defineStore } from "pinia";

export const useProductionStore = defineStore({
    id: "ProductionStore",
    state: () => {
        return {
            productionCurves: new Map<string, ProductionCurve>(),
        };
    },

    actions: {
        async fetchProductionCurves() {
            const data = (await import ("../data/productionCurves.json")).default;
            this.productionCurves = new Map(Object.entries(data));
        },
        storeToLocalStorage() {
            localStorage.setItem("productionCurves", JSON.stringify(this.productionCurves));
        },
        getFromLocalStorage() {
            this.productionCurves = new Map(JSON.parse(localStorage.getItem("productionCurves") || "{}"));
        },
    },

    getters: {
        getProductionCurveById: (state) => (id: string) => {
            return state.productionCurves.get(id);
        },
        getProductionCurveByName: (state) => (name: string) => {
            for (const curve of state.productionCurves.values()) {
                if (curve.name === name) {
                    return curve;
                }
            }
        },
    }
});

export interface ProductionCurve {
    id : string;
    name: string;
    data: Number[];
}
