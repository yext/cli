import { spawnSync } from "node:child_process";
import path from "node:path";
import { config } from "./config.js";

export const getCliInstallationStatus = async () => {
  try {
    const pathToExecutable = path.join(config.destination, config.binName);
    const yextCliLogs = spawnSync(pathToExecutable, ["version"], {
      encoding: "utf-8",
    }).stdout;
    const currentVersion = extractVersion(yextCliLogs, "current");
    const latestVersion = extractVersion(yextCliLogs, "latest");
    return {
      installed: true,
      currentVersion: currentVersion,
      latestVersion: latestVersion ?? currentVersion,
    };
  } catch (ignored) {
    return {
      installed: false,
      currentVersion: null,
      latestVersion: null,
    };
  }
};

const CURRENT_VERSION_REGEX = /Yext CLI Version: (\d+\.\d+_\d+)/;
const LATEST_VERSION_REGEX = /Top version: (\d+\.\d+_\d+)/;

const extractVersion = (yextCliLogs: string, version: "current" | "latest") => {
  switch (version) {
    case "current": {
      const match = yextCliLogs.match(CURRENT_VERSION_REGEX);
      return match ? match[1] : null;
    }
    case "latest": {
      const match = yextCliLogs.match(LATEST_VERSION_REGEX);
      return match ? match[1] : null;
    }
    default:
      throw new Error(`Cannot find version of ${version}`);
  }
};
