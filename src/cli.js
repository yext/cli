#!/usr/bin/env node
"use strict";

import { spawn } from "child_process";
import binPromise from "../index.js";

(async function () {
  const bin = await binPromise;
  const input = process.argv.slice(2);
  spawn(bin, input, { stdio: "inherit" }).on("exit", process.exit);
})();
