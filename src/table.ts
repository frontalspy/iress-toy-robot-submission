import { ITable } from "./interfaces";

export class Table implements ITable {
  constructor(
    private readonly width: number,
    private readonly height: number,
  ) {}

  isValidPosition(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}
