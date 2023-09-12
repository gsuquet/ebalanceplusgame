<script setup lang="ts">
    import EquipmentListEquipment from './EquipmentListEquipment.vue';
    import { Icon } from '@iconify/vue';
    import { convertI18nObjectToLocale } from '../helpers/translation';
</script>

<template>
    <section class="list-equipment">
        <div class="list-container" >
            <div class="icon-container" :class="listSizeExtended ? 'icon-container-extended':'icon-container-reduced'">
                <Icon icon="mdi:arrow-left" class="icon-menu" @click="listSizeExtended = false" v-if="listSizeExtended"/>
                <Icon icon="mdi:arrow-right" class="icon-menu" @click="listSizeExtended = true" v-else/>
            </div>
            
            <div class="type-list-normal type" v-if="listSizeExtended">
                <div class="boucle" v-for="equipmentType in scenarioStore.getEquipmentTypesFromClickedScenario">
                    <div class="type-container" @click="handleShowEquipments(equipmentType.id)">
                        <Icon class="material-icons" :icon="equipmentType.icon_name" :style="{'color':equipmentType.color}"/>
                        <h1>
                            {{ convertI18nObjectToLocale(equipmentType.names,gameParametersStore.language) }}
                        </h1>
                    </div>
                    <div class="equipment-container" v-if="showEquipmentType===equipmentType.id" >
                            <EquipmentListEquipment v-for="equipment in equipmentStore.getAvailableEquipmentByTypeId(equipmentType.id)" :key="equipment.id"  :equipment="equipment"/>
                    </div>
                </div>
            </div>
            <div class="type-list-reduce type" v-else>
                <div class="boucle" v-for="equipmentType in scenarioStore.getEquipmentTypesFromClickedScenario">
                    <Icon :icon="equipmentType.icon_name" class="icon-type" :style="{'color':equipmentType.color}" @click="handleEquipmentTypeIconClick(equipmentType.id)"/>
                </div>
            </div>
        </div>
    </section> 
</template>

<style scoped lang="scss">
    @import "../styles/components/list.scss";
</style>

<script lang="ts">
    export default {
        data() {
            return {
                equipmentStore: useEquipmentStore(),
                scenarioStore: useScenarioStore(),
                gameParametersStore: useGameParametersStore(),
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
