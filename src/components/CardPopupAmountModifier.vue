<template>
    <div class="card-amount-modifier">
        <div class="amount-container field">
            <p>{{ $t("input.consumption") }}</p>
            <button
                class="btn remove"
                :class="{'disabled' : amountMinus}"
                @click="removeStepAmountFromTotalAmount">
                -
            </button>
            <div class="choice-container" :class="{'input-error-min' : inputErrorMin, 'input-error-max' : inputErrorMax}">
                <input
                    type="number"
                    class="amount-input input"
                    :step="stepAmount"
                    id="amount"
                    :value="amount"
                    @input="updateAmount">
            </div>
            <button
                class="btn add"
                :class="{'disabled' : amountPlus}"
                @click="addStepAmountToTotalAmount">
                +
            </button>
        </div>
    </div>
</template>

<style lang="scss">
    @import '../styles/components/cardPopupAmountModifier.scss';
</style>

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
            minAmount: {
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
                inputErrorMin: false as boolean,
                inputErrorMax: false as boolean,
                amountPlus: false as boolean,
                amountMinus: false as boolean
            }
        },
        methods: {
            updateAmount(event: Event) {
                const newAmount = (event.target as HTMLInputElement).value;
                if(newAmount === '' || newAmount === null) {
                    this.$emit('amount', 0);
                } else {
                    const newAmountNb = parseInt(newAmount);
                    if(newAmountNb < this.minAmount) {
                        this.inputErrorMin = true;
                        this.inputErrorMax = false;
                    } else if(newAmountNb > this.maxAmount) {
                        this.inputErrorMax = true;
                        this.inputErrorMin = false;
                    } else {
                        this.inputErrorMax = false;
                        this.inputErrorMin = false;
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
                if( this.amount - this.stepAmount >= this.minAmount){
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
                    if(newAmount <= this.minAmount) {
                        this.amountMinus = true;
                    } else {
                        this.amountMinus = false;
                    }
                    if (newAmount > this.maxAmount) {
                        this.inputErrorMax=true;
                        this.inputErrorMin = false;
                    } else if (newAmount < this.minAmount) {
                        this.inputErrorMax = false;
                        this.inputErrorMin = true;
                    } else {
                        this.inputErrorMax = false;
                        this.inputErrorMin = false;
                    }
                },
                immediate: true
            }
        }
    }
</script>