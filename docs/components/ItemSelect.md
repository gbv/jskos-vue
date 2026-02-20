# ItemSelect

Component to **select multiple items** (JSKOS concepts, schemes, languages, …) with:

- a typeahead input (powered by `vue-multiselect`)
- optional remote suggest/search
- optional hierarchical browsing via [`ConceptTree`](./ConceptTree)
- rendering + editing of the current selection via [`ItemSelected`](./ItemSelected)

`ItemSelect` is designed to behave like “add one item, then reset input”.


## Props

- `modelValue` *(array, v-model)* — selected items (each item should have at least a `uri`)  
  default: `[]`
  
- `options` *(array)* — local options shown in the typeahead (use this for small static sets like languages)  
  default: `[]`
  
- `search` *(function)* — remote suggest function (disables internal search).  
  It must return an **OpenSearch Suggest**-like array: `[q, labels[], desc[], uris[]]`  
  default: `null`
  
- `minChars` *(number)* — minimum query length before `search` is called  
  default: `1`
  

### ConceptTree integration

- `showTree` *(boolean)* — show the optional `ConceptTree` picker  
  default: `false`
  
- `treeConcepts` *(array)* — top concepts for the tree (usually `scheme._getTop()`)  
  default: `[]`
  
- `treeLoadNarrower` *(function)* — called when a tree node is opened, should load `narrower`  
  default: `null`
  

### UI

- `placeholder` *(string)* — placeholder shown in the typeahead input  
  default: `"Search…"`

### Selected rendering

- `selectedView` *(string)* — how to render the selected list, passed to `ItemSelected`  
  allowed: `"tags" | "table" | "list"`  
  default: `"tags"`
  
- `orderable` *(boolean)* — enable reordering controls (meaningful for `"table"`)  
  default: `false`
  


## Events

- `update:modelValue`  
  Emitted whenever the selection changes (add/remove/reorder).
  
- `select`  
  Emitted when a new item is added. Parameter is the **normalized item**.



## Behavior notes

### Normalization and deduplication

Every selected item is normalized to ensure a consistent shape:

- `__label` is always set (from `__label`, `prefLabel`, or fallback to `uri`)
- `prefLabel.und` is ensured (derived from the label)
- `notation` is kept if present; otherwise it tries to derive a DDC notation from the URI (`/class/<notation>/`)

Selected items are deduplicated by `uri` while preserving insertion order.

### Editing the selection (ItemSelected)

Internally, `ItemSelect` binds its selection to `ItemSelected` via:

- `v-model="selectedItems"`

This allows `ItemSelected` to **remove** items (all views) and **reorder** items (table view when `orderable=true`).

Incoming updates from the parent (`modelValue`) are normalized + deduped and then applied **in-place** with `splice`, so the
array identity remains stable (useful for some consumers).

Whenever `ItemSelected` changes the array (remove/move), `ItemSelect` forwards it as `update:modelValue`.

### Tree synchronization (`navigateToUri`)

When `showTree=true`, `ItemSelect` keeps the `ConceptTree` aligned with newly added concepts:

- after adding a concept via the typeahead, it calls  
  `conceptTree.navigateToUri(concept, { select: false, onlyIfNotInView: true })`
- the tree will try to open the path (best-effort) and scroll the concept into view

`ItemSelect` never lets the tree manage the selected array directly; the tree is used for browsing + picking.



## Styling

The outer wrapper uses:

- `.jskos-vue-itemSelect`
- `.jskos-vue-itemSelect-noResult`
- `.jskos-vue-itemSelect-tree`
- `.jskos-vue-itemSelect-subtitle`

You can override these classes in your app CSS.



## Dependencies

`ItemSelect` uses `vue-multiselect` internally and imports its CSS:

```css
@import "vue-multiselect/dist/vue-multiselect.css";
```

## Examples
<script setup>
  import ItemSelect from "../../src/components/ItemSelect.vue"
  import * as jskos from "jskos-tools"
  import { cdk } from "cocoda-sdk"
  import { reactive, onMounted, ref } from "vue"
  import * as utils from "../../src/utils.js"
  const languageSelected = ref([])
  const languageOptions = [
    { uri: "urn:lang:en", prefLabel: { en: "English" } },
    { uri: "urn:lang:de", prefLabel: { en: "German" } },
    { uri: "urn:lang:it", prefLabel: { en: "Italian" } },
  ]
  const state = reactive({
    registry: null,
    scheme: null,
    top: null,
    itemSelect: {
      selected: [],
    },
  })
  onMounted(async () => {
    state.registry = cdk.initializeRegistry({
      provider: "ConceptApi",
      api: "https://coli-conc.gbv.de/api/",
    })
    state.scheme = (await state.registry.getSchemes({
      params: { uri: "http://bartoc.org/en/node/241" }, // DDC
    }))[0]
    state.top = jskos.sortConcepts(await state.scheme._getTop())
  })
  async function loadNarrower(concept) {
    if (concept.narrower && !concept.narrower.includes(null)) return
    concept.narrower = jskos.sortConcepts(await concept._getNarrower())
  }
  const suggest = (q) =>
    utils.cdkRegistryToSuggestFunction(state.scheme._registry, { scheme: state.scheme })(q)
