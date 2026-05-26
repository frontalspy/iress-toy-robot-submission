import { IRobot, ITable } from "../interfaces";
import { Direction, Position } from "../types";
import { getNextPosition, rotateLeft, rotateRight } from "./directions";

export class Robot implements IRobot {
  private position: Position | null = null;

  constructor(private readonly table: ITable) {}

  place(x: number, y: number, facing: Direction): void {
    if (!this.table.isValidPosition(x, y)) {
      return;
    }
    this.position = { x, y, facing };
  }

  move(): void {
    if (!this.position) {
      return;
    }
    const next = getNextPosition(this.position);
    if (!this.table.isValidPosition(next.x, next.y)) {
      return;
    }
    this.position = { ...this.position, x: next.x, y: next.y };
  }

  turnLeft(): void {
    if (!this.position) {
      return;
    }
    this.position = {
      ...this.position,
      facing: rotateLeft(this.position.facing),
    };
  }

  turnRight(): void {
    if (!this.position) {
      return;
    }
    this.position = {
      ...this.position,
      facing: rotateRight(this.position.facing),
    };
  }

  getPosition(): Position | null {
    return this.position;
  }

  isPlaced(): boolean {
    return this.position !== null;
  }
}
