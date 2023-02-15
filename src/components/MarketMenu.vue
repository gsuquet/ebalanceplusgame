<script setup lang="ts">
import { useEnergyStore } from '../stores/EnergyStore';
import { Icon } from '@iconify/vue';
</script>

<template>
        
        
        <div class="market-icon-background" @click="energyStore.clickOnMarketIcon()" v-if="!energyStore.clickedMarketIcon">
            <Icon icon="mdi:home-currency-usd" class="energy-icon-image" :style="{'color' : energyStore.getEnergyIconColor}"/>
        </div>
    <section id="menu" v-else>
        <div class="menu-header" >
            <span class="stored-percentage" :style="{'color' : energyStore.getEnergyIconColor}">
                {{ energyStore.getEnergyStoragePercentage }} %
            </span>
            <h2 class="tittle">
                {{ $t("market.header") }}
            </h2>
            <span class="closebtn" @click="energyStore.clickOnMarketIcon()">&times;</span>
        </div>
        <div class="menu-figure">
            <div class="figure">
                <p class="text">{{ $t("energy.stored") }} :</p>
                <h3 class="text">{{energyStore.storedEnergy}} W</h3>
            </div>
            <!-- TODO: See if  I need this info -->
            <div class="figure">
                <p class="text">{{ $t("energy.max") }} :</p>
                <h3 class="text">{{energyStore.maxEnergy}} W</h3>
            </div>
        </div>
        <div class="menu-button">
            <button class="btn">{{ $t("button.purchase") }}</button>
            <button class="btn"> {{ $t("button.sale") }}</button>
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