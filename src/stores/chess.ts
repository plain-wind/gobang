import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import type { Cell } from "@/types/chess";
import { Player } from "@/types/chess";
import { playSound } from "@/utils/music";
import { checkWin } from "@/utils/checkWin";

export const useChessStore = defineStore("chess", () => {
  // 每行每列的格子数量
  const size = ref(15);
  // 格子的大小
  const cellSize = ref(40);
  // 棋盘的总大小
  const boardSize = computed(() => size.value * cellSize.value);
  // 棋盘格子数据
  const cells = reactive<Cell[]>([]);
  // 棋子数据
  const chessPieces = reactive<Cell[]>([]);
  // 获胜的棋子数据
  const winnerPieces = reactive<Cell[]>([]);
  // 当前玩家
  const curPlayer = ref<Player>(Player.BLACK);
  // 获胜玩家
  const winner = ref<Player | null>(null);
  // 玩家选择的棋子颜色 (用于先手或后手)
  const player = ref<Player | null>(null);
  // 游戏是否结束
  const isGameOver = ref(false);
  // 落子音效
  const placeSound = ref<HTMLAudioElement>(new Audio('/sounds/placePiece.m4a'));

  // 初始化
  const initBoard = () => {
    for (let i = 0; i < size.value * size.value; i++) {
      cells[i] = {
        row: Math.floor(i / size.value),
        col: i % size.value,
        piece: null
      }
    }
  };
  // 放置棋子
  const placeChessPiece = (row: number, col: number) => {
    const index = row * size.value + col;
    // 如果该格子已有棋子，不能再放置
    if (cells[index].piece || isGameOver.value) {
      return;
    }
    // 放置当前玩家的棋子
    cells[index].piece = curPlayer.value;
    // 播放落子音效
    playSound(placeSound.value);
    // 记录已放置的棋子
    chessPieces.push(cells[index]);
    // 检测是否游戏结束
    const { isWin, winPieces } = checkWin(cells, size.value, cells[index], true) as { isWin: boolean; winPieces: Cell[] };
    isGameOver.value = isWin;

    if (isGameOver.value) {
      winner.value = curPlayer.value;
      // 如果游戏结束，记录获胜棋子
      winnerPieces.push(...winPieces);
      return;
    }
    // 切换玩家
    changePlayer(1);
  };
  // 是否是最后一个棋子
  const isLastPiece = (row: number, col: number) => {
    const cell = chessPieces[chessPieces.length - 1] || { row: -1, col: -1 };
    return cell.row === row && cell.col === col;
  };
  // 重新开始
  const reset = () => {
    cells.forEach(cell => cell.piece = null);
    chessPieces.splice(0, chessPieces.length);
    winnerPieces.splice(0, winnerPieces.length);
    curPlayer.value = Player.BLACK;
    winner.value = null;
    player.value = null;
    isGameOver.value = false;
  };
  // 悔棋
  const backPiece = (n: number) => {
    if (chessPieces.length - n < 0 || isGameOver.value) {
      return;
    }
    for (let i = 0; i < n; i++) {
      const { row, col } = chessPieces.pop()!;
      const index = row * size.value + col;
      cells[index].piece = null;
      changePlayer(n);
    }
  }
  // 是否可以悔棋
  const canBackPiece = (n: number) => {
    return chessPieces.length - n >= 0 && !isGameOver.value;
  };
  // 切换玩家
  const changePlayer = (n: number) => {
    if (n % 2 === 1) {
      curPlayer.value = curPlayer.value === Player.BLACK ? Player.WHITE : Player.BLACK;
    }
  };
  // 判断是否是获胜的棋子
  const isWinnerPiece = (row: number, col: number) => {
    return winnerPieces.some(item => item.row === row && item.col === col);
  };

  return {
    size,
    boardSize,
    cells,
    chessPieces,
    curPlayer,
    winner,
    player,
    canBackPiece,
    initBoard,
    placeChessPiece,
    isLastPiece,
    backPiece,
    reset,
    isWinnerPiece
  };
});
