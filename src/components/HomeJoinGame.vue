<template>
    <section class="home-join-game section">
        <div class="section-title">
            <h1>{{ $t("home.joinGame") }}</h1>
        </div>
        <p class="description">
            {{ $t("home.joinGameDescription") }}
        </p>
        <div class="input-container">
            <label for="game-id">{{ $t("home.gameCode") }}</label>
            <input type="text" id="game-id" v-model="gameId" placeholder="D78UN"/>
        </div>
        <div class="btn-container">
            <button class="btn join-game-btn" @click="joinGame">
                <Router-Link to="/setup">
                    {{ $t("button.join") }}
                </Router-Link>
            </button>
        </div>
    </section>
</template>

<script lang="ts">
    export default {
        name: "HomeJoinGame",
        data() {
            return {
                gameParametersStore: useGameParametersStore(),
                multiplayerStore: useMultiplayerStore(),
                gameId: ""
            };
        },
        methods: {
            joinGame() {
                console.debug("Joining game");
                this.multiplayerStore.createConnection();
                this.multiplayerStore.joinGame(this.gameId);
            }
        }
    }
</script>