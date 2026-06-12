import { describe, test, expect, vi } from "vitest"
import * as JskosVue from "../src/index.js"
import * as components from "../src/components/index.js"

function mockApp() {
  const app = {
    component: vi.fn(),
    use: vi.fn(plugin => plugin.install(app)),
  }
  return app
}

describe("install plugins", () => {
  test("individual component install(app)", () => {
    const app = mockApp()

    JskosVue.ItemName.install(app)

    expect(app.component).toHaveBeenCalledWith("ItemName", JskosVue.ItemName)
  })

  test("package install(app)", () => {
    const app = mockApp()

    JskosVue.install(app)

    expect(app.use).toHaveBeenCalledTimes(Object.keys(components).length)
    expect(app.component).toHaveBeenCalledTimes(Object.keys(components).length)
    expect(app.component).toHaveBeenCalledWith("ItemName", JskosVue.ItemName)
    expect(app.component).toHaveBeenCalledWith("ItemSuggest", JskosVue.ItemSuggest)
  })
})
