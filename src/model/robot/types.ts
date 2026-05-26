import { Direction, Position } from "../directions/types";

export interface IRobot {
  place(x: number, y: number, facing: Direction): void;
  move(): void;
  turnLeft(): void;
  turnRight(): void;
  getPosition(): Position | null;
  isPlaced(): boolean;
}
