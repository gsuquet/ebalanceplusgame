<script lang="ts">
    import ProductionList from '../components/ProductionList.vue';
    import ProductionRecap from '../components/ProductionResume.vue';

    export default {
        components: {
            ProductionList,
            ProductionRecap,
        }
    }
</script>

<template>
    <div class="setup-page">
        <div class="list-container">
            <ProductionList/>
        </div>
        
        <div class="description-container">
            <ProductionRecap />
        </div>
    </div>

</template>


<style lang="scss">
    @import "../styles/views/setup.scss";
</style>