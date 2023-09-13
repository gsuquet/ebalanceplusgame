<script lang="ts">
export default {
  name: 'Alert',
  props: {
    alertClass: {
      type: String,
      required: true,
    },
    alertText: {
      type: String,
      required: true,
    },
    shouldDisplay: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      display: false as boolean,
    }
  },
  computed: {
    i18nTextProcessed(): string {
      return this.$t(this.alertText)
    },
  },
  watch: {
    shouldDisplay(newVal: boolean) {
      this.display = newVal
    },
  },
  methods: {
    closeAlert() {
      this.display = false
    },
  },
}
</script>

<template>
  <div v-if="display" :class="`${alertClass} alert`">
    <div class="alert-background">
      <span class="closebtn" @click="closeAlert">&times;</span>
      <p>{{ i18nTextProcessed }}</p>
    </div>
  </div>
</template>

<style lang="scss">
    @import '../styles/components/alert.scss';
</style>
