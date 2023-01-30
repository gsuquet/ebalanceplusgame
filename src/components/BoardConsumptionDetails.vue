<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useBoardStore } from '../stores/BoardStore';
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
                <h3 class="consumption-time">{{ consumption.startIndex }}h - {{ consumption.endIndex }}h</h3>
            </div>
            <div class="card-choice-buttons">
                <button class="btn btn-primary" @click="modifyConsumption">Modifier</button>
                <button class="btn btn-danger" @click="deleteConsumption">Supprimer</button>
            </div>
            <div class="card-time-modifier">

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
                consumptionType: ''
            };
        },
        methods: {
            closeDetails() {
                boardStore.setClickedTile(null);
            },
            modifyConsumption() {
                console.log('modify consumption');
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
