export enum Direction {
  NORTH = "NORTH",
  EAST = "EAST",
  SOUTH = "SOUTH",
  WEST = "WEST",
}

export interface Position {
  x: number;
  y: number;
  facing: Direction;
}

export type ParsedCommand =
  | { type: "PLACE"; x: number; y: number; facing: Direction }
  | { type: "MOVE" }
  | { type: "LEFT" }
  | { type: "RIGHT" }
  | { type: "REPORT" };
