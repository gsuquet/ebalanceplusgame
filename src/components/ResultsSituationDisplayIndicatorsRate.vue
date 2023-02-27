<template>
    <div class="ratio-container">
        <div class="ratio-name">
            <h4>{{ ratioName }}</h4>
        </div>
        <div class="ratio-value">
            <p>{{ percentage }} %</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import "../styles/components/resultsSituationDisplayIndicatorsRate.scss";
</style>

<script lang="ts">
    export default {
        name: "ResultsSituationDisplayIndicatorsRate",
        props: {
            ratioNameI18nKey: {
                type: String,
                required: true,
            },
            ratioValue: {
                type: Number,
                required: true,
            },
        },
        computed: {
            ratioName(): string {
                return this.$t(this.ratioNameI18nKey);
            },
            percentage(): number {
                return this.ratioValue ? Math.round(this.ratioValue * 100) : 0;
            },
        },
    }
</script>
