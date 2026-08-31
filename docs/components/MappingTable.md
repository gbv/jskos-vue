# MappingTable

A table of [JSKOS mappings](https://gbv.github.io/jskos/#mapping).

## Props

- `items` *array, required* — the list of mappings to be displayed.

- `showLabels` *boolean, default `false`* — whether to show the concepts' labels

## Events

- `hover` when a mapping row is hovered or unhovered

- `click` when a mapping row is clicked
 
## CSS classes

- `.jskos-vue-mappingTable` — the component element

The table is based on [vue-flexible-table](https://www.npmjs.com/package/vue-flexible-table), so its configuration, CSS classes and variables can also be used.

## Example

<script setup>
import { ref, watch } from "vue"
import { MappingTable } from "../../src/index.js"

const mappings = ref([])
const apiurl = ref("http://coli-conc.gbv.de/api/mappings?limit=10")

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
:::
