import * as readline from "readline";

export async function processLines(
  handler: (line: string) => void,
): Promise<void> {
  const rl = readline.createInterface({ input: process.stdin });
  return new Promise((resolve) => {
    rl.on("line", handler);
    rl.on("close", resolve);
  });
}
