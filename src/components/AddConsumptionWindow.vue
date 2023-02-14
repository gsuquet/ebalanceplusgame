<script setup lang="ts">
    import { useEquipmentStore } from '../stores/EquipmentStore';
    import { useConsumptionStore } from '../stores/ConsumptionStore';
    import { Icon } from '@iconify/vue';
    import CardPopupHeader from './CardPopupHeader.vue';
    import CardPopupContent from './CardPopupContent.vue';
    import CardPopupTimeModifier from './CardPopupTimeModifier.vue';
    import CardPopupSaveButtons from './CardPopupSaveButtons.vue';
import CardPopupAmountModifier from './CardPopupAmountModifier.vue';
</script>

<template>
    <section id="board-consumption-add" class="popup-window">
        <div class="color-banner" :style="{'background-color':equipment.type.color}"/>
        <div class="card">
            <CardPopupHeader
                :equipment-icon="equipment.type.icon_name"
                :consumption-type="equipmentType"
                :equipment-color="equipment.type.color"
                @close-popup="closeAddPopup"/>
            <CardPopupContent 
                :consumption-amount="equipment.consumption"
                :equipment-price="equipment.price"
                :times="{timeStart:startHour,timeEnd:endHour}"
                :is-cost="equipment.type.hasCost"/>
            <CardPopupAmountModifier
                v-if="equipment.type.isConsumptionEditable"
                :amount="equipment.consumption"
                :max-amount="2500"
                :step-amount="100"
                @amount="(value) => equipment.consumption = value"/>
            <CardPopupTimeModifier
                :start-hour="startHour"
                :end-hour="endHour"
                :input-error="inputError"
                @start-hour="setStartHour"
                @end-hour="setEndHour"/>
            <CardPopupSaveButtons
                @save="saveConsumption"
                @cancel="closeAddPopup"/>
        </div>
    </section>
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
            Icon,
            CardPopupHeader,
            CardPopupContent,
            CardPopupAmountModifier
        },
        props: {
            equipment: {} as any
        },
        data() {
            return {
                equipmentType: '' as string,
                startHour: '00:00' as string,
                endHour: '23:45' as string,
                startIndex: 0 as number,
                endIndex: 0 as number,
                inputError: false as boolean
            }
        },
        methods: {
            closeAddPopup() {
                equipmentStore.clickedEquipment = null;
            },
            setStartHour(hour: string) {
                this.startHour = hour;
            },
            setEndHour(hour: string) {
                this.endHour = hour;
            },
            setStartAndEndIndex() {
                const indexes = consumptionStore.convertTimesToIndexes(this.startHour, this.endHour);
                this.startIndex = indexes.indexStart;
                this.endIndex = indexes.indexEnd;
            },
            saveConsumption() {
                this.setStartAndEndIndex();
                if(this.startHour === '' || this.endHour === '') {
                    this.inputError = true;
                    return;
                }
                if(this.startIndex > this.endIndex) {
                    this.inputError = true;
                    return;
                }
                consumptionStore.addConsumption(
                    this.startIndex, this.endIndex, this.equipment
                );
                equipmentStore.clickedEquipment = null;
                this.inputError = false;
            }
        },
        watch: {
            equipment: {
                handler: function (equipment: any) {
                    this.equipmentType = equipmentStore.convertEquipmentToEquipmentLocale(equipment).type.name;
                },
                immediate: true
            }
        }
    }
</script>
