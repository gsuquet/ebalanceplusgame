<template>
    <section class="home-join-game section">
        <div class="section-title">
            <h1>{{ $t("home.joinGame") }}</h1>
        </div>
        <p class="description">
            {{ $t("home.joinGameDescription") }}
        </p>
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
                gameParametersStore: useGameParametersStore()
            };
        },
        methods: {
            joinGame() {
                console.debug("Joining game");
            }
        }
    }
</script>