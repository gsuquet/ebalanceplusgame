<template>
    <div class="card-time-modifier">
        <div class="hour-container start-hour-container">
            <p>{{ $t("input.start") }}</p>
            <div class="hour-modifier-container">
                <button
                    class="btn remove"
                    :class="{'disabled' : startHourMinus}"
                    @click="remove15MinutesFromStartHour">
                    -
                </button>
                <div class="input-container" :class="{'input-error' : inputError || inputErrorStart}">
                    <input
                        type="time"
                        class="input-start input"
                        step="900"
                        id="startHour"
                        :value="startHour"
                        @input="updateStartHour">
                </div>
                <button
                    class="btn add"
                    :class="{'disabled' : startHourPlus}"
                    @click="add15MinutesToStartHour">
                    +
                </button>
            </div>
        </div>
        <div class="hour-container end-hour-container">
            <p>{{ $t("input.end") }}</p>
            <div class="hour-modifier-container">
                <button
                    class="btn remove"
                    :class="{'disabled' : endHourMinus}"
                    @click="remove15MinutesFromEndHour">
                    -
                </button>
                <div class="input-container" :class="{'input-error' : inputError || inputErrorEnd}">
                    <input
                        type="time"
                        class="input-end input"
                        step="900"
                        id="endHour"
                        :value="endHour"
                        @input="updateEndHour">
                </div>
                <button
                    class="btn add"
                    :class="{'disabled' : endHourPlus}"
                    @click="add15MinutesToEndHour">
                    +
                </button>
            </div>
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
            minDuration: {
                type: String,
                required: true
            },
            maxDuration: {
                type: String,
                required: true
            },
            stepDuration: {
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
                    if( startHourNumber === endHourNumber - 1 && startMinutesNumber === 45 && endMinutesNumber === 0) {
                        return false;
                    }
                    return true;
                } else if(startHourNumber === endHourNumber) {
                    if(startMinutesNumber < endMinutesNumber-15) {
                        return true;
                    }
                } else {
                    return false;
                }
            },
            isDurationOverMaxDuration() {
                const startHourSplit = this.startHour.split(':');
                const startHourNumber = parseInt(startHourSplit[0]);
                const startMinutesNumber = parseInt(startHourSplit[1]);
                const endHourSplit = this.endHour.split(':');
                const endHourNumber = parseInt(endHourSplit[0]);
                const endMinutesNumber = parseInt(endHourSplit[1]);
                const maxDurationSplit = this.maxDuration.split(':');
                const maxDurationHourNumber = parseInt(maxDurationSplit[0]);
                const maxDurationMinutesNumber = parseInt(maxDurationSplit[1]);
                if(endHourNumber - startHourNumber > maxDurationHourNumber) {
                    return true;
                } else if(endHourNumber - startHourNumber === maxDurationHourNumber) {
                    if(endMinutesNumber - startMinutesNumber > maxDurationMinutesNumber) {
                        return true;
                    }
                } else {
                    return false;
                }
            },
            isDurationUnderMinDuration() {
                const startHourSplit = this.startHour.split(':');
                const startHourNumber = parseInt(startHourSplit[0]);
                const startMinutesNumber = parseInt(startHourSplit[1]);
                const endHourSplit = this.endHour.split(':');
                const endHourNumber = parseInt(endHourSplit[0]);
                const endMinutesNumber = parseInt(endHourSplit[1]);
                const minDurationSplit = this.minDuration.split(':');
                const minDurationHourNumber = parseInt(minDurationSplit[0]);
                const minDurationMinutesNumber = parseInt(minDurationSplit[1]);
                if(endHourNumber - startHourNumber < minDurationHourNumber) {
                    return true;
                } else if(endHourNumber - startHourNumber === minDurationHourNumber) {
                    if(endMinutesNumber - startMinutesNumber < minDurationMinutesNumber) {
                        return true;
                    }
                } else {
                    return false;
                }
            },
            setTimeModificationParams() {
                if(this.isStartHourBeforeEndHour()){
                    this.setTimeModificationParamsFromMinMaxDuration();
                    if(this.startHour === '00:00' || this.startHour === '0:0') {
                        this.startHourMinus = true;
                    } else{
                        this.startHourMinus = false;
                    }
                    if(this.endHour === '23:45') {
                        this.endHourPlus = true;
                    } else{
                        this.endHourPlus = false;
                    }
                } else {
                    this.startHourPlus = true;
                    this.endHourMinus = true;
                }
            },
            setTimeModificationParamsFromMinMaxDuration() {
                if(this.isDurationOverMaxDuration()) {
                    this.startHourPlus = true;
                    this.endHourMinus = true;
                } else {
                    this.startHourPlus = false;
                    this.endHourMinus = false;
                }
                if(this.isDurationUnderMinDuration()) {
                    this.startHourMinus = true;
                    this.endHourPlus = true;
                } else {
                    this.startHourMinus = false;
                    this.endHourPlus = false;
                }
            }
        },
        emits: ['start-hour', 'end-hour'],
        watch: {
            startHour: {
                handler() {
                    this.setTimeModificationParams();
                },
                immediate: true
            },
            endHour: {
                handler() {
                    this.setTimeModificationParams();
                },
                immediate: true
            }
        }
    }
</script>
