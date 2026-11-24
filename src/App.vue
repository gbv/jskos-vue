<template>
  <h1>jskos-vue</h1>
  <section class="localization-demo">
    <h2>Localization</h2>
    <div class="localization-demo-controls">
      <label>
        UI locale
        <select v-model="uiLocale">
          <option value="en">English</option>
          <option value="de">German</option>
        </select>
      </label>
      <label>
        <input
          v-model="state.useContentLanguages"
          type="checkbox">
        Use explicit content preferences
      </label>
    </div>
    <div class="localization-demo-languages">
      <span>Content language order:</span>
      <button
        v-for="(language, index) in state.languages"
        :key="language"
        :class="{ 'localization-demo-language-preferred': state.useContentLanguages && index === 0 }"
        type="button"
        :disabled="!state.useContentLanguages"
        @click="state.languages.move(index, 0)">
        {{ language }}
      </button>
      <small v-if="!state.useContentLanguages">
        Vue I18n fallback active
      </small>
    </div>
    <dl class="localization-demo-examples">
      <dt>LicenseInfo (multilingual)</dt>
      <dd>
        <license-info :item="multilingualLicense" />
        <small class="localization-demo-hint">
          Its label follows the content preference; its tooltip uses the UI locale.
        </small>
      </dd>
      <dt>LicenseInfo (badge)</dt>
      <dd>
        <license-info :item="{ license: [ { uri: 'http://creativecommons.org/licenses/by-nc-nd/3.0/' } ] }" />
      </dd>
      <dt>ItemName</dt>
      <dd><item-name :item="fish" /></dd>
      <dt>ItemName (explicit German)</dt>
      <dd>
        <item-name
          :item="fish"
          language="de" />
      </dd>
    </dl>
  </section>
  <p>
    Item (no label):
    <item-name
      :item="fish"
      :show-label="false" />
  </p>
  <p>
    Item (no notation, not draggable):
    <item-name
      :item="fish"
      :show-notation="false"
      :draggable="false" />
  </p>
  <p>
    Item (clickable):
    <item-name
      :item="fish"
      :clickable="true"
      @click="handleClick({ item: { uri: 'uri:clickableItem' }})" />
  </p>
  <p>
    Item (without notation/label, fallback to URI):
    <item-name
      :item="{ uri: 'some:uri' }"
      :clickable="true" />
  </p>
  <p>
    Item (without notation/label/uri):
    <item-name
      :item="{}" />
  </p>
  <p>
    Item List:
    <item-list
      :items="[
        { uri: 'test:1', notation: ['1'], prefLabel: { en: 'Concept 1' } },
        { uri: 'test:2', notation: ['2'], prefLabel: { en: 'Concept 2' } },
        { uri: 'test:3', notation: ['3'], prefLabel: { en: 'Concept 3' } },
        null,
      ]"
      :row-mode="false"
      :item-name-options="{
        clickable: true,
      }"
      :indicator-by-uri="{
        'test:1': true,
      }"
      @select="handleClick($event)" />
  </p>
  <p>
    Item List (styled with slots):
    <item-list
      class="item-list-styled"
      :items="[
        { uri: 'test:1', notation: ['1'], prefLabel: { en: 'Concept 1' } },
        { uri: 'test:2', notation: ['2'], prefLabel: { en: 'Concept 2' } },
        { uri: 'test:3', notation: ['3'], prefLabel: { en: 'Concept 3' } },
        null,
      ]"
      :indicator-by-uri="{
        'test:1': true,
        'test:2': 'red',
        'test:3': 'blue',
      }"
      @select="handleClick">
      <template #beforeItem>
        🚀
      </template>
      <template #afterItem="{ item }">
        ({{ item && item.uri }})
      </template>
    </item-list>
  </p>
  <h2>
    ItemList with 10,000 items (scrolling)
  </h2>
  <p>
    <button @click="loadLongItemList">
      Load data
    </button>
    <button @click="$refs.longItemList.scrollToUri(longItemListGetRandomUri())">
      Scroll to random
    </button>
  </p>
  <item-list
    ref="longItemList"
    style="height: 300px; overflow-y: scroll; border: 2px solid #0001;"
    :items="examples.longConceptList"
    @select="handleClick" />
  <h2>Item Details</h2>
  <p>
    Settings:
    <button
      @click="() => {
        if (examples.detailed.itemListOptions.indicatorByUri) {
          examples.detailed.itemListOptions._indicatorByUri = examples.detailed.itemListOptions.indicatorByUri
          delete examples.detailed.itemListOptions.indicatorByUri
        } else {
          examples.detailed.itemListOptions.indicatorByUri = examples.detailed.itemListOptions._indicatorByUri
          delete examples.detailed.itemListOptions._indicatorByUri
        }
      }">
      indicators: {{ !!examples.detailed.itemListOptions.indicatorByUri }}
    </button>
    <button
      v-if="!examples.detailed.item.scopeNote"
      @click="examples.detailed.item.scopeNote = {
        de: ['Scope Deutsch'],
        en: ['Scope English'],
      }">
      Add scopeNote
    </button>
  </p>
  <p>
    <item-details
      v-bind="examples.detailed"
      @select="handleClick">
      <template #tabs>
        <tab title="Test">
          This tab was added via the "tabs" slot.
        </tab>
        <div style="position: absolute; top: 0; right: 0;">
          🚀
        </div>
      </template>
      <template #beforeName>
        🆇
      </template>
      <template #afterName>
        ⭐️
        <div style="position: absolute; top: 0; right: 0;">
          ➕
        </div>
      </template>
    </item-details>
  </p>
  <p>
    <item-details
      v-bind="examples.detailedScheme"
      @select="handleClick" />
  </p>
  <h3>Item Details (flat display - experimental)</h3>
  <p>
    <item-details
      v-bind="examples.detailed"
      :flat="true"
      @select="handleClick" />
  </p>
  <h2>
    ItemSuggest - DDC from API, with ItemDetails for selected
  </h2>
  <p>
    <button @click.stop="$refs.itemSuggest.focus()">
      Focus input
    </button>
    <button @click.stop="$refs.itemSuggest.setQuery('test')">
      Set query
    </button>
    <button @click.stop="$refs.itemSuggest.setQuery('tests', true)">
      Set query and focus
    </button>
    <item-suggest
      v-if="examples.conceptTree.scheme"
      ref="itemSuggest"
      :search="search => examples.conceptTree.scheme._registry.suggest({ search, scheme: examples.conceptTree.scheme })"
      @select="examples.itemSuggest.setSelected($event, examples.conceptTree.scheme._registry)" />
  </p>
  <p>
    <item-details
      v-if="examples.itemSuggest.selected"
      :item="examples.itemSuggest.selected"
      @select="(event) => {
        if (!event.row) {
          examples.itemSuggest.setSelected(event.item)
        }
      }" />
  </p>
  <h2>
    ConceptTree
  </h2>
  <concept-tree
    :concepts="[examples.detailed.item]"
    @select="handleClick" />
  <h2>
    ConceptTree - DDC from API + Scroll
  </h2>
  <p>
    <button
      @click="$refs.conceptTree.scrollToUri('http://dewey.info/class/4--0/e23/', true)">
      Scroll to T4--0 (only if not in view)
    </button>
    Selected: {{ examples.conceptTree.selected && examples.conceptTree.selected.notation[0] || "none" }}
    <button @click="examples.conceptTree.selected = null">
      deselect
    </button>
  </p>
  <concept-tree
    v-if="examples.conceptTree.concepts"
    ref="conceptTree"
    v-model="examples.conceptTree.selected"
    style="height: 400px; overflow-y: scroll; border: 2px solid #0001;"
    :concepts="examples.conceptTree.concepts"
    @open="examples.conceptTree.loadNarrower($event)" />
  <h2>
    ConceptTree - DDC from API + Scroll + beforeItem/afterItem + itemListOptions
  </h2>
  <concept-tree
    v-if="examples.conceptTree.concepts"
    v-model="examples.conceptTree.selected"
    style="height: 400px; overflow-y: scroll; border: 2px solid #0001;"
    :concepts="examples.conceptTree.concepts"
    :item-list-options="examples.conceptTree.itemListOptions"
    @open="examples.conceptTree.loadNarrower($event)"
    @select="handleClick">
    <template #beforeItem="{ item }">
      <span
        class="opacity-hover"
        @click.stop="alert(`Clicked on Star for item ${item.uri}`)">
        ⭐️
      </span>
    </template>
    <template #afterItem="{ item }">
      <div
        class="opacity-hover"
        style="position: absolute; width: 20px; right: 2px; top: 50%; transform: translateY(-50%);"
        @click.stop="alert(`Clicked on Rocket for item ${item.uri}`)">
        🚀
      </div>
    </template>
  </concept-tree>
  <h2>
    ConceptTree - DDC from API + no hierarchy
  </h2>
  <concept-tree
    v-if="examples.conceptTree.concepts"
    v-model="examples.conceptTree.selected"
    style="border: 2px solid #0001; margin-bottom: 40px;"
    :concepts="examples.conceptTree.concepts.slice(0, 6)"
    :hierarchy="false" />
  <hr>  

  <h2>ItemSelect DDC concepts from API (typeahead / suggest)</h2>

  <h3>Tags</h3>

  <p
    v-if="examples.conceptTree.scheme"
    style="padding-bottom: 20px;">
    <label>DDC with tag view</label>

    <item-select
      :search="search => examples.conceptTree.scheme._registry.suggest({ search, scheme: examples.conceptTree.scheme })"
      placeholder="Search DDC concepts…"
      @select="addSelected" />

    <item-selected
      v-model="examples.itemSelect.selected"
      view="tags"
      removable />
  </p>
  <h3>Table</h3>

  <p v-if="examples.conceptTree.scheme">
    <label>DDC with table view</label>

    <item-select
      :search="search => examples.conceptTree.scheme._registry.suggest({ search, scheme: examples.conceptTree.scheme })"
      placeholder="Search DDC concepts…"
      @select="addSelected" />

    <item-selected
      v-model="examples.itemSelect.selected"
      view="table"
      :orderable="true"
      removable />
  </p>
  <h3>List</h3>

  <p v-if="examples.conceptTree.scheme">
    <label>DDC with list view</label>

    <item-select
      :search="search => examples.conceptTree.scheme._registry.suggest({ search, scheme: examples.conceptTree.scheme })"
      placeholder="Search DDC concepts…"
      @select="addSelected" />

    <item-selected
      v-model="examples.itemSelect.selected"
      view="list"
      removable />
  </p>

  <h2>ItemSelect DDC concepts from API (typeahead / suggest ) and conceptTree browsing UX</h2>
  <h3>Table</h3>

  <p
    v-if="examples.conceptTree.scheme && examples.conceptTree.concepts"
    style="padding-bottom: 20px;">
    <label>DDC with table view + browsing</label>

    <!-- Select ONE item via typeahead and/or tree -->
    <item-select
      :search="search => examples.conceptTree.scheme._registry.suggest({ search, scheme: examples.conceptTree.scheme })"
      placeholder="Search DDC concepts…"
      :show-tree="true"
      :tree-concepts="examples.conceptTree.concepts"
      :tree-load-narrower="examples.conceptTree.loadNarrower"
      @select="addSelected" />

    <!-- Render selected items separately -->
    <item-selected
      v-model="examples.itemSelect.selected"
      view="table"
      orderable
      removeable />
  </p>
  <h2>Mapping table</h2>
  <p>
    <mapping-table
      :mappings="examples.mappings"
      :show-labels="true" />
  </p>

  <h2>Qualified Statements</h2>
  <p>
    Data from
    <a :href="qualifiedStatementsSource">cocoda-Test-Person</a>
  </p>
  <loading-indicator
    v-if="examples.qualifiedStatements.loading"
    size="md" />
  <p v-else-if="examples.qualifiedStatements.error">
    Could not load Qualified Statements: {{ examples.qualifiedStatements.error }}
  </p>
  <qualified-statements
    v-else-if="examples.qualifiedStatements.item"
    :item="examples.qualifiedStatements.item"
    :registry="qualifiedStatementsRegistry" />

  <p>
    Loading indicator:
    <loading-indicator size="sm" />
    <loading-indicator size="md" />
    <loading-indicator size="lg" />
    <loading-indicator size="xl" />
  </p>
  <p>
    Arrows:
    <arrow direction="left" /> (left)
    <arrow direction="right" /> (right)
    <arrow
      direction="up"
      :clickable="true" /> (up + clickable)
    <arrow
      direction="down"
      :clickable="true" /> (down + clickable)
  </p>
