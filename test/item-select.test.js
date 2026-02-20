import { test, expect, vi } from "vitest"
import { mount, flushPromises } from "@vue/test-utils"
import ItemSelect from "../src/components/ItemSelect.vue"

// --- Mock vue-multiselect: we control selection + search-change
vi.mock("vue-multiselect", () => ({
  __esModule: true,
  default: {
    name: "Multiselect",
    props: ["modelValue", "options"],
    emits: ["update:modelValue", "select", "search-change"],
    template: `
      <div class="multiselect-stub">
        <button class="pick0" @click="pick0">pick0</button>
        <button class="searchX" @click="$emit('search-change', 'x')">search</button>
      </div>
    `,
    methods: {
      pick0() {
        const opt = this.options?.[0]
        this.$emit("update:modelValue", opt)
        this.$emit("select", opt)
      },
    },
  },
}))

// --- Mock ItemSelected: DEFAULT v-model (modelValue / update:modelValue)
vi.mock("../src/components/ItemSelected.vue", () => ({
  __esModule: true,
  default: {
    name: "ItemSelected",
    props: ["modelValue", "view", "orderable", "removeable"],
    emits: ["update:modelValue"],
    template: `
      <div class="itemselected-stub">
        <button class="remove-first" @click="removeFirst">remove-first</button>
      </div>
    `,
    methods: {
      removeFirst() {
        const next = (this.modelValue || []).slice(1)
        this.$emit("update:modelValue", next)
      },
    },
  },
}))

const languageOptions = [
  { uri: "urn:lang:en", prefLabel: { en: "English" } },
  { uri: "urn:lang:de", prefLabel: { en: "German" } },
]

test("adds local option and emits update:modelValue + select", async () => {
  const w = mount(ItemSelect, { props: { options: languageOptions } })

  await w.find(".pick0").trigger("click")
  await flushPromises()

  expect(w.emitted("update:modelValue")).toBeTruthy()
  const update = w.emitted("update:modelValue").at(-1)[0] // take last (more robust)
  expect(update).toHaveLength(1)
  expect(update[0].uri).toBe("urn:lang:en")
  expect(update[0].__label).toBe("English")
  expect(update[0].prefLabel.und).toBe("English")

  expect(w.emitted("select")).toBeTruthy()
  expect(w.emitted("select")[0][0].uri).toBe("urn:lang:en")
})

test("dedupes by uri", async () => {
  const w = mount(ItemSelect, { props: { options: languageOptions } })

  await w.find(".pick0").trigger("click")
  await w.find(".pick0").trigger("click")
  await flushPromises()

  const last = w.emitted("update:modelValue").at(-1)[0]
  expect(last).toHaveLength(1)
  expect(last[0].uri).toBe("urn:lang:en")
})

test("forwards ItemSelected v-model changes to update:modelValue", async () => {
  const w = mount(ItemSelect, {
    props: {
      modelValue: [
        { uri: "urn:lang:en", prefLabel: { en: "English" } },
        { uri: "urn:lang:de", prefLabel: { en: "German" } },
      ],
      options: languageOptions,
    },
  })

  await w.find(".remove-first").trigger("click")
  await flushPromises()

  const last = w.emitted("update:modelValue").at(-1)[0]
  expect(last).toHaveLength(1)
  expect(last[0].uri).toBe("urn:lang:de")
})