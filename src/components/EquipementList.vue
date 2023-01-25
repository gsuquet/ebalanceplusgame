<script lang="ts">
    import {ref} from "vue";
    import WashingMachineIcon from "~icons/mdi/washing-machine";
    import { useEquipmentStore } from "../stores/EquipmentStore";
    //import EquipmentList from "../components/EquipementList.vue";
    //import Equipments from "../components/Equipments.vue";

    /*
    export default {
        components: {
            EquipmentList,
            Equipments
        }
    }
    */

    const equipmentStore = useEquipmentStore;
    equipmentStore.fill();

    const showList = ref(true);
</script>

<template>
    <main>
        <div v-if="showList = true" class="container">
            <div class="list-container">
                <div class="equipment-container">
                    <h1> 
                        Dishwasher
                    </h1>
                    <WashingMachineIcon />
                   
                </div>
            </div>
        </div>


        <button v-if="showList = true" @click="showList = false "> + </button>
        <button v-else @click="showList = true"> - </button>
    </main>
</template>

<style lang="scss">
    @import "../styles/components/list.scss";
</style>