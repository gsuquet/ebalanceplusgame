<template>
    <div :class="alertClass+' alert'" v-if="display">
        <div class="alert-background">
            <span class="closebtn" @click="closeAlert">&times;</span>
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
      name: 'Alert',
      props: {
          alertClass: String,
          alertText: String,
          shouldDisplay: Boolean
      },
      data() {
          return {
              display: false as boolean,
              text : '' as string
          };
      },
      watch: {
          shouldDisplay: function (newVal: boolean) {
                this.display = newVal;
          },
          alertText: {
            handler: function (newVal: string) {
                if(newVal){
                    this.setTextFromI18n(newVal);
                }
            },
            immediate: true
          }
      },
      methods: {
          closeAlert() {
              this.display = false;
          },
          setTextFromI18n(key: string) {
              this.text = this.$t(key);
          }
      }
    };
</script>

<style lang="scss">
@import '../styles/components/alert.scss';
</style>
