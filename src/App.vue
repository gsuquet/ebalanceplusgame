<script setup lang="ts">
import { useProductionStore } from '../src/stores/ProductionStore';
import { useGameParametersStore } from '../src/stores/GameParametersStore';
import TheNavBar from './layout/TheNavBar.vue';
const productionStore = useProductionStore();
productionStore.fetchProductionCurves();
</script>

<template>
  <main class="application" :class="useGameParametersStore().theme">
    <TheNavBar />
    <RouterView />
  </main>
</template>

<style lang="scss">
  @import './styles/global.scss';
</style>
