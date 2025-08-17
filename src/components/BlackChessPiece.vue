<template>
  <ChessPiece class="black" />
</template>

<script setup lang="ts">
import ChessPiece from './ChessPiece.vue';
</script>

<style scoped lang="scss">
// 黑色棋子
.black {
  background: radial-gradient(circle at 30% 30%, #666, #000);
}
</style>
