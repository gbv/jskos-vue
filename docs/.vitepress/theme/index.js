import DefaultTheme from "vitepress/theme"
import { enhanceAppWithComponentView } from 'vitepress-plugin-component/client'
import "./custom.css"

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithComponentView(app)
  }
}
