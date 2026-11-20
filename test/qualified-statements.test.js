import { afterEach, expect, test, vi } from "vitest"
import { flushPromises, mount } from "@vue/test-utils"
import { nextTick } from "vue"
import { createI18n } from "petite-vue-i18n"
import { QualifiedStatements } from "../src/index.js"
import { useUriResolution } from "../src/composables/useUriResolution.js"

const uris = {
  birth: "https://example.org/Birth",
  born: "https://example.org/born",
  concept: "http://www.w3.org/2004/02/skos/core#Concept",
  event: "https://example.org/Event",
  exactMatch: "http://www.w3.org/2004/02/skos/core#exactMatch",
  hadParticipant: "https://example.org/hadParticipant",
  name: "https://example.org/name",
  pagination: "https://schema.org/pagination",
  participatedIn: "https://example.org/participatedIn",
  relatedTo: "https://example.org/relatedTo",
  statementType: "https://example.org/StatementType",
  type: "https://example.org/Type",
}

const labels = {
  [uris.birth]: "Birth",
  [uris.born]: "Born",
  [uris.concept]: "Concept",
  [uris.event]: "Event",
  [uris.exactMatch]: "Exact match",
  [uris.hadParticipant]: "Had participant",
  [uris.name]: "Definition",
  [uris.pagination]: "Pagination",
  [uris.participatedIn]: "Participated in",
  [uris.relatedTo]: "Related to",
  [uris.statementType]: "Statement type",
  [uris.type]: "Resolved type",
}

const sourceUri = "http://uri.gbv.de/document/opac-de-627:ppn:1986707431"
const sourceCitation = "A very long bibliographic citation with authors, title, publisher, publication place, year, volume, and pagination"

const item = {
  uri: "https://example.org/item",
  qualifiedRelations: {
    [uris.relatedTo]: [
      {
        resource: {
          uri: "https://example.org/other",
          prefLabel: { en: "Other item" },
          type: [uris.type],
          place: [{ uri: "https://example.org/place", prefLabel: { en: "Example place" } }],
          mappings: [{
            from: { memberSet: [{ uri: "https://example.org/other" }] },
            to: { memberSet: [{ uri: "https://example.org/target" }] },
          }],
        },
        startDate: "2020",
        rank: "preferred",
      },
      {
        resource: {
          prefLabel: { en: "Resource without URI" },
          type: [uris.type],
        },
      },
    ],
    [uris.participatedIn]: [{
      resource: {
        uri: "https://example.org/birth-event",
        prefLabel: { de: "Die Geburt", en: "The Birth" },
        type: [uris.concept, uris.event, uris.birth],
        startDate: "1984/1985",
        endDate: "1984/1985",
        scopeNote: {
          de: "Deutsche Anmerkung",
          en: ["First English note", "Second English note"],
          und: ["es war neunzehnhundertvierundachtzig!"],
        },
        place: [{
          uri: "https://example.org/place",
          prefLabel: { en: "Knüllwald" },
          mappings: [{
            type: [uris.exactMatch],
            from: {
              memberSet: [{
                uri: "https://example.org/saint-john",
                prefLabel: { en: "Saint John (Kanada)" },
              }],
            },
            to: {
              memberChoice: [
                { uri: "http://geonames.org/3207179" },
                { uri: "https://d-nb.info/gnd/4369255-2" },
                { uri: "http://uri.gbv.de/terminology/gn250/DEBKGGND00000H96" },
                { uri: "http://vocab.getty.edu/tgn/7124998" },
              ],
            },
            confidence: 0.95,
          }, {
            from: {
              memberList: [
                { uri: "https://example.org/first", prefLabel: { en: "First concept" } },
                { uri: "https://example.org/second", prefLabel: { en: "Second concept" } },
              ],
            },
            to: {
              memberSet: [{
                uri: "https://example.org/target",
                prefLabel: { en: "Target concept" },
              }],
            },
            note: { en: "Mapping metadata" },
          }],
        }],
        source: [{ prefLabel: { en: "Resource source" } }],
        qualifiedRelations: {
          [uris.hadParticipant]: [{
            resource: {
              uri: "https://example.org/alexis",
              prefLabel: { en: "Alexis Girard" },
              type: [uris.concept],
            },
          }],
        },
      },
      startDate: "1900",
      endDate: "1901",
      type: [uris.statementType],
      source: [{ prefLabel: { en: "Statement source" } }],
      rank: "preferred",
    }],
  },
  qualifiedDates: {
    [uris.born]: [{
      date: "2000-01-01",
      place: [{ uri: "https://example.org/place", prefLabel: { en: "Example place" } }],
      rank: "deprecated",
    }],
  },
  qualifiedLiterals: {
    [uris.name]: [
      {
        literal: { string: "Definition", language: "en" },
        rank: "preferred",
        type: [uris.type],
        source: [{
          uri: sourceUri,
          prefLabel: { en: sourceCitation },
          qualifiedLiterals: {
            [uris.pagination]: [{ literal: { string: "Page 12" } }],
          },
        }, {
          url: "https://example.org/source-two",
          prefLabel: { en: "Second source" },
        }],
      },
      {
        literal: { string: "Normal definition", language: "en" },
        rank: "normal",
      },
    ],
  },
}

