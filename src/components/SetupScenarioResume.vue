<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { convertI18nObjectToLocale } from '../helpers/translation';
    import { errorScenario } from '../assets/entityErrorScenario';
</script>

<template>
    <div class="recap-container">
        <div class="card-content" v-if="scenarioStore.clickedScenario">
            <h1 class="name">
                {{ scenarioName }}
            </h1>
            <div class="meteo-container">
                  <h1 class="day">
                    {{ scenarioDay }}
                </h1>
                <div class="icon-season">
                    <Icon :icon="scenarioIcon" />
                </div>
            </div>
            <div class="separator"></div>
            <div class="icon-container">
                <div class="icon-type-prod" >
                    <!-- TODO Add the icon  -->
                </div>
            </div> 
            <div class="explanation-container">
                <p>{{ scenarioDescription }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../styles/components/setupProductionAndScenarioResume.scss";
</style>

<script lang="ts">
    export default {
        name: 'SetupScenarioResume',
        components: {
            Icon,
        },
        data(){
            return {
                scenarioStore: useScenarioStore(),
                gameParametersStore: useGameParametersStore(),
            }
        },
        computed: {
            scenarioName() {
                const scenario = this.scenarioStore.clickedScenario;
                return scenario ? convertI18nObjectToLocale(scenario.names, this.gameParametersStore.language) : errorScenario.names;
            },
            scenarioDay() {
                const scenario = this.scenarioStore.clickedScenario;
                return scenario ? convertI18nObjectToLocale(scenario.day.names,this.gameParametersStore.language) : errorScenario.day.names;
            },
            scenarioIcon() {
                const scenario = this.scenarioStore.clickedScenario;
                return scenario ? scenario.season.icon : errorScenario.season.icon;
            },
            scenarioDescription() {
                const scenario = this.scenarioStore.clickedScenario;
                return scenario ? convertI18nObjectToLocale(scenario.descriptions, this.gameParametersStore.language) : errorScenario.descriptions;
            },
        },
    }
</script>
