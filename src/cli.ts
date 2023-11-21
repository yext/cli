#!/usr/bin/env node
"use strict";

import { install } from "./install.js";
import minimist, { ParsedArgs } from "minimist";
import { runExecutable } from "./run-executable.js";

// This file is only necessary to support /install.js

const parsedArgv: ParsedArgs = minimist(process.argv.slice(2));

if (parsedArgv._[0] === "install") {
  install();
} else {
  runExecutable(process.argv.slice(2), process.cwd()).catch((err: any) => {
    console.error(err);
    process.exit(1);
  });
}
