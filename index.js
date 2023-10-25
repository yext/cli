"use strict";
const bin = import("./src/setup/bin.js");

export default bin.then((b) => b.default(process.cwd()).path());
