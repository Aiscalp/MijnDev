<template>
    <div class="simple-card">
        <p class="simple-card__title">
            <slot name="title" />
        </p>
        <slot name="content" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class SimpleCard extends Vue {}
</script>

<style scoped>
    .simple-card {
        background-color: #ffffff;
        box-shadow: 0 5px 40px rgb(112 144 176 / 20%);
        border-radius: 10px;
        position: relative;
        padding: 20px;
        transition: .1s ease;
        box-sizing: border-box;
    }

    .simple-card__title {
        padding-bottom: 10px;
        font-weight: 700;
        font-size: 18px;
        margin: 0;
    }
</style>
