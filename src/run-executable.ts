import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { config } from "./config.js";

/**
 * Spawns a child process to run the Yext CLI executable with given arguments.
 */
export const runExecutable = (args: string[], cwd: string): Promise<void> => {
  //   const logger = require("./logger")(logLevel);
  return new Promise((resolve, reject) => {
    let errors = "";

    const pathToExecutable = path.join(config.destination, config.binName);
    // is this necessary?
    fs.statSync(pathToExecutable);

    const childProcess = spawn(pathToExecutable, args, {
      cwd,
      stdio: ["inherit", "inherit", "pipe"],
    });

    childProcess.on("error", (err) => {
      errors += err;
      console.error(err.message);
    });

    childProcess.stderr.on("data", (err) => {
      errors += err;
      console.error(err.message);
    });

    childProcess.on("close", () => {
      if (errors) {
        reject(errors);
      }
      resolve();
    });
  });
};
