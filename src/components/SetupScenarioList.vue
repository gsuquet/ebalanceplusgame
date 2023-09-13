<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Scenario } from '../types/Scenario'
import { convertI18nObjectToLocale } from '../helpers/translation'
import type { I18nObject } from '../types/I18nObject'
</script>

<script lang="ts">
export default {
  name: 'SetupScenarioList',
  components: {
    Icon,
  },
  data() {
    return {
      scenarioStore: useScenarioStore(),
      gameParametersStore: useGameParametersStore(),
    }
  },
  computed: {
    scenarioList() {
      return this.scenarioStore.scenarios
    },
  },
  methods: {
    isClicked(scenario: Scenario) {
      this.scenarioStore.setClickedScenario(scenario)
    },
    convertI18nObject(objList: I18nObject[]) {
      return convertI18nObjectToLocale(objList, this.gameParametersStore.language)
    },
  },
}
</script>

<template>
  <section class="list-container">
    <div v-for="scenario in scenarioList" class="boucle" @click="isClicked(scenario)">
      <div class="box-container">
        <div class="day-container">
          <h1>
            {{ convertI18nObject(scenario.day.names) }}
          </h1>
          <div class="icon-season">
            <Icon :icon="scenario.season.icon" />
          </div>
        </div>
        <h1 class="title">
          {{ convertI18nObject(scenario.names) }}
        </h1>
        <div class="icon-container">
          <div class="icon-type-prod">
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