const wrappers = []

function mountQualified(props = {}, options = {}) {
  const wrapper = mount(QualifiedStatements, {
    ...options,
    props: {
      item: structuredClone(item),
      labelForUri: uri => labels[uri] || "",
      ...props,
    },
  })
  wrappers.push(wrapper)
  return wrapper
}

function statementRow(wrapper, text) {
  return wrapper.findAll(".jskos-vue-qualifiedStatements-row")
    .find(row => row.text().includes(text))
}

function inspectorRow(wrapper, label) {
  return wrapper.findAll(".jskos-vue-qualifiedStatements-inspectorRow")
    .find(row => row.get("dt").text() === label)
}

function inspectorRows(wrapper, label) {
  return wrapper.findAll(".jskos-vue-qualifiedStatements-inspectorRow")
    .filter(row => row.get("dt").text() === label)
}

afterEach(() => {
  wrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

test("keeps a cached label when the resource is later referenced by URI only", async () => {
  const uri = "https://example.org/concept"
  const resolve = vi.fn()
  const resolution = useUriResolution({ resolve, language: "en" })

  await resolution.ensure({ uri, prefLabel: { en: "Concept" } })
  await resolution.ensure({ uri })

  expect(resolution.label(uri)).toBe("Concept")
  expect(resolve).not.toHaveBeenCalled()
})

test("renders a compact overview with multiple properties, statements, and ranks", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  expect(wrapper.text()).toContain("Additional details")
  expect(wrapper.text()).toContain("Related to")
  expect(wrapper.text()).toContain("Other item")
  expect(wrapper.text()).toContain("Resource without URI")
  expect(wrapper.text()).toContain("2020–…")
  expect(wrapper.text()).toContain("Born")
  expect(wrapper.text()).toContain("2000-01-01")
  expect(wrapper.text()).toContain("Definition")
  expect(wrapper.text()).toContain("Normal definition")
  expect(wrapper.text()).toContain("Preferred")
  expect(wrapper.text()).toContain("Deprecated")
  expect(wrapper.text()).not.toContain("NormalNormal")

  expect(wrapper.findAll(".jskos-vue-qualifiedStatements-branch")).toHaveLength(4)
  expect(wrapper.findAll(".jskos-vue-qualifiedStatements-row")).toHaveLength(6)
  expect(wrapper.find(".jskos-vue-qualifiedStatements-inspector").exists()).toBe(false)
  expect(wrapper.text()).not.toContain("Example place")
  expect(wrapper.text()).not.toContain(sourceCitation)
  expect(wrapper.find(".jskos-vue-qualifiedStatements-rank-preferred .jskos-vue-arrow-up").exists()).toBe(false)
  expect(wrapper.find(".jskos-vue-qualifiedStatements-rank-normal .jskos-vue-qualifiedStatements-rank").exists()).toBe(false)
})

test("ignores generic translations from the host application", async () => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    messages: {
      en: {
        qualifiedStatements: "Host-specific title",
        source: "Host source",
      },
    },
  })
  const wrapper = mountQualified({}, {
    global: { plugins: [i18n] },
  })
  await flushPromises()

  expect(wrapper.text()).toContain("Additional details")
  expect(wrapper.text()).not.toContain("Host-specific title")

  await statementRow(wrapper, "Definition").get("button").trigger("click")

  expect(inspectorRow(wrapper, "Sources")).toBeDefined()
  expect(inspectorRow(wrapper, "Host source")).toBeUndefined()
})

