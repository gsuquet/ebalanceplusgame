<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
    <div class="card-content">
                <div class="card-content-consumption">
                    <h2 class="consumption-amount">
                        <Icon icon="mdi:flash" class="icon-consumption"/>
                        {{ consumptionAmount }} W</h2>
                    <h2 class="money-amount">
                        <Icon icon="mdi:cash" class="icon-price"/>
                        {{ equipmentPrice }} €</h2>
                </div>
                <div class="card-content-time">
                    <h2 class="consumption-time">
                        <Icon icon="mdi:clock" class="icon-time"/>
                        {{ times.timeStart }} - {{ times.timeEnd}}</h2>
                </div>
            </div>
</template>

<style lang="scss">
    @import '../styles/components/cardPopupContent.scss';
</style>

<script lang="ts">
    export default {
        name: "CardPopupContent",
        props: {
            consumptionAmount: {
                type: Number,
                required: true
            },
            equipmentPrice: {
                type: Number,
                required: true
            },
            times : {
                type: Object as () => Times,
                required: true   
            }
        },
        components: {
            Icon
        }
    }
    interface Times {
    timeStart: string;
    timeEnd: string;
}
</script>
