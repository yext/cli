// This appends addtional_third-party-content.txt to the end of the
// generated THIRD-PARTY-NOTICES.
// Once generate-license-file fully supports this as a non-beta config option
// (and works with pnpm), this script can be removed.

import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const THIRD_PARTY_NOTICES = "THIRD-PARTY-NOTICES";
const ADDITIONAL_CONTENT = "additional-third-party-content.txt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve("..", __dirname);

const additionalContent = fs.readFileSync(path.resolve(__dirname, "..", ADDITIONAL_CONTENT));
fs.appendFileSync(path.resolve(__dirname, "..", THIRD_PARTY_NOTICES), additionalContent);