<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<script lang="ts">
export default {
  name: 'CardPopupModificationButtons',
  components: {
    Icon,
  },
  emits: ['modify', 'delete'],
}
</script>

<template>
  <div class="card-choice-buttons">
    <button class="btn btn-modify" @click="$emit('modify')">
      <Icon icon="mdi:pencil" class="btn-icon" />
      {{ $t("button.edit") }}
    </button>
    <button class="btn btn-delete" @click="$emit('delete')">
      <Icon icon="mdi:delete" class="btn-icon" />
      {{ $t("button.delete") }}
    </button>
  </div>
</template>

<style lang="scss">
    @import '../styles/components/cardPopupModificationButtons.scss';
</style>
