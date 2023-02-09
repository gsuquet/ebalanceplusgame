<script setup lang="ts">
import { useEnergyStore } from '../stores/EnergyStore';
import { Icon } from '@iconify/vue';
</script>

<template>
    <section id="energy-menu-icon">
        <div class="energy-amount" v-if="energyStore.storedEnergy > 0">
            <p>{{ energyStore.storedEnergy }} W</p>
        </div>
        <div class="energy-icon">
            <div class="energy-icon-background" @click="energyStore.clickOnEnergyIcon()">
                <Icon :icon="energyStore.getEnergyIcon" class="energy-icon-image" :style="{'color' : energyStore.getEnergyIconColor}"/>
            </div>
            <span class="energy-icon-batteries" :style="{'padding':energyStore.numberOfBatteries > 9 ? '5px 10px ' : '1px 10px'}">
                {{ energyStore.numberOfBatteries }}
            </span>
        </div>
    </section>
</template>

<script lang="ts">
    const energyStore = useEnergyStore();
    export default {
        name: "EnergyIcon",
        components: {
            Icon
        }
    }
</script>
