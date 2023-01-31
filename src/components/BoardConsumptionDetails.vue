<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useBoardStore } from '../stores/BoardStore';
import { useConsumptionStore } from '../stores/ConsumptionStore';
</script>

<template>
    <section id="board-consumption-details">
        <div class="color-banner" style="background-color={{consumption.color}}"/>
        <div class="card">
            <div class="card-header">
                <Icon :icon="consumption.equipment.name_icon" class="icon"/>
                <h1 class="consumption-details-title">{{consumptionType}}</h1>
                <span class="closebtn" @click="closeDetails">&times;</span>
            </div>
            <div class="card-content">
                <h2 class="consumption-amount">{{ consumption.amount }} W</h2>
                <h3 class="consumption-time">{{ useConsumptionStore().getIndexToTime(consumption.startIndex) }} - {{ useConsumptionStore().getIndexToTime(consumption.endIndex) }}</h3>
            </div>
            <div class="card-choice-buttons" v-if="!modify">
                <button class="btn btn-primary" @click="modifyConsumption">Modifier</button>
                <button class="btn btn-danger" @click="deleteConsumption">Supprimer</button>
            </div>
            <div class="card-time-modifier" v-if="modify">
                <div class="start-input field">
                    <p>Start</p>
                    <div class="choice-container">
                        <input type="time" class="input-start" step="900" id="startHour" v-model="startHour">
                    </div>
                </div>
                <div class="end-input field">
                    <p>End</p>
                    <div class="choice-container">
                        <input type="time" class="input-end" step="900" id="endHour" v-model="endHour">
                    </div>
                </div>
            </div>
            <div class="card-save-modification">
                <button class="btn btn-save" v-if="modify" @click="saveModifiedConsumption">Sauvegarder</button>
                <button class="btn btn-cancel" v-if="modify" @click="modify = false">Annuler</button>
            </div>
        </div>
    </section>
</template>


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
                endHour: '' as string
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
                    alert('Veuillez remplir les champs');
                    return;
                }
                boardStore.modifyClickedTileConsumptionHours(this.startHour, this.endHour);
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
