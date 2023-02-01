<script setup lang="ts">
import { useProductionStore } from '../src/stores/ProductionStore';
import NavBar from './layout/NavBar.vue';
const productionStore = useProductionStore();
productionStore.fetchProductionCurves();
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style lang="scss">
@import './styles/global.scss';
</style>
