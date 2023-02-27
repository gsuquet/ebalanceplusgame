<template>
    <div class="ratio-container">
        <div class="ratio-name">
            <h4>{{ ratioName }}</h4>
        </div>
        <div class="ratio-value">
            <p>{{ ratioValue }}</p>
        </div>
    </div>
</template>

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
        },
    }
</script>
