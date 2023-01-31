<template>
    <div class="nav-bar">
        <div class="nav-bar-logo">
            <img src="/logo-nav-ebalance-game.png" alt="Logo of the game" />
        </div>
        <div class="nav-bar-links">
            <Router-link to="/">Home</Router-link>
            <Router-link to="/setup">Setup</Router-link>
            <RouterLink to="/game">Game</RouterLink>
        </div>
        <div class="nav-bar-user">
        </div>
    </div>
</template>

<style lang="scss">
    @import '../styles/layout/navigation.scss';
</style>
