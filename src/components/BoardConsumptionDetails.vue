<script setup lang="ts">
    import { Tile } from '../types/Board';
    import { Icon } from '@iconify/vue';
    import BoardConsumptionDetailsWindow from './BoardConsumptionDetailsWindow.vue';
</script>

<template>
    <section id="board-consumption-details">
        <div class="tab-container" v-if="production && consumption">
            <div
                class="tab"
                :class="{ 'active-tab': isConsumptionDisplayed }"
                @click="isConsumptionDisplayed = true">
                <Icon
                    class="tab-icon"
                    :icon="consumption.equipment.type.icon_name"
                    :style="{'color':consumption.equipment.type.color}"/>
                
            </div>
            <div
                class="tab"
                :class="{ 'active-tab': !isConsumptionDisplayed }"
                @click="isConsumptionDisplayed = false">
                <Icon
                    class="tab-icon"
                    :icon="production.equipment.type.icon_name"
                    :style="{'color':production.equipment.type.color}"/>
            </div>
        </div>
        <BoardConsumptionDetailsWindow
            v-if="isConsumptionDisplayed && isConsumptionTile"
            :consumption="consumption"/>
        <BoardConsumptionDetailsWindow
            v-if="!isConsumptionDisplayed && isProductionTile"
            :consumption="production"/>
    </section>
</template>

<style lang="scss">
    @import '../styles/components/boardConsumptionDetails.scss';
</style>

<script lang="ts">
    export default {
        name: 'BoardConsumptionDetails',
        components: {
            BoardConsumptionDetailsWindow
        },
        data() {
            return {
                consumptionStore: useConsumptionStore(),
                productionStore: useProductionStore(),
                isConsumptionDisplayed: true,
            }
        },
        props: {
            consumptionTile : {
                type: Object as () => Tile,
                required: true
            },
            productionTile : {
                type: Object as () => Tile,
                required: true
            },
        },
        computed: {
            isProductionTile() {
                return this.productionTile?.id !== 'empty';
            },
            isConsumptionTile() {
                return this.consumptionTile?.id !== 'empty';
            },
            consumption() {
                if(this.isConsumptionTile){
                    return this.consumptionStore.getConsumptionById(this.consumptionTile.id);
                } else {
                    return null;
                }
            },
            production() {
                if(this.isProductionTile){
                    return this.productionStore.getAddedProductionById(this.productionTile.id);
                } else {
                    return null;
                }
            }
        }
    }
</script>
