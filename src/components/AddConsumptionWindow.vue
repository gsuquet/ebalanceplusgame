<script setup lang="ts">
    import Close from "../icons/Close.vue";
    import Save from "../icons/Save.vue";
    import { useEquipmentStore } from "../stores/EquipmentStore";
    import { useConsumptionStore } from "../stores/ConsumptionStore";
     

    const equipmentStore = useEquipmentStore();
    equipmentStore.getEquipmentData();
    const consumptionStore = useConsumptionStore();

    function checkIfEquipmentNotNull() {
        if(equipmentStore.clickedEquipment != null) {
            consumptionStore.addConsumption(consumptionStore.getTimeToIndex(startHour), 
                        consumptionStore.getTimeToIndex(endHour), equipmentStore.clickedEquipment);
            equipmentStore.setClickedEquipment(null);
        }
        else {
            console.log("equipment not selected")
        }
    }

    let startHour: string;
    let endHour: string;

    // const rangeInput = document.querySelectorAll(".range-input input");
    // rangeInput.forEach(input =>{
    //     input.addEventListener("input", ()=>{
    //         let minval = parseInt(rangeInput[0].value);
    //         let maxVal = parseInt(rangeInput[1].value);
    //         console
    //     })
    // })

</script>

<template>
    
    <div class="modal" v-if="equipmentStore.clickedEquipment">

        
        <div class="information">
            <h1 class="type">{{equipmentStore.clickedEquipment.type_fr }}</h1>
            <p class="conso"> {{ equipmentStore.clickedEquipment.conso }}</p>
            <p class="price"> {{ equipmentStore.clickedEquipment.price }}</p>
        </div>

        <div class="close" @click="equipmentStore.setClickedEquipment(null)">
            <Close style="width: 30px; height: 30px; cursor: pointer;"/>
        </div>

        <div class="schedule-prog">
            <div class="slider-container">
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
            </div>

            <div class="slider">
                <div class="progress">
                </div>
                <div class="range-input">
                    <input type="range" class="range-min" min="0" max="24" v-model="startHour">
                    <input type="range" class="range-max" min="0" max="24" v-model="endHour">
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