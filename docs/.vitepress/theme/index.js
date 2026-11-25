import DefaultTheme from "vitepress/theme"
import { enhanceAppWithComponentView } from 'vitepress-plugin-component/client'
import { createI18n } from "petite-vue-i18n"
import "./custom.css"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(createI18n({
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      messages: {},
    }))
    enhanceAppWithComponentView(app)
  }
}
