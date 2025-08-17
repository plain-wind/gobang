<template>
  <!-- 棋盘 -->
  <div class="chess-board" :style="{
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`,
    width: `${boardSize}px`,
    height: `${boardSize}px`
  }">
    <!-- 格子 -->
    <div v-for="(item, index) in cells" :key="index" class="chess-cell" @click="placeChessPiece(item.row, item.col)">
      <ChessPiece v-if="item.piece" :color="item.piece.color" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { type Cell } from '@/types/cell';
import { Player } from '@/types/player';
import ChessPiece from './ChessPiece.vue';

// 每行每列的格子数量
const size = ref(15);
// 格子的大小
const cellSize = ref(50);
// 棋盘的总大小
const boardSize = computed(() => size.value * cellSize.value);
// 棋盘格子数据
const cells = reactive<Cell[]>([]);
// 当前玩家
const curPlayer = ref<Player>(Player.BLACK);

// 初始化棋盘格子
const initBoard = () => {
  for (let i = 0; i < size.value * size.value; i++) {
    cells.push({
      row: Math.floor(i / size.value),
      col: i % size.value,
      piece: null
    });
  }
};
const placeChessPiece = (row: number, col: number) => {
  const index = row * size.value + col;
  // 如果该格子已有棋子，不能再放置
  if (cells[index].piece) {
    return;
  }
  // 放置当前玩家的棋子
  cells[index].piece = { color: curPlayer.value };
  // 切换玩家
  curPlayer.value = curPlayer.value === Player.BLACK ? Player.WHITE : Player.BLACK;
};
initBoard();
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
</style>
