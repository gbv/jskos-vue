import * as components from "./components/index.js"

// Add install() to each component export (Vue 3: app.component)
for (const [exportName, mod] of Object.entries(components)) {
  const component = mod?.default ?? mod
  if (!component || typeof component !== "object") {
    continue
  }

  const name = component.name || component.__name || exportName
  if (!name) {
    continue
  }

  if (!component.install) {
    component.install = (app) => {
      app.component(name, component)
    }
  }
}

// Main plugin install: installs all components
export const install = (app) => {
  for (const mod of Object.values(components)) {
    const c = mod?.default ?? mod
    if (c?.install) {
      app.use(c)
    }
  }
}

export * from "./components"

// Shared CSS
import "./shared.css"

// Export utils as utils
export * as utils from "./utils.js"
