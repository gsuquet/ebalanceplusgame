<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { convertI18nObjectToLocale } from '../helpers/translation'
import EquipmentListEquipment from './EquipmentListEquipment.vue'
</script>

<script lang="ts">
export default {
  components: {
    EquipmentListEquipment,
    Icon,
  },
  data() {
    return {
      equipmentStore: useEquipmentStore(),
      scenarioStore: useScenarioStore(),
      gameParametersStore: useGameParametersStore(),
      showList: false as boolean,
      showEquipmentType: '' as string,
      listSizeExtended: true as boolean,
    }
  },
  methods: {
    handleEquipmentTypeIconClick(equipmentType: string) {
      this.handleShowEquipments(equipmentType)
      this.listSizeExtended = true
    },
    handleShowEquipments(equipmentType: string) {
      if (this.showEquipmentType === equipmentType)
        this.showEquipmentType = ''
      else
        this.showEquipmentType = equipmentType
    },
  },
}
</script>

<template>
  <section class="list-equipment">
    <div class="list-container">
      <div class="icon-container" :class="listSizeExtended ? 'icon-container-extended' : 'icon-container-reduced'">
        <Icon v-if="listSizeExtended" icon="mdi:arrow-left" class="icon-menu" @click="listSizeExtended = false" />
        <Icon v-else icon="mdi:arrow-right" class="icon-menu" @click="listSizeExtended = true" />
      </div>

      <div v-if="listSizeExtended" class="type-list-normal type">
        <div v-for="equipmentType in scenarioStore.getEquipmentTypesFromClickedScenario" class="boucle">
          <div class="type-container" @click="handleShowEquipments(equipmentType.id)">
            <Icon class="material-icons" :icon="equipmentType.icon_name" :style="{ color: equipmentType.color }" />
            <h1>
              {{ convertI18nObjectToLocale(equipmentType.names, gameParametersStore.language) }}
            </h1>
          </div>
          <div v-if="showEquipmentType === equipmentType.id" class="equipment-container">
            <EquipmentListEquipment v-for="equipment in equipmentStore.getAvailableEquipmentByTypeId(equipmentType.id)" :key="equipment.id" :equipment="equipment" />
          </div>
        </div>
      </div>
      <div v-else class="type-list-reduce type">
        <div v-for="equipmentType in scenarioStore.getEquipmentTypesFromClickedScenario" class="boucle">
          <Icon :icon="equipmentType.icon_name" class="icon-type" :style="{ color: equipmentType.color }" @click="handleEquipmentTypeIconClick(equipmentType.id)" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
    @import "../styles/components/list.scss";
</style>
