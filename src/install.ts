import BinWrapper from "bin-wrapper";
import { rimrafSync } from "rimraf";
import { getCliInstallationStatus } from "./installStatus.js";
import { rootPackageJson } from "root-package-json";
import { config } from "./config.js";
import pc from "picocolors";
import { Spinner } from "cli-spinner";
import path from "node:path";

export const install = async () => {
  const cliInstallationStatus = await getCliInstallationStatus();
  let yextCliVersion = cliInstallationStatus.latestVersion;
  try {
    const rootPackage = await rootPackageJson();
    const packageJson = rootPackage?.packageJson as any;
    yextCliVersion = packageJson?.yextCliVersion ?? "";
  } catch (ignored) {}

  // if there's a version defined in package.json, honor it
  let installing = false;
  const pathToExecutable = path.join(config.destination, config.binName);
  if (yextCliVersion) {
    if (yextCliVersion !== cliInstallationStatus.currentVersion) {
      rimrafSync(pathToExecutable);
      installing = true;
    }
  } else if (
    // if no version defined, auto-update to the latest
    cliInstallationStatus.currentVersion !== cliInstallationStatus.latestVersion
  ) {
    rimrafSync(pathToExecutable);
    installing = true;
  }

  if (!installing) {
    return;
  }

  var spinner = new Spinner("Installing Yext CLI...");
  spinner.setSpinnerString(18);
  spinner.start();

  const version = yextCliVersion ? `/${yextCliVersion}` : "";

  const installer = new BinWrapper()
    .src(`${config.baseUrl}${version}/mac/yext`, "darwin", "x64")
    .src(`${config.baseUrl}${version}/linux/yext`, "linux", "x64")
    .src(`${config.baseUrl}${version}/windows/yext`, "windows", "x64")
    .dest(config.destination)
    .use(config.binName);

  try {
    await installer.run(["version"]);

    spinner.stop();
    console.log("\n");
    const cli = await getCliInstallationStatus();
    if (cli.currentVersion === cli.latestVersion) {
      console.log(
        pc.cyan(`Installed latest Yext CLI version: ${cli.currentVersion}`)
      );
    } else {
      console.log(pc.cyan(`Installed Yext CLI version: ${cli.currentVersion}`));
      console.log(pc.yellow(`Latest Yext CLI version: ${cli.latestVersion}`));
    }
  } catch (err: any) {
    spinner.stop();
    console.log("\n");
    console.log(pc.red(`Error installing Yext CLI version: ${yextCliVersion}`));
    process.exit(1);
  }
};
