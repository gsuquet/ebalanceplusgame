<script	setup lang="ts">
import { useGameParametersStore } from '../stores/GameParametersStore';
</script>

<template>
    <section class="home-create-game section">
        <div class="section-title">
            <h1>{{ $t("home.createGame") }}</h1>
        </div>
        <p class="description">
            {{ $t("home.createGameDescription") }}
        </p>
        <div class="multiplayer-toggle">
            <p class="singlePlayer-label">{{ $t("home.singlePlayer") }}</p>
            <label class="toggle" :class="multiPlayer ? 'checked':''">
                <input class="toggle-checkbox" type="checkbox" v-model="multiPlayer">
                <span class="slider"></span>
            </label>
            <p class="multiplayer-label">{{ $t("home.multiPlayer") }}</p>
        </div>
        <div class="multiplayer-gameId" v-if="multiPlayer">
            <p class="gameId-label">{{ $t("home.gameCode") }} :</p>
            <p class="gameId-display">{{ gameParametersStore.getGameIdUpper }}</p>
        </div>
        <div class="multiplayer-privacy" v-if="multiPlayer">
            <p class="private-label">{{ $t("home.private") }}</p>
            <label class="toggle" :class="public ? 'checked':''">
                <input class="toggle-checkbox" type="checkbox" v-model="public">
                <span class="slider"></span>
            </label>
            <p class="public-label">{{ $t("home.public") }}</p>
        </div>
        <div class="btn-container">
            <button class="btn create-game-btn" @click="createGame">
                <Router-Link to="/setup">
                    {{ $t("button.create") }}
                </Router-Link>
            </button>
        </div>
    </section>
</template>

<script lang="ts">
const gameParametersStore = useGameParametersStore();
    export default {
        name: "HomeCreateGame",
        data() {
            return {
                multiPlayer: false,
                public: false
            };
        },
        methods: {
            createGame() {
                gameParametersStore.createGame(this.multiPlayer, this.public);
            }
        }
    }
</script>
