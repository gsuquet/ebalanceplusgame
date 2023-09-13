<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Tile } from '../types/Board'
import { convertI18nObjectToLocale } from '../helpers/translation'
import BoardConsumptionDetailsWindow from './BoardConsumptionDetailsWindow.vue'
</script>

<script lang="ts">
export default {
  name: 'BoardConsumptionDetails',
  components: {
    BoardConsumptionDetailsWindow,
  },
  props: {
    consumptionTile: {
      type: Object as () => Tile,
      required: true,
    },
    productionTile: {
      type: Object as () => Tile,
      required: true,
    },
  },
  data() {
    return {
      consumptionStore: useConsumptionStore(),
      productionStore: useProductionStore(),
      isConsumptionDisplayed: this.consumptionTile?.id !== 'empty',
    }
  },
  computed: {
    isProductionTile() {
      return this.productionTile?.id !== 'empty'
    },
    isConsumptionTile() {
      return this.consumptionTile?.id !== 'empty'
    },
    consumption() {
      if (this.isConsumptionTile)
        return this.consumptionStore.getConsumptionById(this.consumptionTile.id)
      else
        return null
    },
    production() {
      if (this.isProductionTile)
        return this.productionStore.getAddedProductionById(this.productionTile.id)
      else
        return null
    },
    consumptionEquipmentTypeName() {
      if (this.consumption)
        return convertI18nObjectToLocale(this.consumption.equipment.type.names, this.$i18n.locale)
      else
        return ''
    },
    productionEquipmentTypeName() {
      if (this.production)
        return convertI18nObjectToLocale(this.production.equipment.type.names, this.$i18n.locale)
      else
        return ''
    },
  },
  watch: {
    consumptionTile() {
      this.isConsumptionDisplayed = this.consumptionTile?.id !== 'empty'
    },
    productionTile() {
      this.isConsumptionDisplayed = this.productionTile?.id === 'empty'
    },
  },
}
</script>

<template>
  <section id="board-consumption-details">
    <div v-if="production && consumption" class="tab-container">
      <div
        class="tab tab-left"
        :class="{ 'active-tab': isConsumptionDisplayed }"
        @click="isConsumptionDisplayed = true"
      >
        <Icon
          class="tab-icon"
          :icon="consumption.equipment.type.icon_name"
          :style="{ color: consumption.equipment.type.color }"
        />
        <span class="tab-text">{{ consumptionEquipmentTypeName }}</span>
      </div>
      <div
        class="tab tab-right"
        :class="{ 'active-tab': !isConsumptionDisplayed }"
        @click="isConsumptionDisplayed = false"
      >
        <Icon
          class="tab-icon"
          :icon="production.equipment.type.icon_name"
          :style="{ color: production.equipment.type.color }"
        />
        <span class="tab-text">{{ productionEquipmentTypeName }}</span>
      </div>
    </div>
    <BoardConsumptionDetailsWindow
      v-if="isConsumptionDisplayed && isConsumptionTile"
      :consumption="consumption"
    />
    <BoardConsumptionDetailsWindow
      v-if="!isConsumptionDisplayed && isProductionTile"
      :consumption="production"
    />
  </section>
</template>

<style lang="scss">
    @import '../styles/components/boardConsumptionDetails.scss';
</style>
