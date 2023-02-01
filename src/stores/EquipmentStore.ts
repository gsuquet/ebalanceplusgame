import { defineStore } from 'pinia';

export const useEquipmentStore = defineStore({id :'EquipmentStore',
    state: () => {
        return {
            equipments: [{
                id: 0,
                type_fr: '',
                type_en: '',
                energy_class: '',
                consumption: 0,
                points: 0,
                price: 0,
                name_icon: 'vide',
                color: '#000000',
                point_gap: [0,0],
                price_gap: [0,0]
            }] as Equipment [],
            clickedEquipment: null as null | Equipment,
            typeAndIcons : [{
                type: " ",
                name_icon : " "
            }] as TypeAndIcon[]
        };
    },
    actions: {
        async getEquipmentData() {
            const data = (await import ('../data/equipments.json')).default;
            this.equipments = data as Equipment[];
        },
        setClickedEquipment(equipment: Equipment | null) {
            this.clickedEquipment = equipment;
        }  
        /*
        setPriceAndScoreGap(type: string) { //maybe not the best solution don't do it or automate it
            let listePoints: number[] = []
            let listePrice: number[] = []
            let equipmentlist: Equipment[] = []
            equipmentlist =  this.getEquipmentByType(type);
            for(let i=0; i< equipmentlist.length; i++){
                listePoints.push(equipmentlist[i].points)
                listePrice.push(equipmentlist[i].price)
            }
        }, 
        */
    },
    getters: {
        getEquipmentById:(state) => (id: number) => {
            return state.equipments.find(equipment => equipment.id == id);
        },
        getEquipmentByType:(state) => (type: string) => {
            const equipmentByType: Equipment[] = [];
            for(const equipment of state.equipments) {
                if(equipment.type_fr == type || equipment.type_en == type)
                    equipmentByType.push(equipment);
            }
            return equipmentByType;
        },
        getListOfEquipmentTypes: (state) => {
            const equipmentTypes: string[] = [];
            const isFrench = useGameParametersStore().language === 'fr';
            if(isFrench) {
                for(const equipment of state.equipments) {
                    if(!equipmentTypes.includes(equipment.type_fr)) {
                        equipmentTypes.push(equipment.type_fr);
                    }
                }
            }
            else {
                for(const equipment of state.equipments) {
                    if(!equipmentTypes.includes(equipment.type_en)) {
                        equipmentTypes.push(equipment.type_en);
                    }
                }
            }
            return equipmentTypes;
        },
        getListOfEquipmentIcons: (state) => {
            const equipmentIcons: string[] = [];
            for(const equipment of state.equipments) {
                if(!equipmentIcons.includes(equipment.name_icon)) {
                    equipmentIcons.push(equipment.name_icon);
                }
            }
            return equipmentIcons;
        },
        getListOfEquipmentTypesAndIcons: (state) => {
            const equipmentTypesAndIcons: TypeAndIcon[] = [];
            const isFrench = useGameParametersStore().language === 'fr';
            if(isFrench) {
                for(const equipment of state.equipments) {
                    if(!equipmentTypesAndIcons.find(x => x.type === equipment.type_fr)) {
                        equipmentTypesAndIcons.push({type: equipment.type_fr, name_icon: equipment.name_icon});
                    }
                }
            }
            else {
                for(const equipment of state.equipments) {
                    if(!equipmentTypesAndIcons.find(x => x.type === equipment.type_en)) {
                        equipmentTypesAndIcons.push({type: equipment.type_en, name_icon: equipment.name_icon});
                    }
                }
            }
            return equipmentTypesAndIcons;
        }
    },
});

export interface Equipment{
    id: number,
    type_fr: string ,
    type_en: string,
    energy_class: string, 
    consumption: number,
    points: number,
    price: number,
    name_icon: string,
    color: string,
    point_gap: number[],
    price_gap: number[];
}

export interface TypeAndIcon {
    type: string;
    name_icon: string;
}
