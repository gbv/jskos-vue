# MappingTable

A table of [JSKOS mappings](https://gbv.github.io/jskos/#mapping).

Concept and creator labels, as well as type-label comparisons, use the shared
[content language selection](../utilities/useContentLanguage).

## Props

- `mappings` *array, required* — the list of mappings to be displayed.

- `fields` *array, optional* — which fields to show in which order and which width in percent. Default:
  `["fromScheme:10", "from:22", "type:8", "toScheme:10", "to:22", "creator:16", "date:12"]`

  - `fromScheme` — source concept scheme (notation)
  - `from` — source concepts
  - `toScheme` — target concept scheme (notation)
  - `to` — target concepts 
  - `type` — mapping type (symbol)
  - `date` — date of modification (if given) or creation (otherwise)
  - `confidence` — JSKOS `mappingRelevance` in percent 

- `showLabels` *boolean, default `false`* — whether to show the concepts' labels

- `header` *boolean, default `true`* — whether to show the table header

## Events

- `hover` when a mapping row is hovered or unhovered

- `click` when a mapping row is clicked
 
## CSS classes

- `.jskos-vue-mappingTable` — the component element
- `.jskos-vue-mappingTable-${FIELD}` — table cell for each of the fields

The table is based on [vue-flexible-table](https://www.npmjs.com/package/vue-flexible-table), so its configuration, CSS classes and variables can also be used.

## Example

<script setup>
import { ref, watch } from "vue"
import { MappingTable } from "../../src/index.js"

const mappings = ref([])
const apiurl = ref("https://coli-conc.gbv.de/api/mappings?limit=10")

const load = async () => {
  try {
     const url = new URL(apiurl.value)
     mappings.value = await fetch(url).then(res => res.json())
  } catch {}
}

watch(apiurl, load, { immediate: true })

const selectMapping = item => {
  item.mapping._rowClass = item.mapping._rowClass ? "" : "selected"
}
</script>

::: component-view
<input v-model.lazy="apiurl" type="text" placeholder="API request URL" style="width: 100%" />
<button @click="load">load</button>
<mapping-table :mappings="mappings" :show-labels="true" @click="selectMapping"/>

<mapping-table :mappings="mappings" :show-labels="true" :fields="['type:10','toScheme:15','to:75']" :header="false"/>
:::
