import { createApp } from "vue"
import * as JskosVue from "."

const appModule = import.meta.env.DEV
  ? import("./App2.vue")
  : import("./App.vue")

appModule.then(({ default: App }) => {
  createApp(App).use(JskosVue).mount("#app")
})
