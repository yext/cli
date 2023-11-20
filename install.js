import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

(async () => {
    if (fs.existsSync(path.resolve("dist/setup"))) {
        spawnSync("node", [path.resolve("dist/setup/install")], {
            encoding: "utf-8",
            stdio: "inherit"
        });
    }
})();