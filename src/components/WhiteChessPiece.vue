<template>
  <ChessPiece class="white" />
</template>

<script setup lang="ts">
import ChessPiece from './ChessPiece.vue';
</script>

<style scoped lang="scss">
// 白色棋子
.white {
  box-sizing: border-box;
  background: radial-gradient(circle at 30% 30%, #fff, #ccc);
  border: 1px solid #ddd;
}
</style>
