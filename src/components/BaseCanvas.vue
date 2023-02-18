<template>
    <div class="canvas-container">
            <canvas :id="canvasId" :width="width" :height="height"/>
        </div>
</template>

<script lang="ts">
    export default {
        name:'Canvas',
        props: {
            width: Number,
            height: Number,
            canvasId: String
        }
    };
</script>
