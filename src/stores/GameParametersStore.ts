import { defineStore } from 'pinia';
import { useProductionStore, ProductionCurve } from './ProductionStore';
import i18n from '../modules/i18n';

export const useGameParametersStore = defineStore({
    id: 'GameParametersStore',
    state: () => {
        return {
            id: '',
            date: new Date(),
            language: 'en',
            languageIsUserSet: false,
            theme: 'light',
            scenario: '',
            productionCurve: {
                id: '0',
                name: 'No production curve',
                svg: '',
                description: '', 
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
                    svg: '',
                    description: '',
                    solar: [],
                    wind: [],
                    hydro: [],
                    total: []
                };
            }
        },
        setScenario(scenarioId: string) {
        },
        setLanguageFromBrowser() {
            if(!this.languageIsUserSet){
                const language = navigator.language.substring(0, 2);
                if(language && this.isLanguageAvailable(language)){
                    this.language = language;
                } else{
                    this.language = 'en';
                }
            }
        },
        isLanguageAvailable(languageId: string) {
            for (const language of i18n.global.availableLocales) {
                if(languageId === language){
                    return true;
                }
            }
        },
        setLanguage(languageId: string) {
            if(this.isLanguageAvailable(languageId)){
                this.language = languageId;
                i18n.global.locale.value = i18n.global.availableLocales.find((locale) => locale === languageId) || 'en';
                this.languageIsUserSet = true;
            }
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
