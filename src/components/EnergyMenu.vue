<script lang="ts">
export default {
  name: 'EnergyMenu',
  data() {
    return {
      energyStore: useEnergyStore(),
    }
  },
}
</script>

<template>
  <section v-if="energyStore.displayEnergyMenu" id="menu">
    <div class="menu-header">
      <span class="stored-percentage" :style="{ color: energyStore.getEnergyIconColor }">
        {{ energyStore.getEnergyStoragePercentage }} %
      </span>
      <h2 class="title">
        {{ $t("energy.header") }}
      </h2>
      <span class="closebtn" @click="energyStore.clickOnEnergyIcon()">&times;</span>
    </div>
    <div class="menu-figures">
      <div class="figure">
        <p class="text">
          {{ $t("energy.stored") }} :
        </p>
        <h3 class="text">
          {{ energyStore.getStoredEnergyInKWh }} kWh
        </h3>
      </div>
      <div class="figure">
        <p class="text">
          {{ $t("energy.max") }} :
        </p>
        <h3 class="text">
          {{ energyStore.getMaximumEnergyStorageInKWh }} kWh
        </h3>
      </div>
    </div>
    <div class="menu-buttons">
      <button class="btn" @click="energyStore.clickOnStoreEnergy">
        {{ $t("button.store") }}
      </button>
      <button
        class="btn"
        :class="{ disabled: energyStore.isStorageEmpty }"
        @click="energyStore.clickOnConsumeEnergy"
      >
        {{ $t("button.use") }}
      </button>
    </div>
    <div class="menu-batteries">
      <h3 class="title">
        {{ $t("energy.batteriesManagement") }}
      </h3>
      <div class="figures-container">
        <div class="figure">
          <h4>{{ $t("money.cost") }} :</h4>
          <p>{{ energyStore.energyStorageParameters.batteryPrice }} €</p>
        </div>
        <div class="figure">
          <h4>{{ $t("energy.capacity") }} :</h4>
          <p>{{ energyStore.energyStorageParameters.batteryIndividualCapacity }} W</p>
        </div>
      </div>
      <div class="batteries">
        <button
          class="btn delete"
          :class="{ disabled: !energyStore.canUserRemoveABattery }"
          @click="energyStore.removeBattery"
        >
          -
        </button>
        <span>{{ energyStore.numberOfBatteries }}</span>
        <button
          class="btn add"
          :class="{ disabled: !energyStore.canUserAddABattery }"
          @click="energyStore.addBattery"
        >
          +
        </button>
      </div>
    </div>
    <div class="energy-menu-history">
      <h3 />
      <div>
        <!--
                <div v-for="energy in energyStore.storedEnergyList">

                </div>
                -->
      </div>
    </div>
  </section>
</template>

<style lang="scss">
    @import "../styles/components/energyAndMarketMenu.scss";
</style>
