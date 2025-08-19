import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import type { Cell, PieceColor, Move } from "@/types/chess";
import { Player } from "@/types/player";
import { placeSound, playSound } from "@/utils/music";

export const useChessStore = defineStore("chess", () => {
  // 每行每列的格子数量
  const size = ref(15);
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
  // 游戏是否结束
  const isGameOver = ref(false);


  // 初始化
  const initBoard = () => {
    for (let i = 0; i < size.value * size.value; i++) {
      cells.push({
        row: Math.floor(i / size.value),
        col: i % size.value,
        piece: null
      });
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
    cells[index].piece = { color: curPlayer.value };
    // 播放落子音效
    playSound(placeSound.value);
    // 记录已放置的棋子
    chessPieces.push(cells[index]);
    // 检测是否游戏结束
    isGameOver.value = isGameOverFunction(cells[index]);
    if (isGameOver.value) {
      winner.value = curPlayer.value;
      return;
    }
    // 切换玩家
    changePlayer();
  };
  // 检测是否游戏结束
  const isGameOverFunction = (cell: Cell) => {
    return (isHorizontalOver(cell) || isVerticalOver(cell) || isDiagonalOver(cell) || isAntiDiagonalOver(cell));
  };
  const createIsOverFunction = (p1Move: Move, p2Move: Move) => {
    return (cell: Cell) => {
      const { row, col, piece } = cell;
      const { color } = piece!;
      let p1 = p1Move([row, col]);
      let p2 = p2Move([row, col]);
      let count = 1;
      while (isValid(p1, color)) {
        count++;
        p1 = p1Move(p1);
      }
      while (isValid(p2, color)) {
        count++;
        p2 = p2Move(p2);
      }
      // return count >= 5;
      if (count >= 5) {
        p1 = p2Move(p1);
        while (isValid(p1, color)) {
          const [row, col] = p1;
          const index = row * size.value + col;
          winnerPieces.push(cells[index]);
          p1 = p2Move(p1);
        }
      }
      return count >= 5;
    }
  }
  // 横向检测
  const isHorizontalOver = createIsOverFunction(
    ([row, col]: number[]) => ([row, col - 1]),
    ([row, col]: number[]) => ([row, col + 1])
  );
  // 纵向检测
  const isVerticalOver = createIsOverFunction(
    ([row, col]: number[]) => ([row - 1, col]),
    ([row, col]: number[]) => ([row + 1, col])
  );
  // 斜向检测
  const isDiagonalOver = createIsOverFunction(
    ([row, col]: number[]) => ([row - 1, col - 1]),
    ([row, col]: number[]) => ([row + 1, col + 1])
  );
  // 反斜向检测
  const isAntiDiagonalOver = createIsOverFunction(
    ([row, col]: number[]) => ([row - 1, col + 1]),
    ([row, col]: number[]) => ([row + 1, col - 1])
  );
  // 判断棋子是否有效
  const isValid = (point: number[], color: PieceColor) => {
    const [row, col] = point;
    if (row < 0 || row >= size.value || col < 0 || col >= size.value) {
      return false;
    }
    const index = row * size.value + col;
    return cells[index].piece && cells[index].piece.color === color;
  }
  // 重新开始
  const reset = () => {
    cells.forEach(cell => cell.piece = null);
    chessPieces.splice(0, chessPieces.length);
    winnerPieces.splice(0, winnerPieces.length);
    curPlayer.value = Player.BLACK;
    winner.value = null;
    isGameOver.value = false;
  };
  // 悔棋
  const backPiece = () => {
    if (chessPieces.length > 0 && !isGameOver.value) {
      const { row, col } = chessPieces.pop()!;
      const index = row * size.value + col;
      cells[index].piece = null;
      changePlayer();
    }
  }
  // 切换玩家
  const changePlayer = () => {
    curPlayer.value = curPlayer.value === Player.BLACK ? Player.WHITE : Player.BLACK;
  };

  return {
    size,
    cells,
    curPlayer,
    winner,
    winnerPieces,
    initBoard,
    placeChessPiece,
    backPiece,
    reset,
  };
});
