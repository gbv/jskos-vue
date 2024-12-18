import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

/**
 * Allow two different builds:
 * - `npm run build` builds the library
 * - `BUILD_MODE=app npm run build` builds the app (App.vue)
 *
 * Note that the destination folder `dist` will be emptied before each build.
 */
let build
if (process.env.BUILD_MODE !== "app") {
  build = {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "JskosVue",
      cssFileName: "style",
    },
    rollupOptions: {
      external: ["vue", "jskos-tools", "jskos-vue-tabs", "vue-scrollto", "cocoda-sdk"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
          "jskos-tools": "jskos",
          "jskos-vue-tabs": "JskosVueTabs",
          "vue-scrollto": "VueScrollTo",
          "cocoda-sdk": "cdk",
        },
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build,
})
