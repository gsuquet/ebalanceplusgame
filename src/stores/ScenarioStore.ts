import { defineStore } from 'pinia'
import type { Day, Scenario, ScenarioDTO, Season } from '../types/Scenario'
import { errorScenario } from '../assets/entityErrorScenario'
import type { EquipmentType } from '../types/EquipmentType'
import type { EnergyMarketParameters, EnergyStorageParameters } from '../types/Energy'
import type { MoneyParameters } from '../types/Money'

export const useScenarioStore = defineStore({
  id: 'ScenarioStore',
  state: () => {
    return {
      seasons: [] as Season[],
      days: [] as Day[],
      energyStorageParameters: [] as EnergyStorageParameters[],
      energyMarketParameters: [] as EnergyMarketParameters[],
      moneyParameters: [] as MoneyParameters[],
      scenarios: [errorScenario] as Scenario[],
      clickedScenario: null as null | Scenario,
    }
  },

  actions: {
    async fetchAllScenarios() {
      this.fetchAllSeasons()
      this.fetchAllDays()
      this.fetchAllEnergyStorageParameters()
      this.fetchAllEnergyMarketParameters()
      this.fetchAllMoneyParameters()
      const scenariosDtoData = (await import ('../data/scenario.json')).default
      const scenariosDto: ScenarioDTO[] = scenariosDtoData
      this.setScenarios(scenariosDto)
      this.clickedScenario = this.scenarios[0]
    },
    async fetchAllSeasons() {
      const seasonsDtoData = (await import ('../data/seasons.json')).default
      this.seasons = seasonsDtoData
    },
    async fetchAllDays() {
      const daysDtoData = (await import ('../data/days.json')).default
      this.days = daysDtoData
    },
    async fetchAllEnergyStorageParameters() {
      const energyStorageParametersDtoData = (await import ('../data/energyStorageParameters.json')).default
      this.energyStorageParameters = energyStorageParametersDtoData
    },
    async fetchAllEnergyMarketParameters() {
      const energyMarketParametersDtoData = (await import ('../data/energyMarketParameters.json')).default
      this.energyMarketParameters = energyMarketParametersDtoData
    },
    async fetchAllMoneyParameters() {
      const moneyParametersDtoData = (await import ('../data/moneyParameters.json')).default
      this.moneyParameters = moneyParametersDtoData
    },
    setClickedScenario(scenario: Scenario | null) {
      this.clickedScenario = scenario
    },
    convertScenarioDtoToScenario(scenarioDto: ScenarioDTO): Scenario {
      const scenario: Scenario = {
        id: scenarioDto.id,
        names: scenarioDto.names,
        season: this.getSeasonById(scenarioDto.seasonId) as Season,
        day: this.getDayById(scenarioDto.dayId) as Day,
        descriptions: scenarioDto.descriptions,
        equipmentTypes: scenarioDto.additionalEquipmentTypesIds.map(equipmentTypeId => useEquipmentStore().getEquipmentTypeById(equipmentTypeId) as EquipmentType),
        initialConsumption: scenarioDto.initialConsumptionIds.map(id => useConsumptionStore().getInitialConsumptionFromConsumptionDtoId(id)),
        energyStorageParameters: this.getEnergyStorageParametersById(scenarioDto.energyStorageParametersId) as EnergyStorageParameters,
        energyMarketParameters: this.getEnergyMarketParametersById(scenarioDto.energyMarketParametersId) as EnergyMarketParameters,
        moneyParameters: this.getMoneyParametersById(scenarioDto.moneyParametersId) as MoneyParameters,
      }
      return scenario
    },
    setScenarios(scenarioDtoList: ScenarioDTO[]) {
      this.scenarios = scenarioDtoList.map(scenarioDto => this.convertScenarioDtoToScenario(scenarioDto))
    },
    getSeasonById(id: string): Season {
      const season = this.seasons.find(season => season.id === id)
      return season || errorScenario.season
    },
    getDayById(id: string): Day {
      const day = this.days.find(day => day.id === id)
      return day || errorScenario.day
    },
    getEnergyStorageParametersById(id: string): EnergyStorageParameters {
      const energyStorageParameters = this.energyStorageParameters.find(energyStorageParameters => energyStorageParameters.id === id)
      return energyStorageParameters || errorScenario.energyStorageParameters
    },
    getEnergyMarketParametersById(id: string): EnergyMarketParameters {
      const energyMarketParameters = this.energyMarketParameters.find(energyMarketParameters => energyMarketParameters.id === id)
      return energyMarketParameters || errorScenario.energyMarketParameters
    },
    getMoneyParametersById(id: string): MoneyParameters {
      const moneyParameters = this.moneyParameters.find(moneyParameters => moneyParameters.id === id)
      return moneyParameters || errorScenario.moneyParameters
    },
  },
  getters: {
    getScenarioById: state => (id: string) => {
      return state.scenarios.find(scenario => scenario.id === id)
    },
    getEquipmentBySeasonId: state => (seasonId: string) => {
      return state.scenarios.find(scenario => scenario.season.id === seasonId)
    },
    getEquipmentTypesFromClickedScenario: (state) => {
      const equipmentByTypes: EquipmentType[] = []
      if (state.clickedScenario) {
        for (const consumption of state.clickedScenario.initialConsumption) {
          if (!equipmentByTypes.includes(consumption.equipment.type))
            equipmentByTypes.push(consumption.equipment.type)
        }
        for (const equipment of state.clickedScenario.equipmentTypes) {
          if (!equipmentByTypes.includes(equipment))
            equipmentByTypes.push(equipment)
        }
        return JSON.parse(JSON.stringify(equipmentByTypes))
      }
      return []
    },
    getClickedScenario: state => () => state.clickedScenario,
    getRandomScenario: state => () => state.scenarios[Math.floor(Math.random() * state.scenarios.length)],
    getInitialConsumptionCopy: state => () => {
      if (state.clickedScenario)
        return JSON.parse(JSON.stringify(state.clickedScenario.initialConsumption))

      return []
    },
  },
})
