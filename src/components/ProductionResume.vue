<script setup lang="ts">
    import { useProductionStore } from '../stores/ProductionStore';
    import { Icon } from '@iconify/vue'; 

    const productionStore = useProductionStore();

    // export default {
    //     setup() {
    //     },     
    //     methods: {
    //         isEmpty(listProd: number[]){
    //             let empty: boolean;
    //             if(listProd.length == 0)
    //                 empty = true;
    //             else
    //                 empty = false 
    //             return empty
    //         },
    //     },
    //     components: {
    //         Icon
    //     }
    // }

    function isEmpty(listProd: number[]){
        let empty: boolean;
        if(listProd.length == 0 )
            empty = true;
        else
            empty = false 
        return empty
    }

</script>


<template>
    <div class="recap-container">
        <div class="card-content" v-if="productionStore.clickedProductionCurve">
            <h1 class="name">
                {{productionStore.clickedProductionCurve.name}}
            </h1>

            <div class="svg-container">
                <img :src="productionStore.clickedProductionCurve.svg" alt="curve">
            </div>

            <div class="icon-container">
                <div class="icon-type-prod" v-if="!isEmpty(productionStore.clickedProductionCurve.solar)">
                    <Icon icon="mdi:solar-power"/>
                </div>
                <div class="icon-type-prod" v-if="!isEmpty(productionStore.clickedProductionCurve.hydro)">
                    <Icon icon="mdi:hydro-power"/>
                </div>
                <div class="icon-type-prod" v-if="!isEmpty(productionStore.clickedProductionCurve.wind)">
                    <Icon icon="mdi:wind-power"/>
                </div>
            </div> 
            <div class="explanation-container">
                <p>{{ productionStore.clickedProductionCurve.description }}</p>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
    @import "../styles/components/productionAndScenarioResume.scss";
</style>
