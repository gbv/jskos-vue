import { describe, test, expect, vi, beforeEach, afterEach } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import * as jskos from "jskos-tools"
import { createI18n } from "petite-vue-i18n"
import ItemSuggest from "../src/components/ItemSuggest.vue"

vi.mock("vue-scrollto", () => ({
  default: {
    scrollTo: vi.fn(),
  },
}))

const mountSuggest = (props = {}, i18n = null) =>
  mount(ItemSuggest, {
    props: {
      search: vi.fn(async (query) => [
        query,
        ["English", "German"],
        ["", ""],
        ["urn:lang:en", "urn:lang:de"],
      ]),
      ...props,
    },
    global: {
      plugins: i18n ? [i18n] : [],
      stubs: {
        LoadingIndicator: {
          template: "<div class='loading-indicator-stub'></div>",
        },
      },
    },
  })

describe("ItemSuggest", () => {
  let languagePreference

  beforeEach(() => {
    vi.useFakeTimers()
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
    vi.useRealTimers()
    Object.assign(jskos.languagePreference, languagePreference)
  })

  test("renders input with placeholder", () => {
    const w = mountSuggest({ placeholder: "Search here..." })

    const input = w.find("input[type='search']")
    expect(input.exists()).toBe(true)
    expect(input.attributes("placeholder")).toBe("Search here...")
  })

  test("searches and renders results", async () => {
    const search = vi.fn(async (query) => [
      query,
      ["English", "German"],
      ["", ""],
      ["urn:lang:en", "urn:lang:de"],
    ])

    const w = mountSuggest({ search })
    const input = w.find("input[type='search']")

    await input.setValue("en")
    vi.advanceTimersByTime(250)
    await flushPromises()

    expect(search).toHaveBeenCalledWith("en")

    const results = w.findAll(".jskos-vue-itemSuggest-results-item")
    expect(results.length).toBe(2)
    expect(results[0].text()).toContain("English")
    expect(results[1].text()).toContain("German")
  })

  test("searches local options and emits selected URI", async () => {
    const w = mountSuggest({
      search: null,
      options: [
        { uri: "urn:lang:en", prefLabel: { en: "English" } },
        { uri: "urn:lang:de", prefLabel: { en: "German" } },
      ],
    })
    const input = w.find("input[type='search']")

    await input.setValue("ger")
    vi.advanceTimersByTime(250)
    await flushPromises()

    const results = w.findAll(".jskos-vue-itemSuggest-results-item")
    expect(results.length).toBe(1)
    expect(results[0].text()).toContain("German")

    await results[0].trigger("click")

    expect(w.emitted("select")).toBeTruthy()
    expect(w.emitted("select")[0][0]).toEqual({
      uri: "urn:lang:de",
    })
  })

  test("uses content preferences for local option labels", async () => {
    jskos.languagePreference.store = { languages: ["en"] }
    jskos.languagePreference.path = "languages"
    const i18n = createI18n({ legacy: false, locale: "de", messages: {} })
    const w = mountSuggest({
      search: null,
      options: [{
        uri: "urn:multilingual",
        prefLabel: { en: "English", de: "Deutsch" },
      }],
    }, i18n)

    await w.find("input").setValue("eng")
    vi.advanceTimersByTime(250)
    await flushPromises()

    expect(w.find(".jskos-vue-itemSuggest-results-item").text()).toContain("English")
  })

  test("uses Vue I18n as fallback for local option labels", async () => {
    const i18n = createI18n({ legacy: false, locale: "de", messages: {} })
    const w = mountSuggest({
      search: null,
      options: [{
        uri: "urn:multilingual",
        prefLabel: { en: "English", de: "Deutsch" },
      }],
    }, i18n)

    await w.find("input").setValue("deu")
    vi.advanceTimersByTime(250)
    await flushPromises()

    expect(w.find(".jskos-vue-itemSuggest-results-item").text()).toContain("Deutsch")
  })

  test("prefers search over local options", async () => {
    const search = vi.fn(async (query) => [
      query,
      ["Remote"],
      [""],
      ["urn:remote"],
    ])
    const w = mountSuggest({
      search,
      options: [
        { uri: "urn:local", prefLabel: { en: "Local" } },
      ],
    })
    const input = w.find("input[type='search']")

    await input.setValue("local")
    vi.advanceTimersByTime(250)
    await flushPromises()

    expect(search).toHaveBeenCalledWith("local")
    expect(w.find(".jskos-vue-itemSuggest-results-item").text()).toContain("Remote")
  })

  test("emits select when clicking a result", async () => {
    const w = mountSuggest()
    const input = w.find("input[type='search']")

    await input.setValue("en")
    vi.advanceTimersByTime(250)
    await flushPromises()

    const results = w.findAll(".jskos-vue-itemSuggest-results-item")
    await results[0].trigger("click")

    expect(w.emitted("select")).toBeTruthy()
    expect(w.emitted("select")[0][0]).toEqual({
      uri: "urn:lang:en",
    })
  })
})
