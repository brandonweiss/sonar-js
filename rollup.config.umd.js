import babel from "rollup-plugin-babel"
import nodeResolve from "rollup-plugin-node-resolve"
import uglify from "rollup-plugin-uglify"

export default {
  entry: "./lib/sonar.js",
  format: "umd",
  moduleName: "Sonar",
  dest: "./dist/sonar.js",
  sourceMap: true,

  plugins: [
    babel({
      babelrc: false,
      presets: ["es2015-rollup"],
    }),
    nodeResolve({
      module: false,
      jsnext: true,
      main: false,
    }),
    uglify(),
  ],
}