</script>

<h2>ItemSelect with languages</h2>
<label>Languages</label>
<item-select
  v-model="languageSelected"
  :options="languageOptions"
  placeholder="Pick a language…"
  selected-view="tags" />

<h2>ItemSelect DDC concepts from API (typeahead / suggest)</h2>

<h3>Tags</h3>
<label>DDC with tag view</label>
<item-select
  v-if="state.scheme"
  v-model="state.itemSelect.selected"
  :search="suggest"
  placeholder="Search DDC concepts…"
  selected-view="tags" />

<h3>Table</h3>
<label>DDC with table view</label>
<item-select
  v-if="state.scheme"
  v-model="state.itemSelect.selected"
  :search="suggest"
  placeholder="Search DDC concepts…"
  orderable
  selected-view="table" />

<h3>List</h3>
<label>DDC with list view</label>
<item-select
  v-if="state.scheme"
  v-model="state.itemSelect.selected"
  :search="suggest"
  placeholder="Search DDC concepts…"
  selected-view="list" />

<h2>ItemSelect + ConceptTree browsing</h2>

<h3>Table</h3>
<label>DDC with table view</label>
<item-select
  v-if="state.scheme && state.top"
  v-model="state.itemSelect.selected"
  :search="suggest"
  placeholder="Search DDC concepts…"
  orderable
  selected-view="table"
  :show-tree="true"
  :tree-concepts="state.top"
  :tree-load-narrower="loadNarrower" />
<div v-else>
  Loading concepts...
</div>


```vue
<template>
  <h2>ItemSelect with languages</h2>
  <label>Languages</label>
  <item-select
    v-model="languageSelected"
    :options="languageOptions"
    placeholder="Pick a language…"
    selected-view="tags" />

  <h2>ItemSelect DDC concepts from API (typeahead / suggest)</h2>

  <h3>Tags</h3>
  <label>DDC with tag view</label>
  <item-select
    v-if="state.scheme"
    v-model="state.itemSelect.selected"
    :search="suggest"
    placeholder="Search DDC concepts…"
    selected-view="tags" />

  <h3>Table</h3>
  <label>DDC with table view</label>
  <item-select
    v-if="state.scheme"
    v-model="state.itemSelect.selected"
    :search="suggest"
    placeholder="Search DDC concepts…"
    orderable
    selected-view="table" />

  <h3>List</h3>
  <label>DDC with list view</label>
  <item-select
    v-if="state.scheme"
    v-model="state.itemSelect.selected"
    :search="suggest"
    placeholder="Search DDC concepts…"
    selected-view="list" />

  <h2>ItemSelect + ConceptTree browsing</h2>

  <h3>Table</h3>
  <label>DDC with table view</label>
  <item-select
    v-if="state.scheme && state.top"
    v-model="state.itemSelect.selected"
    :search="suggest"
    placeholder="Search DDC concepts…"
    orderable
    selected-view="table"
    :show-tree="true"
    :tree-concepts="state.top"
    :tree-load-narrower="loadNarrower" />
  <div v-else>
    Loading concepts...
  </div>
</template>

<script setup>
import ItemSelect from "jskos-vue"
import * as jskos from "jskos-tools"
import { cdk } from "cocoda-sdk"
import { reactive, onMounted, ref } from "vue"
import * as utils from "../utils.js"

const languageSelected = ref([])
const languageOptions = [
  { uri: "urn:lang:en", prefLabel: { en: "English" } },
  { uri: "urn:lang:de", prefLabel: { en: "German" } },
  { uri: "urn:lang:it", prefLabel: { en: "Italian" } },
]

const state = reactive({
  registry: null,
  scheme: null,
  top: null,
  itemSelect: { selected: [] },
})

onMounted(async () => {
  state.registry = cdk.initializeRegistry({
    provider: "ConceptApi",
    api: "https://coli-conc.gbv.de/api/",
  })
  state.scheme = (await state.registry.getSchemes({
    params: { uri: "http://bartoc.org/en/node/241" }, // DDC
  }))[0]
  state.top = jskos.sortConcepts(await state.scheme._getTop())
})

async function loadNarrower(concept) {
  if (concept.narrower && !concept.narrower.includes(null)) return
  concept.narrower = jskos.sortConcepts(await concept._getNarrower())
}

const suggest = (q) =>
  utils.cdkRegistryToSuggestFunction(state.scheme._registry, { scheme: state.scheme })(q)
</script>
```
