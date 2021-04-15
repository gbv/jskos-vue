import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.js"),
      name: "JskosVue",
    },
    rollupOptions: {
      external: ["vue", "jskos-tools"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "jskos-tools": "jskos",
        },
      },
    },
  },
})
