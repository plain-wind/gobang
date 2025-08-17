<template>
  <div class="chess-piece" :class="color">
  </div>
</template>

<script setup lang="ts">
import { type PieceColor } from '@/types/pieceColor';
defineProps<{
  color: PieceColor
}>();
</script>

<style scoped lang="scss">
@use "@/assets/sass/chessPiece.scss";

// 黑色棋子
.black {
  background: radial-gradient(circle at 30% 30%, #666, #000);
}

// 白色棋子
.white {
  box-sizing: border-box;
  background: radial-gradient(circle at 30% 30%, #fff, #ccc);
  border: 1px solid #ddd;
}
</style>
