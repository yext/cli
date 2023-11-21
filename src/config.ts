import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  baseUrl: "https://yext-cli-pub.s3.amazonaws.com/cli",
  destination: path.join(__dirname, "..", "vendor"),
  binName: process.platform === "win32" ? "yext.exe" : "yext",
};
