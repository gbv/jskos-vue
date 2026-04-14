import { describe, test, expect, vi, beforeEach, afterEach } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import ItemSuggest from "../src/components/ItemSuggest.vue"

vi.mock("vue-scrollto", () => ({
  default: {
    scrollTo: vi.fn(),
  },
}))

const mountSuggest = (props = {}) =>
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
      stubs: {
        LoadingIndicator: {
          template: "<div class='loading-indicator-stub'></div>",
        },
      },
    },
  })

describe("ItemSuggest", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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