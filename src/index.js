import * as components from "./components"

export const messages = { en: {}, de: {} }

// Add install method to individual components
for (let component of Object.values(components)) {
  if (!component.install) {
    component.install = (vue) => {
      vue.component(component.name, component)
    }
  }
  Object.entries(component.messages||{}).forEach(([lang,msg]) => {
    Object.assign(messages[lang], msg)
  })
}

// Install method so that it can be used as a plugin.
export const install = (vue) => {
  for (let key in components) {
    vue.use(components[key])
  }
}

export * from "./components"

// Shared CSS
import "./shared.css"

// Export utils as utils
export * as utils from "./utils"
