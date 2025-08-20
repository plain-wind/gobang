<template>
  <!-- 棋盘 -->
  <div class="chess-board" :style="{
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`,
    width: `${boardSize / 100}rem`,
    height: `${boardSize / 100}rem`
  }">
    <!-- 格子 -->
    <div v-for="(item, index) in cells" :key="index" class="chess-cell"
      :class="{ 'last-piece': chessStore.isLastPiece(item.row, item.col) }"
      @click="chessStore.placeChessPiece(item.row, item.col)">
      <ChessPiece v-if="item.piece" :color="item.piece.color" :active="chessStore.isWinnerPiece(item.row, item.col)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ChessPiece from './ChessPiece.vue';
import { useChessStore } from '@/stores/chess';

// 获取棋盘数据
const chessStore = useChessStore();
const { size, boardSize, cells } = storeToRefs(chessStore);

// 棋盘初始化
chessStore.initBoard();
</script>

<style scoped lang="scss">
.chess-board {
  display: grid;
  border: 2px solid #825409;

  & .chess-cell {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.05rem;
    transition: background-color 0.3s;

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

  & .last-piece {
    // !important 用于覆盖 hover 的样式
    background-color: #d2892f !important;
  }
}
</style>
