<script setup lang="ts">
    import {  useScenarioStore } from '../stores/ScenarioStore';
    import { Icon } from '@iconify/vue';
    // import { EquipmentTypeLocale } from '../stores/EquipmentStore';
    const scenarioStore = useScenarioStore();

</script>

<template>
    <div class="recap-container">
        <div class="card-content" v-if="scenarioStore.clickedScenario">
            <h1 class="name">
                {{ scenarioStore.clickedScenario.name }}
            </h1>

            <div class="meteo-container">
                  <h1 class="day">
                    {{ scenarioStore.clickedScenario.day }}
                </h1>
                <div class="icon-season">
                    <Icon :icon="scenarioStore.clickedScenario.icon" />
                </div>
            </div>
            <div class="separator"></div>
            <div class="icon-container">
                <div class="icon-type-prod" >
                    <!-- TODO Add the icon  -->
                </div>
            </div> 
            <div class="explanation-container">
                <p>{{ scenarioStore.clickedScenario.description }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../styles/components/productionAndScenarioResume.scss";
</style>