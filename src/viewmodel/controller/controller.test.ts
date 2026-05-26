import { Direction } from "../../model/directions";
import { makeController } from "./mockController";

describe("RobotController — pre-placement", () => {
  it("should ignore MOVE before PLACE", () => {
    const controller = makeController();
    expect(controller.execute({ type: "MOVE" })).toBeNull();
  });

  it("should ignore LEFT before PLACE", () => {
    expect(makeController().execute({ type: "LEFT" })).toBeNull();
  });

  it("should ignore RIGHT before PLACE", () => {
    expect(makeController().execute({ type: "RIGHT" })).toBeNull();
  });

  it("should ignore REPORT before PLACE", () => {
    expect(makeController().execute({ type: "REPORT" })).toBeNull();
  });
});

describe("RobotController — spec examples", () => {
  it("should report 0,1,NORTH given PLACE 0,0,NORTH → MOVE", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 0, y: 0, facing: Direction.NORTH });
    controller.execute({ type: "MOVE" });
    expect(controller.execute({ type: "REPORT" })).toBe("0,1,NORTH");
  });

  it("should report 0,0,WEST given PLACE 0,0,NORTH → LEFT", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 0, y: 0, facing: Direction.NORTH });
    controller.execute({ type: "LEFT" });
    expect(controller.execute({ type: "REPORT" })).toBe("0,0,WEST");
  });

  it("should report 3,3,NORTH given PLACE 1,2,EAST → MOVE → MOVE → LEFT → MOVE", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 1, y: 2, facing: Direction.EAST });
    controller.execute({ type: "MOVE" });
    controller.execute({ type: "MOVE" });
    controller.execute({ type: "LEFT" });
    controller.execute({ type: "MOVE" });
    expect(controller.execute({ type: "REPORT" })).toBe("3,3,NORTH");
  });
});

describe("RobotController — boundary protection", () => {
  it("should not fall off north edge", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 0, y: 4, facing: Direction.NORTH });
    controller.execute({ type: "MOVE" });
    expect(controller.execute({ type: "REPORT" })).toBe("0,4,NORTH");
  });

  it("should not fall off south edge", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 0, y: 0, facing: Direction.SOUTH });
    controller.execute({ type: "MOVE" });
    expect(controller.execute({ type: "REPORT" })).toBe("0,0,SOUTH");
  });

  it("should not fall off east edge", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 4, y: 0, facing: Direction.EAST });
    controller.execute({ type: "MOVE" });
    expect(controller.execute({ type: "REPORT" })).toBe("4,0,EAST");
  });

  it("should not fall off west edge", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 0, y: 0, facing: Direction.WEST });
    controller.execute({ type: "MOVE" });
    expect(controller.execute({ type: "REPORT" })).toBe("0,0,WEST");
  });

  it("should ignore off-table PLACE and subsequent commands", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 9, y: 9, facing: Direction.NORTH });
    expect(controller.execute({ type: "REPORT" })).toBeNull();
  });
});

describe("RobotController — multiple PLACE commands", () => {
  it("should override first position with second valid PLACE", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 0, y: 0, facing: Direction.NORTH });
    controller.execute({ type: "PLACE", x: 3, y: 3, facing: Direction.SOUTH });
    expect(controller.execute({ type: "REPORT" })).toBe("3,3,SOUTH");
  });

  it("should retain previous position when second PLACE is invalid", () => {
    const controller = makeController();
    controller.execute({ type: "PLACE", x: 1, y: 1, facing: Direction.EAST });
    controller.execute({ type: "PLACE", x: -1, y: 0, facing: Direction.NORTH });
    expect(controller.execute({ type: "REPORT" })).toBe("1,1,EAST");
  });
});
