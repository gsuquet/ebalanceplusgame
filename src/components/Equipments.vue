<script setup lang="ts">
    import { Equipment, useEquipmentStore} from "../stores/EquipmentStore";
    import { ref } from 'vue';
    import type { Ref } from 'vue';

    import AddConsumptionWindow from "../components/AddConsumptionWindow.vue";

    const {equipment} = defineProps<{
        equipment: Equipment;
    }>()

    const store = useEquipmentStore();
    store.getEquipmentData();

    let showModal: Ref<boolean> = ref(false);
</script>

<template>
    <div class="equi-container" @click="showModal = true">
        <div class="conso-class">{{ equipment.energy_class }}</div>
        <h1 class="name"> {{ equipment.conso }}W</h1>
        <p class="price"> {{ equipment.price }}$</p>
    </div>
    <div v-show="showModal">
        <AddConsumptionWindow :equipment="equipment"/>
    </div>
</template>

<style lang="scss">
    @import "../styles/components/equipments.scss";
</style>