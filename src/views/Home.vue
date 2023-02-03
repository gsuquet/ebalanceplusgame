<script setup lang="ts">
import { useGameParametersStore } from '../stores/GameParametersStore';
const gameParametersStore = useGameParametersStore();
gameParametersStore.setLanguageFromBrowser();
</script>

<template>
    <div id="home-page" class="vue">
        <h1>Home Page</h1>
    </div>
</template>
