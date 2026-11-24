import { afterEach, beforeEach, test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import * as jskos from "jskos-tools"
import { createI18n } from "petite-vue-i18n"
import { ItemName } from "../src/index.js"

const multilingualItem = {
  uri: "https://example.org/item",
  prefLabel: { en: "English", de: "Deutsch", es: "Español" },
}

const mountItemName = (props = {}, locale = null) => mount(ItemName, {
  props: { item: multilingualItem, ...props },
  global: {
    plugins: locale ? [createI18n({ legacy: false, locale, messages: {} })] : [],
  },
})

let languagePreference

beforeEach(() => {
  languagePreference = {
    defaults: jskos.languagePreference.defaults,
    path: jskos.languagePreference.path,
    store: jskos.languagePreference.store,
  }
  jskos.languagePreference.defaults = ["en"]
  jskos.languagePreference.path = ""
  jskos.languagePreference.store = null
})

afterEach(() => {
  Object.assign(jskos.languagePreference, languagePreference)
})

test("explicit language prop takes precedence", () => {
  jskos.languagePreference.store = { languages: ["de"] }
  jskos.languagePreference.path = "languages"

  const wrapper = mountItemName({ language: "en" }, "es")

  expect(wrapper.text()).toContain("English")
  expect(wrapper.text()).not.toContain("Deutsch")
  expect(wrapper.text()).not.toContain("Español")
})

test("content preferences take precedence over Vue I18n", () => {
  jskos.languagePreference.store = { languages: ["de"] }
  jskos.languagePreference.path = "languages"

  const wrapper = mountItemName({}, "es")

  expect(wrapper.text()).toContain("Deutsch")
  expect(wrapper.text()).not.toContain("Español")
})

test("uses Vue I18n when no content preference was configured", () => {
  const wrapper = mountItemName({}, "de")

  expect(wrapper.text()).toContain("Deutsch")
  expect(wrapper.text()).not.toContain("English")
})

test("keeps the existing behavior without Vue I18n", () => {
  const wrapper = mountItemName()

  expect(wrapper.text()).toContain("English")
})

test("ItemName", async () => {
  const notation = "123"
  const en = "Test Item"
  const item = {
    uri: "test:item",
    prefLabel: { en },
    notation: [notation],
  }

  const processedLabel = `${en}!`
  const processedNotation = `:${notation}`

  ItemName.addLabelPlugin(label => `${label}!`)
  ItemName.addNotationPlugin(notation => `:${notation}`)

  const wrapper = mount(ItemName, { props: { item } })

  expect(wrapper.text()).toContain(notation)
  expect(wrapper.text()).toContain(processedLabel)
  expect(wrapper.classes()).toContain("jskos-vue-itemName")

  const notationSpan = wrapper.find(".jskos-vue-itemName-notation")
  expect(notationSpan.exists()).toBe(true)
  expect(notationSpan.text()).toBe(processedNotation)

  await wrapper.setProps({ showNotation: false })
  expect(wrapper.text()).not.toContain(notation)
  expect(wrapper.text()).toBe(processedLabel)

  await wrapper.setProps({ showNotation: true, showLabel: false })
  expect(wrapper.text()).toBe(processedNotation)

  await wrapper.setProps({ showNotation: false, showLabel: false })
  expect(wrapper.text()).toBe("???")

  await wrapper.setProps({ fallbackLabel: "Nothing here" })
  expect(wrapper.text()).toBe("Nothing here")

  await wrapper.setProps({ clickable: true })
  expect(wrapper.classes()).toContain("jskos-vue-clickable")
})
