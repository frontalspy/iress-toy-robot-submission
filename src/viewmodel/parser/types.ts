import { Direction } from "../../model/directions";

export type ParsedCommand =
  | { type: "PLACE"; x: number; y: number; facing: Direction }
  | { type: "MOVE" }
  | { type: "LEFT" }
  | { type: "RIGHT" }
  | { type: "REPORT" };
