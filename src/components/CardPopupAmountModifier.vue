<script setup lang="ts">
    import { useEnergyStore } from '../stores/EnergyStore';
</script>

<template>
    <div class="card-amount-modifier">
        <div class="amount-input field">
            <p>{{ $t("input.consumption") }}</p>
            <button
                class="btn remove"
                :class="amountMinus ? 'disabled' : ''"
                @click="removeStepAmountFromTotalAmount">
                -
            </button>
            <div class="choice-container" :class="{'input-error' : inputErrorAmount}">
                <input
                    type="number"
                    class="input-amount input"
                    step="1"
                    id="amount"
                    :value="amount"
                    @input="updateAmount">
            </div>
            <button
                class="btn add"
                :class="amountPlus ? 'disabled' : ''"
                @click="addStepAmountToTotalAmount">
                +
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'CardPopupAmountModifier',
        props: {
            amount: {
                type: Number,
                required: true
            },
            maxAmount: {
                type: Number,
                required: true
            },
            stepAmount: {
                type:Number,
                required: true
            }
        },
        data() {
            return {
                inputErrorAmount: false as boolean,
                amountPlus: false as boolean,
                amountMinus: false as boolean,
                energyStore: useEnergyStore()
            }
        },
        methods: {
            updateAmount(event: Event) {
                const newAmount = (event.target as HTMLInputElement).value;
                if(newAmount === '' || newAmount === null) {
                    this.$emit('amount', 0);
                } else {
                    const newAmountNb = parseInt(newAmount);
                    if(newAmountNb < 0) {
                        this.inputErrorAmount = true;
                    } else if(newAmountNb > this.energyStore.maxEnergy) {
                        this.inputErrorAmount = true;
                    } else {
                        this.inputErrorAmount = false;
                        this.$emit('amount', newAmountNb);
                    }
                }
            },
            addStepAmountToTotalAmount() {
                if( this.amount + this.stepAmount <= this.maxAmount){
                    this.$emit('amount', this.amount + this.stepAmount);
                }
            },
            removeStepAmountFromTotalAmount() {
                if( this.amount - this.stepAmount >= 0){
                    this.$emit('amount', this.amount - this.stepAmount);
                }
            }
        },
        emits: ['amount'],
        watch: {
            amount: {
                handler: function (newAmount: number) {
                    if(newAmount >= this.maxAmount) {
                        this.amountPlus = true;
                    } else {
                        this.amountPlus = false;
                    }
                    if(newAmount <= 0) {
                        this.amountMinus = true;
                    } else {
                        this.amountMinus = false;
                    }
                },
                immediate: true
            }
        }
    }
</script>
