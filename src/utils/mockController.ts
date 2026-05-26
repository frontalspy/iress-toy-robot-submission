import { Robot } from "../model/robot";
import { Table } from "../model/table";
import { RobotController } from "../viewmodel/controller";

export function makeController() {
  const table = new Table(5, 5);
  const robot = new Robot(table);
  return new RobotController(robot);
}
