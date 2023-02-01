<script setup lang="ts">
    import { useEquipmentStore } from '../stores/EquipmentStore';
    import { useConsumptionStore } from '../stores/ConsumptionStore';
    import { Icon } from '@iconify/vue';
    import CardPopupHeader from './CardPopupHeader.vue';
    import CardPopupContent from './CardPopupContent.vue';
</script>

<template>
    <section id="board-consumption-add" class="popup-window">
        <div class="color-banner" :style="{'background-color':equipment.color}"/>
        <div class="card">
            <CardPopupHeader
                :equipment-icon="equipment.name_icon"
                :consumption-type="equipmentType"
                @close-popup="closeAddPopup"/>
            <CardPopupContent 
                :consumption-amount="equipment.consumption"
                :equipment-price="equipment.price"
                :times="{timeStart:startHour,timeEnd:endHour}"/>
            <div class="card-time-modifier">
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
                <button class="btn btn-save" @click="saveConsumption">
                    <Icon icon="mdi:content-save" class="btn-icon"/>
                    Sauvegarder
                </button>
                <button class="btn btn-cancel" @click="closeAddPopup">
                    <Icon icon="mdi:close" class="btn-icon"/>
                    Annuler
                </button>
            </div>
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
            CardPopupContent
        },
        props: {
            equipment: {} as any
        },
        data() {
            return {
                equipmentType: '' as string,
                startHour: '' as string,
                endHour: '' as string,
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
                    if(useGameParametersStore().language ==='fr')
                        this.equipmentType = equipment.type_fr;
                    else
                        this.equipmentType = equipment.type_en;
                },
                immediate: true
            }
        }
    }
</script>
