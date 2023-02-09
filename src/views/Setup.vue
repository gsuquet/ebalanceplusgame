<script lang="ts">
    import ProductionList from '../components/ProductionList.vue';
    import ProductionRecap from '../components/ProductionResume.vue';
    import ScenarioList from '../components/ScenarioList.vue'
    import ScenarioResume from '../components/ScenarioResume.vue';

    export default {
        components: {
            ProductionList,
            ProductionRecap,
            ScenarioList,
            ScenarioResume
        }
    }
</script>

<template>
    <div class="setup-page">
        <div class="list-container">
            <ProductionList />
        </div>
        
        <div class="description-container">
            <ProductionRecap />
        </div>

        <div class="scenario-list-container">
            <ScenarioList />
        </div>

        <div class="scenario-description-container">
            <ScenarioResume />
        </div>


    </div>

</template>


<style lang="scss">
    @import "../styles/views/setup.scss";
</style>