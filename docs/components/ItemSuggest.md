# ItemSuggest

Input field to search and select an item (usually concept or concept scheme) from a list of search results. Shows a [LoadingIndicator](./LoadingIndicator) while waiting for results.

## Props

- `search(query)` *async function* — custom search function that provides results in [OpenSearch Suggest Format](https://github.com/dewitt/opensearch/blob/master/mediawiki/Specifications/OpenSearch/Extensions/Suggestions/1.1/Draft%201.wiki):
  - `query` is the search string
- `placeholder` *string, default `"Type to search..."`* — placeholder string. `null` uses the default placeholder, an empty string clears it.

## Methods

- `focus()` — focuses the input field
- `setQuery(newQuery, focus = false)` — sets the query (input field) to `newQuery`; optionally focuses the input field

## Events

- `select` is emitted when a search result is selected (either via click or enter). Parameter is an object with property `uri`.

## CSS classes

- `.jskos-vue-itemSuggest` — the component element
- `.jskos-vue-itemSuggest-loading` — 
- `.jskos-vue-itemSuggest-results` — 
- `.jskos-vue-itemSuggest-results-item` — 
- `.jskos-vue-itemSuggest-results-list` — 
- `.jskos-vue-itemSuggest-selected` — 

## Examples

### Search with a custom search function

This example provides a custom search function (results come from local data in this case).

::: component-view
<script setup>
import ItemSuggest from "../../src/components/ItemSuggest.vue"
import { cdk } from "cocoda-sdk"
import * as utils from "../../src/utils.js"
import { ref, onMounted } from "vue"

const registry = ref(null)
const bartocRegistry = ref(null)
onMounted(() => {
  registry.value = cdk.initializeRegistry({
    provider: "ConceptApi",
    api: "https://coli-conc.gbv.de/api/",
  })
  bartocRegistry.value = cdk.initializeRegistry({
    provider: "ConceptApi",
    api: "https://bartoc.org/api/",
  })
})

const scheme = {
  uri: "http://dewey.info/scheme/edition/e23/",
  license: [
    {
      uri: "http://creativecommons.org/licenses/by-nc-nd/3.0/"
    }
  ],
}

// Custom data and search function
const data = [
  { "id": 1, "name": "Bulbasaur" },
  { "id": 2, "name": "Ivysaur" },
  { "id": 3, "name": "Venusaur" },
  { "id": 4, "name": "Charmander" },
  { "id": 5, "name": "Charmeleon" },
  { "id": 6, "name": "Charizard" },
  { "id": 7, "name": "Squirtle" },
  { "id": 8, "name": "Wartortle" },
  { "id": 9, "name": "Blastoise" },
  { "id": 10, "name": "Caterpie" },
  { "id": 11, "name": "Metapod" },
  { "id": 12, "name": "Butterfree" },
  { "id": 13, "name": "Weedle" },
  { "id": 14, "name": "Kakuna" },
  { "id": 15, "name": "Beedrill" },
  { "id": 16, "name": "Pidgey" },
  { "id": 17, "name": "Pidgeotto" },
  { "id": 18, "name": "Pidgeot" },
  { "id": 19, "name": "Rattata" },
  { "id": 20, "name": "Raticate" },
]
const searchPokemon = async (query) => {
  query = query.toLowerCase()
  const results = data.filter(entry => entry.name.toLowerCase().includes(query))
  // Convert to OpenSearch Suggest Format
  const result = [query]
  result[1] = results.map(r => r.name)
  result[2] = results.map(() => "")
  result[3] = results.map(r => `pokemon:${r.id}`)
  return result
}
</script>


<item-suggest
  :search="searchPokemon" />

:::


### Search for concepts inside a concept scheme

This example uses the [coli-conc API](https://coli-conc.gbv.de/api/) via [cocoda-sdk](https://github.com/gbv/cocoda-sdk) to search 
for concepts inside the German Dewey Decimal Classification (DDC, licensed by [OCLC](https://www.oclc.org/) under CC BY-NC-ND 3.0).

<item-suggest
  :search="search => registry.suggest({ search, scheme })" />

```vue
<template>
  <item-suggest
    :search="search => registry.suggest({ search, scheme })" />
</template>

<script setup>
import { ItemSuggest, utils } from "jskos-vue"
import * as cdk from "cocoda-sdk"
import { ref, onMounted } from "vue"

const registry = ref(null)
onMounted(() => {
  registry.value = cdk.initializeRegistry({
    provider: "ConceptApi",
    api: "https://coli-conc.gbv.de/api/",
  })
})

const scheme = {
  uri: "http://dewey.info/scheme/edition/e23/",
  license: [
    {
      uri: "http://creativecommons.org/licenses/by-nc-nd/3.0/"
    }
  ],
}
</script>
```

### Search for schemes in BARTOC

This example uses the [BARTOC API](https://bartoc.org) via [cocoda-sdk](https://github.com/gbv/cocoda-sdk) to search for vocabularies.

<item-suggest :search="search => bartocRegistry.vocSuggest({ search })" />

```vue
<template>
  <item-suggest :search="search => bartocRegistry.vocSuggest({ search })" />
</template>

<script setup>
import { ItemSuggest, utils } from "jskos-vue"
import * as cdk from "cocoda-sdk"
import { ref, onMounted } from "vue"

const bartocRegistry = ref(null)
onMounted(() => {
  bartocRegistry.value = cdk.initializeRegistry({
    provider: "ConceptApi",
    api: "https://bartoc.org/api/",
  })
})
</script>
```
