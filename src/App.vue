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
      :clickable="true"
      :indicator-by-uri="{
        'test:1': true,
      }"
      @select="!$event.row && handleClick($event)" />
  </p>
  <p>
    Item List (styled with slots):
    <!-- TODO: How to detect clicks on li? -->
    <item-list
      class="item-list-styled"
      :items="[
        { uri: 'test:1', notation: ['1'], prefLabel: { en: 'Concept 1' } },
        { uri: 'test:2', notation: ['2'], prefLabel: { en: 'Concept 2' } },
        { uri: 'test:3', notation: ['3'], prefLabel: { en: 'Concept 3' } },
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
        ({{ item.uri }})
      </template>
    </item-list>
  </p>
  <h2>Item Details</h2>
  <p>
    Settings:
    <button
      @click="examples.detailed.clickable = !examples.detailed.clickable">
      clickable: {{ examples.detailed.clickable }}
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
</template>

<script>
import { defineComponent, reactive } from "vue"
import * as jskos from "jskos-tools"
import { Tab } from "jskos-vue-tabs"

Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0])
  return this
}

const examples = reactive({
  detailed: {
    clickable: true,
    item: {
      uri: "https://example.com/DT",
      notation: ["DT"],
      prefLabel: {
        en: "Detailed Item",
        de: "Detalliertes Item",
      },
      identifier: ["uri:detailed", "test"],
      created: "2021-05-27",
      issued: "2021-05-27",
      modified: "2021-05-28",
      definition: {
        en: ["a defintion"],
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
    return {
      state,
      examples,
    }
  },
  methods: {
    handleClick({ item, row }) {
      alert(`Clicked on item with URI ${item.uri}. (row: ${row})`)
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 30px auto 0 auto;
  max-width: 450px;
}
.item-list-styled {
  background: lightcoral;
}
.item-list-styled > li:hover {
  cursor: pointer;
  background: red;
}
</style>
