<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { getTotalKilowattsPerHour } from '../helpers/power'
import { convertTimesToIndexes } from '../helpers/time'
</script>

<script lang="ts">
export default {
  name: 'CardPopupContent',
  components: {
    Icon,
  },
  props: {
    consumptionAmount: {
      type: Number,
      required: true,
    },
    equipmentPrice: {
      type: Number,
      required: true,
    },
    times: {
      type: Object as () => Times,
      required: true,
    },
    isCost: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      consumptionAmountWh: 0 as number,
      flashIcon: 'mdi:flash' as string,
      clockIcon: 'mdi:clock' as string,
      cashIcon: 'mdi:cash' as string,
    }
  },
  watch: {
    consumptionAmount: {
      handler() {
        this.calculateConsumptionAmountWh()
      },
      immediate: true,
    },
    times: {
      handler() {
        this.calculateConsumptionAmountWh()
      },
      immediate: true,
    },
  },
  methods: {
    calculateConsumptionAmountWh() {
      const indexes = convertTimesToIndexes(this.times.timeStart, this.times.timeEnd)
      this.consumptionAmountWh = getTotalKilowattsPerHour(this.consumptionAmount, indexes)
    },
  },
}
interface Times {
  timeStart: string
  timeEnd: string
}
</script>

<template>
  <div class="card-content">
    <div class="card-content-consumption card-content-item">
      <h2 class="consumption-amount">
        <Icon :icon="flashIcon" class="icon-consumption" />
        {{ consumptionAmount }} W/15min
      </h2>
      <h2 class="consumption-amount-Wh">
        {{ $t("button.total") }} :
        {{ consumptionAmountWh }} kW/h
      </h2>
    </div>
    <div v-if="isCost" class="card-content-price card-content-item">
      <h2 class="consumption-price">
        <Icon :icon="cashIcon" class="icon-price" />
        {{ equipmentPrice }} €
      </h2>
    </div>
    <div class="card-content-time card-content-item">
      <h2 class="consumption-time">
        <Icon :icon="clockIcon" class="icon-time" />
        {{ times.timeStart }} - {{ times.timeEnd }}
      </h2>
    </div>
  </div>
</template>

<style lang="scss">
    @import '../styles/components/cardPopupContent.scss';
</style>
