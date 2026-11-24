import { afterEach, beforeEach, test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { reactive } from "vue"
import * as jskos from "jskos-tools"
import { LicenseInfo } from "../src/index.js"
import { createI18n } from "petite-vue-i18n"

const license = {
  uri: "http://unknown-license.org",
  prefLabel: { en: "free", de: "frei", es: "libre" },
}

const mountComponent = (i18n, item = { license: [license] }) => mount(LicenseInfo, {
  props: { item },
  global: { plugins: [i18n] },
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

test("Supported languages", async () => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    messages: { es: { license: "Licencia" } },
  })

  const wrapper = mountComponent(i18n)

  // translation from component, content language default
  expect(wrapper.find("a").attributes("title")).toBe("License: free")

  // translation from component, content language respected
  i18n.global.locale.value = "de"
  await wrapper.vm.$nextTick()
  expect(wrapper.find("a").attributes("title")).toBe("Lizenz: frei")

  // translation from global, content language respected
  i18n.global.locale.value = "es"
  await wrapper.vm.$nextTick()
  expect(wrapper.find("a").attributes("title")).toBe("Licencia: libre")
})

test("Content preferences are reactive and separate from the UI locale", async () => {
  const state = reactive({ languages: ["de", "en"] })
  jskos.languagePreference.store = state
  jskos.languagePreference.path = "languages"

  const i18n = createI18n({
    legacy: false,
    locale: "es",
    messages: { es: { license: "Licencia" } },
  })
  const publisher = {
    url: "https://example.org/publisher",
    prefLabel: { en: "English publisher", de: "Deutscher Verlag" },
  }
  const wrapper = mountComponent(i18n, {
    license: [license],
    publisher: [publisher],
  })

  expect(wrapper.find("a").attributes("title"))
    .toBe("Licencia: frei by Deutscher Verlag")

  state.languages.splice(0, 2, "en", "de")
  await wrapper.vm.$nextTick()

  expect(wrapper.find("a").attributes("title"))
    .toBe("Licencia: free by English publisher")
})

test("Explicit English remains selected when the UI locale changes", async () => {
  const state = reactive({ languages: ["en"] })
  jskos.languagePreference.store = state
  jskos.languagePreference.path = "languages"

  const i18n = createI18n({
    legacy: false,
    locale: "de",
    messages: { es: { license: "Licencia" } },
  })
  const wrapper = mountComponent(i18n)

  expect(wrapper.find("a").attributes("title")).toBe("Lizenz: free")

  i18n.global.locale.value = "es"
  await wrapper.vm.$nextTick()

  expect(wrapper.find("a").attributes("title")).toBe("Licencia: free")
})