</template>

<script setup>
import { reactive } from "vue"
import * as jskos from "jskos-tools"
import { Tab } from "jskos-vue-tabs"
import { cdk } from "cocoda-sdk"
import { useI18n } from "petite-vue-i18n"
// Add ItemName plugin
import ItemName from "./components/ItemName.vue"

const { locale: uiLocale } = useI18n({ useScope: "global" })

ItemName.addNotationPlugin((notation, { item }) => {
  // Add leading zeros for DDC items
  let fill = ""
  // For DDC and SDNB only: fill number notation with trailing zeros
  if (jskos.compare({
    uri : "http://dewey.info/scheme/edition/e23/",
    identifier : [
      "http://bartoc.org/en/node/241",
      "http://bartoc.org/en/node/18497",
      "http://www.wikidata.org/entity/Q67011877",
      "http://id.loc.gov/vocabulary/classSchemes/sdnb",
      "http://uri.gbv.de/terminology/sdnb",
    ],
  }, item.inScheme && item.inScheme[0]) && !isNaN(parseInt(notation))) {
    while (notation.length + fill.length < 3) {
      fill += "0"
    }
  }
  if (fill.length) {
    notation += `<span class='jskos-vue-text-lightGrey'>${fill}</span>`
  }
  return notation
})

Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0])
  return this
}

