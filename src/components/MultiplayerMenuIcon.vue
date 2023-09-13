<script setup lang="ts">
import BaseMenuIcon from './BaseMenuIcon.vue'
</script>

<script lang="ts">
export default {
  name: 'MultiplayerMenuIcon',
  components: {
    BaseMenuIcon,
  },
  data() {
    return {
      gameParametersStore: useGameParametersStore(),
    }
  },
}
</script>

<template>
  <BaseMenuIcon
    menu-icon-id="multiplayer-menu-icon"
    class-name="multiplayer"
    icon-string="mdi:account-multiple"
    :has-amount="false"
    :is-displayed="gameParametersStore.isMultiplayer"
    @click=""
  />
</template>
