<script lang="ts">
    import { useEquipmentStore} from "../stores/EquipmentStore";
    //import EquipmentType from "../components/EquipementType.vue";
    import WashingMachine from "../icons/WashingMachine.vue";
    import Dishwasher from "../icons/Dishwasher.vue";
    import ArrowRight from "../icons/ArrowRight.vue";
    import Equipments from "../components/Equipments.vue";

    import { Icon } from "@iconify/vue"
    
    
    export default {
        setup() {
            const store = useEquipmentStore();
            store.getEquipmentData();

            return {store}

        }, 
        data() {
            return {
                showList: false as boolean,
                listSizeExtended: true as boolean,
            }
        },
        components: {
            //EquipmentType,
            WashingMachine, 
            Dishwasher,
            ArrowRight,
            Equipments,
            Icon,
        },
        methods: {
            expandList(showList: boolean) {
                if(showList == false) 
                    showList = true;
                else 
                    showList = false;
                return (showList);
            },
            listSize(listSizeExtended: boolean) {
                if(listSizeExtended == false)
                    listSizeExtended = true;
                else
                    listSizeExtended = false;
                return listSizeExtended
            }
        }
    }
    
    let showList = false;        
</script>

<template>
    <section class="list-equipment">
        <div class="list-container" >
            <div class="icon-container"> <!-- this because can't put a click on an icon directly -->
                <Icon icon="mdi:menu" class="icon-menu-extend" @click="listSizeExtended = listSize(listSizeExtended)"/>
            </div>
            
            <div class="type-list-normal" v-if="listSizeExtended">
                <div class="boucle" v-for="equipment_type_icon in store.getTypeAndIcon()" > 
                    <div class="type-container" @click="showList = expandList(showList)">
                        <h1>
                            {{ equipment_type_icon.type }}
                        </h1>
                        <Icon class="material-icons" :icon="equipment_type_icon.name_icon"/>
                    </div>
                    <div class="equipment-container" v-if="showList" >
                            <Equipments v-for="equipment in store.getEquipmentByType(equipment_type_icon.type)" :key="equipment_type_icon.type"  :equipment="equipment"/>
                    </div>
                </div>
            </div>
            <!-- Reduce List -->
            <div class="type-list-reduce" v-else>
                <div class="boucle" v-for="icon in store.getIconOnly()">
                    <Icon :icon="icon" class="icon-type" />
                </div>

            </div>
        </div>
    </section> 
</template>

<style scoped lang="scss">
    @import "../styles/components/list.scss";
</style>