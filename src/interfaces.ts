import { ParsedCommand, Position } from "./types";

export interface ITable {
  isValidPosition(x: number, y: number): boolean;
}

export interface IRobot {
  place(x: number, y: number, facing: import("./types").Direction): void;
  move(): void;
  turnLeft(): void;
  turnRight(): void;
  getPosition(): Position | null;
  isPlaced(): boolean;
}

export interface IController {
  execute(command: ParsedCommand): string | null;
}
