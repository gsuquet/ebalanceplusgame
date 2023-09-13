<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<script lang="ts">
export default {
  name: 'MarketMenuIcon',
  components: {
    Icon,
  },
  props: {
    menuIconId: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: true,
    },
    iconString: {
      type: String,
      required: true,
    },
    hasAmount: {
      type: Boolean,
      required: true,
    },
    amount: {
      type: String,
      required: false,
    },
    isDisplayed: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['click'],
  methods: {
    clickOnIcon() {
      this.$emit('click')
    },
  },
}
</script>

<template>
  <section v-if="isDisplayed" :id="menuIconId" class="icon-section">
    <div v-if="hasAmount" :class="`${className}-amount amount`">
      <p>{{ amount }}</p>
    </div>
    <div :class="`${className}-icon-container icon-container`">
      <div :class="`${className}-icon-background icon-background`" @click="clickOnIcon">
        <Icon :icon="iconString" :class="`${className}-icon-image icon-image`" />
      </div>
    </div>
  </section>
</template>
