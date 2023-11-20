import BinWrapper from "bin-wrapper";
import path, { dirname, join } from "node:path";
import { fileURLToPath } from "url";
import fs from "node:fs";
import { rimrafSync } from "rimraf";
import { getCliInstallationStatus } from "./install-stats.js";
import { rootPackageJson } from "root-package-json";

const baseUrl = `https://yext-cli-pub.s3.amazonaws.com/cli`;
const directory = dirname(fileURLToPath(import.meta.url));
const vendorDest = join(directory, "../vendor");

export const getBinWrapper = async () => {
  const cliInstallationStatus = await getCliInstallationStatus();
  let yextCliVersion = cliInstallationStatus.latestVersion;
  try {
    const rootPackage = await rootPackageJson();
    const packageJson = rootPackage?.packageJson as any;

    yextCliVersion = packageJson?.yextCliVersion ?? "";
  } catch (ignored) {
    console.log("Cannot find package.json");
  }

  console.log("yextCliVersion", yextCliVersion);

  // if there's a version defined in package.json, honor it
  if (yextCliVersion) {
    if (yextCliVersion != cliInstallationStatus.currentVersion) {
      console.log("package versions don't match");
      rimrafSync("vendor");
    }
  } else if (
    // if no version defined, auto-update to the latest
    cliInstallationStatus.currentVersion !== cliInstallationStatus.latestVersion
  ) {
    console.log("not at latest and no package version defined");
    rimrafSync("vendor");
  }

  const version = yextCliVersion ? `/${yextCliVersion}` : "";

  console.log("returning wrapper");
  return new BinWrapper()
    .src(`${baseUrl}${version}/mac/yext`, "darwin", "x64")
    .src(`${baseUrl}${version}/linux/yext`, "linux", "x64")
    .src(`${baseUrl}${version}/windows/yext`, "windows", "x64")
    .dest("vendor")
    .use(`yext`);
};
