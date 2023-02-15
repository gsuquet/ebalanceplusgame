import { defineStore } from 'pinia';
import { useProductionStore } from './ProductionStore';
import i18n from '../modules/i18n';
import { ScenarioLocale } from '../types/Scenario';
import { ProductionCurve } from '../types/Production';

export const useGameParametersStore = defineStore({
    id: 'GameParametersStore',
    state: () => {
        return {
            gameId: '00000',
            date: new Date(),
            language: 'en',
            languageIsUserSet: false,
            theme: 'light',
            scenario: {
                id: '0',
                name: 'No scenario',
                day: '',
                season: '',
                icon: '',
                color: '',
                description: '',
                equipment_type_local: [],
                initial_consumption: []
            } as ScenarioLocale,
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
            isMultiplayer: false,
            isPublic: false,
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
        setProductionCurveAndScenario(productionCurve: ProductionCurve | null, scenario: ScenarioLocale | null) {
            if(!productionCurve || !scenario) return;
            this.productionCurve = productionCurve;
            this.scenario = scenario;            
        },
        setRandomProductionCurveAndScenario() {
            const randomProductionCurve = useProductionStore().getRandomProductionCurve();
            const randomScenario = useScenarioStore().getRandomLocaleScenario();
            this.setProductionCurveAndScenario(randomProductionCurve, randomScenario);
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
        generateGameId() {
            this.gameId = Math.random().toString(36).substr(2, 5);
        },
        createGame(isMultiplayer: boolean, isPublic: boolean) {
            this.isMultiplayer = isMultiplayer;
            this.isPublic = isPublic;
        },
        storeToLocalStorage() {
            localStorage.setItem('gameParameters', JSON.stringify(this));
        },
        getFromLocalStorage() {
            const gameParameters = JSON.parse(localStorage.getItem('gameParameters') || '{}');
            if(gameParameters){
                this.gameId = gameParameters.id;
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
        getProductionCurve: (state) => state.productionCurve,
        getGameIdUpper: (state) => state.gameId.toUpperCase(),
    }
});
