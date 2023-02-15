<script setup lang="ts">
    import { useEnergyStore } from '../stores/EnergyStore';
    import { useConsumptionStore } from '../stores/ConsumptionStore';
    import { Equipment } from '../types/Equipment';
    import CardPopupHeader from './CardPopupHeader.vue';
    import CardPopupContent from './CardPopupContent.vue';
    import CardPopupAmountModifier from './CardPopupAmountModifier.vue';
    import CardPopupTimeModifier from './CardPopupTimeModifier.vue';
    import CardPopupSaveButtons from './CardPopupSaveButtons.vue';
</script>

<template>
    <section class="popup-window">
        <div class="color-banner" :style="{'background-color':equipment.type.color}"/>
        <div class="card">
            <CardPopupHeader 
                :equipment-icon="equipment.type.icon_name"
                :equipment-color="equipment.type.color"
                :consumption-type="type"
                @close-popup="closePopup"/>
            <CardPopupContent 
                :consumption-amount="amount"
                :equipment-price="equipment.price"
                :times="{timeStart:startHour,timeEnd:endHour}"
                :is-cost="false"/>
            <CardPopupAmountModifier 
                :amount="amount"
                :max-amount="maxAmount"
                :step-amount="10"
                @amount="(value) => updateConsumptionAmount(value)"/>
            <CardPopupTimeModifier 
                :start-hour="startHour"
                :end-hour="endHour"
                :input-error="inputError"
                @start-hour="(value) => updateStartHour(value)"
                @end-hour="(value) => updateEndHour(value)"/>
            <CardPopupSaveButtons
                @save="saveConsumption"
                @cancel="closePopup"/>
        </div>
    </section>
</template>

<script lang="ts">
    export default {
        name: 'EnergyAddEnergyWindow',
        components: {
            CardPopupHeader,
            CardPopupAmountModifier,
            CardPopupTimeModifier
        },
        data() {
            return {
                energyStore: useEnergyStore(),
                consumptionStore: useConsumptionStore(),
                type: this.$t("energy.storeEnergy"),
                inputError: false as boolean,
                startHour: '00:00' as string,
                endHour: '00:15' as string,
                startIndex: 0 as number,
                endIndex: 0 as number,
                maxAmount: 10 as number,
                amount: 0 as number,
                equipment: {
                    id: 0,
                    type:{
                        id:'batteryStorage',
                        names:[
                            {lang:'',name:''}
                        ],
                        icon_name:'mdi:battery-charging-100',
                        color: 'green'
                    },
                    energy_class: '',
                    consumption: 0,
                    points: 0,
                    price: 0,
                    point_gap: [0,0],
                    price_gap: [0,0]
                } as Equipment,
            }
        },
        methods: {
            closePopup() {
                this.energyStore.clickOnStoreEnergy();
            },
            updateConsumptionAmount(newConsumption:number) {
                this.amount=newConsumption;
            },
            updateStartHour(newStartHour:string) {
                this.startHour=newStartHour;
                this.setStartAndEndIndex();
                this.updateMaxAmount();
            },
            updateEndHour(newEndHour:string) {
                this.endHour=newEndHour;
                this.setStartAndEndIndex();
                this.updateMaxAmount();
            },
            setStartAndEndIndex() {
                const indexes = this.consumptionStore.convertTimesToIndexes(this.startHour, this.endHour);
                this.startIndex = indexes.indexStart;
                this.endIndex = indexes.indexEnd;
            },
            updateMaxAmount() {
                this.maxAmount=(this.energyStore.maxEnergy-this.energyStore.storedEnergy)/((this.endIndex-this.startIndex)+1)
            },
            checkAmountIsUnderMax() {
                if(this.amount>this.maxAmount) {
                    return false;
                } else {
                    return true;
                }
            },
            saveConsumption() {
                if(this.consumptionStore.checkTimeInput(this.startHour, this.endHour)) {
                    this.inputError=false;
                    if (this.checkAmountIsUnderMax()) {
                        this.consumptionStore.addConsumption(this.startIndex, this.endIndex, this.equipment, this.amount);
                        this.energyStore.clickOnStoreEnergy();
                    }
                } else {
                    this.inputError=true;
                }
            }
        },
        mounted() {
            this.updateMaxAmount();
        }
    }
</script>