function addSelected(item) {
  if (!item?.uri) {
    return
  }
  const exists = examples.itemSelect.selected.some((i) => i?.uri === item.uri)
  if (!exists) {
    examples.itemSelect.selected.push(item)
  }
}

const registry = cdk.initializeRegistry({
  provider: "ConceptApi",
  api: "https://coli-conc.gbv.de/api/",
})

const qualifiedStatementsRegistry = cdk.initializeRegistry({
  provider: "ConceptApi",
  api: "https://api.dante.gbv.de/",
})
const qualifiedStatementsUri = "https://officialuri.com/1234_bio_transfer_test_testpool_person"
const qualifiedStatementsSource = `https://uri.gbv.de/terminology/cocoda_test_person/?uri=${encodeURIComponent(qualifiedStatementsUri)}`

const fish = { notation: ["F"], prefLabel: { en: "fish", de: "Fisch" } }
const multilingualLicense = {
  license: [{
    uri: "https://example.org/license",
    notation: ["EX"],
    prefLabel: {
      en: "Example license",
      de: "Beispiellizenz",
    },
  }],
  publisher: [{
    url: "https://example.org/publisher",
    prefLabel: {
      en: "Example publisher",
      de: "Beispielverlag",
    },
  }],
}

const examples = reactive({
  detailed: {
    itemListOptions: {
      indicatorByUri: {
        "https://example.com/DT2": true,
        "https://example.com/DT3": true,
      },
    },
    item: {
      uri: "https://example.com/DT",
      notation: ["DT"],
      prefLabel: {
        en: "Detailed Item",
        de: "Detalliertes Item",
      },
      altLabel: {
        fr: ["Désignation alternative"],
        de: ["Alternative Benennung", "noch eine"],
      },
      editorialNote: {
        en: ["Editorial English"],
        de: ["Editorial Deutsch"],
        fr: ["Editorial Français"],
      },
      identifier: ["uri:detailed", "test"],
      created: "2021-05-27",
      issued: "2021-05-27",
      modified: "2021-05-28",
      definition: {
        en: ["a defintion", "a second definition"],
        de: ["eine Definition"],
      },
      publisher: [
        {
          prefLabel: {
            de: "Verbundzentrale des GBV (VZG)",
          },
          url: "https://www.gbv.de",
        },
        {
          prefLabel: {
            de: "Test de",
            en: "Test en",
          },
        },
      ],
      narrower: [
        {
          uri: "https://example.com/DT1",
          notation: ["DT1"],
          prefLabel: {
            en: "a Child",
            de: "ein Unterkonzept",
          },
        },
        {
          uri: "https://example.com/DT2",
          notation: ["DT2"],
          prefLabel: {
            en: "another Child",
            de: "ein weiteres Unterkonzept",
          },
        },
        {
          uri: "https://example.com/DT3",
          notation: ["DT3"],
          prefLabel: {
            en: "yet another Child",
            de: "noch ein weiteres Unterkonzept",
          },
        },
      ],
      ancestors: [
        {
          uri: "https://example.com/D",
          notation: ["D"],
          prefLabel: {
            en: "an Ancestor",
            de: "ein Elternkonzept",
          },
        },
      ],
      broader: [
        {
          uri: "https://example.com/D",
          notation: ["D"],
          prefLabel: {
            en: "an Ancestor",
            de: "ein Elternkonzept",
          },
        },
        {
          uri: "https://example.com/D-alt",
          notation: ["D-alt"],
          prefLabel: {
            en: "a broader concept",
            de: "ein übergeordnetes Konzept",
          },
        },
      ],
    },
  },
  detailedScheme: {
    item: {
      prefLabel: {
        de: "Dewey-Dezimalklassifikation",
        en: "Dewey Decimal Classification",
      },
      license: [
        {
          uri: "http://creativecommons.org/licenses/by-nc-nd/3.0/",
        },
        {
          uri: "some:other:license",
        },
      ],
      uri: "http://bartoc.org/en/node/241",
      url: "http://www.oclc.org/dewey/",
      publisher: [
        {
          uri: "http://viaf.org/viaf/156508705",
          prefLabel: {
            en: "Online Computer Library Center (OCLC)",
          },
        },
        {
          uri: "http://d-nb.info/gnd/1086052218",
          prefLabel: {
            de: "OCLC",
          },
          altLabel: {
            de: [
              "OCLC Online Computer Library Center",
            ],
          },
          url: "https://www.oclc.org/",
        },
      ],
      identifier: [
        "http://www.wikidata.org/entity/Q48460",
        "http://dewey.info/scheme/edition/e23/",
      ],
      created: "2013-09-06T14:57:00Z",
      issued: "1876",
      modified: "2021-03-15T15:09:24.994Z",
      languages: [
        "ar",
        "nb",
        "zh",
        "fr",
        "de",
      ],
      type: [
        "http://www.w3.org/2004/02/skos/core#ConceptScheme",
        "http://w3id.org/nkos/nkostype#classification_schema",
      ],
      // top concepts (?)
    },
  },
  conceptTree: {
    scheme: null,
    async loadScheme() {
      this.scheme = (await registry.getSchemes({
        params: {
          uri: "http://bartoc.org/en/node/241", // DDC
        },
      }))[0]
    },
    concepts: null,
    async loadConcepts() {
      this.concepts = jskos.sortConcepts(await registry.getTop({ scheme: this.scheme }))
    },
    async loadNarrower(concept) {
      if (concept.narrower && !concept.narrower.includes(null)) {
        return
      }
      concept.narrower = jskos.sortConcepts(await registry.getNarrower({ concept }))
    },
    selected: null,
    itemListOptions: {
      indicatorByUri: {
        "http://dewey.info/class/00/e23/": true,
        "http://dewey.info/class/1/e23/": true,
        "http://dewey.info/class/2/e23/": true,
        "http://dewey.info/class/4/e23/": true,
      },
    },
  },
  longConceptList: [],
  itemSuggest: {
    selected: null,
    async setSelected(concept, _registry) {
      // 1. Set selected to concept
      this.selected = concept
      // 2. Load data from API
      const registry = _registry || concept._registry || concept.inScheme[0]._registry
      if (registry) {
        concept = (await registry.getConcepts({ concepts: [concept] }))[0]
        concept.narrower = jskos.sortConcepts(await registry.getNarrower({ concept }))
        concept.ancestors = jskos.sortConcepts(await registry.getAncestors({ concept }))
        if (concept) {
          this.selected = concept
        }
      }
    },
  },
  itemSelect: {
    selected: [],
  },
  qualifiedStatements: {
    item: null,
    loading: false,
    error: "",
    async load() {
      this.loading = true
      this.error = ""
      try {
        const [item] = await qualifiedStatementsRegistry.getConcepts({
          concepts: [{ uri: qualifiedStatementsUri }],
          params: { properties: "*" },
        })
        this.item = item
        if (!item) {
          throw new Error("No item returned")
        }
      } catch (error) {
        this.error = error?.message || String(error)
      } finally {
        this.loading = false
      }
    },
  },
  mappings: [],
})


