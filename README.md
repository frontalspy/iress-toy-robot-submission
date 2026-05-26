### How to run

```bash
npm install
npm start   # interactive CLI — type one command per line and press Enter
npm test    # runs the test suite
```

Commands are read one per line from stdin.

**Example:**

```
PLACE 0,0,NORTH
MOVE
REPORT
0,1,NORTH
```

### Commands

| Command | Description |
|---|---|
| `PLACE X,Y,DIRECTION` | Place the robot at position (X, Y) facing NORTH, SOUTH, EAST, or WEST |
| `MOVE` | Move the robot one unit forward in the direction it is facing until it hits the edge |
| `LEFT` | Rotate the robot 90° to the left without moving |
| `RIGHT` | Rotate the robot 90° to the right without moving |
| `REPORT` | Print the robot's current position and facing direction |

### Architecture

Code is organised into four layers with each subfolder domain having a single responsibility:

- `model/` — pure domain set up and objects for main entities in the app, with their own types and feature level barrel exports
- `viewmodel/` — data orchestration and input parsing
- `view/` — input layer that reads user input via CLI
- tests are stored next to their relative file for easy access


Detecting rotation

Direction rotation uses two rotations (`LEFT_ROTATION`, `RIGHT_ROTATION`) keyed by `Direction`. The `Direction` enum double as their REPORT output strings with no extra mapping.

### Trade-offs

No input batching

Lines are processed one at a time as they arrive rather than buffered and replayed. This keeps the I/O layer simple and matches the interactive use-case, but means there is no way to replay a previous run's input without piping a file.

### Suggested improvements

- Configurable board size — accept board size as CLI arguments
- Structured error reporting — more error handling and better error messaging to users
- E2E tests — add integration tests that drive the full pipeline through `processLines` with a mock stdin to cover multi-command sequences end-to-end.
- Visualation of the robot and board - show a visual representation of the board and robots current position to make it easier for users to better determine future commands.
