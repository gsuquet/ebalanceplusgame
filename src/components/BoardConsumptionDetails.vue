<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useBoardStore } from '../stores/BoardStore';
import { useConsumptionStore } from '../stores/ConsumptionStore';
import { useEquipmentStore } from '../stores/EquipmentStore';
import CardPopupContent from './CardPopupContent.vue';
import CardPopupHeader from './CardPopupHeader.vue';
import CardPopupTimeModifier from './CardPopupTimeModifier.vue';
import CardPopupSaveButtons from './CardPopupSaveButtons.vue';
</script>

<template>
    <section id="board-consumption-details" class="popup-window">
        <div class="color-banner" :style="{'background-color':consumption.color}"/>
        <div class="card">
            <CardPopupHeader
                :equipment-icon="consumption.equipment.type.icon_name"
                :consumption-type="consumptionType"
                :equipment-color="consumption.equipment.type.color"
                @close-popup="closeDetails"/>
            <CardPopupContent
                :consumption-amount="consumption.amount"
                :equipment-price="consumption.equipment.price"
                :times="useConsumptionStore().convertIndexesToTimes(consumption.startIndex, consumption.endIndex)"
                :is-cost="true"/>
            <CardPopupModificationButtons
                v-if="!modify"
                @modify="modifyConsumption"
                @delete="deleteConsumption"/>
            <CardPopupTimeModifier
                v-if="modify"
                :start-hour="startHour"
                :end-hour="endHour"
                :input-error="inputError"
                @start-hour="(value) => startHour = value"
                @end-hour="(value) => endHour = value"/>
            <CardPopupSaveButtons
                v-if="modify"
                @save="saveModifiedConsumption"
                @cancel="modify = false"/>
        </div>
    </section>
</template>

<style lang="scss">
    @import '../styles/components/boardConsumptionDetails.scss';
</style>

<script lang="ts">
    const boardStore = useBoardStore();
    const equipmentStore = useEquipmentStore();
    const consumptionStore = useConsumptionStore();
    export default {
        name: 'BoardConsumptionDetails',
        props: {
            consumption: {} as any
        },
        components: {
            Icon,
            CardPopupHeader,
            CardPopupContent,
            CardPopupTimeModifier
        },
        data() {
            return {
                consumptionType: '' as string,
                modify: false as boolean,
                startHour: '' as string,
                endHour: '' as string,
                startIndex: 0 as number,
                endIndex: 0 as number,
                inputError: false as boolean,
            };
        },
        methods: {
            closeDetails() {
                boardStore.setClickedTile(null);
            },
            modifyConsumption() {
                this.modify = true;
            },
            setStartAndEndIndex() {
                const indexes = consumptionStore.convertTimesToIndexes(this.startHour, this.endHour);
                this.startIndex = indexes.indexStart;
                this.endIndex = indexes.indexEnd;
            },
            saveModifiedConsumption() {
                this.setStartAndEndIndex();
                if(this.startHour === '' || this.endHour === '') {
                    this.inputError = true;
                    return;
                }
                if(this.startIndex > this.endIndex) {
                    this.inputError = true;
                    return;
                }
                boardStore.modifyClickedTileConsumptionHours(this.startHour, this.endHour);
                this.modify = false;
                this.inputError = false;
            },
            deleteConsumption() {
                boardStore.deleteClickedTileConsumption();
            }   
        },
        watch: {
            consumption: {
                handler() {
                    this.consumptionType = equipmentStore.convertEquipmentToEquipmentLocale(this.consumption.equipment).type.name;
                },
                immediate: true
            }
        }
    };
</script>
