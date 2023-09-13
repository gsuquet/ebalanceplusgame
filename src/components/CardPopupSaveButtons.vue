<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<script lang="ts">
export default {
  name: 'CardPopupSaveButtons',
  components: {
    Icon,
  },
  emits: ['save', 'cancel'],
}
</script>

<template>
  <div class="card-save-modification">
    <button class="btn btn-save" @click="$emit('save')">
      <Icon icon="mdi:content-save" class="btn-icon" />
      {{ $t("button.save") }}
    </button>
    <button class="btn btn-cancel" @click="$emit('cancel')">
      <Icon icon="mdi:close" class="btn-icon" />
      {{ $t("button.cancel") }}
    </button>
  </div>
</template>
