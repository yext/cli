import { install } from "./install.js";
import { runExecutable } from "./run-executable.js";

export type CliOptions = {
  cwd: string;
};

export const yextCli = {
  /**
   * Runs a Yext CLI command with any additional arguments.
   */
  async command(
    cmd: string,
    args: string[] = [],
    options: CliOptions = { cwd: process.cwd() }
  ) {
    await install();
    return runExecutable([cmd, ...args], options.cwd);
  },
};