test("allows intentional namespaced translations from the host application", async () => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    messages: {
      en: {
        "jskosVue.qualifiedStatements.source": "Host sources",
        "jskosVue.qualifiedStatements.title": "Host details",
      },
    },
  })
  const wrapper = mountQualified({}, {
    global: { plugins: [i18n] },
  })
  await flushPromises()

  expect(wrapper.text()).toContain("Host details")

  await statementRow(wrapper, "Definition").get("button").trigger("click")

  expect(inspectorRow(wrapper, "Host sources")).toBeDefined()
})

test("updates fallback translations when the host locale changes", async () => {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    messages: {},
  })
  const wrapper = mountQualified({}, {
    global: { plugins: [i18n] },
  })
  await flushPromises()

  expect(wrapper.get(".jskos-vue-qualifiedStatements-title").text())
    .toContain("Additional details")

  i18n.global.locale.value = "de"
  await nextTick()

  expect(wrapper.get(".jskos-vue-qualifiedStatements-title").text())
    .toContain("Zusätzliche Details")
})

test("opens one inline inspector at a time and collapses it", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  const relationToggle = statementRow(wrapper, "Other item").get("button")
  const dateToggle = statementRow(wrapper, "2000-01-01").get("button")

  await relationToggle.trigger("click")
  expect(relationToggle.attributes("aria-expanded")).toBe("true")
  expect(wrapper.findAll(".jskos-vue-qualifiedStatements-inspector")).toHaveLength(1)

  await dateToggle.trigger("click")
  expect(relationToggle.attributes("aria-expanded")).toBe("false")
  expect(dateToggle.attributes("aria-expanded")).toBe("true")
  expect(wrapper.findAll(".jskos-vue-qualifiedStatements-inspector")).toHaveLength(1)
  expect(wrapper.text()).toContain("Example place")

  await dateToggle.trigger("click")
  expect(dateToggle.attributes("aria-expanded")).toBe("false")
  expect(wrapper.find(".jskos-vue-qualifiedStatements-inspector").exists()).toBe(false)
})

test("closes the inspector when the item changes", async () => {
  const first = {
    qualifiedRelations: {
      [uris.relatedTo]: [{
        resource: { uri: "https://example.org/first", prefLabel: { en: "First item" } },
      }],
    },
  }
  const second = {
    qualifiedRelations: {
      [uris.participatedIn]: [{
        resource: { uri: "https://example.org/second", prefLabel: { en: "Second item" } },
      }],
    },
  }
  const wrapper = mountQualified({ item: first })
  await flushPromises()

  await statementRow(wrapper, "First item").get("button").trigger("click")
  expect(wrapper.find(".jskos-vue-qualifiedStatements-inspector").exists()).toBe(true)

  await wrapper.setProps({ item: second })

  expect(wrapper.find(".jskos-vue-qualifiedStatements-inspector").exists()).toBe(false)
  expect(statementRow(wrapper, "Second item").get("button").attributes("aria-expanded")).toBe("false")
})

test("uses concise breadcrumbs through a long source and nested pagination", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  await statementRow(wrapper, "Definition").get("button").trigger("click")
  expect(wrapper.text()).toContain(sourceCitation)
  expect(wrapper.text()).not.toContain("Page 12")

  await inspectorRow(wrapper, "Sources").get("button").trigger("click")
  let breadcrumb = wrapper.get(".jskos-vue-qualifiedStatements-breadcrumb")
  expect(breadcrumb.findAll("li").map(item => item.text())).toEqual(["Definition", "Source 1"])
  expect(breadcrumb.text()).not.toContain(sourceCitation)
  expect(inspectorRow(wrapper, "Preferred labels").text()).toContain(sourceCitation)

  const uriLink = inspectorRow(wrapper, "URI").get("a")
  expect(uriLink.text()).toBe(sourceCitation)
  expect(uriLink.attributes("href")).toBe(sourceUri)
  expect(uriLink.attributes("title")).toBe(sourceUri)
  expect(wrapper.text()).toContain("Pagination")
  expect(wrapper.text()).toContain("Page 12")

  await inspectorRow(wrapper, "Pagination").get("button").trigger("click")
  breadcrumb = wrapper.get(".jskos-vue-qualifiedStatements-breadcrumb")
  expect(breadcrumb.findAll("li").map(item => item.text())).toEqual([
    "Definition",
    "Source 1",
    "Pagination",
  ])
  expect(breadcrumb.text()).not.toContain("Page 12")

  await breadcrumb.findAll("button")[0].trigger("click")
  expect(wrapper.text()).toContain(sourceCitation)
  expect(wrapper.text()).not.toContain("PaginationPage 12")
})

