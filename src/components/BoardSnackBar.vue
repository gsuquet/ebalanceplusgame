<script setup lang="ts">
    import EnergyMenu from './EnergyMenu.vue';
    import MarketMenu from './MarketMenu.vue';
    import EnergyMenuIcon from './EnergyMenuIcon.vue';
    import MarketMenuIcon from './MarketMenuIcon.vue';
    import MoneyMenuIcon from './MoneyMenuIcon.vue';
</script>

<template>
    <section id="game-board-snackbar">
        <MoneyMenuIcon/>
        <MarketMenu/>
        <MarketMenuIcon/>
        <EnergyMenu/>
        <EnergyMenuIcon/>
    </section>
</template>

<style lang="scss">
    @import '../styles/components/gameBoardSnackBar.scss';
</style>
