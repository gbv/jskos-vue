import { test, expect, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import ItemSelect from "../src/components/ItemSelect.vue"
import * as jskos from "jskos-tools"

const languageOptions = [
  { uri: "urn:lang:en", prefLabel: { en: "English" } },
  { uri: "urn:lang:de", prefLabel: { en: "German" } },
]

// Stub ItemSuggest (typeahead)
const ItemSuggestStub = {
  name: "ItemSuggest",
  props: ["search", "placeholder"],
  emits: ["select"],
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
  const defaults = jskos.languagePreference.defaults

  try {
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
  } finally {
    jskos.languagePreference.defaults = defaults
  }
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
