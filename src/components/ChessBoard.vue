<template>
  <div class="chessboard-container">
    <h2 class="chessboard-title">{{ title }}</h2>

    <!-- 棋盘容器 -->
    <div class="chessboard-wrapper" :style="{ width: `${boardSize}px`, height: `${boardSize}px` }">
      <!-- 网格线层 (用伪元素绘制所有网格线) -->
      <div class="grid-lines" :style="{
        '--size': size,
        '--cell-size': `${cellSize}px`
      }"></div>

      <!-- 棋盘格子层 -->
      <div class="chessboard" :style="{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`,
        width: `${boardSize}px`,
        height: `${boardSize}px`
      }">
        <!-- 生成棋盘格子 -->
        <div v-for="(cell, index) in cells" :key="index" class="cell" :class="{
          'cell-black': isBlackCell(index),
          'has-piece': hasPiece(index)
        }" @click="handleCellClick(index)" :data-coords="getCoordinates(index)">
          <div v-if="cells[index].piece" class="piece" :class="`piece-${cells[index].piece.color}`"></div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="resetBoard">重置棋盘</button>
      <button @click="toggleSize">切换大小 ({{ size }}×{{ size }})</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Piece {
  color: 'black' | 'white';
}

interface Cell {
  piece: Piece | null;
}

const props = defineProps<{
  title?: string;
  initialSize?: number;
  cellSize?: number;
}>();

const size = ref(props.initialSize || 19);
const cells = ref<Cell[]>([]);

const cellSize = props.cellSize || 30;
const boardSize = computed(() => size.value * cellSize);

const initializeBoard = () => {
  cells.value = Array.from({ length: size.value * size.value }, () => ({
    piece: null
  }));
};

const isBlackCell = (index: number) => {
  const row = Math.floor(index / size.value);
  const col = index % size.value;
  return (row + col) % 2 === 1;
};

const hasPiece = (index: number) => {
  return cells.value[index].piece !== null;
};

const getCoordinates = (index: number) => {
  const row = Math.floor(index / size.value) + 1;
  const col = (index % size.value) + 1;
  return `${String.fromCharCode(64 + col)}${row}`;
};

let currentPlayer: 'black' | 'white' = 'black';
const handleCellClick = (index: number) => {
  if (hasPiece(index)) return;
  cells.value[index].piece = { color: currentPlayer };
  currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
};

const resetBoard = () => {
  initializeBoard();
  currentPlayer = 'black';
};

const toggleSize = () => {
  size.value = size.value === 19 ? 15 : 19;
  initializeBoard();
};

initializeBoard();
</script>

<style scoped lang="scss">
.chessboard-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.chessboard-title {
  color: #333;
  margin-bottom: 20px;
}

// 棋盘包装器 - 用于定位网格线和格子
.chessboard-wrapper {
  position: relative;
  border: 2px solid #8B4513;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

// 网格线层 - 用伪元素绘制所有横线和竖线
.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; // 让点击穿透到下面的格子

  // 绘制横线
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #000;
    opacity: 0.7;
  }

  // 绘制竖线
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
  }
}

// 生成所有横线 (1到size-1条)
@for $i from 1 to 19 {
  .grid-lines[data-size="#{$i}"]::before {
    top: calc(var(--cell-size) * #{$i});
  }
}

// 生成所有竖线 (1到size-1条)
@for $i from 1 to 19 {
  .grid-lines[data-size="#{$i}"]::after {
    left: calc(var(--cell-size) * #{$i});
  }
}

// 棋盘格子层
.chessboard {
  display: grid;
  position: relative;
  background-color: #DEB887;
}

.cell {
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.cell-black {
  background-color: rgba(139, 69, 19, 0.1);
}

.piece {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  box-shadow:
    inset 2px 2px 3px rgba(255, 255, 255, 0.5),
    2px 2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
  }
}

.piece-black {
  background: radial-gradient(circle at 30% 30%, #666, #000);
}

.piece-white {
  background: radial-gradient(circle at 30% 30%, #fff, #ccc);
  border: 1px solid #ddd;
}

.controls {
  margin-top: 20px;
  display: flex;
  gap: 10px;

  button {
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #359e6f;
    }
  }
}

@media (max-width: 768px) {
  .chessboard-wrapper {
    max-width: 90vw;
    max-height: 90vw;
  }
}
</style>
