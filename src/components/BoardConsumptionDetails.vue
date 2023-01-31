<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useBoardStore } from '../stores/BoardStore';
import { useConsumptionStore } from '../stores/ConsumptionStore';
</script>

<template>
    <section id="board-consumption-details">
        <div class="color-banner" :style="{'background-color':consumption.color}"/>
        <div class="card">
            <div class="card-header">
                <Icon :icon="consumption.equipment.name_icon" class="icon"/>
                <h1 class="consumption-details-title">{{consumptionType}}</h1>
                <span class="closebtn" @click="closeDetails">&times;</span>
            </div>
            <div class="card-content">
                <div class="card-content-consumption">
                    <h2 class="consumption-amount">
                        <Icon icon="mdi:flash" class="icon-consumption"/>
                        {{ consumption.amount }} W</h2>
                    <h2 class="money-amount">
                        <Icon icon="mdi:cash" class="icon-price"/>
                        {{ consumption.equipment.price }} €</h2>
                </div>
                <div class="card-content-time">
                    <h2 class="consumption-time">
                        <Icon icon="mdi:clock" class="icon-time"/>
                        {{ useConsumptionStore().getIndexToTime(consumption.startIndex) }} - {{ useConsumptionStore().getIndexToTime(consumption.endIndex) }}</h2>
                </div>
            </div>
            <div class="card-choice-buttons" v-if="!modify">
                <button class="btn btn-modify" @click="modifyConsumption">
                    <Icon icon="mdi:pencil" class="btn-icon"/>
                    Modifier
                </button>
                <button class="btn btn-delete" @click="deleteConsumption">
                    <Icon icon="mdi:delete" class="btn-icon"/>
                    Supprimer
                </button>
            </div>
            <div class="card-time-modifier" v-if="modify">
                <div class="start-input field">
                    <p>Start</p>
                    <div class="choice-container" :class="{'input-error' : inputError}">
                        <input type="time" class="input-start input" step="900" id="startHour" v-model="startHour">
                    </div>
                </div>
                <div class="end-input field">
                    <p>End</p>
                    <div class="choice-container" :class="{'input-error' : inputError}">
                        <input type="time" class="input-end input" step="900" id="endHour" v-model="endHour">
                    </div>
                </div>
            </div>
            <div class="card-save-modification">
                <button class="btn btn-save" v-if="modify" @click="saveModifiedConsumption">
                    <Icon icon="mdi:content-save" class="btn-icon"/>
                    Sauvegarder
                </button>
                <button class="btn btn-cancel" v-if="modify" @click="modify = false">
                    <Icon icon="mdi:close" class="btn-icon"/>
                    Annuler
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
    export default {
        name: 'BoardConsumptionDetails',
        props: {
            consumption: {} as any
        },
        components: {
            Icon
        },
        data() {
            return {
                consumptionType: '',
                modify: false as boolean,
                startHour: '' as string,
                endHour: '' as string,
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
            saveModifiedConsumption() {
                if(this.startHour === '' || this.endHour === '') {
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
                    if(useGameParametersStore().language === 'en'){
                        this.consumptionType = this.consumption.equipment.type_en;
                    } else{
                        this.consumptionType = this.consumption.equipment.type_fr;
                    }
                },
                immediate: true
            }
        }
    };
</script>
