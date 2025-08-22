import type { Cell, Piece } from '@/types/chess';
import type { PlacePiece } from '@/types/function';
import { checkWin } from '@/utils/checkWin';

// 评估位置的价值（1-100分）
const evaluatePosition = (cells: Cell[], row: number, col: number, size: number, aiPiece: Piece, playerPiece: Piece) => {
  // 临时放置AI棋子评估进攻价值
  const tempIndex = row * size + col;
  const originalPiece = cells[tempIndex].piece;
  if (originalPiece) return 0; // 已有棋子的位置价值为0

  // 模拟AI落子
  cells[tempIndex].piece = aiPiece;
  const canWin = checkWin(cells, size, cells[tempIndex]);
  if (canWin) {
    cells[tempIndex].piece = originalPiece; // 恢复原状
    return 70;
  }

  // 模拟玩家落子（防守价值）
  cells[tempIndex].piece = playerPiece;
  const playerCanWin = checkWin(cells, size, cells[tempIndex]);
  if (playerCanWin) {
    cells[tempIndex].piece = originalPiece; // 恢复原状
    return 100;
  }

  // 评估当前位置周围的棋子密度（简单的位置价值评估）
  let score = 0;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  // 检查周围8个方向的棋子
  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = col + dc;
    if (r >= 0 && r < size && c >= 0 && c < size) {
      const index = r * size + c;
      if (cells[index].piece === aiPiece) {
        score += 5; // 周围有AI棋子加分
      } else if (cells[index].piece === playerPiece) {
        score += 3; // 周围有玩家棋子也加分（表示需要应对）
      }
    }
  }

  cells[tempIndex].piece = originalPiece; // 恢复原状
  return score;
};

export const AIPlacePiece = (
  cells: Cell[],
  placePiece: PlacePiece,
  size: number,
  aiPiece: Piece,
  playerPiece: Piece
) => {
  // 获取所有空格子
  const emptyCells = cells.filter(cell => !cell.piece);
  if (emptyCells.length === 0) {
    return;
  }

  // 为每个空格子评分
  const scoredCells = emptyCells.map(cell => {
    const score = evaluatePosition(cells, cell.row, cell.col, size, aiPiece, playerPiece);
    return { ...cell, score };
  });

  // 找到最高分的位置
  scoredCells.sort((a, b) => b.score - a.score);
  const bestCell = scoredCells[0];

  // 如果最高分足够高（有明确的最佳选择），就下在那里
  if (bestCell.score > 0) {
    placePiece(bestCell.row, bestCell.col);
    return;
  }

  // 否则，在中心附近选择（优先中心位置）
  const center = Math.floor(size / 2);
  const cellsNearCenter = emptyCells
    .map(cell => ({
      ...cell,
      distance: Math.abs(cell.row - center) + Math.abs(cell.col - center) // 曼哈顿距离
    }))
    .sort((a, b) => a.distance - b.distance);

  placePiece(cellsNearCenter[0].row, cellsNearCenter[0].col);
};
