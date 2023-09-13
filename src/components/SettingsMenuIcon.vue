<script setup lang="ts">
import BaseMenuIcon from './BaseMenuIcon.vue'
</script>

<script lang="ts">
export default {
  name: 'SettingsMenuIcon',
  components: {
    BaseMenuIcon,
  },
}
</script>

<template>
  <BaseMenuIcon
    menu-icon-id="settings-menu-icon"
    class-name="settings"
    icon-string="mdi:settings"
    :has-amount="false"
    :is-displayed="true"
    @click=""
  />
</template>
