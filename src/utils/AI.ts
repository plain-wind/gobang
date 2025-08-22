import type { Cell, Piece } from '@/types/chess';
import type { PlacePiece } from '@/types/function';
import { checkWin } from '@/utils/checkWin';

// 棋型评分常量，值越高优先级越高
const SCORES = {
  // 进攻型棋型
  FIVE: 100000,       // 五连子（必胜）
  FOUR: 10000,        // 活四或冲四（极优）
  THREE: 1000,        // 活三（优势）
  TWO: 100,           // 活二（发展）
  ONE: 10,            // 单棋（基础）

  // 防守型棋型（略低于进攻，鼓励进攻）
  DEFEND_FIVE: 90000,
  DEFEND_FOUR: 9000,
  DEFEND_THREE: 900,
  DEFEND_TWO: 90,
  DEFEND_ONE: 9
};

// 检查指定方向上的连续棋子和空格情况
const checkLine = (
  cells: Cell[],
  row: number,
  col: number,
  size: number,
  dr: number,
  dc: number,
  piece: Piece
) => {
  let count = 0;    // 连续相同棋子数
  let blocks = 0;   // 阻挡数
  let spaces = 0;   // 空格数

  // 向一个方向检查
  for (let i = 1; i <= 4; i++) {
    const r = row + dr * i;
    const c = col + dc * i;

    if (r < 0 || r >= size || c < 0 || c >= size) {
      blocks++;
      break;
    }

    const index = r * size + c;
    const cellPiece = cells[index].piece;

    if (cellPiece === piece) {
      count++;
    } else if (!cellPiece) {
      spaces++;
      break;  // 遇到空格停止该方向检查
    } else {
      blocks++;
      break;  // 遇到对方棋子停止该方向检查
    }
  }

  // 向相反方向检查
  for (let i = 1; i <= 4; i++) {
    const r = row - dr * i;
    const c = col - dc * i;

    if (r < 0 || r >= size || c < 0 || c >= size) {
      blocks++;
      break;
    }

    const index = r * size + c;
    const cellPiece = cells[index].piece;

    if (cellPiece === piece) {
      count++;
    } else if (!cellPiece) {
      spaces++;
      break;  // 遇到空格停止该方向检查
    } else {
      blocks++;
      break;  // 遇到对方棋子停止该方向检查
    }
  }

  return { count, blocks, spaces };
};

// 评估指定位置对于特定棋子的价值
const evaluatePositionForPiece = (
  cells: Cell[],
  row: number,
  col: number,
  size: number,
  piece: Piece,
  isDefense: boolean
) => {
  const directions = [
    [0, 1],  // 水平
    [1, 0],  // 垂直
    [1, 1],  // 对角线1
    [1, -1]  // 对角线2
  ];

  let maxScore = 0;

  // 模拟落子
  const tempIndex = row * size + col;
  const originalPiece = cells[tempIndex].piece;
  cells[tempIndex].piece = piece;

  // 检查是否能立即获胜
  if (checkWin(cells, size, cells[tempIndex])) {
    cells[tempIndex].piece = originalPiece;
    return isDefense ? SCORES.DEFEND_FIVE : SCORES.FIVE;
  }

  // 检查四个方向的棋型
  for (const [dr, dc] of directions) {
    const { count, blocks, spaces } = checkLine(cells, row, col, size, dr, dc, piece);
    const totalInLine = count + 1;  // 加上当前位置的棋子

    // 评估棋型
    let score = 0;

    if (totalInLine >= 4) {
      // 四连子情况
      score = isDefense ? SCORES.DEFEND_FOUR : SCORES.FOUR;
    } else if (totalInLine === 3) {
      // 三连子情况：活三（两端无阻挡）比冲三（一端有阻挡）好
      score = blocks <= 1 ?
        (isDefense ? SCORES.DEFEND_THREE : SCORES.THREE) :
        (isDefense ? SCORES.DEFEND_THREE * 0.7 : SCORES.THREE * 0.7);
    } else if (totalInLine === 2) {
      // 二连子情况
      score = blocks === 0 ?
        (isDefense ? SCORES.DEFEND_TWO : SCORES.TWO) :
        (isDefense ? SCORES.DEFEND_TWO * 0.5 : SCORES.TWO * 0.5);
    } else if (totalInLine === 1) {
      // 单个棋子
      score = isDefense ? SCORES.DEFEND_ONE : SCORES.ONE;
    }

    // 有空格可以发展的棋型价值更高
    if (spaces > 0) {
      score *= 1.2;
    }

    maxScore = Math.max(maxScore, score);
  }

  // 恢复棋盘
  cells[tempIndex].piece = originalPiece;

  return maxScore;
};

// 综合评估位置价值
const evaluatePosition = (
  cells: Cell[],
  row: number,
  col: number,
  size: number,
  aiPiece: Piece,
  playerPiece: Piece
) => {
  const tempIndex = row * size + col;
  if (cells[tempIndex].piece) return 0; // 已有棋子的位置价值为0

  // 评估进攻价值（AI落子）
  const attackScore = evaluatePositionForPiece(cells, row, col, size, aiPiece, false);

  // 评估防守价值（玩家可能落子）
  const defenseScore = evaluatePositionForPiece(cells, row, col, size, playerPiece, true);

  // 综合得分，进攻稍优先于防守
  return attackScore * 1.1 + defenseScore;
};

// 优化的AI落子函数
export const AIPlacePiece = (
  cells: Cell[],
  placePiece: PlacePiece,
  size: number,
  aiPiece: Piece,
  playerPiece: Piece
) => {
  // 获取所有空格子
  const emptyCells = cells.filter(cell => !cell.piece);
  if (emptyCells.length === 0) return;

  // 为每个空格子评分
  const scoredCells = emptyCells.map(cell => {
    // 只评估已有棋子周围的位置，减少计算量并提高相关性
    const isNearExistingPiece = checkIfNearExistingPiece(cells, cell.row, cell.col, size, 2);
    const score = isNearExistingPiece
      ? evaluatePosition(cells, cell.row, cell.col, size, aiPiece, playerPiece)
      : 0; // 远离已有棋子的位置暂时不考虑

    return { ...cell, score };
  });

  // 找到最高分的位置
  scoredCells.sort((a, b) => b.score - a.score);

  // 处理多个高分位置的随机选择（增加不可预测性）
  const topScore = scoredCells[0].score;
  const candidates = scoredCells.filter(cell => cell.score >= topScore * 0.9);
  const bestCell = candidates[Math.floor(Math.random() * candidates.length)];

  // 如果有明确的好位置，就下在那里
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

// 检查位置是否在已有棋子的附近
const checkIfNearExistingPiece = (
  cells: Cell[],
  row: number,
  col: number,
  size: number,
  distance: number
) => {
  for (let r = Math.max(0, row - distance); r <= Math.min(size - 1, row + distance); r++) {
    for (let c = Math.max(0, col - distance); c <= Math.min(size - 1, col + distance); c++) {
      const index = r * size + c;
      if (cells[index].piece) {
        return true;
      }
    }
  }
  return false;
};
