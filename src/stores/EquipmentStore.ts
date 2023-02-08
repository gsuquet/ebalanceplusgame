import { defineStore } from 'pinia';

export const useEquipmentStore = defineStore({id :'EquipmentStore',
    state: () => {
        return {
            equipments: [{
                id: 0,
                type:{id:'0',names: [{lang: 'fr',name: 'Vide'},{lang: 'en',name: 'Empty'}],icon_name:'vide',color: '#000000'},
                energy_class: '',
                consumption: 0,
                points: 0,
                price: 0,
                point_gap: [0,0],
                price_gap: [0,0]
            }] as Equipment [],
            clickedEquipment: null as null | Equipment
        };
    },
    actions: {
        async getEquipmentData() {
            const data = (await import ('../data/equipments.json')).default;
            this.equipments = data as Equipment[];
        },
        setClickedEquipment(equipment: Equipment | null) {
            this.clickedEquipment = equipment;
        },
        getEquipmentTypeLocale(type: EquipmentType, locale:string){
            for(const name of type.names) {
                if(name.lang === locale){
                    return {name: name.name, icon_name: type.icon_name, color: type.color, id: type.id} as EquipmentTypeLocale;
                }
            }
            return {name: type.names[0].name, icon_name: type.icon_name, color: type.color, id: type.id} as EquipmentTypeLocale;
        },
        getListOfEquipmentTypesLocale() {
            const locale = useGameParametersStore().language;
            const equipmentTypesLocale: EquipmentTypeLocale[] = [];
            for(const equipment of this.equipments) {
                const equipmentTypeLocale = this.getEquipmentTypeLocale(equipment.type, locale);
                if(!equipmentTypesLocale.find(type => type.id === equipmentTypeLocale.id))
                    equipmentTypesLocale.push(equipmentTypeLocale);
            }
            return equipmentTypesLocale;
        },
        convertEquipmentToEquipmentLocale(equipment: Equipment) {
            const locale = useGameParametersStore().language;
            const equipmentTypeLocale = this.getEquipmentTypeLocale(equipment.type, locale);
            return {id: equipment.id, type: equipmentTypeLocale, energy_class: equipment.energy_class, consumption: equipment.consumption, points: equipment.points, price: equipment.price, point_gap: equipment.point_gap, price_gap: equipment.price_gap} as EquipmentLocale;
        }
    },
    getters: {
        getEquipmentById:(state) => (id: number) => {
            return state.equipments.find(equipment => equipment.id === id);
        },
        getEquipmentByTypeId:(state) => (id:string) => {
            const equipmentByType: Equipment[] = [];
            for(const equipment of state.equipments) {
                if(equipment.type.id === id)
                    equipmentByType.push(equipment);
            }
            return equipmentByType;
        },
        getListOfEquipmentTypes: (state) => () => {
            const equipmentTypes: EquipmentType[] = [];
            for(const equipment of state.equipments) {
                if(!equipmentTypes.includes(equipment.type))
                    equipmentTypes.push(equipment.type);
            }
        }
    },
});

export interface Equipment{
    id: number,
    type: EquipmentType,
    energy_class: string, 
    consumption: number,
    points: number,
    price: number,
    point_gap: number[],
    price_gap: number[];
}

export interface EquipmentLocale{
    id: number,
    type: EquipmentTypeLocale,
    energy_class: string,
    consumption: number,
    points: number,
    price: number,
    point_gap: number[],
    price_gap: number[]
}

export interface EquipmentType{
    id: string,
    names: EquipmentTypeName[],
    icon_name: string,
    color: string
}

export interface EquipmentTypeLocale{
    id: string,
    name: string,
    icon_name: string,
    color: string
}

export interface EquipmentTypeName{
    lang: string,
    name: string
}
