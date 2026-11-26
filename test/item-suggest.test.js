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

const typePerson = {
  uri: "urn:type:person",
  prefLabel: { en: "Person", de: "Person" },
}
const typePlace = {
  uri: "urn:type:place",
  prefLabel: { en: "Place", de: "Ort" },
}
const typeOrganization = {
  uri: "urn:type:organization",
  prefLabel: { en: "Organization", de: "Organisation" },
}

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

  test("shows localized type filters with all types selected", () => {
    jskos.languagePreference.store = { languages: ["en"] }
    jskos.languagePreference.path = "languages"
    const i18n = createI18n({ legacy: false, locale: "de", messages: {} })
    const w = mountSuggest({ types: [typePerson, typePlace] }, i18n)

    expect(w.find("summary").text()).toBe("Typen")
    expect(w.find(".jskos-vue-itemSuggest-typeOptions").text()).toContain("Person")
    expect(w.find(".jskos-vue-itemSuggest-typeOptions").text()).toContain("Place")
    expect(w.find(".jskos-vue-itemSuggest-typeOptions").text()).not.toContain("Ort")
    expect(w.findAll("input[type='checkbox']").every(input => input.element.checked)).toBe(true)
  })

  test("passes selected types to remote search and skips an empty selection", async () => {
    const search = vi.fn(async query => [query, ["Result"], [""], ["urn:result"]])
    const w = mountSuggest({ search, types: [typePerson, typePlace] })
    const input = w.find("input[type='search']")

    await input.setValue("result")
    vi.advanceTimersByTime(250)
    await flushPromises()

    expect(search).toHaveBeenLastCalledWith("result", [typePerson.uri, typePlace.uri])

    const checkboxes = w.findAll("input[type='checkbox']")
    await checkboxes[0].setValue(false)
    vi.advanceTimersByTime(250)
    await flushPromises()

    expect(search).toHaveBeenLastCalledWith("result", [typePlace.uri])
    expect(search).toHaveBeenCalledTimes(2)

    await checkboxes[1].setValue(false)
    vi.advanceTimersByTime(250)
    await flushPromises()

    expect(search).toHaveBeenCalledTimes(2)
    expect(w.find(".jskos-vue-itemSuggest-results-item").text()).toBe("No results")
  })

  test("filters local options by any selected type", async () => {
    const w = mountSuggest({
      search: null,
      types: [typePerson, typePlace],
      options: [
        { uri: "urn:person", type: [typePerson.uri], prefLabel: { en: "Example person" } },
        { uri: "urn:place", type: [typePlace.uri], prefLabel: { en: "Example place" } },
      ],
    })

    await w.find("input[type='search']").setValue("example")
    vi.advanceTimersByTime(250)
    await flushPromises()
    expect(w.findAll(".jskos-vue-itemSuggest-results-item")).toHaveLength(2)

    await w.findAll("input[type='checkbox']")[0].setValue(false)
    vi.advanceTimersByTime(250)
    await flushPromises()

    const results = w.findAll(".jskos-vue-itemSuggest-results-item")
    expect(results).toHaveLength(1)
    expect(results[0].text()).toContain("Example place")
  })

  test("selects all available types when they change", async () => {
    const search = vi.fn(async query => [query, [], [], []])
    const w = mountSuggest({ search, types: [typePerson, typePlace] })

    await w.findAll("input[type='checkbox']")[1].setValue(false)
    await w.setProps({ types: [typePlace, typeOrganization] })

    const checkboxes = w.findAll("input[type='checkbox']")
    expect(checkboxes.map(input => input.attributes("value"))).toEqual([
      typePlace.uri,
      typeOrganization.uri,
    ])
    expect(checkboxes.every(input => input.element.checked)).toBe(true)

    await w.find("input[type='search']").setValue("result")
    vi.advanceTimersByTime(250)
    await flushPromises()

    expect(search).toHaveBeenCalledWith("result", [typePlace.uri, typeOrganization.uri])
  })

  test("ignores a late result after type filters change", async () => {
    let resolveFirst
    let resolveSecond
    const search = vi.fn((query, types) => new Promise((resolve) => {
      if (types.length === 2) {
        resolveFirst = resolve
      } else {
        resolveSecond = resolve
      }
    }))
    const w = mountSuggest({ search, types: [typePerson, typePlace] })

    await w.find("input[type='search']").setValue("result")
    vi.advanceTimersByTime(250)
    await flushPromises()

    await w.findAll("input[type='checkbox']")[0].setValue(false)
    vi.advanceTimersByTime(250)
    await flushPromises()

    resolveSecond(["result", ["Current result"], [""], ["urn:current"]])
    await flushPromises()
    resolveFirst(["result", ["Stale result"], [""], ["urn:stale"]])
    await flushPromises()

    expect(w.find(".jskos-vue-itemSuggest-results-item").text()).toContain("Current result")
    expect(w.text()).not.toContain("Stale result")
  })

  test("invalidates a pending result when the query is cleared", async () => {
    let resolveSearch
    const search = vi.fn(() => new Promise((resolve) => {
      resolveSearch = resolve
    }))
    const w = mountSuggest({ search })
    const input = w.find("input[type='search']")

    await input.setValue("result")
    vi.advanceTimersByTime(250)
    await flushPromises()
    await input.setValue("")

    resolveSearch(["result", ["Stale result"], [""], ["urn:stale"]])
    await flushPromises()

    expect(w.find(".jskos-vue-itemSuggest-results").attributes("style")).toContain("display: none")
    expect(w.text()).not.toContain("Stale result")
    expect(w.find(".loading-indicator-stub").exists()).toBe(false)
  })

  test("does not search a whitespace-only query", async () => {
    const search = vi.fn(async query => [query, [], [], []])
    const w = mountSuggest({ search })

    await w.find("input[type='search']").setValue("   ")
    vi.advanceTimersByTime(250)
    await flushPromises()

    expect(search).not.toHaveBeenCalled()
    expect(w.find(".loading-indicator-stub").exists()).toBe(false)
  })
})
