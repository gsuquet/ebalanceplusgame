<script lang="ts">
    import {  useScenarioStore } from '../stores/ScenarioStore';
    import { ScenarioLocale } from '../types/Scenario';
    import { Icon } from '@iconify/vue';
    
    const scenarioStore = useScenarioStore();
    export default {
        setup() {
            const scenarioStore = useScenarioStore();
            scenarioStore.getAllScenario(); 
            return {scenarioStore}; 
        },
        components: {
            Icon,
        },
        computed: {
        },
        methods: {
            isClicked(scenario: ScenarioLocale) {
                this.scenarioStore.setClickedScenario(scenario);
            },
            getEquipmentType(scenario: ScenarioLocale) {
                return scenario.equipment_type_local
            }, 
            
        }
    }


</script>

<template>
    <section class="list-container">
        <div class="boucle" v-for="scenario_locale in scenarioStore.scenariosLocale" @click="isClicked(scenario_locale)">
            <div class="box-container">
                <div class="day-container">
                    <h1>
                        {{ scenario_locale.day }}
                    </h1>                
                    <div class="icon-season">
                        <Icon :icon="scenario_locale.icon"/>
                    </div>
                </div>

                <h1 class="title">
                    {{ scenario_locale.name }}
                </h1>


                <div class="icon-container" >
                    <div class="icon-type-prod" >
                        <!-- TODO add the icon  -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @import "../styles/components/setupProductionAndScenarioList.scss";
</style>