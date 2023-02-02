<script lang="ts">
    import { useEquipmentStore } from '../stores/EquipmentStore';
    import Equipments from '../components/Equipments.vue';
    import { Icon } from '@iconify/vue';
    export default {
        setup() {
            const equipmentStore = useEquipmentStore();
            equipmentStore.getEquipmentData();
            return {equipmentStore}
        }, 
        data() {
            return {
                showList: false as boolean,
                showEquipmentType: "" as string,
                listSizeExtended: true as boolean,
            }
        },
        components: {
            Equipments,
            Icon,
        },
        methods: {
            handleEquipmentTypeIconClick(equipmentType : string) {
                this.handleShowEquipments(equipmentType);
                this.listSizeExtended = true;
            },
            handleShowEquipments(equipmentType : string) {
                if(this.showEquipmentType === equipmentType)
                    this.showEquipmentType = "";
                else
                    this.showEquipmentType = equipmentType;
            },
        }
    }
</script>

<template>
    <section class="list-equipment">
        <div class="list-container" >
            <div class="icon-container" :class="listSizeExtended ? 'icon-container-extended':'icon-container-reduced'">
                <Icon icon="mdi:arrow-left" class="icon-menu" @click="listSizeExtended = false" v-if="listSizeExtended"/>
                <Icon icon="mdi:arrow-right" class="icon-menu" @click="listSizeExtended = true" v-else/>
            </div>
            
            <div class="type-list-normal type" v-if="listSizeExtended">
                <div class="boucle" v-for="equipment_type_icon in equipmentStore.getListOfEquipmentTypesAndIconsAndColors">
                    <div class="type-container" @click="handleShowEquipments(equipment_type_icon.type)">
                        <Icon class="material-icons" :icon="equipment_type_icon.name_icon" :style="{'color':equipment_type_icon.color}"/>
                        <h1>
                            {{ equipment_type_icon.type }}
                        </h1>
                    </div>
                    <div class="equipment-container" v-if="showEquipmentType===equipment_type_icon.type" >
                            <Equipments v-for="equipment in equipmentStore.getEquipmentByType(equipment_type_icon.type)" :key="equipment_type_icon.type"  :equipment="equipment"/>
                    </div>
                </div>
            </div>
            <div class="type-list-reduce type" v-else>
                <div class="boucle" v-for="equipment in equipmentStore.getListOfEquipmentTypesAndIconsAndColors">
                    <Icon :icon="equipment.name_icon" class="icon-type" :style="{'color':equipment.color}" @click="handleEquipmentTypeIconClick(equipment.type)"/>
                </div>
            </div>
        </div>
    </section> 
</template>

<style scoped lang="scss">
    @import "../styles/components/list.scss";
</style>
