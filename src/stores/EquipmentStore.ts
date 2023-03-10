import { defineStore } from 'pinia';
import { errorEquipment } from '../assets/entityErrorEquipment';
import { Equipment, EquipmentDTO } from '../types/Equipment';
import { EquipmentType } from '../types/EquipmentType';

export const useEquipmentStore = defineStore({id :'EquipmentStore',
    state: () => {
        return {
            allEquipmentsTypes: [] as EquipmentType[],
            allEquipments: [] as EquipmentDTO[],
            initialEquipments: [errorEquipment] as Equipment[],
            availableEquipments: [errorEquipment] as Equipment[],
            clickedEquipment: null as null | Equipment
        };
    },
    actions: {
        async fetchEquipments() {
            const equipmentsTypesData = (await import ('../data/equipmentsTypes.json')).default;
            const equipmentsData = (await import ('../data/equipments.json')).default;
            this.allEquipmentsTypes = equipmentsTypesData;
            this.allEquipments = equipmentsData;
            useConsumptionStore().fetchAllInitialConsumptions();
        },
        setClickedEquipment(equipment: Equipment | null) {
            this.clickedEquipment = equipment;
        },
        convertEquipmentDtoToEquipment(equipmentDto: EquipmentDTO, isBought:boolean): Equipment {
            const equipment: Equipment = {
                id: equipmentDto.id,
                energy_class: equipmentDto.energy_class,
                type: this.getEquipmentTypeById(equipmentDto.typeID) as EquipmentType,
                isBought: isBought,
                equipmentCostParams: equipmentDto.equipmentCostParams,
                equipmentConsumptionParams: equipmentDto.equipmentConsumptionParams
            };
            return equipment;
        },
        convertEquipments(equipmentsDtoList: EquipmentDTO[], areEquipmentsBought: boolean) {
            return equipmentsDtoList.map(equipmentDto => this.convertEquipmentDtoToEquipment(equipmentDto,areEquipmentsBought));
        },
        getEquipmentFromEquipmentDTOId(id:string, isBought:boolean) {
            const equipmentDto = this.allEquipments.find(equipmentDto => equipmentDto.id === id);
            if(equipmentDto){
                return this.convertEquipmentDtoToEquipment(equipmentDto,isBought);
            }
            return errorEquipment;
        },
        setAvailableEquipments(){
            const availableEquipmentTypes = useScenarioStore().getEquipmentTypesFromClickedScenario;
            let equipments = [] as Equipment[];
            for (const type of availableEquipmentTypes) {
                for(const equipmentDTO of this.allEquipments) {
                    if(equipmentDTO.typeID===type.id) {
                        equipments.push(this.convertEquipmentDtoToEquipment(equipmentDTO,false));
                    }
                }
            }
            this.availableEquipments=JSON.parse(JSON.stringify(equipments));
        }
    },
    getters: {
        getEquipmentTypeById:(state) => (id: string) => {
            return state.allEquipmentsTypes.find(type => type.id === id);
        },
        getAvailableEquipmentById:(state) => (id: string) => {
            return state.availableEquipments.find(equipment => equipment.id === id);
        },
        getAvailableEquipmentByTypeId:(state) => (id:string) => {
            let equipmentByType: Equipment[] = [];
            for(const equipment of state.availableEquipments) {
                if(equipment.type.id === id)
                    equipmentByType.push(equipment);
            }
            return equipmentByType;
        },
        getEquipmentDTOById:(state) => (id:string) => {
            return state.allEquipments.find(equipmentDto => equipmentDto.id === id);
        },
        getEquipmentsDTOFromIdList:(state) => (equipmentDtoIdList: string[]) => {
            let equipmentsDtoList: EquipmentDTO[] = [];
            for (const id of equipmentDtoIdList) {
                const equipment = state.allEquipments.find(equipmentDto => equipmentDto.id === id);
                if(equipment && !equipmentsDtoList.includes(equipment)){
                    equipmentsDtoList.push(equipment);
                }
            }
        }
    },
});
