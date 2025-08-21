import { storeToRefs } from 'pinia';
import { useChessStore } from '@/stores/chess';

export const useChess = () => {
  // 棋盘数据
  const chessStore = useChessStore();
  const { size, curPlayer, winner, chessPieces } = storeToRefs(chessStore);
  const { initBoard, placeChessPiece, isLastPiece, backPiece, reset, isWinnerPiece } = chessStore;

  return { size, curPlayer, winner, chessPieces, initBoard, placeChessPiece, isLastPiece, backPiece, reset, isWinnerPiece };
};
