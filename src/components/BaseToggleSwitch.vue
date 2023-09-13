<script lang="ts">
export default {
  name: 'BaseToggleSwitch',
  props: {
    isCheckedProp: {
      type: Boolean,
      required: true,
    },
    startLabelKey: {
      type: String,
      required: true,
    },
    endLabelKey: {
      type: String,
      required: true,
    },
  },
  emits: ['change'],
  data() {
    return {
      isChecked: false,
    }
  },
  computed: {
    startLabel() {
      return this.$t(this.startLabelKey)
    },
    endLabel() {
      return this.$t(this.endLabelKey)
    },
  },
  methods: {
    updateCheckedValue() {
      this.$emit('change', this.isChecked)
    },
  },
  onMount() {
    this.isChecked = this.isCheckedProp
  },
}
</script>

<template>
  <div class="toggle-container">
    <p class="start-label">
      {{ startLabel }}
    </p>
    <label class="toggle" :class="isChecked ? 'checked' : ''">
      <input v-model="isChecked" class="toggle-checkbox" type="checkbox" :onChange="updateCheckedValue">
      <span class="slider" />
    </label>
    <p class="end-label">
      {{ endLabel }}
    </p>
  </div>
</template>

<style lang="scss">
    @import '../styles/components/baseToggleSwitch.scss';
</style>
