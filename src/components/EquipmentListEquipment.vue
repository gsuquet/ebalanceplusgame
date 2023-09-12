<script setup lang="ts">
    import { Equipment } from '../types/Equipment';
</script>

<template>
    <div class="equi-container" @click="isClicked(equipment)">
        <div class="conso-class " :class="equipment.energy_class">{{ equipment.energy_class }}</div>
        <h1 class="name">{{ consumptionDisplay }}</h1>
        <p class="price">{{ priceDisplay }}</p>
    </div>

</template>

<style scoped lang="scss">
    @import "../styles/components/equipments.scss";
</style>

<script lang="ts">
    export default {
        props: {
            equipment: {
                type: Object as () => Equipment,
                required: true,
            },
        },
        methods: {
            isClicked(equipment:Equipment) {
                useEquipmentStore().setClickedEquipment(equipment);
            }
        },
        computed: {
            consumptionDisplay() {
                return this.equipment.equipmentConsumptionParams.originalConsumption + ' W';
            },
            priceDisplay() {
                return this.equipment.isBought ? "" : this.equipment.equipmentCostParams.originalPrice + ' €';
            },
        }
    }
</script>
