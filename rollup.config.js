import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs"
  },
  external: ['style-to-object'],
  plugins: [
    json(),
    terser()
  ]
};
