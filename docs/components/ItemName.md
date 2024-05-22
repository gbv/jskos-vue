# ItemName
Represents a JSKOS item (concept or concept scheme) with its notation and label.

Uses [dragAndDrop](../utilities/dragAndDrop) and is draggable by default.

## Props
- `item` (object) - JSKOS item
  - required
- `showNotation` (boolean) - whether to show the item's notation
  - default: `true`
- `showLabel` (boolean) - whether to show the item's label (`prefLabel`)
  - default: `true`
- `fallbackLabel` (string) - string that will be shown if both notation and label are empty
  - default: "???"
- `language` (string) - preferred language for the label
  - default: uses [jskos-tools' languagePreference](https://gbv.github.io/jskos-tools/#languagepreference)
- `clickable` (boolean) - adjusts mouse pointer and text decoration on hover if `true`
  - default: `false`
- `draggable` (boolean) - whether the item is draggable
  - default: `true`

## Plugins for notations and labels
You can adjust how notations/labels are processed in `ItemName` by providing plugins. A plugin is a simple function that receives the current label/notation and the component's props as parameters and returns the processed label/notation. Plugins can be added on the imported component directly using the provided `addLabelPlugin` and `addNotationPlugin` methods.

For example, you can use the following snippet to add trailing zeros to DDC notations in the first two levels:

```js
import { ItemName } from "jskos-vue"
ItemName.addNotationPlugin((notation, { item }) => {
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
    // Using the shared `jskos-vue-text-lightGrey` CSS class
    notation += `<span class='jskos-vue-text-lightGrey'>${fill}</span>`
  }
  return notation
})
```

## Examples

<script setup>
import { reactive } from "vue"
import ItemName from "../../src/components/ItemName.vue"
import * as jskos from "jskos-tools"

// Setup jskos-tools' languagePreference
const state = reactive({
  languages: ["en", "de", "fr"],
})
jskos.languagePreference.store = state
jskos.languagePreference.path = "languages"

// Add move method to arrays
Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0])
  return this
}

const concept1 = {
  notation: ["EX"],
}
const concept2 = {
  notation: ["EX"],
  prefLabel: {
    en: "Example",
    de: "Beispiel",
    fr: "Exemple",
  },
}
const concept3 = {}

const concepts = [
  concept1,
  concept2,
  concept3,
]
</script>

<p>
  Change language:
  <span
    v-for="(language, index) in state.languages"
    :key="index">
    <button
      @click="state.languages.move(index, 0)">
      {{ language }}
    </button> -
  </span>
</p>
<ul>
  <li
    v-for="(concept, index) in concepts"
    :key="index">
    <item-name :item="concept" />
  </li>
</ul>

```vue
<template>
  <p>
    Change language:
    <span
      v-for="(language, index) in state.languages"
      :key="index">
    <button
      @click="state.languages.move(index, 0)">
      {{ language }}
    </button> -
    </span>
  </p>
  <ul>
    <li
      v-for="(concept, index) in concepts"
      :key="index">
      <item-name :item="concept" />
    </li>
  </ul>
</template>

<script setup>
import { reactive } from "vue"
import { ItemName } from "jskos-vue"
import * as jskos from "jskos-tools"

// Setup jskos-tools' languagePreference
const state = reactive({
  languages: ["en", "de", "fr"],
})
jskos.languagePreference.store = state
jskos.languagePreference.path = "languages"

// Add move method to arrays
Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0])
  return this
}

const concept1 = {
  notation: ["EX"],
}
const concept2 = {
  notation: ["EX"],
  prefLabel: {
    en: "Example",
    de: "Beispiel",
    fr: "Exemple",
  },
}
const concept3 = {}

const concepts = [
  concept1,
  concept2,
  concept3,
]
</script>
```
