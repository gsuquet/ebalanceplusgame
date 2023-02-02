<script setup lang="ts">
    import LanguageSelector from '../components/LanguageSelector.vue'
</script>

<template>
    <div class="nav-bar">
        <div class="nav-bar-logo-links">
            <div class="nav-bar-logo">
                <img src="/logo-nav-ebalance-game.png" alt="Logo of the game" />
            </div>
            <div class="nav-bar-links">
                <Router-link to="/">{{ $t("page.home") }}</Router-link>
                <Router-link to="/setup">{{ $t("page.setup") }}</Router-link>
                <Router-Link to="/game">{{ $t("page.game") }}</Router-Link>
            </div>
        </div>
        <LanguageSelector />
        <div class="nav-bar-user">
        </div>
    </div>
</template>

<style lang="scss">
    @import '../styles/layout/navigation.scss';
</style>
