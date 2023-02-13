<template>
    <div class="card-amount-modifier">
        <div class="amount-input field">
            <p>{{ $t("input.consumption") }}</p>
            <div class="choice-container" :class="{'input-error' : inputErrorAmount}">
                <input
                    type="number"
                    class="input-amount input"
                    step="1"
                    id="amount"
                    :value="amount"
                    @input="updateAmount">
            </div>
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
            }
        },
        data() {
            return {
                inputErrorAmount: false as boolean
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
                    } else {
                        this.inputErrorAmount = false;
                        this.$emit('amount', newAmountNb);
                    }
                }
            }
        },
        emits: ['amount']
    }
</script>
