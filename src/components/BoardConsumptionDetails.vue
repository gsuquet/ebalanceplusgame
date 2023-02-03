<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useBoardStore } from '../stores/BoardStore';
import { useConsumptionStore } from '../stores/ConsumptionStore';
import { useEquipmentStore } from '../stores/EquipmentStore';
import CardPopupContent from './CardPopupContent.vue';
import CardPopupHeader from './CardPopupHeader.vue';
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
                :times="useConsumptionStore().convertIndexesToTimes(consumption.startIndex, consumption.endIndex)"/>
            <div class="card-choice-buttons" v-if="!modify">
                <button class="btn btn-modify" @click="modifyConsumption">
                    <Icon icon="mdi:pencil" class="btn-icon"/>
                    {{ $t("button.edit") }}
                </button>
                <button class="btn btn-delete" @click="deleteConsumption">
                    <Icon icon="mdi:delete" class="btn-icon"/>
                    {{ $t("button.delete") }}
                </button>
            </div>
            <div class="card-time-modifier" v-if="modify">
                <div class="start-input field">
                    <p>{{ $t("input.start") }}</p>
                    <div class="choice-container" :class="{'input-error' : inputError}">
                        <input type="time" class="input-start input" step="900" id="startHour" v-model="startHour">
                    </div>
                </div>
                <div class="end-input field">
                    <p>{{ $t("input.end") }}</p>
                    <div class="choice-container" :class="{'input-error' : inputError}">
                        <input type="time" class="input-end input" step="900" id="endHour" v-model="endHour">
                    </div>
                </div>
            </div>
            <div class="card-save-modification">
                <button class="btn btn-save" v-if="modify" @click="saveModifiedConsumption">
                    <Icon icon="mdi:content-save" class="btn-icon"/>
                    {{ $t("button.save") }}
                </button>
                <button class="btn btn-cancel" v-if="modify" @click="modify = false">
                    <Icon icon="mdi:close" class="btn-icon"/>
                    {{ $t("button.cancel") }}
                </button>
            </div>
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
            CardPopupContent
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
