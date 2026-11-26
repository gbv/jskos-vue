import { afterEach, beforeEach, test, expect, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import { nextTick, reactive } from "vue"
import ItemName from "../src/components/ItemName.vue"
import ItemSelect from "../src/components/ItemSelect.vue"
import * as jskos from "jskos-tools"

const languageOptions = [
  { uri: "urn:lang:en", prefLabel: { en: "English" } },
  { uri: "urn:lang:de", prefLabel: { en: "German" } },
]

const typePerson = { uri: "https://schema.org/Person", prefLabel: { en: "Person" } }
const typePlace = { uri: "https://schema.org/Place", prefLabel: { en: "Place" } }

const TypeFilterSuggestStub = {
  name: "ItemSuggest",
  props: ["search", "types"],
  emits: ["select"],
  template: "<div class=\"itemsuggest-stub\"></div>",
}

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

// Stub ItemSuggest (typeahead)
const ItemSuggestStub = {
  name: "ItemSuggest",
  props: ["search", "placeholder"],
  emits: ["select"],
  mounted() {
    this.search("en")
  },
  template: `
    <div class="itemsuggest-stub">
      <button class="pick0" @click="$emit('select', { uri: 'urn:lang:en' })">
        pick0
      </button>
    </div>
  `,
}

const DdcSuggestStub = {
  name: "ItemSuggest",
  props: ["search", "placeholder"],
  emits: ["select"],
  mounted() {
    this.search("123")
  },
  template: `
    <div class="itemsuggest-stub">
      <button
        class="pick-ddc"
        @click="$emit('select', { uri: 'http://dewey.info/class/123/e23/' })">
        pick-ddc
      </button>
    </div>
  `,
}

const PreferredLabelSuggestStub = {
  name: "ItemSuggest",
  props: ["search", "placeholder"],
  emits: ["select"],
  mounted() {
    this.search("urn:pref-label")
  },
  template: `
    <div class="itemsuggest-stub">
      <button
        class="pick-preferred-label"
        @click="$emit('select', { uri: 'urn:pref-label' })">
        pick-preferred-label
      </button>
    </div>
  `,
}

test("emits select when an option is picked", async () => {
  const w = mount(ItemSelect, {
    props: { options: languageOptions },
    global: {
      stubs: {
        ItemSuggest: ItemSuggestStub,
      },
    },
  })

  await w.find(".pick0").trigger("click")
  await flushPromises()

  expect(w.emitted("select")).toBeTruthy()
  const sel = w.emitted("select")[0][0]

  // Minimal contract: must have a uri
  expect(sel.uri).toBe("urn:lang:en")
  expect(sel.__label).toBe("English")
  expect(sel.prefLabel.und).toBe("English")
})

test("uses jskos-tools to derive notation from scheme URI pattern", async () => {
  const w = mount(ItemSelect, {
    props: {
      options: [
        {
          uri: "http://dewey.info/class/123/e23/",
          prefLabel: { en: "123 Computer science" },
        },
      ],
      scheme: {
        uri: "http://dewey.info/scheme/edition/e23/",
        uriPattern: "^http://dewey.info/class/([^/]+)/e23/$",
      },
    },
    global: {
      stubs: {
        ItemSuggest: DdcSuggestStub,
      },
    },
  })

  await w.find(".pick-ddc").trigger("click")
  await flushPromises()

  const sel = w.emitted("select")[0][0]
  expect(sel.notation).toEqual(["123"])
  expect(sel.prefLabel.und).toBe("Computer science")
})

test("uses jskos language preferences when normalizing labels", async () => {
  jskos.languagePreference.defaults = ["de", "en"]

  const w = mount(ItemSelect, {
    props: {
      options: [
        {
          uri: "urn:pref-label",
          prefLabel: {
            en: "English",
            de: "Deutsch",
          },
        },
      ],
    },
    global: {
      stubs: {
        ItemSuggest: PreferredLabelSuggestStub,
      },
    },
  })

  await w.find(".pick-preferred-label").trigger("click")
  await flushPromises()

  const sel = w.emitted("select")[0][0]
  expect(sel.__label).toBe("Deutsch")
  expect(sel.prefLabel.und).toBe("Deutsch")
})

test("keeps multilingual labels reactive after local selection", async () => {
  const state = reactive({ languages: ["en", "de"] })
  jskos.languagePreference.store = state
  jskos.languagePreference.path = "languages"
  const w = mount(ItemSelect, {
    props: {
      options: [{
        uri: "urn:pref-label",
        prefLabel: { en: "English", de: "Deutsch" },
      }],
    },
    global: {
      stubs: {
        ItemSuggest: PreferredLabelSuggestStub,
      },
    },
  })

  await w.find(".pick-preferred-label").trigger("click")
  await flushPromises()

  const selected = w.emitted("select")[0][0]
  const label = mount(ItemName, { props: { item: selected } })

  expect(selected.__label).toBe("English")
  expect(selected.prefLabel).toEqual({
    en: "English",
    de: "Deutsch",
    und: "English",
  })
  expect(label.text()).toContain("English")

  state.languages.splice(0, 2, "de", "en")
  await nextTick()

  expect(selected.__label).toBe("English")
  expect(label.text()).toContain("Deutsch")
  expect(label.text()).not.toContain("English")
})

test("forwards types and filters local options", async () => {
  const person = {
    uri: "urn:person",
    type: [typePerson.uri],
    prefLabel: { en: "Berlin person" },
  }
  const place = {
    uri: "urn:place",
    type: [typePlace.uri],
    prefLabel: { en: "Berlin place" },
  }
  const types = [typePerson, typePlace]
  const w = mount(ItemSelect, {
    props: { options: [person, place], types },
    global: { stubs: { ItemSuggest: TypeFilterSuggestStub } },
  })
  const suggest = w.findComponent(TypeFilterSuggestStub)

  expect(suggest.props("types")).toEqual(types)
  expect(await suggest.props("search")("Berlin", [typePlace.uri])).toEqual([
    "Berlin",
    ["Berlin place"],
    [""],
    [place.uri],
  ])

  suggest.vm.$emit("select", { uri: place.uri })
  await flushPromises()

  expect(w.emitted("select")[0][0]).toMatchObject(place)
})

test("forwards selected types to custom search", async () => {
  const search = vi.fn(async query => [query, [], [], []])
  const w = mount(ItemSelect, {
    props: { search, types: [typePerson] },
    global: { stubs: { ItemSuggest: TypeFilterSuggestStub } },
  })

  await w.findComponent(TypeFilterSuggestStub).props("search")("Berlin", [typePerson.uri])

  expect(search).toHaveBeenCalledWith("Berlin", [typePerson.uri])
})

test("keeps the one-argument custom search without type filtering", async () => {
  const search = vi.fn(async query => [query, [], [], []])
  const w = mount(ItemSelect, {
    props: { search },
    global: { stubs: { ItemSuggest: TypeFilterSuggestStub } },
  })

  await w.findComponent(TypeFilterSuggestStub).props("search")("Berlin")

  expect(search).toHaveBeenCalledWith("Berlin")
})

test("forwards selected types to registry suggestions", async () => {
  const registry = {
    suggest: vi.fn(async query => [query.search, [], [], []]),
  }
  const scheme = { uri: "urn:scheme" }
  const w = mount(ItemSelect, {
    props: { registry, scheme, types: [typePlace] },
    global: { stubs: { ItemSuggest: TypeFilterSuggestStub } },
  })

  await w.findComponent(TypeFilterSuggestStub).props("search")("Berlin", [typePlace.uri])

  expect(registry.suggest).toHaveBeenCalledWith({
    search: "Berlin",
    params: { voc: scheme.uri },
    types: [typePlace.uri],
  })
})

test("does not let stale search responses overwrite the URI cache", async () => {
  const uri = "urn:result"
  let resolveFirst
  let resolveSecond
  const search = vi.fn((query, types) => new Promise((resolve) => {
    if (types.includes(typePerson.uri)) {
      resolveFirst = resolve
    } else {
      resolveSecond = resolve
    }
  }))
  const w = mount(ItemSelect, {
    props: { search, types: [typePerson, typePlace] },
    global: { stubs: { ItemSuggest: TypeFilterSuggestStub } },
  })
  const suggest = w.findComponent(TypeFilterSuggestStub)
  const first = suggest.props("search")("Berlin", [typePerson.uri])
  const second = suggest.props("search")("Berlin", [typePlace.uri])

  resolveSecond(["Berlin", ["Current label"], [""], [uri]])
  await second
  resolveFirst(["Berlin", ["Stale label"], [""], [uri]])
  await first
  suggest.vm.$emit("select", { uri })
  await flushPromises()

  expect(w.emitted("select")[0][0].__label).toBe("Current label")
})

test("renders ConceptTree collapsed by default", () => {
  const ConceptTreeStub = {
    name: "ConceptTree",
    template: "<div class=\"concepttree-stub\"></div>",
  }

  const w = mount(ItemSelect, {
    props: {
      options: languageOptions,
      treeConcepts: [{ uri: "urn:top" }],
    },
    global: {
      stubs: {
        ItemSuggest: ItemSuggestStub,
        ConceptTree: ConceptTreeStub,
      },
    },
  })

  expect(w.find(".jskos-vue-itemSelect-tree").exists()).toBe(true)
  expect(w.find(".concepttree-stub").exists()).toBe(false)
})

test("calls ConceptTree.navigateToUri after picking", async () => {
  const navigateSpy = vi.fn(async () => true)

  const ConceptTreeStub = {
    name: "ConceptTree",
    props: ["concepts", "modelValue"],
    template: "<div class=\"concepttree-stub\"></div>",
    methods: {
      navigateToUri: navigateSpy,
    },
  }

  const w = mount(ItemSelect, {
    props: {
      options: languageOptions,
      treeConcepts: [{ uri: "urn:top" }], // must be non-empty to render the tree
    },
    global: {
      stubs: {
        ItemSuggest: ItemSuggestStub,
        ConceptTree: ConceptTreeStub,
      },
    },
  })

  await w.find(".pick0").trigger("click")
  await flushPromises()

  expect(w.find(".concepttree-stub").exists()).toBe(true)
  expect(navigateSpy).toHaveBeenCalled()
})

test("resyncs selected concept when reopening collapsed ConceptTree", async () => {
  const navigateSpy = vi.fn(async () => true)

  const ConceptTreeStub = {
    name: "ConceptTree",
    props: ["concepts", "modelValue"],
    template: "<div class=\"concepttree-stub\"></div>",
    methods: {
      navigateToUri: navigateSpy,
    },
  }

  const w = mount(ItemSelect, {
    props: {
      options: languageOptions,
      treeConcepts: [{ uri: "urn:top" }],
    },
    global: {
      stubs: {
        ItemSuggest: ItemSuggestStub,
        ConceptTree: ConceptTreeStub,
      },
    },
  })

  await w.find(".pick0").trigger("click")
  await flushPromises()
  expect(navigateSpy).toHaveBeenCalledTimes(1)

  const treeToggle = () => w.find(".jskos-vue-itemSelect-tree > button")

  await treeToggle().trigger("click")
  await flushPromises()
  expect(w.find(".concepttree-stub").exists()).toBe(false)

  await treeToggle().trigger("click")
  await flushPromises()
  expect(w.find(".concepttree-stub").exists()).toBe(true)
  expect(navigateSpy).toHaveBeenCalledTimes(2)
})

test("uses resolve when selected URI is not in cache", async () => {
  const resolve = vi.fn(async (uri) => ({
    uri,
    prefLabel: { en: "English" },
  }))

  const search = vi.fn(async (q) => [q, [], [], []])

  const w = mount(ItemSelect, {
    props: {
      search,
      resolve,
    },
    global: {
      stubs: {
        ItemSuggest: ItemSuggestStub,
      },
    },
  })

  await w.find(".pick0").trigger("click")
  await flushPromises()

  expect(resolve).toHaveBeenCalledWith("urn:lang:en")
  expect(w.emitted("select")).toBeTruthy()
  expect(w.emitted("select")[0][0].uri).toBe("urn:lang:en")
})
