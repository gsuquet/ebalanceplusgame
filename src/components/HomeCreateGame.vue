<script	setup lang="ts">
</script>

<template>
    <section class="home-create-game section">
        <div class="section-title">
            <h1>{{ $t("home.createGame") }}</h1>
        </div>
        <div class="btn-container">
            <button class="btn create-game-btn">
                <Router-Link to="/setup">
                    {{ $t("button.create") }}
                </Router-Link>
            </button>
        </div>
    </section>
</template>

<script lang="ts">
    export default {
        name: "HomeCreateGame"
    }
</script>
