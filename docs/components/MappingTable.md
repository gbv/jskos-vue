# MappingTable

A table of [JSKOS mappings](https://gbv.github.io/jskos/#mapping).

## Props

- `items` *array, required* — the list of mappings to be displayed.

- `showLabels` *boolean, default `false`* — whether to show the concepts' labels

## CSS classes

- `.jskos-vue-mappingTable` — the component element

The table is based on [vue-flexible-table](https://www.npmjs.com/package/vue-flexible-table).

## Example

<script setup>
import { ref, watch } from "vue"
import { MappingTable } from "../../src/index.js"

const mappings = ref([
  {
    "type": ["http://www.w3.org/2004/02/skos/core#closeMatch"],
    "fromScheme": {"uri":"http://dewey.info/scheme/edition/e22/"},    
    "toScheme": {"uri":"http://d-nb.info/gnd/7749153-1"},
    "from": {
        "memberSet": [ {
            "uri": "http://dewey.info/class/612.112/e22/",
            "notation": ["612.112"]
        } ]
    },
    "to": {
        "memberSet": [ {
            "uri": "http://d-nb.info/gnd/4074195-3",
            "prefLabel": { "de": "Leukozyt" }
        } ]
    },
    "creator": [null],
    "justification": "https://w3id.org/semapv/vocab/ManualMappingCuration",
    "tool": [ { "url": "https://coli-conc.gbv.de/cocoda/" } ]
  }
])

const apiurl = ref("")
watch(apiurl, async newurl => {
  try {
     const url = new URL(newurl)
     mappings.value = await fetch(url).then(res => res.json())
  } catch {}
})
</script>

::: component-view
<input v-model.lazy="apiurl" type="text" placeholder="API request URL" style="width: 100%" />
<mapping-table :mappings="mappings" :show-labels="true" />
:::
