import babel from "rollup-plugin-babel"
import cleanup from "rollup-plugin-cleanup"

export default {
  entry: "./lib/sonar.js",
  format: "es",
  dest: "./dist/sonar.es.js",
  sourceMap: true,

  plugins: [
    babel(),
    cleanup({
      comments: "none",
      maxEmptyLines: 1,
    }),
  ],
}
