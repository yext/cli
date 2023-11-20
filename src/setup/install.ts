import { getBinWrapper } from "./bin.js";
import { getCliInstallationStatus } from "./install-stats.js";

const install = async () => {
  try {
    const bin = await getBinWrapper();
    console.log("got bin wrapper");
    await bin.run(["version"]);
    console.log("Successfully installed yext cli.");
  } catch (e) {
    console.error("Failed to install the yext cli");
  } finally {
    const cliInstallationStatus = await getCliInstallationStatus();
    console.log(cliInstallationStatus);
  }
};

await install();
