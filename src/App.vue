<template>
  <h1>jskos-vue</h1>
  <p>
    Change language:
    <span
      v-for="(language, index) in state.languages"
      :key="index">
      <a
        href=""
        @click.prevent="state.languages.move(index, 0)">
        {{ language }}
      </a> -
    </span>
  </p>
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
  <p>
    Item (notation+label):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }" />
  </p>
  <p>
    Item (no label):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }"
      :show-label="false" />
  </p>
  <p>
    Item (no notation):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }"
      :show-notation="false" />
  </p>
  <p>
    Item (clickable):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }"
      :clickable="true"
      @click="handleClick({ item: { uri: 'uri:clickableItem' }})" />
  </p>
  <p>
    Item (multiple languages):
    <br>
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName', de: 'ItemName (de)' } }" />
    <br>
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName', de: 'ItemName (de)' } }"
      language="de" />
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
    style="height: 300px; overflow: scroll; border: 2px solid #0001;"
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
    <concept-search
      v-if="examples.conceptTree.scheme"
      ref="itemSuggest"
      :scheme="examples.conceptTree.scheme"
      @select="examples.itemSuggest.setSelected($event)" />
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
      @click="$refs.conceptTree.scrollToUri('http://dewey.info/class/6--0/e23/')">
      Scroll to 6--0
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
    style="height: 400px; overflow: scroll; border: 2px solid #0001;"
    :concepts="examples.conceptTree.concepts"
    @open="examples.conceptTree.loadNarrower($event)" />
  <h2>
    ConceptTree - DDC from API + Scroll + beforeItem/afterItem + itemListOptions
  </h2>
  <concept-tree
    v-if="examples.conceptTree.concepts"
    v-model="examples.conceptTree.selected"
    style="height: 400px; overflow: scroll; border: 2px solid #0001;"
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
    style="border: 2px solid #0001;"
    :concepts="examples.conceptTree.concepts.slice(0, 6)"
    :hierarchy="false" />
</template>

<script>
import { defineComponent, reactive } from "vue"
import * as jskos from "jskos-tools"
import { Tab } from "jskos-vue-tabs"

// Add ItemName plugin
import ItemName from "./components/ItemName.vue"
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

import * as cdk from "cocoda-sdk"
const registry = cdk.initializeRegistry({
  provider: "ConceptApi",
  api: "https://coli-conc.gbv.de/api/",
})

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
      this.concepts = jskos.sortConcepts(await this.scheme._getTop())
    },
    async loadNarrower(concept) {
      if (concept.narrower && !concept.narrower.includes(null)) {
        return
      }
      concept.narrower = jskos.sortConcepts(await concept._getNarrower())
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
    async setSelected(concept) {
      // 1. Set selected to concept
      this.selected = concept
      // 2. Load data from API
      const registry = concept._registry || concept.inScheme[0]._registry
      if (registry) {
        concept = (await registry.getConcepts({ concepts: [concept] }))[0]
        concept.narrower = jskos.sortConcepts(await concept._getNarrower())
        concept.ancestors = jskos.sortConcepts(await concept._getAncestors())
        // 3. Set selected to new concept
        if (concept) {
          this.selected = concept
        }
      }
    },
  },
})

export default defineComponent({
  name: "App",
  components: {
    Tab,
  },
  setup() {
    const state = reactive({
      languages: ["en", "de", "fr"],
    })
    jskos.languagePreference.store = state
    jskos.languagePreference.path = "languages"

    // Initialize conceptTree example
    ;(async () => {
      await examples.conceptTree.loadScheme()
      await examples.conceptTree.loadConcepts()
    })()
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

    return {
      state,
      examples,
      loadLongItemList,
      longItemListGetRandomUri,
    }
  },
  methods: {
    handleClick({ item, row }) {
      alert(`Clicked on item with URI ${item.uri}. (row: ${row})`)
    },
    alert() {
      alert(...arguments)
    },
  },
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
  max-width: 450px;
  line-height: 1.4;
}
.item-list-styled {
  background: lightcoral;
}
.item-list-styled > div:hover {
  cursor: pointer;
  background: red;
}
.opacity-hover:hover {
  opacity: 50%;
}
</style>
