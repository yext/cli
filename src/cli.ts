#!/usr/bin/env node
"use strict";

import { spawnSync, spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "url";
import { getBinWrapper } from "./setup/bin.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const yextCliPath = path.resolve(__dirname, "../", "vendor/yext");
export const packageJsonPath = path.join(process.cwd(), "package.json");

// export const yextCli = () => {
//   // const binPath = bin(process.cwd()).path();

//   console.log("runCli");
//   // const bin = (await import("./setup/bin.js")) as any;
//   // console.log("bin", bin);
//   // const binWrapper = await bin.getBinWrapper();
//   // console.log(binWrapper);
//   // const binPath2 = await binWrapper(process.cwd()).path();
//   // console.log(binPath2);

//   // const binPath = bin.then(async (b: any) => {
//   //   const binWrapper = await b.getBinWrapper();
//   //   const binPath = await binWrapper(process.cwd()).path();
//   //   const input = process.argv.slice(2);
//   //   return spawn(binPath, input, { stdio: "inherit" }).on("exit", process.exit);
//   // });

//   getBinWrapper().then((binWrapper) => {
//     binWrapper(process.cwd())
//       .path()
//       .then((binPath: string) => {
//         const input = process.argv.slice(2);
//         spawn(binPath, input, { stdio: "inherit" }).on("exit", process.exit);
//       });
//   });
//   // const binPath = await binWrapper(process.cwd()).path();
//   // const input = process.argv.slice(2);
//   // return spawn(binPath, input, { stdio: "inherit" });
// };

// await runCli();