const state = reactive({
  useContentLanguages: true,
  languages: ["en", "de", "fr"],
  get activeLanguages() {
    return this.useContentLanguages ? this.languages : []
  },
})
jskos.languagePreference.store = state
jskos.languagePreference.path = "activeLanguages"

/*
const selectedLangs = ref([])

const LANGUAGE_OPTIONS = [
  { uri: "urn:lang:en", prefLabel: { en: "English" }, __label: "English" },
  { uri: "urn:lang:it", prefLabel: { it: "Italiano" }, __label: "Italiano" },
  { uri: "urn:lang:de", prefLabel: { de: "Deutsch" }, __label: "Deutsch" },
]
*/

// Initialize conceptTree example
;(async () => {
  await examples.conceptTree.loadScheme()
  await examples.conceptTree.loadConcepts()
})()
examples.qualifiedStatements.load()
// Initialize long ConceptList example
const loadLongItemList = async () => {
  const url = "https://coli-conc.gbv.de/api/voc/concepts?uri=http://dewey.info/scheme/edition/e23/&limit=10000"
  const response = await fetch(url)
  const data = await response.json()
  examples.longConceptList = data
}
const longItemListGetRandomUri = () => {
  const index = Math.floor(Math.random() * examples.longConceptList.length)
  console.log(examples.longConceptList[index].uri)
  return examples.longConceptList[index] && examples.longConceptList[index].uri
}

