<script setup lang="ts">
    import { Equipment } from '../types/Equipment';

    const {equipment} = defineProps<{
        equipment: Equipment;
    }>()
    
    function isClicked(equipment:Equipment) {
        useEquipmentStore().setClickedEquipment(equipment);
    }

</script>

<template>
    <div class="equi-container" @click="isClicked(equipment)">
        <div class="conso-class " :class="equipment.energy_class">{{ equipment.energy_class }}</div>
        <h1 class="name">{{ equipment.equipmentConsumptionParams.originalConsumption }} W</h1>
        <p class="price">{{ equipment.equipmentCostParams.originalPrice }} €</p>
    </div>

</template>

<style scoped lang="scss">
    @import "../styles/components/equipments.scss";
</style>