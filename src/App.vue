<script setup lang="ts">
import { useProductionStore } from '../src/stores/ProductionStore';
import { useGameParametersStore } from '../src/stores/GameParametersStore';
import NavBar from './layout/NavBar.vue';
const productionStore = useProductionStore();
productionStore.fetchProductionCurves();
</script>

<template>
  <main class="application" :class="useGameParametersStore().theme">
    <NavBar />
    <RouterView />
  </main>
</template>

<style lang="scss">
  @import './styles/global.scss';
</style>
