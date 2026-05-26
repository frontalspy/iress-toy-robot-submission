import { Robot } from "../model/robot/robot";
import { Table } from "../model/table/table";
import { RobotController } from "../viewmodel/controller/controller";

export function makeController() {
  const table = new Table(5, 5);
  const robot = new Robot(table);
  return new RobotController(robot);
}
