import babel from "rollup-plugin-babel"
import nodeResolve from "rollup-plugin-node-resolve"
import cleanup from "rollup-plugin-cleanup"

export default {
  entry: "./lib/sonar.js",
  format: "es",
  dest: "./dist/sonar.es.js",
  sourceMap: true,

  plugins: [
    babel(),
    nodeResolve({
      module: false,
      jsnext: true,
      main: false,
    }),
    cleanup({
      comments: "none",
      maxEmptyLines: 1,
    }),
  ],
}
