import { CommandParser } from "./parser";
import { Direction } from "../types/types";

describe("CommandParser — PLACE", () => {
  const parser = new CommandParser();

  it("should parse a valid PLACE command", () => {
    expect(parser.parse("PLACE 1,2,NORTH")).toEqual({
      type: "PLACE",
      x: 1,
      y: 2,
      facing: Direction.NORTH,
    });
  });

  it("should parse arguments case-insensitively", () => {
    expect(parser.parse("place 0,0,east")).toEqual({
      type: "PLACE",
      x: 0,
      y: 0,
      facing: Direction.EAST,
    });
  });

  it("should return null for PLACE with missing args", () => {
    expect(parser.parse("PLACE")).toBeNull();
  });

  it("should return null for PLACE with wrong arg count", () => {
    expect(parser.parse("PLACE 1,2")).toBeNull();
  });

  it("should return null for PLACE with invalid direction", () => {
    expect(parser.parse("PLACE 1,2,UP")).toBeNull();
  });

  it("should return null for PLACE with non-numeric coords", () => {
    expect(parser.parse("PLACE abc,2,NORTH")).toBeNull();
  });

  it("should parse negative coordinates (rejected by table)", () => {
    expect(parser.parse("PLACE -1,0,NORTH")).toEqual({
      type: "PLACE",
      x: -1,
      y: 0,
      facing: Direction.NORTH,
    });
  });
});

describe("CommandParser — simple commands", () => {
  const parser = new CommandParser();

  it.each(["MOVE", "LEFT", "RIGHT", "REPORT"])("should parse %s", (cmd) => {
    expect(parser.parse(cmd)).toEqual({ type: cmd });
  });

  it("should be case-insensitive for simple commands", () => {
    expect(parser.parse("move")).toEqual({ type: "MOVE" });
  });

  it("should return null for unknown commands", () => {
    expect(parser.parse("JUMP")).toBeNull();
  });

  it("should return null for empty input", () => {
    expect(parser.parse("")).toBeNull();
  });

  it("should return null for whitespace-only input", () => {
    expect(parser.parse("   ")).toBeNull();
  });
});
