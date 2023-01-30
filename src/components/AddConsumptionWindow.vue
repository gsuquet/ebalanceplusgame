<script setup lang="ts">
    // import Close from "../icons/Close.vue";
    import Save from "../icons/Save.vue";

    import {Hour } from "../stores/HoursStore";
    import {Equipment, useEquipmentStore} from "../stores/EquipmentStore";

    const {equipment} = defineProps<{
        equipment: Equipment
    }>()

    const store = useEquipmentStore();
    store.getEquipmentData();

    function getHour(hour: number, min:number): Hour {
        const newHour: Hour = {hour, min}
        console.log(newHour)
        return newHour
    }

    let startHour: number;
    let startMin: number
    let endHour: number;
    let endMin: number;

</script>

<template>
    <body>
        <div class="modal">
            <!-- <button class="close">
                <Close />
            </button> -->

            <div class="information">
                <h1 class="type">{{ equipment.type_fr }}</h1>
                <p class="conso"> {{ equipment.conso }}</p>
                <p class="price"> {{ equipment.price }}</p>
            </div>

            <div class="schedule-prog">
                <div class="hour-start">

                </div>
                <div class="hour-stop">

                </div>
                <div class="slider-container">
                    <div class="start-end-container">
                        <div class="start-input field">
                            <p>Start</p>
                            <div class="choice-container">
                                <input type="number" class="input-start-hour" id="startHour" v-model="startHour">
                                <input type="number" class="input-start-min" id="startMin" v-model="startMin"> 
                            </div>
                        </div>
                        <div class="end-input field">
                            <p>End</p>
                            <div class="choice-container">
                                <input type="number" class="input-end-hour" id="endHour" v-model="endHour">
                                <input type="number" class="input-end-min" id="endMin" v-model="endMin">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="save" @click="getHour(startHour, startMin), getHour(endHour, endMin)">
                <Save />
            </button>
        </div>
    </body>
    
</template>

<style lang="scss">
    @import "../styles/components/addConsumptionWindows.scss";
</style>