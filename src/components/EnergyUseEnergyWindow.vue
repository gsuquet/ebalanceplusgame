<script lang="ts">
    import ConsumptionProductionPopupWindow from './ConsumptionProductionPopupWindow.vue';
</script>

<template>
    <ConsumptionProductionPopupWindow
        :id="''"
        :equipment="null"
        :type="''"
        :amount="0"
        :max-energy-amount="0"
        :price="0"
        :indexes="{start:0,end:0}"
        @close-popup=""
        @save=""
        @cancel=""
        @delete=""/>
</template>

<script lang="ts">
    export default
</script>