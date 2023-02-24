<script setup lang="ts">
    import { Icon } from '@iconify/vue';
</script>

<template>
    <section id="market-menu-icon" class="icon-section"  v-if="energyStore.displayMarketIcon">
        <div class="market-icon-container icon-container">
            <div class="market-icon-background icon-background" @click="energyStore.clickOnMarketIcon()">
                <Icon icon="mdi:home-currency-usd" class="market-icon-image icon-image" />    
            </div>   
        </div>
    </section>
</template>

<script lang="ts">
    export default {
        name: "MarketMenuIcon",
        components: {
            Icon
        },
        data() {
            return {
                energyStore: useEnergyStore()
            }
        }
    }
</script>
