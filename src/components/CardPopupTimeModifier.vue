<template>
    <div class="card-time-modifier">
        <div class="start-input field">
            <p>{{ $t("input.start") }}</p>
            <div class="choice-container" :class="{'input-error' : inputError || inputErrorStart}">
                <input
                    type="time"
                    class="input-start input"
                    step="900"
                    id="startHour"
                    v-bind:value="startHour"
                    v-on:input="updateStartHour($event.target.value)">
            </div>
        </div>
        <div class="end-input field">
            <p>{{ $t("input.end") }}</p>
            <div class="choice-container" :class="{'input-error' : inputError || inputErrorEnd}">
                <input
                    type="time"
                    class="input-end input"
                    step="900"
                    id="endHour"
                    v-bind:value="endHour"
                    v-on:input="updateEndHour($event.target.value)">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'CardPopupTimeModifier',
        props: {
            startHour: {
                type: String,
                required: true
            },
            endHour: {
                type: String,
                required: true
            },
            inputError: {
                type: Boolean,
                required: true
            }
        },
        data() {
            return {
                inputErrorStart: false as boolean,
                inputErrorEnd: false as boolean
            }
        },
        methods: {
            updateStartHour(newStartHour: string | null) {
                if(newStartHour === '' || newStartHour === null) {
                    this.inputErrorStart = true;
                } else {
                    this.inputErrorStart = false;
                    this.$emit('start-hour', newStartHour);
                }
            },
            updateEndHour(newEndHour: string | null) {
                if(newEndHour === '' || newEndHour === null) {
                    this.inputErrorEnd = true;
                } else {
                    this.inputErrorEnd = false;
                    this.$emit('end-hour', newEndHour);
                }
            }
        },
        emits: ['start-hour', 'end-hour']
    }
</script>
