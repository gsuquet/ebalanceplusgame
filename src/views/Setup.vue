<script lang="ts">
    import ProductionList from '../components/ProductionList.vue';
    import ProductionRecap from '../components/ProductionResume.vue';
    import ScenarioList from '../components/ScenarioList.vue'
    import ScenarioResume from '../components/ScenarioResume.vue';
    import SetupValidationSection from '../components/SetupValidationSection.vue';

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
    <div id="setup-page" class="view">
        <ProductionList />
        <div class="center-container">
            <div class="details-container">
                <ProductionRecap />
                <ScenarioResume />
            </div>
            <SetupValidationSection />
        </div>
        <ScenarioList />
    </div>
</template>

<style lang="scss">
    @import "../styles/views/setup.scss";
</style>
