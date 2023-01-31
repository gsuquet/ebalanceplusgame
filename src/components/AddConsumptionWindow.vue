<script setup lang="ts">
    import Close from "../icons/Close.vue";
    import Save from "../icons/Save.vue";
    import { useEquipmentStore } from "../stores/EquipmentStore";
    import { useConsumptionStore } from "../stores/ConsumptionStore";

    const store = useEquipmentStore();
    store.getEquipmentData();
    const storeConsumption = useConsumptionStore();

    function checkIfEquipmentNotNull() {
        if(store.clickedEquipment != null) {
            storeConsumption.getConsumption(storeConsumption.getTimeToIndex(startHour), 
                        storeConsumption.getTimeToIndex(endHour), store.clickedEquipment);
            
        }
        else {
            console.log("equipment not selected")
        }
    }

    let startHour: string;
    let endHour: string;
</script>

<template>
    
    <div class="modal" v-if="store.clickedEquipment">
        <div class="information">
            <h1 class="type">{{store.clickedEquipment.type_fr }}</h1>
            <p class="conso"> {{ store.clickedEquipment.conso }}</p>
            <p class="price"> {{ store.clickedEquipment.price }}</p>
        </div>

        <div class="close" @click="store.setClickedEquipment(null)">
            <Close style="width: 30px; height: 30px; cursor: pointer;"/>
        </div>

        <div class="schedule-prog">
            <div class="start-end-container">
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

            <div class="slider">
                <div class="progress">
                </div>
                <div class="range-input">
                    <input type="range" class="range-min" min="0" max="24">
                </div>
            </div>

        </div>


    
        <button class="save" @click="checkIfEquipmentNotNull()">
            <Save style="width:60px; height:60px" />
        </button>
    </div>
</template>

<style scoped lang="scss">
    @import "../styles/components/addConsumptionWindows.scss";
</style>