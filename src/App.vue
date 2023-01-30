<script setup lang="ts">
import { useProductionStore } from '../src/stores/ProductionStore';
const productionStore = useProductionStore();
productionStore.fetchProductionCurves();
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import './styles/global.scss';
</style>
