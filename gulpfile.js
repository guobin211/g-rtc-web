const gulp = require("gulp")
const rollup = require("rollup")
const rollupTypescript = require("rollup-plugin-typescript2")
const path = require("path")
import pkg from "./package.json"

console.log(pkg.version)

const RTC_CLIENT = {
  name: "rtc-client",
  rootDir: path.resolve(__dirname, "packages/rtc-client/"),
  entryFile: path.resolve(__dirname, "packages/rtc-client/src/index.ts"),
  bundleDir: path.resolve(__dirname, "packages/rtc-client/dist"),
  tsconfig: path.resolve(__dirname, "packages/rtc-client/tsconfig.json")
}

gulp.task("build-client", async function () {
  const bundle = await rollup.rollup({
    input: RTC_CLIENT.entryFile,
    plugins: [
      rollupTypescript({
        tsconfig: RTC_CLIENT.tsconfig
      })
    ]
  })
  // For both browsers and Node.js
  await bundle.write({
    file: `${RTC_CLIENT.bundleDir}/${RTC_CLIENT.name}.umd.js`,
    format: "umd",
    name: `${RTC_CLIENT.name}`,
    sourcemap: true
  })
  // For Node.js
  await bundle.write({
    file: `${RTC_CLIENT.bundleDir}/${RTC_CLIENT.name}.cjs.js`,
    format: "cjs",
    name: `${RTC_CLIENT.name}`,
    sourcemap: true
  })
  // For browsers
  await bundle.write({
    file: `${RTC_CLIENT.bundleDir}/${RTC_CLIENT.name}.iife.js`,
    format: "iife",
    name: `${RTC_CLIENT.name}`,
    sourcemap: true,
    extend: true
  })
  // For AMD
  await bundle.write({
    file: `${RTC_CLIENT.bundleDir}/${RTC_CLIENT.name}.amd.js`,
    format: "amd",
    name: `${RTC_CLIENT.name}`,
    sourcemap: true
  })

  await bundle.write({
    file: `${RTC_CLIENT.bundleDir}/${RTC_CLIENT.name}.esm.js`,
    format: "esm",
    name: `${RTC_CLIENT.name}`,
    sourcemap: true
  })
})