test("distinguishes multiple sources in breadcrumbs", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  await statementRow(wrapper, "Definition").get("button").trigger("click")
  const sources = wrapper.findAll(".jskos-vue-qualifiedStatements-inspectorRow")
    .filter(row => row.get("dt").text() === "Sources")

  await sources[1].get("button").trigger("click")

  expect(wrapper.get(".jskos-vue-qualifiedStatements-breadcrumb")
    .findAll("li").map(item => item.text())).toEqual(["Definition", "Source 2"])
  expect(inspectorRow(wrapper, "Preferred labels").text()).toContain("Second source")
})

test("opens qualified relation resources directly and groups their types", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  await statementRow(wrapper, "The Birth").get("button").trigger("click")
  await flushPromises()

  expect(inspectorRow(wrapper, "Resource")).toBeUndefined()
  expect(inspectorRow(wrapper, "Preferred labels").text()).toContain("The Birth")
  expect(inspectorRow(wrapper, "Start date").text()).toContain("1984/1985")
  expect(inspectorRow(wrapper, "End date").text()).toContain("1984/1985")
  const scopeNote = inspectorRow(wrapper, "Scope note")
  expect(scopeNote.find("button").exists()).toBe(false)
  expect(inspectorRow(wrapper, "Place").text()).toContain("Knüllwald")
  expect(inspectorRow(wrapper, "Had participant").text()).toContain("Alexis Girard")

  const types = inspectorRow(wrapper, "Types")
  expect(types.findAll("a")).toHaveLength(3)
  expect(types.text()).toContain("Concept, Event, Birth")
  expect(wrapper.get(".jskos-vue-qualifiedStatements-breadcrumb").findAll("li")).toHaveLength(1)
})

test("renders language-map values separately with their language", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  await statementRow(wrapper, "The Birth").get("button").trigger("click")

  const values = inspectorRow(wrapper, "Scope note")
    .findAll(".jskos-vue-qualifiedStatements-languageMapValue")

  expect(values.map(value => value.get("[lang]").text())).toEqual([
    "Deutsche Anmerkung",
    "First English note",
    "Second English note",
    "es war neunzehnhundertvierundachtzig!",
  ])
  expect(values.map(value => value.get("[lang]").attributes("lang")))
    .toEqual(["de", "en", "en", "und"])
  expect(values.map(value => value.get("small").text()))
    .toEqual(["(de)", "(en)", "(en)", "(und)"])
})

test("keeps statement qualifiers separate from matching resource properties", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  await statementRow(wrapper, "The Birth").get("button").trigger("click")

  expect(inspectorRow(wrapper, "Start date").text()).toContain("1984/1985")
  expect(inspectorRow(wrapper, "Statement: Start date").text()).toContain("1900")
  expect(inspectorRow(wrapper, "End date").text()).toContain("1984/1985")
  expect(inspectorRow(wrapper, "Statement: End date").text()).toContain("1901")
  expect(inspectorRow(wrapper, "Types").text()).toContain("Concept, Event, Birth")
  expect(inspectorRow(wrapper, "Statement: Types").text()).toContain("Statement type")
  expect(inspectorRow(wrapper, "Sources").text()).toContain("Resource source")
  expect(inspectorRow(wrapper, "Statement: Sources").text()).toContain("Statement source")
  expect(inspectorRow(wrapper, "Statement: Rank").text()).toContain("preferred")
})

test("navigates directly to nested qualified relation resources with meaningful breadcrumbs", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  await statementRow(wrapper, "The Birth").get("button").trigger("click")
  await inspectorRow(wrapper, "Had participant").get("button").trigger("click")

  expect(inspectorRow(wrapper, "Resource")).toBeUndefined()
  expect(inspectorRow(wrapper, "Preferred labels").text()).toContain("Alexis Girard")
  expect(inspectorRow(wrapper, "Types").text()).toContain("Concept")

  const breadcrumb = wrapper.get(".jskos-vue-qualifiedStatements-breadcrumb")
  expect(breadcrumb.findAll("li").map(item => item.text())).toEqual([
    "The Birth",
    "Had participant: Alexis Girard",
  ])

  await breadcrumb.get("button").trigger("click")
  expect(inspectorRow(wrapper, "Had participant").text()).toContain("Alexis Girard")
})

