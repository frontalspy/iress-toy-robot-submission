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
