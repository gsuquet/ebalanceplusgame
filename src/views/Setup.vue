<script lang="ts">
import SetupProductionList from '../components/SetupProductionList.vue'
import SetupProductionRecap from '../components/SetupProductionResume.vue'
import SetupScenarioList from '../components/SetupScenarioList.vue'
import SetupScenarioResume from '../components/SetupScenarioResume.vue'

export default {
  components: {
    SetupProductionList,
    SetupProductionRecap,
    SetupScenarioList,
    SetupScenarioResume,
  },
}
</script>

<template>
  <div id="setup-page" class="view">
    <SetupProductionList />
    <div class="center-container">
      <div class="details-container">
        <SetupProductionRecap />
        <SetupScenarioResume />
      </div>
      <SetupValidationSection />
    </div>
    <SetupScenarioList />
  </div>
</template>

<style lang="scss">
    @import "../styles/views/setup.scss";
</style>
