import { afterEach, beforeEach, describe, expect, test } from "vitest"
import { mount } from "@vue/test-utils"
import { reactive } from "vue"
import * as jskos from "jskos-tools"
import { createI18n } from "petite-vue-i18n"
import { ItemDetails, ItemList, ItemName, ItemDetailsTabs, LicenseInfo } from "../src/index.js"

const mountDetails = props => mount(ItemDetails, { props })

test("ItemDetails", async () => {
  const item = {
    uri: "http://test.org/1",
    ancestors: [{ uri: "http://test.org/ancestor" }],
    broader: [{ uri: "http://test.org/broader" }],
    narrower: [{ uri: "http://test.org/narrower" }],
    license: [{ uri: "http://test.org/license" }],
    identifier: ["some:id"],
  }

  const details = mountDetails({ item })

  expect(details.findComponent(ItemName).exists()).toBe(true)

  // item + ancestors + broader + narrower
  expect(details.findAllComponents(ItemName).length).toBe(4)

  const itemLists = details.findAllComponents(ItemList)
  expect(itemLists.length).toBe(3)

  expect(itemLists[0].props("items")[0].uri).toBe("http://test.org/ancestor")

  expect(details.findComponent(LicenseInfo).exists()).toBe(true)
  expect(details.findComponent(ItemDetailsTabs).exists()).toBe(true)
})

test("ItemDetails toggles", async () => {
  const item = {
    uri: "http://test.org/1",
    ancestors: [{ uri: "http://test.org/ancestor" }],
  }
  const details = mountDetails({
    item,
    showAncestors: false,
    showTabs: false,
  })

  // only item
  expect(details.findAllComponents(ItemName).length).toBe(1)

  expect(details.findComponent(ItemDetailsTabs).exists()).toBe(false)
})

describe("ItemDetailsTabs content languages", () => {
  const item = {
    type: [{
      uri: "https://example.org/type",
      prefLabel: { en: "English type", de: "Deutscher Typ" },
    }],
    publisher: [{
      uri: "https://example.org/publisher",
      prefLabel: { en: "English publisher", de: "Deutscher Verlag" },
    }],
  }
  let languagePreference

  const mountTabs = (props = {}, locale = "de") => mount(ItemDetailsTabs, {
    props: { item, flat: true, ...props },
    global: {
      plugins: locale
        ? [createI18n({ legacy: false, locale, messages: {} })]
        : [],
    },
  })

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

  test("content preferences take precedence over the UI locale", () => {
    jskos.languagePreference.store = { languages: ["en"] }
    jskos.languagePreference.path = "languages"

    const wrapper = mountTabs()

    expect(wrapper.text()).toContain("Art: English type")
    expect(wrapper.text()).toContain("Herausgeber: English publisher")
  })

  test("uses the Vue I18n locale as content fallback", () => {
    const wrapper = mountTabs()

    expect(wrapper.text()).toContain("Deutscher Typ")
    expect(wrapper.text()).toContain("Deutscher Verlag")
  })

  test("reacts to content language preference changes", async () => {
    const state = reactive({ languages: ["en", "de"] })
    jskos.languagePreference.store = state
    jskos.languagePreference.path = "languages"
    const wrapper = mountTabs()

    expect(wrapper.text()).toContain("English type")
    expect(wrapper.text()).toContain("English publisher")

    state.languages.splice(0, 2, "de", "en")
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain("Deutscher Typ")
    expect(wrapper.text()).toContain("Deutscher Verlag")
  })

  test("orders language-map values without dropping entries", () => {
    jskos.languagePreference.store = { languages: ["de"] }
    jskos.languagePreference.path = "languages"
    const wrapper = mountTabs({
      item: {
        prefLabel: {
          en: "English",
          de: ["Deutsch", "Noch Deutsch"],
          "-": "Excluded",
          fr: "Français",
        },
      },
    }, "en")

    const labels = wrapper.findAll("li[lang]")
    expect(labels.map(label => label.attributes("lang")))
      .toEqual(["de", "de", "en", "fr"])
    expect(labels.map(label => label.text()))
      .toEqual(["Deutsch", "Noch Deutsch", "English", "Français"])
  })
})
