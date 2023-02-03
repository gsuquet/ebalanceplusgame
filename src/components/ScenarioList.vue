<script setup lang="ts">

</script>

<template>

    <section class="list-container">
        <div class="boucle"  @click="">
            <div class="box-container">
                <h1>
                </h1>
                <!-- <div class="svg-container">
                    <object  :data="curve.svg" width="300px" height="300px"></object>
                </div> -->
                <div class="svg-container">
                    <img  alt="curve">
                </div>
                <div class="icon-container">
                    <div class="icon-type-prod" >
                        <Icon icon="mdi:solar-power"/>
                    </div>
                    <div class="icon-type-prod" >
                        <Icon icon="mdi:hydro-power"/>
                    </div>
                    <div class="icon-type-prod">
                        <Icon icon="mdi:wind-power"/>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @import "../styles/components/productionAndScenarioList.scss";
</style>