<script setup lang="ts">
import BaseMenuIcon from './BaseMenuIcon.vue'
</script>

<script lang="ts">
export default {
  name: 'ResultsMenuIcon',
  components: {
    BaseMenuIcon,
  },
  data() {
    return {
      resultsStore: useResultsStore(),
    }
  },
  methods: {
    handleClick() {
      if (this.resultsStore.getIsConfirmationWindowOpen)
        this.resultsStore.closeResultsConfirmationWindow()
      else
        this.resultsStore.openResultsConfirmationWindow()
    },
  },
}
</script>

<template>
  <BaseMenuIcon
    menu-icon-id="results-menu-icon"
    class-name="results"
    :icon-string="resultsStore.getConfirmationButtonIcon"
    :has-amount="false"
    :is-displayed="true"
    @click="handleClick"
  />
</template>
