<script setup lang="ts">
    import { Icon } from '@iconify/vue';
</script>

<template>
    <section id="money-menu-icon" class="icon-section" v-if="moneyStore.displayMoneyIcon">
        <div class="money-amount amount">
            <p>{{ moneyStore.getMoneyAmountToDisplay }} {{ moneyStore.getMoneyCurrency }}</p>
        </div>
        <div class="money-icon-container icon-container">
            <div class="money-icon-background icon-background">
                <Icon :icon="moneyStore.getMoneyCurrencyIcon" class="money-icon-image icon-image" />    
            </div>   
        </div>
    </section>
</template>

<script lang="ts">
    export default {
        name: "MoneyMenuIcon",
        components: {
            Icon
        },
        data() {
            return {
                moneyStore: useMoneyStore()
            }
        }
    }
</script>
