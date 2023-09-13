<script setup lang="ts">
import { useEquipmentStore } from '../stores/EquipmentStore'
import { useConsumptionStore } from '../stores/ConsumptionStore'
import { generateStringId } from '../helpers/idGenerator'
import { convertI18nObjectToLocale } from '../helpers/translation'
import CardPopup from './CardPopup.vue'
</script>

<script lang="ts">
const equipmentStore = useEquipmentStore()
const consumptionStore = useConsumptionStore()
export default {
  name: 'BoardConsumptionAddWindow',
  components: {
    CardPopup,
  },
  props: {
    equipment: {} as any,
  },
  data() {
    return {
      gameParametersStore: useGameParametersStore(),
      moneyStore: useMoneyStore(),
      consumptionId: '' as string,
      startIndex: 0 as number,
      endIndex: 0 as number,
      consumption: 0 as number,
      price: 0 as number,
      inputError: false as boolean,
    }
  },
  computed: {
    equipmentType() {
      return convertI18nObjectToLocale(this.equipment.type.names, this.gameParametersStore.language)
    },
  },
  mounted() {
    this.consumption = this.equipment.equipmentConsumptionParams.originalConsumption
    this.price = this.equipment.equipmentCostParams.originalPrice
    this.consumptionId = generateStringId()
    this.checkCost()
  },
  methods: {
    closeAddPopup() {
      equipmentStore.clickedEquipment = null
    },
    saveConsumption(save: { startIndex: number; endIndex: number;amount: number;price: number;startHour: string;endHour: string }) {
      consumptionStore.addConsumption(
        save.startIndex, save.endIndex, this.equipment, save.amount, save.price,
      )
      this.moneyStore.withdrawMoney(save.price)
      equipmentStore.clickedEquipment = null
    },
    amountError() {
      alert(this.$t('error.consumptionAmountHigherThanMax'))
    },
    timeError() {
      alert(this.$t('error.timeError'))
    },
    checkCost() {
      if (!this.equipment.isBought && !this.moneyStore.canWithdrawMoney(this.equipment.equipmentCostParams.originalPrice)) {
        alert(this.$t('error.notEnoughMoney'))
        this.closeAddPopup()
      }
    },
  },
}
</script>

<template>
  <CardPopup
    :id="consumptionId"
    :type="equipmentType"
    :props-amount="consumption"
    :props-max-energy-amount="equipment.equipmentConsumptionParams.maxConsumption"
    :props-price="price"
    :equipment="equipment"
    :indexes="{ start: startIndex, end: endIndex }"
    :props-is-initial-add-popup="true"
    @close-popup="closeAddPopup"
    @save="saveConsumption"
    @cancel="closeAddPopup"
    @delete="closeAddPopup"
    @amount-error="amountError"
    @time-error="timeError"
  />
</template>

<style scoped lang="scss">
    @import "../styles/components/addConsumptionWindows.scss";
</style>
