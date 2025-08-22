import { storeToRefs } from 'pinia';
import { useChessStore } from '@/stores/chess';

export const useChess = () => {
  // 棋盘数据
  const chessStore = useChessStore();
  const { size, boardSize, curPlayer, winner, player, cells, chessPieces } = storeToRefs(chessStore);
  const { initBoard, placeChessPiece, isLastPiece, backPiece, reset, isWinnerPiece, canBackPiece } = chessStore;

  return { size, boardSize, curPlayer, winner, player, cells, chessPieces, canBackPiece, initBoard, placeChessPiece, isLastPiece, backPiece, reset, isWinnerPiece };
};
