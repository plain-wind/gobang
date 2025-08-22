import type { Cell, Move, Piece } from "@/types/chess";
/**
 * 五子棋胜负检测，可选返回获胜的棋子信息
 * @param cells 棋盘数据
 * @param size 棋盘大小
 * @param cell 放置的棋子数据
 * @param winPieceMsg 是否返回获胜的棋子信息
 */
// 检测是否游戏结束
export const checkWin = (cells: Cell[], size: number, cell: Cell, winPieceMsg: boolean = false) => {
  const r1 = isHorizontalOver(cells, size, cell, winPieceMsg);
  const r2 = isVerticalOver(cells, size, cell, winPieceMsg);
  const r3 = isDiagonalOver(cells, size, cell, winPieceMsg);
  const r4 = isAntiDiagonalOver(cells, size, cell, winPieceMsg);

  if (!winPieceMsg) {
    return r1 || r2 || r3 || r4;
  }

  // 我也不知道写这么多判断干嘛，反正就是为了让 ts 不报错 (想办法解决一下这个问题)
  if (typeof r1 === 'boolean' || typeof r2 === 'boolean' || typeof r3 === 'boolean' || typeof r4 === 'boolean') {
    return { isWin: false, winPieces: [] };
  }

  return [r1, r2, r3, r4].find(r => r.isWin) || { isWin: false, winPieces: [] };
};
const createIsOverFunction = (p1Move: Move, p2Move: Move) => {
  return (cells: Cell[], size: number, cell: Cell, winPieceMsg: boolean = false) => {
    const { row, col, piece } = cell;
    if (!piece) {
      return false;
    }
    let p1 = p1Move([row, col]);
    let p2 = p2Move([row, col]);
    let count = 1;
    while (isValid(cells, size, p1, piece)) {
      count++;
      p1 = p1Move(p1);
    }
    while (isValid(cells, size, p2, piece)) {
      count++;
      p2 = p2Move(p2);
    }

    if (!winPieceMsg) {
      return count >= 5;
    }

    if (count < 5) {
      return {
        isWin: false,
        winPieces: []
      };
    }

    const winPieces = [];
    for (let i = 0; i < count; i++) {
      p1 = p2Move(p1);
      const [row, col] = p1;
      const index = row * size + col;
      winPieces.push(cells[index]);
    }

    return {
      isWin: true,
      winPieces
    };

    // return count >= 5;
    // if (count >= 5) {
    //   p1 = p2Move(p1);
    //   while (isValid(p1, piece)) {
    //     const [row, col] = p1;
    //     const index = row * size.value + col;
    //     winnerPieces.push(cells[index]);
    //     p1 = p2Move(p1);
    //   }
    // }
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
const isValid = (cells: Cell[], size: number, point: number[], piece: Piece) => {
  const [row, col] = point;
  if (row < 0 || row >= size || col < 0 || col >= size) {
    return false;
  }
  const index = row * size + col;
  return cells[index].piece && cells[index].piece === piece;
}