test("renders mappings and concept bundle semantics together", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  await statementRow(wrapper, "The Birth").get("button").trigger("click")
  await inspectorRow(wrapper, "Place").get("button").trigger("click")
  await inspectorRow(wrapper, "Mappings").get("button").trigger("click")
  await flushPromises()

  expect(wrapper.get(".jskos-vue-qualifiedStatements-breadcrumb")
    .findAll("li").map(item => item.text())).toEqual(["The Birth", "Place", "Mappings"])
  expect(wrapper.findAll(".jskos-vue-qualifiedStatements-mappingHeading")
    .map(heading => heading.get("dt").text())).toEqual(["Mapping 1", "Mapping 2"])

  expect(inspectorRows(wrapper, "Type")).toHaveLength(1)
  expect(inspectorRow(wrapper, "Type").text()).toContain("Exact match")
  expect(inspectorRow(wrapper, "From — memberSet (set)").text()).toContain("Saint John (Kanada)")

  const choices = inspectorRow(wrapper, "To — memberChoice (alternatives)")
  expect(choices.get("ul").findAll("li")).toHaveLength(4)
  expect(choices.findAll("a").map(link => link.attributes("href"))).toEqual([
    "http://geonames.org/3207179",
    "https://d-nb.info/gnd/4369255-2",
    "http://uri.gbv.de/terminology/gn250/DEBKGGND00000H96",
    "http://vocab.getty.edu/tgn/7124998",
  ])
  expect(choices.text()).toContain("uri.gbv.de/…/DEBKGGND00000H96")
  expect(choices.find("button").exists()).toBe(false)

  const ordered = inspectorRow(wrapper, "From — memberList (ordered)")
  expect(ordered.get("ol").findAll("li").map(item => item.text())).toEqual([
    "First concept",
    "Second concept",
  ])
  expect(inspectorRow(wrapper, "To — memberSet (set)").text()).toContain("Target concept")
  expect(inspectorRow(wrapper, "Confidence").text()).toContain("0.95")
  expect(inspectorRow(wrapper, "Note").text()).toContain("Mapping metadata (en)")
})

test("keeps mappings, multiple sources, and objects without URIs accessible", async () => {
  const wrapper = mountQualified()
  await flushPromises()

  await statementRow(wrapper, "Other item").get("button").trigger("click")
  expect(inspectorRow(wrapper, "Resource")).toBeUndefined()
  expect(wrapper.text()).toContain("Mappings")

  await inspectorRow(wrapper, "Mappings").get("button").trigger("click")
  expect(wrapper.text()).toContain("Mapping 1")
  expect(inspectorRow(wrapper, "From — memberSet (set)")).toBeDefined()
  expect(inspectorRow(wrapper, "To — memberSet (set)")).toBeDefined()

  await wrapper.get(".jskos-vue-qualifiedStatements-close").trigger("click")
  await statementRow(wrapper, "Definition").get("button").trigger("click")
  const sources = wrapper.findAll(".jskos-vue-qualifiedStatements-inspectorRow")
    .filter(row => row.get("dt").text() === "Sources")
  expect(sources).toHaveLength(2)
  expect(wrapper.text()).toContain(sourceCitation)
  expect(sources[1].get("a").attributes("href")).toBe("https://example.org/source-two")
  expect(sources[1].text()).toContain("Second source")
})

test("uses semantic disclosure controls and restores focus after Escape", async () => {
  const wrapper = mountQualified({}, { attachTo: document.body })
  await flushPromises()

  const toggle = statementRow(wrapper, "Other item").get("button")
  toggle.element.focus()
  await toggle.trigger("click")

  const inspector = wrapper.get(".jskos-vue-qualifiedStatements-inspector")
  expect(toggle.element.tagName).toBe("BUTTON")
  expect(toggle.attributes("aria-expanded")).toBe("true")
  expect(toggle.attributes("aria-controls")).toBe(inspector.attributes("id"))
  expect(wrapper.find("button a, a button").exists()).toBe(false)

  await inspector.trigger("keydown", { key: "Escape" })
  await nextTick()

  expect(wrapper.find(".jskos-vue-qualifiedStatements-inspector").exists()).toBe(false)
  expect(document.activeElement).toBe(toggle.element)
})

test("handles missing optional fields and an item without statements", async () => {
  const empty = mountQualified({ item: {} })
  await flushPromises()
  expect(empty.find(".jskos-vue-qualifiedStatements").exists()).toBe(false)

  const incomplete = mountQualified({
    item: { qualifiedLiterals: { [uris.name]: [{}] } },
  })
  await flushPromises()
  expect(incomplete.text()).toContain("Unnamed value")
  expect(incomplete.find(".jskos-vue-qualifiedStatements-disclosure").exists()).toBe(false)
})

