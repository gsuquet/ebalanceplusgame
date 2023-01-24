<template>
    <div :class="alertClass+' alert'" v-if="display">
        <span class="closebtn" @click="closeAlert">&times;</span>
        <p>{{ alertText }}</p>
    </div>
</template>

<script lang="ts">
    export default {
        props: {
            alertClass: String,
            alertText: String,
            shouldDisplay: Boolean
        },
        data() {
            return {
                display: this.shouldDisplay,
            }
        },
        watch: {
            shouldDisplay: function (newVal) {
                this.display = newVal;
            }
        },
        methods: {
            closeAlert() {
                this.display = false;
            }
        }
    }
</script>

<style lang="scss">
@import '../styles/components/alert.scss'
</style>