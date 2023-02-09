<script setup lang="ts">
import EnergyIcon from '../components/EnergyIcon.vue';
import EnergyMenu from '../components/EnergyMenu.vue';
import { useEnergyStore } from '../stores/EnergyStore';
</script>

<template>
    <section id="game-board-snackbar">
        <EnergyMenu v-if="useEnergyStore().clickedEnergyIcon"/>
        <EnergyIcon />        
    </section>
</template>

<style lang="scss">
    @import '../styles/components/gameBoardSnackBar.scss';
</style>
