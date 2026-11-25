import { afterEach, beforeEach, test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { nextTick, reactive } from "vue"
import * as jskos from "jskos-tools"
import { createI18n } from "petite-vue-i18n"
import { MappingTable, ItemName } from "../src/index.js"

const mountTable = (props, options = {}) => mount(MappingTable, { props, ...options })

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

test("MappingTable", async () => {
  const mappings = [
    // from jskos specification
    {
      type: ["http://www.w3.org/2004/02/skos/core#closeMatch"],
      fromScheme: {uri:"http://dewey.info/scheme/edition/e22/"},    
      toScheme: {uri:"http://d-nb.info/gnd/7749153-1"},
      from: {
        memberSet: [ {
          uri: "http://dewey.info/class/612.112/e22/",
          notation: ["612.112"],
        } ],
      },
      to: {
        memberSet: [ {
          uri: "http://d-nb.info/gnd/4074195-3",
          prefLabel: { de: "Leukozyt" },
        } ],
      },
      justification: "https://w3id.org/semapv/vocab/ManualMappingCuration",
      tool: [ { url: "https://coli-conc.gbv.de/cocoda/" } ],
    },
  ]

  const comp = mountTable({ mappings })
    
  expect(comp.findComponent(ItemName).exists()).toBe(true)

  expect(comp.findAll(".jskos-vue-mappingTable-date").length).toBe(2)
})

test("uses reactive content languages for creators and type comparisons", async () => {
  const state = reactive({ languages: ["en", "de"] })
  jskos.languagePreference.store = state
  jskos.languagePreference.path = "languages"
  const i18n = createI18n({ legacy: false, locale: "de", messages: {} })
  const comp = mountTable({
    fields: ["creator:50", "type:50"],
    mappings: [{
      type: ["http://www.w3.org/2004/02/skos/core#closeMatch"],
      from: { memberSet: [{ uri: "urn:from" }] },
      to: { memberSet: [{ uri: "urn:to" }] },
      creator: [{
        uri: "urn:creator",
        prefLabel: { en: "English creator", de: "Deutscher Urheber" },
      }],
    }],
  }, {
    global: { plugins: [i18n] },
  })
  const table = comp.findComponent({ name: "FlexibleTable" })
  const typeField = table.props("fields").find(field => field.key === "type")
  const firstType = { type: { prefLabel: { en: "Alpha", de: "Zeta" } } }
  const secondType = { type: { prefLabel: { en: "Beta", de: "Eta" } } }

  expect(comp.text()).toContain("English creator")
  expect(typeField.compare(firstType, secondType)).toBeLessThan(0)

  state.languages.splice(0, 2, "de", "en")
  await nextTick()

  expect(comp.text()).toContain("Deutscher Urheber")
  expect(comp.text()).not.toContain("English creator")
  expect(typeField.compare(firstType, secondType)).toBeGreaterThan(0)
})
