import { Direction } from "../types/types";
import { getNextPosition, rotateLeft, rotateRight } from "./directions";

function testRotation(
  name: string,
  rotateFn: (d: Direction) => Direction,
  cases: [Direction, Direction][],
): void {
  describe(name, () => {
    it.each(cases)("should rotate %s to %s", (input, expected) => {
      expect(rotateFn(input)).toBe(expected);
    });

    it("should complete a full 360 cycle", () => {
      let dir = Direction.NORTH;
      for (let i = 0; i < 4; i++) {
        dir = rotateFn(dir);
      }
      expect(dir).toBe(Direction.NORTH);
    });
  });
}

testRotation("rotateLeft", rotateLeft, [
  [Direction.NORTH, Direction.WEST],
  [Direction.WEST, Direction.SOUTH],
  [Direction.SOUTH, Direction.EAST],
  [Direction.EAST, Direction.NORTH],
]);

testRotation("rotateRight", rotateRight, [
  [Direction.NORTH, Direction.EAST],
  [Direction.EAST, Direction.SOUTH],
  [Direction.SOUTH, Direction.WEST],
  [Direction.WEST, Direction.NORTH],
]);

describe("getNextPosition", () => {
  it("should move north and increase y", () => {
    expect(getNextPosition({ x: 0, y: 0, facing: Direction.NORTH })).toEqual({
      x: 0,
      y: 1,
    });
  });

  it("should move south and decrease y", () => {
    expect(getNextPosition({ x: 2, y: 2, facing: Direction.SOUTH })).toEqual({
      x: 2,
      y: 1,
    });
  });

  it("should move east and increase x", () => {
    expect(getNextPosition({ x: 1, y: 1, facing: Direction.EAST })).toEqual({
      x: 2,
      y: 1,
    });
  });

  it("should move west and decrease x", () => {
    expect(getNextPosition({ x: 3, y: 3, facing: Direction.WEST })).toEqual({
      x: 2,
      y: 3,
    });
  });
});
