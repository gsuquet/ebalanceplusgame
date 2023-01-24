<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Alert from '../components/Alert.vue';
import Board from '../components/Board.vue';
import { useConsumptionStore } from '../stores/ConsumptionStore';
const consumptionStore = useConsumptionStore();
const { t } = useI18n()
</script>

<template>
    <Alert :should-display="consumptionStore.isOverConsumption" 
        alert-class="danger-alert" 
        :alert-text="t('alert.overConsumption')"/>
    <Board />
</template>

