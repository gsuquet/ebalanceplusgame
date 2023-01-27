<template>
    <div :class="alertClass+' alert'" v-if="display">
        <div class="alert-background">
            <span class="closebtn" @click="closeAlert">&times;</span>
            <p>{{ alertText }}</p>
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
      }
    };
</script>

<style lang="scss">
@import '../styles/components/alert.scss';
</style>
