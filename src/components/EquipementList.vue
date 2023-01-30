<script lang="ts">
    import { useEquipmentStore} from "../stores/EquipmentStore";
    //import EquipmentType from "../components/EquipementType.vue";
    import WashingMachine from "../icons/WashingMachine.vue";
    import Dishwasher from "../icons/Dishwasher.vue";
    import ArrowRight from "../icons/ArrowRight.vue";
    import Equipments from "../components/Equipments.vue";
    
    export default {
        setup() {
            const store = useEquipmentStore();
            store.getEquipmentData();

            return {store}

        }, 
        data() {
            return {
                showList: false as boolean 
            }
        },
        components: {
            //EquipmentType,
            WashingMachine, 
            Dishwasher,
            ArrowRight,
            Equipments,
        },
        methods: {
            expandList(showList: boolean) {
                if(showList == false) 
                    showList = true;
                else 
                    showList = false;
                return (showList);
            }
        }
    }
    
    let showList = false;        
</script>

<template>
    <section class="list-equipment">
        <!--        
        <div class="menu-toggle-wrap">
            <button class="menu-toggle">
                <ArrowRight class="material-icons"/>
            </button>
        </div>
        -->
        <div class="list-container">
            <div class="type-list">
                <div class="boucle" v-for="equipment_type in store.getTypeOnly()" >  
                    <div class="type-container" @click="showList = expandList(showList)">
                        <h1>
                            {{ equipment_type }}
                        </h1>
                        <!-- TODO: change that !!! -->
                        <div class="icon" v-if="equipment_type == 'lave-vaisselle'">
                            <Dishwasher class="material-icons"/>
                        </div>
                        <div class="icon" v-else >
                            <WashingMachine class="material-icons"/>
                        </div> 
                    </div>
                    <div class="equipment-container" v-if="showList" >
                            <Equipments v-for="equipment in store.getEquipmentByType(equipment_type)" :key="equipment_type"  :equipment="equipment"/>
                    </div>
                </div>
            </div>
        </div>
    </section> 
</template>

<style scoped lang="scss">
    @import "../styles/components/list.scss";
</style>