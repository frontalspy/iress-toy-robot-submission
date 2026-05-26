import { Direction, ParsedCommand } from "./types";

const SIMPLE_COMMANDS = new Set(["MOVE", "LEFT", "RIGHT", "REPORT"]);
const VALID_DIRECTIONS = new Set<string>(Object.values(Direction));

function isIntegerString(s: string): boolean {
  return s.length > 0 && Number.isInteger(Number(s));
}

function isValidDirection(s: string): s is Direction {
  return VALID_DIRECTIONS.has(s);
}

function parsePlaceArgs(
  args: string,
): { x: number; y: number; facing: Direction } | null {
  const parts = args.split(",");
  if (parts.length !== 3) return null;

  const [xStr, yStr, facingStr] = parts.map((p) => p.trim());

  if (!isIntegerString(xStr) || !isIntegerString(yStr)) return null;
  if (!isValidDirection(facingStr)) return null;

  return {
    x: parseInt(xStr, 10),
    y: parseInt(yStr, 10),
    facing: facingStr,
  };
}

export class CommandParser {
  parse(line: string): ParsedCommand | null {
    const trimmed = line.trim().toUpperCase();

    if (trimmed.startsWith("PLACE ")) {
      const args = trimmed.slice(6).trim();
      const placeArgs = parsePlaceArgs(args);
      if (!placeArgs) return null;
      return { type: "PLACE", ...placeArgs };
    }

    if (SIMPLE_COMMANDS.has(trimmed)) {
      return { type: trimmed } as ParsedCommand;
    }

    return null;
  }
}
