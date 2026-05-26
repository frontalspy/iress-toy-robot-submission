import { Table } from "./table";

describe("Table.isValidPosition", () => {
  const table = new Table(5, 5);

  it.each([
    [0, 0],
    [4, 4],
    [0, 4],
    [4, 0],
    [2, 2],
  ])("should accept valid position (%i, %i)", (x, y) => {
    expect(table.isValidPosition(x, y)).toBe(true);
  });

  it.each([
    [-1, 0],
    [0, -1],
    [5, 0],
    [0, 5],
    [5, 5],
    [-1, -1],
  ])("should reject out-of-bounds position (%i, %i)", (x, y) => {
    expect(table.isValidPosition(x, y)).toBe(false);
  });
});
