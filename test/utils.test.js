import { describe, test, expect, vi, beforeEach, afterEach } from "vitest"
import { mount } from "@vue/test-utils"
import { ref } from "vue"
import * as jskos from "jskos-tools"
import { addClickHandlers, dateToString, debounce, dragAndDrop, localOptionsToSuggest, useLocale } from "../src/utils.js"

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test("calls after wait", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced("value")

    expect(fn).not.toHaveBeenCalled()
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith("value")
  })

  test("collapses repeated calls", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced("first")
    vi.advanceTimersByTime(50)
    debounced("second")
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith("second")
  })

  test("supports immediate", () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100, true)

    debounced("first")
    debounced("second")

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith("first")

    // After the wait, a new call can run immediately again.
    vi.advanceTimersByTime(100)
    debounced("third")

    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith("third")
  })
})

describe("dragAndDrop", () => {
  afterEach(() => {
    dragAndDrop.dragend()
  })

  test("dragstart / dragend", () => {
    const item = { uri: "urn:item" }

    dragAndDrop.dragstart(item)
    expect(dragAndDrop.draggedItem.value).toEqual(item)

    dragAndDrop.dragend()
    expect(dragAndDrop.draggedItem.value).toBe(null)
  })

  test("addDropzone manual handlers", () => {
    const callback = vi.fn()
    const target = document.createElement("div")
    const otherTarget = document.createElement("div")
    const dropzone = dragAndDrop.addDropzone(null, callback)

    const dragoverEvent = { preventDefault: vi.fn() }
    dropzone.dragover(dragoverEvent)
    expect(dragoverEvent.preventDefault).toHaveBeenCalled()

    dropzone.dragenter({ target })
    expect(dropzone.isDraggingOver.value).toBe(true)

    dropzone.dragleave({ target: otherTarget })
    expect(dropzone.isDraggingOver.value).toBe(true)

    dropzone.dragleave({ target })
    expect(dropzone.isDraggingOver.value).toBe(false)
  })

  test("drop with and without dragged item", () => {
    const item = { uri: "urn:item" }
    const callback = vi.fn()
    const dropzone = dragAndDrop.addDropzone(null, callback)

    const emptyDropEvent = { preventDefault: vi.fn() }
    dropzone.drop(emptyDropEvent)
    expect(emptyDropEvent.preventDefault).toHaveBeenCalled()
    expect(callback).not.toHaveBeenCalled()

    dragAndDrop.dragstart(item)

    const dropEvent = { preventDefault: vi.fn() }
    dropzone.drop(dropEvent, "extra")
    expect(dropEvent.preventDefault).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(item, "extra")
    expect(dropzone.isDraggingOver.value).toBe(false)
  })

  test("addDropzone DOM event listeners", () => {
    const item = { uri: "urn:item" }
    const callback = vi.fn()
    const element = document.createElement("div")
    document.body.append(element)

    const dropzone = dragAndDrop.addDropzone(element, callback)

    const dragoverEvent = new Event("dragover", { cancelable: true })
    element.dispatchEvent(dragoverEvent)
    expect(dragoverEvent.defaultPrevented).toBe(true)

    const dragenterEvent = new Event("dragenter")
    element.dispatchEvent(dragenterEvent)
    expect(dropzone.isDraggingOver.value).toBe(true)

    dragAndDrop.dragstart(item)

    const dropEvent = new Event("drop", { cancelable: true })
    element.dispatchEvent(dropEvent)
    expect(dropEvent.defaultPrevented).toBe(true)
    expect(callback).toHaveBeenCalledWith(item)
    expect(dropzone.isDraggingOver.value).toBe(false)

    element.remove()
  })
})

function mountClickHandler(handler, force = false) {
  return mount({
    template: "<div><button ref=\"inside\">Inside</button></div>",
    setup() {
      const inside = ref(null)
      addClickHandlers(() => [
        {
          elements: [inside.value],
          handler,
        },
      ], force)
      return { inside }
    },
  }, {
    attachTo: document.body,
  })
}

