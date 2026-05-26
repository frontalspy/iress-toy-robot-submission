import { ParsedCommand } from "../parser/types";

export interface IController {
  execute(command: ParsedCommand): string | null;
}
