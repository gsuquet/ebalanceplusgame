<script lang="ts">
    import { useEquipmentStore } from '../stores/EquipmentStore';
    import EquipmentListEquipment from './EquipmentListEquipment.vue';
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
            EquipmentListEquipment,
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
                <div class="boucle" v-for="equipmentTypeLocale in equipmentStore.getListOfEquipmentTypesLocale()">
                    <div class="type-container" @click="handleShowEquipments(equipmentTypeLocale.id)">
                        <Icon class="material-icons" :icon="equipmentTypeLocale.icon_name" :style="{'color':equipmentTypeLocale.color}"/>
                        <h1>
                            {{ equipmentTypeLocale.name }}
                        </h1>
                    </div>
                    <div class="equipment-container" v-if="showEquipmentType===equipmentTypeLocale.id" >
                            <EquipmentListEquipment v-for="equipment in equipmentStore.getEquipmentByTypeId(equipmentTypeLocale.id)" :key="equipmentTypeLocale.id"  :equipment="equipment"/>
                    </div>
                </div>
            </div>
            <div class="type-list-reduce type" v-else>
                <div class="boucle" v-for="equipmentTypeLocale in equipmentStore.getListOfEquipmentTypesLocale()">
                    <Icon :icon="equipmentTypeLocale.icon_name" class="icon-type" :style="{'color':equipmentTypeLocale.color}" @click="handleEquipmentTypeIconClick(equipmentTypeLocale.id)"/>
                </div>
            </div>
        </div>
    </section> 
</template>

<style scoped lang="scss">
    @import "../styles/components/list.scss";
</style>
