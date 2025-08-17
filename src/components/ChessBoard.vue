<template>
  <!-- 棋盘 -->
  <div class="chess-board" :style="{
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`,
    width: `${boardSize}px`,
    height: `${boardSize}px`
  }">
    <!-- 格子 -->
    <div v-for="(item, index) in cells" :key="index" class="chess-cell"
      @click="chessStore.placeChessPiece(item.row, item.col)">
      <ChessPiece v-if="item.piece" :color="item.piece.color" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import ChessPiece from './ChessPiece.vue';
import { useChessStore } from '@/stores/chess';

// 获取棋盘数据
const chessStore = useChessStore();
const { size, cells } = storeToRefs(chessStore);
// 格子的大小
const cellSize = ref(40);
// 棋盘的总大小
const boardSize = computed(() => size.value * cellSize.value);

chessStore.initBoard();
</script>

<style scoped lang="scss">
@use "@/assets/sass/reset.scss";

.chess-board {
  display: grid;
  border: 2px solid #825409;

  & .chess-cell {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: 5px;

    &:nth-child(odd) {
      background-color: #DEB887;
    }

    &:nth-child(even) {
      background-color: #D5AC7B;
    }

    &:hover {
      background-color: #E5C69F;
    }
  }
}

.back-piece {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #825409;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #6f4500;
  }
}
</style>
