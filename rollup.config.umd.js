import babel from "rollup-plugin-babel"
import uglify from "rollup-plugin-uglify"

export default {
  entry: "./lib/sonar.js",
  format: "umd",
  moduleName: "Sonar",
  dest: "./dist/sonar.js",
  sourceMap: true,

  plugins: [
    babel(),
    uglify(),
  ],
}
