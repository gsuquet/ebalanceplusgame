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
    <div class="card-time-modifier-buttons">
        <div class="hour-modifier-buttons">
            <button
                class="btn remove"
                :class="startHourMinus ? 'disabled' : ''"
                @click="remove15MinutesFromStartHour">
                -
            </button>
            <p>{{ startHour }}</p>
            <button
                class="btn add"
                :class="startHourPlus ? 'disabled' : ''"
                @click="add15MinutesToStartHour">
                +
            </button>
        </div>
        <div class="hour-modifier-buttons">
            <button
                class="btn remove"
                :class="endHourMinus ? 'disabled' : ''"
                @click="remove15MinutesFromEndHour">
                -
            </button>
            <p>{{ endHour }}</p>
            <button
                class="btn add"
                :class="endHourPlus ? 'disabled' : ''"
                @click="add15MinutesToEndHour">
                +
            </button>
        </div>
    </div>
</template>

<style lang="scss">
    @import '../styles/components/cardPopupTimeModifier.scss';
</style>

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
                inputErrorEnd: false as boolean,
                startHourPlus: false as boolean,
                startHourMinus: false as boolean,
                endHourPlus: false as boolean,
                endHourMinus: false as boolean
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
            },
            add15MinutesToStartHour() {
                if(!this.startHourPlus) {
                    const newStartHour = this.add15MinutesToHour(this.startHour);
                    this.$emit('start-hour', newStartHour);
                }
            },
            add15MinutesToEndHour() {
                if(!this.endHourPlus) {
                    const newEndHour = this.add15MinutesToHour(this.endHour);
                    this.$emit('end-hour', newEndHour);
                }
            },
            remove15MinutesFromStartHour() {
                if(!this.startHourMinus) {
                    const newStartHour = this.remove15MinutesFromHour(this.startHour);
                    this.$emit('start-hour', newStartHour);
                }
            },
            remove15MinutesFromEndHour() {
                if(!this.endHourMinus) {
                    const newEndHour = this.remove15MinutesFromHour(this.endHour);
                    this.$emit('end-hour', newEndHour);
                }
            },
            add15MinutesToHour(hour: string) {
                const hourSplit = hour.split(':');
                const hourNumber = parseInt(hourSplit[0]);
                const minutesNumber = parseInt(hourSplit[1]);
                if(hourNumber === 23 && minutesNumber === 45) {
                    return '23:45';
                }
                if(minutesNumber === 45) {
                    if(hourNumber + 1 < 10)
                        return `0${hourNumber + 1}:00`;
                    else
                        return `${hourNumber + 1}:00`;
                } else {
                    if(hourNumber < 10)
                        return `0${hourNumber}:${minutesNumber + 15}`;
                    else
                    return `${hourNumber}:${minutesNumber + 15}`;
                }
            },
            remove15MinutesFromHour(hour: string) {
                const hourSplit = hour.split(':');
                const hourNumber = parseInt(hourSplit[0]);
                const minutesNumber = parseInt(hourSplit[1]);
                if(hourNumber === 0 && minutesNumber === 0) {
                    return '00:00';
                }
                if(minutesNumber === 0) {
                    if(hourNumber -1 < 10)
                        return `0${hourNumber - 1}:45`;
                    else
                        return `${hourNumber - 1}:45`;
                } else if (minutesNumber === 15) {
                    if(hourNumber < 10)
                        return `0${hourNumber}:00`;
                    else
                        return `${hourNumber}:00`;
                }
                else {
                    if(hourNumber < 10)
                        return `0${hourNumber}:${minutesNumber - 15}`;
                    else
                        return `${hourNumber}:${minutesNumber - 15}`;
                }
            },
            isStartHourBeforeEndHour() {
                const startHourSplit = this.startHour.split(':');
                const startHourNumber = parseInt(startHourSplit[0]);
                const startMinutesNumber = parseInt(startHourSplit[1]);
                const endHourSplit = this.endHour.split(':');
                const endHourNumber = parseInt(endHourSplit[0]);
                const endMinutesNumber = parseInt(endHourSplit[1]);
                if(startHourNumber < endHourNumber) {
                    return true;
                } else if(startHourNumber === endHourNumber) {
                    if(startMinutesNumber < endMinutesNumber-15) {
                        return true;
                    }
                } else {
                    return false;
                }
            }
        },
        emits: ['start-hour', 'end-hour'],
        watch: {
            startHour: {
                handler() {
                    if(this.isStartHourBeforeEndHour()) {
                        if(this.startHour === '00:00' || this.startHour === '0:0') {
                            this.startHourMinus = true;
                        } else{
                            this.startHourMinus = false;
                        }
                        this.startHourPlus = false;
                        this.endHourMinus = false;
                    }
                    else {
                        this.startHourPlus = true;
                        this.endHourMinus = true;
                    }
                },
                immediate: true
            },
            endHour: {
                handler() {
                    if(this.isStartHourBeforeEndHour()) {
                        if(this.endHour === '23:45') {
                            this.endHourPlus = true;
                        } else{
                            this.endHourPlus = false;
                        }
                        this.endHourMinus = false;
                        this.startHourPlus = false;
                    }
                    else {
                        this.endHourMinus = true;
                        this.startHourPlus = true;
                    }
                },
                immediate: true
            }
        }
    }
</script>
