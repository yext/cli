import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src"],
  clean: true,
  format: ["esm"],
  dts: true,
  bundle: false,
  minify: false,
});
