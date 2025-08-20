<template>
  <div class="chess-piece" :class="[color, { active: active }]">
  </div>
</template>

<script setup lang="ts">
import type { PieceColor } from '@/types/pieceColor';
defineProps<{
  color: PieceColor
  active?: boolean
}>();
</script>

<style scoped lang="scss">
@use "@/assets/sass/chessPiece";

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

// 获胜后的棋子
.active {
  box-shadow: 0 0 0.1rem rgba(255, 255, 255, 1);
  animation: active 0.5s ease-in-out infinite alternate;
}

@keyframes active {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.2);
  }
}
</style>