describe("addClickHandlers", () => {
  test("outside click", () => {
    const handler = vi.fn()
    const wrapper = mountClickHandler(handler)
    const event = new MouseEvent("click", { bubbles: true })

    document.body.dispatchEvent(event)

    expect(handler).toHaveBeenCalledWith({
      event,
      isInside: false,
    })
    wrapper.unmount()
  })

  test("inside click", async () => {
    const handler = vi.fn()
    const wrapper = mountClickHandler(handler)

    await wrapper.find("button").trigger("click")

    expect(handler).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  test("force", async () => {
    const handler = vi.fn()
    const wrapper = mountClickHandler(handler, true)

    await wrapper.find("button").trigger("click")

    expect(handler).toHaveBeenCalledWith(expect.objectContaining({
      isInside: true,
    }))
    wrapper.unmount()
  })

  test("unmount cleanup", () => {
    const handler = vi.fn()
    const wrapper = mountClickHandler(handler)

    wrapper.unmount()
    document.body.dispatchEvent(new MouseEvent("click", { bubbles: true }))

    expect(handler).not.toHaveBeenCalled()
  })
})

function mountUseLocale(messages, globalProperties = {}) {
  const result = {}

  return {
    wrapper: mount({
      template: "<div />",
      setup() {
        // useLocale reads the current Vue instance, so call it inside setup().
        Object.assign(result, useLocale(messages))
      },
    }, {
      global: {
        plugins: [{
          install(app) {
            Object.assign(app.config.globalProperties, globalProperties)
          },
        }],
      },
    }),
    result,
  }
}

describe("useLocale", () => {
  let languageDefaults

  beforeEach(() => {
    languageDefaults = jskos.languagePreference.defaults
  })

  afterEach(() => {
    jskos.languagePreference.defaults = languageDefaults
  })

  test("jskos-tools language preference fallback", () => {
    jskos.languagePreference.defaults = ["de", "en"]

    const { wrapper, result } = mountUseLocale({
      en: { hello: "Hello" },
      de: { hello: "Hallo" },
    })

    expect(result.currentLanguage.value).toBe("de")
    expect(result.t("hello")).toBe("Hallo")
    wrapper.unmount()
  })

  test("missing message fallback", () => {
    jskos.languagePreference.defaults = ["de"]

    const { wrapper, result } = mountUseLocale({
      de: { hello: "Hallo" },
    })

    expect(result.t("missing")).toBe("missing")
    wrapper.unmount()
  })

  test("Vue I18n globals", () => {
    const $t = vi.fn((key) => `global:${key}`)
    const { wrapper, result } = mountUseLocale({}, {
      $t,
      $i18n: { locale: "de" },
    })

    expect(result.currentLanguage.value).toBe("de")
    expect(result.t("hello")).toBe("global:hello")
    expect($t).toHaveBeenCalledWith("hello", "hello", {
      missingWarn: false,
      fallbackWarn: false,
    })
    wrapper.unmount()
  })

  test("local message fallback", () => {
    const $t = vi.fn((key, fallback) => fallback)
    const { wrapper, result } = mountUseLocale({
      de: { hello: "Hallo" },
    }, {
      $t,
      $i18n: { locale: "de" },
    })

    expect(result.t("hello")).toBe("Hallo")
    wrapper.unmount()
  })
})

describe("localOptionsToSuggest", () => {
  const options = [
    { uri: "urn:lang:en", prefLabel: { en: "English" } },
    { uri: "urn:lang:de", prefLabel: { en: "German" } },
  ]

  test("searches labels and URIs", () => {
    expect(localOptionsToSuggest(options, "ger")).toEqual([
      "ger",
      ["German"],
      [""],
      ["urn:lang:de"],
    ])

    expect(localOptionsToSuggest(options, "lang:en")).toEqual([
      "lang:en",
      ["English"],
      [""],
      ["urn:lang:en"],
    ])
  })

  test("skips options without URI", () => {
    expect(localOptionsToSuggest([
      { prefLabel: { en: "No URI" } },
      { uri: "urn:lang:en", prefLabel: { en: "English" } },
    ], "uri")).toEqual([
      "uri",
      [],
      [],
      [],
    ])
  })

  test("respects minChars", () => {
    const onMatches = vi.fn()

    expect(localOptionsToSuggest(options, "de", {
      minChars: 3,
      onMatches,
    })).toEqual(["de", [], [], []])
    expect(onMatches).toHaveBeenCalledWith([])
  })

  test("supports custom normalization and exposes matches", () => {
    const onMatches = vi.fn()
    const localOptions = [
      { uri: "urn:item:1", label: "First Item" },
    ]

    const response = localOptionsToSuggest(localOptions, "first", {
      normalize: item => ({
        uri: item.uri,
        __label: item.label,
      }),
      onMatches,
    })

    expect(response).toEqual([
      "first",
      ["First Item"],
      [""],
      ["urn:item:1"],
    ])
    expect(onMatches).toHaveBeenCalledWith([
      { uri: "urn:item:1", __label: "First Item" },
    ])
  })
})

describe("dateToString", () => {
  test("incomplete dates", () => {
    expect(dateToString("2024", "en")).toBe("2024")
    expect(dateToString("2024-06", "en")).toBe("2024-06")
  })

  test("date-only values", () => {
    expect(dateToString("2024-06-12", "en")).toBe(
      new Date("2024-06-12").toLocaleString("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    )
  })

  test("date-time values", () => {
    expect(dateToString("2024-06-12T10:30:45Z", "en")).toBe(
      new Date("2024-06-12T10:30:45Z").toLocaleString("en", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    )
  })

  test("invalid input", () => {
    expect(dateToString("not a date", "en")).toBe("not a date")
  })

  test("default language fallback", () => {
    const defaults = jskos.languagePreference.defaults

    try {
      // Without an explicit language, dateToString uses jskos language preference.
      jskos.languagePreference.defaults = ["de"]
      expect(dateToString("2024-06-12")).toBe(
        new Date("2024-06-12").toLocaleString("de", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      )
    } finally {
      jskos.languagePreference.defaults = defaults
    }
  })
})
