import { processLines } from "./input";
import { CommandParser } from "./parser";
import { RobotController } from "./controller";
import { Robot } from "./robot";
import { Table } from "./table";

async function main(): Promise<void> {
  const table = new Table(5, 5);
  const robot = new Robot(table);
  const controller = new RobotController(robot);
  const parser = new CommandParser();
  console.log("wow");

  await processLines((line) => {
    console.log("PARSING");
    const command = parser.parse(line);
    if (!command) {
      console.warn(`Invalid command`);
      return;
    }

    const output = controller.execute(command);
    if (output !== null) {
      console.log(output);
    }
  });
}

main();
