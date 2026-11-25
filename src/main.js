import { createApp } from "vue"
import { createI18n } from "petite-vue-i18n"
import App from "./App.vue"

import * as JskosVue from "."

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {},
})

createApp(App).use(i18n).use(JskosVue).mount("#app")
