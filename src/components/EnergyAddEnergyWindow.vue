<script setup lang="ts">
    import { useEnergyStore } from '../stores/EnergyStore';
    import { Equipment } from '../stores/EquipmentStore';
    import CardPopupHeader from './CardPopupHeader.vue';
    import CardPopupContent from './CardPopupContent.vue';
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
    </section>
</template>

<script lang="ts">
    export default {
        name: 'EnergyAddEnergyWindow',
        components: {
            CardPopupHeader
        },
        data() {
            return {
                energyStore: useEnergyStore(),
                type: this.$t("energy.storeEnergy"),
                startHour: '' as string,
                endHour: '' as string,
                startIndex: 0 as number,
                endIndex: 0 as number,
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
