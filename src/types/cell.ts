import type { Piece } from "@/types/piece";

export interface Cell {
  row: number,
  col: number,
  piece: Piece | null
}
