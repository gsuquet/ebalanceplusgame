<script setup lang="ts">
import { useEnergyStore } from '../stores/EnergyStore';
</script>

<template>
    <section id="market-menu">
        <div class="menu-header">
            <span class="stored-percentage" :style="{'color' : energyStore.getEnergyIconColor}">
                {{ energyStore.getEnergyStoragePercentage }} %
            </span>
            <h2 class="tittle">
                {{ $t("market.header") }}
            </h2>
            <span class="closebtn" @click="energyStore.clickOnMarketIcon()">&times;</span>
        </div>


    </section>
</template>

<script lang="ts">
    const energyStore = useEnergyStore();
    export default {
        name: "PurchaseSaleMenu"
    }
</script>

<style scoped lang="scss">
    @import "../styles/components/energyMenu.scss";
</style>