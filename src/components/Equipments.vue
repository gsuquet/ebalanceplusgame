<script setup lang="ts">
    import { Equipment, useEquipmentStore} from "../stores/EquipmentStore";

    const {equipment} = defineProps<{
        equipment: Equipment;
    }>()

    const store = useEquipmentStore();
    store.getEquipmentData();


    function isClicked(equipment:Equipment) {
        store.setClickedEquipment(equipment);
    }

</script>

<template>
    <div class="equi-container" @click="isClicked(equipment)">
        <div class="conso-class">{{ equipment.energy_class }}</div>
        <h1 class="name"> {{ equipment.conso }}W</h1>
        <p class="price"> {{ equipment.price }}$</p>
    </div>

</template>

<style scoped lang="scss">
    @import "../styles/components/equipments.scss";
</style>