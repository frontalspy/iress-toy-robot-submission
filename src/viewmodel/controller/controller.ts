import { IController } from "./types";
import { IRobot } from "../../model/robot/";
import { ParsedCommand } from "../parser/";

export class RobotController implements IController {
  constructor(private readonly robot: IRobot) {}

  execute(command: ParsedCommand): string | null {
    if (command.type === "PLACE") {
      this.robot.place(command.x, command.y, command.facing);
      return null;
    }

    if (!this.robot.isPlaced()) {
      return null;
    }

    switch (command.type) {
      case "MOVE":
        this.robot.move();
        return null;
      case "LEFT":
        this.robot.turnLeft();
        return null;
      case "RIGHT":
        this.robot.turnRight();
        return null;
      case "REPORT": {
        const pos = this.robot.getPosition()!;
        return `${pos.x},${pos.y},${pos.facing}`;
      }
      default:
        return null;
    }
  }
}
