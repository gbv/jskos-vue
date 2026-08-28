import { test, expect } from "vitest"
import { mount } from "@vue/test-utils"
import { MappingTable, ItemName } from "../src/index.js"

const mountTable = props => mount(MappingTable, { props })

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

  expect(comp.findAll(".jskos-vue-mappingTable-sourceScheme").length).toBe(2)
})