function handleClick({ item, row }) {
  alert(`Clicked on item with URI ${item.uri}. (row: ${row})`)
}

function alert(...args) {
  window.alert(...args)
}

fetch("https://coli-conc.gbv.de/api/mappings?limit=10")
  .then(res => res.json())
  .then(res => {
    examples.mappings = res 
  })
</script>

<style>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 30px auto 0 auto;
  max-width: 900px;
  line-height: 1.4;
  padding: 20px;
}
.item-list-styled {
  background: lightcoral;
}
.item-list-styled > .jskos-vue-itemList-row-selectable:hover {
  cursor: pointer;
  background: red;
}
.opacity-hover:hover {
  opacity: 50%;
}
.localization-demo {
  border: 1px solid #d8dee4;
  margin-bottom: 1.5rem;
  padding: 0 1rem 1rem;
}
.localization-demo-controls,
.localization-demo-languages {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 0.75rem;
}
.localization-demo-controls label {
  align-items: center;
  display: flex;
  gap: 0.4rem;
}
.localization-demo-languages button {
  margin: 0;
}
.localization-demo-language-preferred {
  border-color: currentColor;
  font-weight: 700;
}
.localization-demo-hint {
  display: block;
  opacity: 0.7;
}
.localization-demo-examples {
  display: grid;
  gap: 0.4rem 1rem;
  grid-template-columns: max-content minmax(0, 1fr);
  margin: 0;
}
.localization-demo-examples dt {
  font-weight: 600;
}
.localization-demo-examples dd {
  margin: 0;
}
@media (max-width: 500px) {
  .localization-demo-examples {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
