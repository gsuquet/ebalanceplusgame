<script setup lang="ts">
    import { useEnergyStore } from '../stores/EnergyStore';
    import { Equipment } from '../types/Equipment';
    import CardPopupHeader from './CardPopupHeader.vue';
    import CardPopupContent from './CardPopupContent.vue';
    import CardPopupAmountModifier from './CardPopupAmountModifier.vue';
    import CardPopupTimeModifier from './CardPopupTimeModifier.vue';
</script>

<template>
    <section class="popup-window">
        <CardPopupHeader 
            :equipment-icon="equipment.type.icon_name"
            :equipment-color="equipment.type.color"
            :consumption-type="type"
            @close-popup="closePopup"/>
        <CardPopupContent 
            :consumption-amount="equipment.consumption"
            :equipment-price="equipment.price"
            :times="{timeStart:startHour,timeEnd:endHour}"
            :is-cost="false"/>
        <CardPopupAmountModifier 
            :amount="equipment.consumption"
            :max-amount="(energyStore.maxEnergy-energyStore.storedEnergy)/((endIndex-startIndex)+1)"
            :step-amount="10"
            @amount="(value) => equipment.consumption = value"/>
        <CardPopupTimeModifier 
            :start-hour="startHour"
            :end-hour="endHour"
            :input-error="inputError"
            @start-hour="(value) => startHour = value"
            @end-hour="(value) => endHour = value"/>

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
                type: this.$t("energy.storeEnergy"),
                inputError: false as boolean,
                startHour: '00:00' as string,
                endHour: '00:15' as string,
                startIndex: 0 as number,
                endIndex: 1 as number,
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
            }
        }
    }
</script>
