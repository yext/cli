import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

// This file is only necessary for a postinstall `"postinstall": "node install",`.
// It cannot be compiled because it needs to always be available, even before a
// build occurs.
(async () => {
    if (fs.existsSync(path.resolve("dist"))) {
        spawnSync("node", [path.resolve("dist/cli"), "install"], {
            encoding: "utf-8",
            stdio: "inherit"
        });
    }
})();