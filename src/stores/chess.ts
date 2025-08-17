import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { type Cell } from "@/types/cell";
import { Player } from "@/types/player";

export const useChessStore = defineStore("chess", () => {
  // 每行每列的格子数量
  const size = ref(15);
  // 棋盘格子数据
  const cells = reactive<Cell[]>([]);
  // 棋子数据
  const chessPieces = reactive<Cell[]>([]);
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
  // 放置棋子
  const placeChessPiece = (row: number, col: number) => {
    const index = row * size.value + col;
    // 如果该格子已有棋子，不能再放置
    if (cells[index].piece) {
      return;
    }
    // 放置当前玩家的棋子
    cells[index].piece = { color: curPlayer.value };
    chessPieces.push(cells[index]);
    // 切换玩家
    changePlayer();
  };
  // 悔棋
  const backPiece = () => {
    if (chessPieces.length > 0) {
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
    chessPieces,
    curPlayer,
    initBoard,
    placeChessPiece,
    backPiece,
    changePlayer,
  };
});
