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
      :class="{ 'last-piece': isLastPiece(item.row, item.col) }" @click="placeChessPiece(item.row, item.col)">
      <ChessPiece v-if="item.piece" :color="item.piece" :active="isWinnerPiece(item.row, item.col)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChessPiece from '@/components/ChessPiece.vue';
import { useChess } from '@/hooks/useChess';

// 获取棋盘数据
const { size, boardSize, cells, initBoard, isLastPiece, placeChessPiece, isWinnerPiece } = useChess();
// 棋盘初始化
initBoard();
</script>

<style scoped lang="scss">
.chess-board {
  display: grid;
  position: relative;
  background-color: #cb9f57;
  box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.4);
  box-sizing: content-box;
  border-radius: 0.2rem;
  padding: 0.2rem;

  // 废案
  // &::before {
  //   content: '';
  //   position: absolute;
  //   width: calc(100% - 0.8rem);
  //   height: calc(100% - 0.8rem);
  //   border: 0.4rem solid rgba(0, 0, 0, 0.2);
  //   border-radius: 0.2rem;
  // }

  & .chess-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.05rem;
    border-radius: 50%;
    transition: background-color 0.3s;
    background-image:
      // 线
      linear-gradient(to right, transparent calc(50% - 0.8px), #825409 calc(50% - 0.8px), #825409 calc(50% + 0.8px), transparent calc(50% + 0.8px)),
      linear-gradient(to bottom, transparent calc(50% - 0.8px), #825409 calc(50% - 0.8px), #825409 calc(50% + 0.8px), transparent calc(50% + 0.8px));

    // &:nth-child(odd) {
    //   background-color: #DEB887;
    // }

    // &:nth-child(even) {
    //   background-color: #D5AC7B;
    // }

    &:hover {
      background-color: #fcd5a8;
    }
  }

  & .last-piece {
    // !important 用于覆盖 hover 的样式
    background-color: #a06217 !important;
  }
}
</style>
