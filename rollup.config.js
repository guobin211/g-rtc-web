import path from "path"
import rollupTypescript from "rollup-plugin-typescript2"
import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import { DEFAULT_EXTENSIONS } from "@babel/core"
import pkg from "./package.json"

const paths = {
  input: path.join(__dirname, "/packages/rtc-client/src/index.ts"),
  output: path.join(__dirname, "/packages/rtc-client/dist")
}
// rollup 配置项
const rollupConfig = {
  input: paths.input,
  output: [
    // 输出 commonjs 规范的代码
    {
      file: path.join(paths.output, "index.js"),
      format: "cjs",
      name: pkg.name
    },
    // 输出 es 规范的代码
    {
      file: path.join(paths.output, "index.esm.js"),
      format: "es",
      name: pkg.name
    }
  ],
  // external: ['lodash']
  // plugins 需要注意引用顺序
  plugins: [
    commonjs(),
    // 配合 commnjs 解析第三方模块
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    }),
    rollupTypescript({ useTsconfigDeclarationDir: true }),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: "node_modules/**",
      // babel 默认不支持 ts 需要手动添加
      extensions: [
        ...DEFAULT_EXTENSIONS,
        ".ts"
      ]
    })
  ]
}
export default rollupConfig
