import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { LicenseInfo } from "../src/index.js"
import { createI18n } from "petite-vue-i18n"

const license = {
  uri: "http://unknown-license.org",
  prefLabel: { en: "free", de: "frei", es: "libre" },
}

const mountComponent = i18n => mount(LicenseInfo, { props: { item: { license: [license] } }, global: { plugins: [i18n] } })

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
