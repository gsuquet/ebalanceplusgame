<script setup lang="ts">
    import { useEnergyStore } from '../stores/EnergyStore';
    import { useConsumptionStore } from '../stores/ConsumptionStore';
    import { Equipment } from '../types/Equipment';
    import ConsumptionProductionPopupWindow from './ConsumptionProductionPopupWindow.vue';
</script>

<template>
    <ConsumptionProductionPopupWindow
        :id="consumptionId"
        :type="type"
        :props-amount="amount"
        :props-max-energy-amount="maxAmount"
        :props-price="price"
        :equipment="equipment"
        :indexes="{start:startIndex,end:endIndex}"
        :props-is-initial-add-popup="true"
        @close-popup="closePopup"
        @save="saveConsumption"
        @cancel="closePopup"
        @delete="closePopup"/>
</template>

<script lang="ts">
    export default {
        name: 'EnergyAddEnergyWindow',
        components: {
            ConsumptionProductionPopupWindow
        },
        data() {
            return {
                energyStore: useEnergyStore(),
                consumptionStore: useConsumptionStore(),
                consumptionId: '',
                type: this.$t("energy.storeEnergy"),
                startIndex: 0 as number,
                endIndex: 0 as number,
                maxAmount: 10 as number,
                amount: 0 as number,
                price: 0,
                equipment: {
                    id: '0',
                    energy_class: '',
                    type:{
                        id:'batteryStorage',
                        names:[
                            {lang:'fr',name:"Stocker de l'énergie"},
                            {lang:'en',name:'Store energy'}
                        ],
                        icon_name:'mdi:battery-charging-100',
                        color: 'green',
                        isBattery: true,
                        equipmentTypeDurationParams:{
                            isDurationEditable: true,
                            isDurationLengthEditable: true,
                            originalDuration: "00:15",
                            step: "00:15",
                            minDuration: "00:15",
                            maxDuration: "23:45"
                        }
                    },
                    equipmentCostParams:{
                        originalPrice: 0,
                        hasCost: false,
                        isCostEditable: false,
                        step: 0,
                        minCost: 0,
                        maxCost: 0
                    },
                    equipmentConsumptionParams:{
                        originalConsumption: 0,
                        isConsumptionEditable: true,
                        step: 10,
                        minConsumption: 0,
                        maxConsumption: 200
                    },
                } as Equipment,
            }
        },
        methods: {
            closePopup() {
                this.energyStore.clickOnStoreEnergy();
            },
            saveConsumption(save:{startIndex:number, endIndex:number,amount:number,price:number,startHour:string,endHour:string}) {
                this.consumptionStore.addConsumption(save.startIndex, save.endIndex, this.equipment, save.amount, save.price);
                this.energyStore.clickOnStoreEnergy();
            },
            getRandomEquipmentIdString() {
                return Math.random().toString(36).substr(2, 9);
            }
        },
        mounted() {
            this.equipment.id=this.getRandomEquipmentIdString();
            this.consumptionId=this.getRandomEquipmentIdString();
        }
    }
</script>
