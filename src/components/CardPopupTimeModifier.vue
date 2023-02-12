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
                    :value="startHour"
                    @input="updateStartHour">
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
                    :value="endHour"
                    @input="updateEndHour">
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
            updateStartHour(event: Event) {
                const newStartHour = (event.target as HTMLInputElement).value;
                if(newStartHour === '' || newStartHour === null) {
                    this.inputErrorStart = true;
                } else {
                    this.inputErrorStart = false;
                    this.$emit('start-hour', newStartHour);
                }
            },
            updateEndHour(event: Event) {
                const newEndHour = (event.target as HTMLInputElement).value;
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
