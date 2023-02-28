<template>
    <div :class="alertClass+' alert'" v-if="display">
        <div class="alert-background">
            <span class="closebtn" @click="closeAlert">&times;</span>
            <p>{{ i18nTextProcessed }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
      name: 'Alert',
      props: {
        alertClass: {
            type: String,
            required: true
        },
        alertText: {
            type: String,
            required: true
        },
        shouldDisplay: {
            type: Boolean,
            required: true
        }
      },
      data() {
          return {
              display: false as boolean
          };
      },
      watch: {
          shouldDisplay: function (newVal: boolean) {
                this.display = newVal;
          }
      },
      methods: {
          closeAlert() {
              this.display = false;
          }
      },
      computed: {
        i18nTextProcessed(): string {
            return this.$t(this.alertText);
        }
      }
    };
</script>

<style lang="scss">
    @import '../styles/components/alert.scss';
</style>
