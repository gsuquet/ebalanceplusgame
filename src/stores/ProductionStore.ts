import { defineStore } from 'pinia';
import { ProductionCurve } from '../types/Production';

export const useProductionStore = defineStore({
    id: 'ProductionStore',
    state: () => {
        return {
            productionCurves: new Map<string, ProductionCurve>(), 
            clickedProductionCurve: null as null | ProductionCurve,
        };
    },
    actions: {
        async fetchProductionCurves() {
            const data = (await import ('../data/productionCurves.json')).default;
            const productionCurvesWithoutTotal = new Map(Object.entries(data));
            this.productionCurves = new Map([...productionCurvesWithoutTotal.entries()].map(([key, value]) => {
                const total = this.getProductonCurveTotal(value.solar, value.wind, value.hydro);
                return [key, {...value, total}];
            }));
            this.setClickedProductionCurveToFirstCurve();
        },
        getProductonCurveTotal(solar: number[], wind: number[], hydro: number[]) {
            const solarPoints = solar.length>0 ? solar : new Array(96).fill(0);
            const windPoints = wind.length>0 ? wind : new Array(96).fill(0);
            const hydroPoints = hydro.length>0 ? hydro : new Array(96).fill(0);
            const total = solarPoints.map((solarPoint: number, index: number) => solarPoint + windPoints[index] + hydroPoints[index]);
            return total;
        },
        storeToLocalStorage() {
            localStorage.setItem('productionCurves', JSON.stringify(this.productionCurves));
        },
        getFromLocalStorage() {
            this.productionCurves = new Map(JSON.parse(localStorage.getItem('productionCurves') || '{}'));
        },
        setClickedProductionCurve(productionCurve: ProductionCurve | null) {
            this.clickedProductionCurve = productionCurve;
        }, 
        setClickedProductionCurveToFirstCurve() {
            this.clickedProductionCurve = this.productionCurves.values().next().value;
        }
    },
    getters: {
        getProductionCurveById: state => (id: string) => state.productionCurves.get(id),
        getProductionCurveByName: state => (name: string) => {
            for (const curve of state.productionCurves.values()) {
                if (curve.name === name) {
                    return curve;
                }
            }
        },
        getAllProductionCurves: state => () => {
            let allProductionCurves: ProductionCurve[] = []
            for (const curve of state.productionCurves.values()) {
                allProductionCurves.push(curve);
            }
            return allProductionCurves;
        },
        getClickedProductionCurve: state => () => state.clickedProductionCurve,
        getRandomProductionCurve: state => () => {
            let allProductionCurves: ProductionCurve[] = []
            for (const curve of state.productionCurves.values()) {
                allProductionCurves.push(curve);
            }
            const randomIndex = Math.floor(Math.random() * allProductionCurves.length);
            return allProductionCurves[randomIndex];
        }
    }
});
