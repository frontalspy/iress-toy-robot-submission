import { Robot } from "./robot";
import { Table } from "../table/table";
import { Direction } from "../directions/types";

function makeRobot() {
  return new Robot(new Table(5, 5));
}

describe("Robot - before placement", () => {
  it("should not be placed initially", () => {
    expect(makeRobot().isPlaced()).toBe(false);
  });

  it("should return null from getPosition", () => {
    expect(makeRobot().getPosition()).toBeNull();
  });

  it("should ignore MOVE before placement", () => {
    const robot = makeRobot();
    robot.move();
    expect(robot.getPosition()).toBeNull();
  });

  it("should ignore turnLeft before placement", () => {
    const robot = makeRobot();
    robot.turnLeft();
    expect(robot.getPosition()).toBeNull();
  });

  it("should ignore turnRight before placement", () => {
    const robot = makeRobot();
    robot.turnRight();
    expect(robot.getPosition()).toBeNull();
  });
});

describe("Robot - placement", () => {
  it("should place robot at valid position", () => {
    const robot = makeRobot();
    robot.place(0, 0, Direction.NORTH);
    expect(robot.getPosition()).toEqual({
      x: 0,
      y: 0,
      facing: Direction.NORTH,
    });
  });

  it("should ignore placement off the table", () => {
    const robot = makeRobot();
    robot.place(5, 5, Direction.NORTH);
    expect(robot.isPlaced()).toBe(false);
  });

  it("should ignore placement with negative coords", () => {
    const robot = makeRobot();
    robot.place(-1, 0, Direction.NORTH);
    expect(robot.isPlaced()).toBe(false);
  });

  it("should allow re-placement to a new valid position", () => {
    const robot = makeRobot();
    robot.place(0, 0, Direction.NORTH);
    robot.place(3, 3, Direction.EAST);
    expect(robot.getPosition()).toEqual({ x: 3, y: 3, facing: Direction.EAST });
  });

  it("should ignore invalid re-placement and retain previous position", () => {
    const robot = makeRobot();
    robot.place(1, 1, Direction.NORTH);
    robot.place(9, 9, Direction.SOUTH);
    expect(robot.getPosition()).toEqual({
      x: 1,
      y: 1,
      facing: Direction.NORTH,
    });
  });
});

describe("Robot - movement", () => {
  it("should move forward in facing direction", () => {
    const robot = makeRobot();
    robot.place(0, 0, Direction.NORTH);
    robot.move();
    expect(robot.getPosition()).toEqual({
      x: 0,
      y: 1,
      facing: Direction.NORTH,
    });
  });

  it("should not fall off the north edge", () => {
    const robot = makeRobot();
    robot.place(0, 4, Direction.NORTH);
    robot.move();
    expect(robot.getPosition()).toEqual({
      x: 0,
      y: 4,
      facing: Direction.NORTH,
    });
  });

  it("should not fall off the east edge", () => {
    const robot = makeRobot();
    robot.place(4, 0, Direction.EAST);
    robot.move();
    expect(robot.getPosition()).toEqual({ x: 4, y: 0, facing: Direction.EAST });
  });

  it("should not fall off the south edge", () => {
    const robot = makeRobot();
    robot.place(0, 0, Direction.SOUTH);
    robot.move();
    expect(robot.getPosition()).toEqual({
      x: 0,
      y: 0,
      facing: Direction.SOUTH,
    });
  });

  it("should not fall off the west edge", () => {
    const robot = makeRobot();
    robot.place(0, 0, Direction.WEST);
    robot.move();
    expect(robot.getPosition()).toEqual({ x: 0, y: 0, facing: Direction.WEST });
  });
});

describe("Robot - rotation", () => {
  it("should turn left", () => {
    const robot = makeRobot();
    robot.place(0, 0, Direction.NORTH);
    robot.turnLeft();
    expect(robot.getPosition()?.facing).toBe(Direction.WEST);
  });

  it("should turn right", () => {
    const robot = makeRobot();
    robot.place(0, 0, Direction.NORTH);
    robot.turnRight();
    expect(robot.getPosition()?.facing).toBe(Direction.EAST);
  });

  it("should not change position when turning", () => {
    const robot = makeRobot();
    robot.place(2, 3, Direction.NORTH);
    robot.turnLeft();
    const pos = robot.getPosition();
    expect(pos?.x).toBe(2);
    expect(pos?.y).toBe(3);
  });
});
