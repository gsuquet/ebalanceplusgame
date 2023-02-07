import { defineStore } from 'pinia';

export const useEnergyStore = defineStore({
    id: 'EnergyStore',
    state: () => {
        return {
            storedEnergy: 0 as number,
            maxEnergy: 0 as number,
            numberOfBatteries: 1 as number,
            batteryIndividualCapacity: 0 as number,
            batteryPrice: 0 as number,
            energyPrice: 0 as number,
            clickedEnergyIcon: false as boolean,
        };
    },
    actions: {
        addBattery() {
            this.numberOfBatteries++;
            this.maxEnergy += this.batteryIndividualCapacity;
        },
        removeBattery() {
            if (this.numberOfBatteries > 1) {
                this.numberOfBatteries--;
                this.maxEnergy -= this.batteryIndividualCapacity;
            }
        },
        clickOnEnergyIcon() {
            this.clickedEnergyIcon = this.clickedEnergyIcon ? false : true;
        }
    },
    getters: {
        getEnergyIcon() {
            if (this.storedEnergy === 0) {
                return 'mdi-battery-outline';
            } else if (this.storedEnergy < this.maxEnergy / 4) {
                return 'mdi-battery-10';
            } else if (this.storedEnergy < this.maxEnergy / 2) {
                return 'mdi-battery-30';
            } else if (this.storedEnergy < (this.maxEnergy / 4) * 3) {
                return 'mdi-battery-50';
            } else if (this.storedEnergy < this.maxEnergy) {
                return 'mdi-battery-70';
            } else if (this.storedEnergy === this.maxEnergy) {
                return 'mdi-battery';
            } else {
                return 'mdi-battery-alert';
            }
        },
        getEnergyIconColor() {
            if (this.storedEnergy === 0) {
                return 'black';
            } else if (this.storedEnergy < this.maxEnergy / 4) {
                return 'red';
            } else if (this.storedEnergy < this.maxEnergy / 2) {
                return 'orange';
            } else if (this.storedEnergy < (this.maxEnergy / 4) * 3) {
                return 'yellow';
            } else if (this.storedEnergy < this.maxEnergy) {
                return 'green';
            } else if (this.storedEnergy === this.maxEnergy) {
                return 'green';
            } else {
                return 'purple';
            }
        }
    },
});