test("resolves resource details when their qualified statement inspector opens", async () => {
  const withoutLabels = structuredClone(item)
  delete withoutLabels.qualifiedRelations[uris.relatedTo][0].resource.prefLabel
  const resolvedLabels = {
    [uris.relatedTo]: "Related to",
    "https://example.org/other": "Resolved item",
    [uris.type]: "Resolved type",
  }
  const resolve = vi.fn(uri => Promise.resolve({ uri, prefLabel: { en: resolvedLabels[uri] } }))
  const wrapper = mountQualified({ item: withoutLabels, labelForUri: null, resolve })
  await flushPromises()

  expect(wrapper.text()).toContain("Related to")
  expect(wrapper.text()).toContain("Resolved item")
  expect(wrapper.text()).not.toContain("Resolved type")

  await statementRow(wrapper, "Resolved item").get("button").trigger("click")
  await flushPromises()

  expect(wrapper.text()).toContain("Resolved type")
  expect(resolve).toHaveBeenCalledWith(uris.relatedTo)
  expect(resolve).toHaveBeenCalledWith("https://example.org/other")
  expect(resolve).toHaveBeenCalledWith(uris.type)
})

test("supports a cocoda-sdk registry and custom labels", async () => {
  const registry = {
    getConcepts: vi.fn(({ concepts }) => Promise.resolve([
      { uri: concepts[0].uri, prefLabel: { en: "Registry label" } },
    ])),
  }
  const relation = {
    qualifiedRelations: {
      [uris.relatedTo]: [{ resource: { uri: "https://example.org/unlabelled" } }],
    },
  }

  const wrapper = mountQualified({
    item: relation,
    registry,
    labelForUri: uri => uri === uris.relatedTo ? "Custom relation" : "",
  })
  await flushPromises()

  expect(wrapper.text()).toContain("Custom relation")
  expect(wrapper.text()).toContain("Registry label")
  expect(registry.getConcepts).toHaveBeenCalledWith({
    concepts: [{ uri: "https://example.org/unlabelled" }],
  })
  expect(registry.getConcepts).toHaveBeenCalledTimes(1)
})

test("opens distinct qualified statements that share a resource URI", async () => {
  const sharedUri = "https://example.org/shared"
  const repeated = {
    qualifiedRelations: {
      [uris.participatedIn]: [{
        resource: {
          uri: sharedUri,
          prefLabel: { en: "Shared resource" },
          qualifiedRelations: {
            [uris.relatedTo]: [{
              rank: "preferred",
              startDate: "2000",
              resource: {
                uri: sharedUri,
                prefLabel: { en: "Shared resource in another statement" },
              },
            }],
          },
        },
      }],
    },
  }
  const wrapper = mountQualified({ item: repeated })
  await flushPromises()

  await statementRow(wrapper, "Shared resource").get("button").trigger("click")
  const nestedStatement = inspectorRow(wrapper, "Related to")

  expect(nestedStatement.find("button").exists()).toBe(true)
  await nestedStatement.get("button").trigger("click")

  expect(inspectorRow(wrapper, "Statement: Rank").text()).toContain("preferred")
  expect(inspectorRow(wrapper, "Statement: Start date").text()).toContain("2000")
})

test("prevents navigation cycles without a visible depth limit", async () => {
  const cyclic = {
    qualifiedRelations: {
      [uris.relatedTo]: [{
        resource: {
          uri: "https://example.org/child",
          prefLabel: { en: "Child" },
          qualifiedRelations: {
            [uris.relatedTo]: [{
              resource: {
                uri: "https://example.org/child",
                prefLabel: { en: "Child again" },
              },
            }],
          },
        },
      }],
    },
  }
  const wrapper = mountQualified({ item: cyclic })
  await flushPromises()

  await statementRow(wrapper, "Child").get("button").trigger("click")

  expect(wrapper.text()).toContain("Already in this path")
  expect(inspectorRow(wrapper, "Resource")).toBeUndefined()
  expect(inspectorRow(wrapper, "Related to").find("button").exists()).toBe(false)
  expect(wrapper.get(".jskos-vue-qualifiedStatements-breadcrumb").findAll("li")).toHaveLength(1)
})
