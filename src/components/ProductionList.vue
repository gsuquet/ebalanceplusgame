<script lang="ts">
    import { useProductionStore, ProductionCurve } from '../stores/ProductionStore';
    import { Icon } from '@iconify/vue';


    const productionStore = useProductionStore();
    export default {

        setup() {
            const productionStore = useProductionStore();
            return {productionStore};
        },
        computed: {
            //const getList = [] as ProductionCurve[];
            getList: productionStore.getAllProductionCurves
        },
        data() {
            return {

            }
        },
        methods: {
            isClicked(productionCurve: ProductionCurve) {
                productionStore.setClickedProductionCurve(productionCurve);
            }
        }
    }
    


</script>

<template>
    <section class="list-production">
        <div class="list-container">
            <div class="boucle" v-for="curve in getList">
                <h1>
                    {{ curve.name }}
                </h1>
                <div class="svg-container">
                    <object :data="curve.svg" width="300px" height="300px"></object>
                </div>
            </div>
        </div>
    </section>

</template>

<style lang="scss">
    @import "../styles/components/productionList.scss"
</style>