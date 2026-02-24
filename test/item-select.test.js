import { test, expect, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import ItemSelect from "../src/components/ItemSelect.vue"

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
      <button class="pick0" @click="$emit('select', { uri: 'urn:lang:en', prefLabel: { en: 'English' } })">
        pick0
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

test("calls ConceptTree.navigateToUri after picking (showTree=true)", async () => {
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
      showTree: true,
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

  expect(navigateSpy).toHaveBeenCalled()
})