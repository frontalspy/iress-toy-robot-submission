import { Direction, Position } from "./types";

const LEFT_ROTATION: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.WEST,
  [Direction.WEST]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.EAST,
  [Direction.EAST]: Direction.NORTH,
};

const RIGHT_ROTATION: Record<Direction, Direction> = {
  [Direction.NORTH]: Direction.EAST,
  [Direction.EAST]: Direction.SOUTH,
  [Direction.SOUTH]: Direction.WEST,
  [Direction.WEST]: Direction.NORTH,
};

const MOVE_DELTA: Record<Direction, { dx: number; dy: number }> = {
  [Direction.NORTH]: { dx: 0, dy: 1 },
  [Direction.EAST]: { dx: 1, dy: 0 },
  [Direction.SOUTH]: { dx: 0, dy: -1 },
  [Direction.WEST]: { dx: -1, dy: 0 },
};

export function rotateLeft(direction: Direction): Direction {
  return LEFT_ROTATION[direction];
}

export function rotateRight(direction: Direction): Direction {
  return RIGHT_ROTATION[direction];
}

export function getNextPosition(position: Position): { x: number; y: number } {
  const { dx, dy } = MOVE_DELTA[position.facing];
  return { x: position.x + dx, y: position.y + dy };
}
