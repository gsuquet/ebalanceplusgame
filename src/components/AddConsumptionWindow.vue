<script setup lang="ts">
    import { useEquipmentStore } from '../stores/EquipmentStore';
    import { useConsumptionStore } from '../stores/ConsumptionStore';
    import ConsumptionProductionPopupWindow from './ConsumptionProductionPopupWindow.vue';
</script>

<template>
    <ConsumptionProductionPopupWindow
        :id="consumptionId"
        :type="equipmentType"
        :props-amount="consumption"
        :props-max-energy-amount="equipment.equipmentConsumptionParams.maxConsumption"
        :props-price="price"
        :equipment="equipment"
        :indexes="{start:startIndex,end:endIndex}"
        :props-is-initial-add-popup="true"
        @close-popup="closeAddPopup"
        @save="saveConsumption"
        @cancel="closeAddPopup"
        @delete="closeAddPopup"/>
</template>

<style scoped lang="scss">
    @import "../styles/components/addConsumptionWindows.scss";
</style>

<script lang="ts">
    const equipmentStore = useEquipmentStore();
    const consumptionStore = useConsumptionStore();
    export default {
        name: "AddConsumptionWindow",
        components: {
            ConsumptionProductionPopupWindow
        },
        props: {
            equipment: {} as any
        },
        data() {
            return {
                equipmentType: '' as string,
                consumptionId: '' as string,
                startIndex: 0 as number,
                endIndex: 0 as number,
                consumption: 0 as number,
                price: 0 as number,
                inputError: false as boolean
            }
        },
        methods: {
            closeAddPopup() {
                equipmentStore.clickedEquipment = null;
            },
            saveConsumption(save:{startIndex:number, endIndex:number,amount:number,price:number,startHour:string,endHour:string}) {
                consumptionStore.addConsumption(
                    save.startIndex, save.endIndex, this.equipment, save.amount, save.price
                );
                equipmentStore.clickedEquipment = null;
            },
            getRandomIdString() {
                return Math.random().toString(36).substr(2, 9);
            }
        },
        watch: {
            equipment: {
                handler: function (equipment: any) {
                    this.equipmentType = equipmentStore.convertEquipmentToEquipmentLocale(equipment).type.name;
                },
                immediate: true
            }
        },
        mounted() {
            this.consumption = this.equipment.equipmentConsumptionParams.originalConsumption;
            this.price = this.equipment.equipmentCostParams.originalPrice;
            this.consumptionId = this.getRandomIdString();
        }
    }
</script>
