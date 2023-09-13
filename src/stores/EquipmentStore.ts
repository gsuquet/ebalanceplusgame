import { defineStore } from 'pinia'
import { errorEquipment } from '../assets/entityErrorEquipment'
import type { Equipment, EquipmentDTO } from '../types/Equipment'
import type { EquipmentType, EquipmentTypeDTO, EquipmentTypeDurationParams } from '../types/EquipmentType'

export const useEquipmentStore = defineStore({
  id: 'EquipmentStore',
  state: () => {
    return {
      equipmentsTypesDurationParameters: [] as EquipmentTypeDurationParams[],
      allEquipmentsTypes: [] as EquipmentType[],
      allEquipments: [] as EquipmentDTO[],
      availableEquipments: [errorEquipment] as Equipment[],
      clickedEquipment: null as null | Equipment,
    }
  },
  actions: {
    async fetchEquipments() {
      this.equipmentsTypesDurationParameters = (await import ('../data/equipmentsTypesDurationParameters.json')).default
      const equipmentsTypesData = (await import ('../data/equipmentsTypes.json')).default
      const equipmentsData = (await import ('../data/equipments.json')).default
      this.allEquipmentsTypes = this.convertEquipmentTypes(equipmentsTypesData)
      this.allEquipments = equipmentsData
      useConsumptionStore().fetchAllInitialConsumptions()
    },
    setClickedEquipment(equipment: Equipment | null) {
      this.clickedEquipment = equipment
    },
    convertEquipmentTypeDtoToEquipmentType(equipmentTypeDto: EquipmentTypeDTO, isBattery: boolean, isCharging: boolean): EquipmentType {
      const equipmentType: EquipmentType = {
        id: equipmentTypeDto.id,
        names: equipmentTypeDto.names,
        icon_name: equipmentTypeDto.icon_name,
        color: equipmentTypeDto.color,
        isBattery,
        isCharging,
        equipmentTypeDurationParams: this.equipmentsTypesDurationParameters.find(equipmentTypeDurationParams => equipmentTypeDurationParams.id === equipmentTypeDto.equipmentTypeDurationParamsId) as EquipmentTypeDurationParams,
      }
      return equipmentType
    },
    convertEquipmentTypes(equipmentTypesDtoList: EquipmentTypeDTO[]) {
      return equipmentTypesDtoList.map(equipmentTypeDto => this.convertEquipmentTypeDtoToEquipmentType(equipmentTypeDto, false, false))
    },
    convertEquipmentDtoToEquipment(equipmentDto: EquipmentDTO, isBought: boolean): Equipment {
      const equipment: Equipment = {
        id: equipmentDto.id,
        energy_class: equipmentDto.energy_class,
        type: this.getEquipmentTypeById(equipmentDto.typeID) as EquipmentType,
        isBought,
        equipmentCostParams: equipmentDto.equipmentCostParams,
        equipmentConsumptionParams: equipmentDto.equipmentConsumptionParams,
      }
      return equipment
    },
    convertEquipments(equipmentsDtoList: EquipmentDTO[], areEquipmentsBought: boolean) {
      return equipmentsDtoList.map(equipmentDto => this.convertEquipmentDtoToEquipment(equipmentDto, areEquipmentsBought))
    },
    getEquipmentFromEquipmentDTOId(id: string, isBought: boolean) {
      const equipmentDto = this.allEquipments.find(equipmentDto => equipmentDto.id === id)
      if (equipmentDto)
        return this.convertEquipmentDtoToEquipment(equipmentDto, isBought)

      return errorEquipment
    },
    setAvailableEquipments() {
      const availableEquipmentTypes = useScenarioStore().getEquipmentTypesFromClickedScenario
      const equipments = [] as Equipment[]
      for (const type of availableEquipmentTypes) {
        for (const equipmentDTO of this.allEquipments) {
          if (equipmentDTO.typeID === type.id)
            equipments.push(this.convertEquipmentDtoToEquipment(equipmentDTO, false))
        }
      }
      const equipmentsCopy = JSON.parse(JSON.stringify(equipments)) as Equipment[]
      const usedEquipments = useConsumptionStore().getUsedEquipmentList
      for (const usedEquipment of usedEquipments) {
        const index = equipmentsCopy.findIndex(equipment => equipment.id === usedEquipment.id)
        if (index !== -1)
          equipmentsCopy[index] = usedEquipment
      }
      this.availableEquipments = equipmentsCopy
    },
    updateAvailableEquipments(equipment: Equipment) {
      const index = this.availableEquipments.findIndex(equipmentInList => equipmentInList.id === equipment.id)
      if (index !== -1)
        this.availableEquipments[index] = equipment
    },
  },
  getters: {
    getEquipmentTypeById: state => (id: string) => {
      return state.allEquipmentsTypes.find(type => type.id === id)
    },
    getAvailableEquipmentById: state => (id: string) => {
      return state.availableEquipments.find(equipment => equipment.id === id)
    },
    getAvailableEquipmentByTypeId: state => (id: string) => {
      const equipmentByType: Equipment[] = []
      for (const equipment of state.availableEquipments) {
        if (equipment.type.id === id)
          equipmentByType.push(equipment)
      }
      return equipmentByType
    },
    getEquipmentDTOById: state => (id: string) => {
      return state.allEquipments.find(equipmentDto => equipmentDto.id === id)
    },
    getEquipmentsDTOFromIdList: state => (equipmentDtoIdList: string[]) => {
      const equipmentsDtoList: EquipmentDTO[] = []
      for (const id of equipmentDtoIdList) {
        const equipment = state.allEquipments.find(equipmentDto => equipmentDto.id === id)
        if (equipment && !equipmentsDtoList.includes(equipment))
          equipmentsDtoList.push(equipment)
      }
    },
  },
})
