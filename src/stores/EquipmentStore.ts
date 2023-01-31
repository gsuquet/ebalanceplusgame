import { defineStore } from "pinia";

export const useEquipmentStore = defineStore({id :'EquipmentStore',
    state: () => {
        return {
            equipments: [{
                id: 0,
                type_fr: " ",
                type_en: " ",
                energy_class: " ",
                conso: 0,
                points: 0,
                price: 0,
                name_icon: "vide",
                color: "#000000",
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
        getEquipmentByType(type : string) {
            const equipmentsByType: Equipment [] = [];
            for(let i =0; i < this.equipments.length; i++) {
                if(this.equipments[i].type_fr == type || this.equipments[i].type_en == type)
                    equipmentsByType.push(this.equipments[i]);
            }
            return equipmentsByType;
        },
        getTypeOnly() {
            const type: string[] = []
            for(let i=0; i<this.equipments.length; i++) {
                if(type.find(x=>x == this.equipments[i].type_fr)){
                }
                else {
                    type.push(this.equipments[i].type_fr);
                }
            }
            return type; 
        },
        // put the two methods together
        getIconOnly() {
            const icon: string[] = []
            for(let i=0; i<this.equipments.length; i++) {    
                if(icon.find(x=>x == this.equipments[i].name_icon)){       
                }
                else {
                    icon.push(this.equipments[i].name_icon); 
                }
            }
            return icon; 
        },
        getTypeAndIcon() {
            const listTypeAndIcon: TypeAndIcon[] = [];
            const type: string[] = [];
            const icon: string[] = [];
            for(let i=0; i<this.equipments.length; i++) {
                if(type.find(x=>x == this.equipments[i].type_fr)){
                }
                else {
                    type.push(this.equipments[i].type_fr);
                    icon.push(this.equipments[i].name_icon);
                }
            }
            for(let i = 0; i<type.length; i++) {
                let typeAndIcon: TypeAndIcon 
                typeAndIcon = { type:type[i], name_icon:icon[i]};
                listTypeAndIcon.push(typeAndIcon);
            }
            return listTypeAndIcon;
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
            //state.equipment[id];
            //Not sure that the function will be 100% accurate other solution below 
            state.equipments.find(function(item) {
                return item.id == id
            });
            let test = state.equipments.find(x => x.id == id);
            console.log(test);
        }
    },
});

export interface Equipment{
    id: number,
    type_fr: string ,
    type_en: string,
    energy_class: string, 
    conso: number,
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

