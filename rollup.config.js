import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default {
  input: "./src/index.ts",
  output: {
    format: "cjs",
    file: pkg.main,
  },
  external: [...Object.keys(pkg.peerDependencies)],
  plugins: [typescript(), terser()],
};
