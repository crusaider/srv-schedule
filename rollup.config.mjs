import typescript from "@rollup/plugin-typescript";

import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import path from "path";

// Get the directory of the current module file
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the package.json file
const pkg = JSON.parse(
  await fs.readFile(path.resolve(__dirname, "./package.json"), "utf-8"),
);

export default {
  input: "src/index.ts",

  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/bundle.esm.js",
      format: "esm",
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],

  plugins: [
    typescript({
      exclude: ["**/*.test.ts"],
    }),
  ],
};
