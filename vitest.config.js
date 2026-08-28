import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-flexible-table": resolve(__dirname) + "/node_modules/vue-flexible-table/dist/vue-flexible-table.js",
    },
  },    
  test: {
    globals: true,
    environment: "happy-dom",
  },
})
