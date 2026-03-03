# ItemSelect

Pick **one item at a time** (JSKOS concepts, schemes, languages, …) via:

- a typeahead dropdown (via [ItemSuggest](./ItemSuggest))
- optional hierarchy browsing (via [ConceptTree](./ConceptTree))

`ItemSelect` does **not** keep a selection list. It only emits the picked item.  
If you want to show/edit a list, combine it with [ItemSelected](./ItemSelected) in your app.

## Props

- `options` *array, default `[]`*\
  local options (small static lists like languages).
- `search` *function, default `null`*\
  remote search function in **OpenSearch Suggest** format  
  `[q, labels[], desc[], uris[]]` (same contract as `ItemSuggest`).
- `minChars` *number, default `1`*\
  minimum query length before searching (applies to `options` and `search`).
  

### ConceptTree integration

- `treeConcepts` *array, default `[]`*\
  top concepts for the `ConceptTree` browser below the input.  
  default: `[]` (no tree is shown for empty array)
  
- `treeLoadNarrower` *function*\
  called when a tree node is opened; should load `narrower`.  
 

### Optional resolving

- `resolve` *function*
  optional async resolver to turn a selected **URI** into a full item object  
  when it is not available in the internal suggestion cache.  
  Signature: `async (uri) => item`

### UI

- `placeholder` *string, default `"Search…"`*\
  input placeholder.

## Events

- `select` — emitted when an item is picked (via typeahead or tree).  
  Payload is usually a **normalized item**. If resolving is not possible it may fall back to `{ uri }`.

## Behavior notes

### Normalization

Before emitting, items are normalized:

- `__label` is derived from `__label` / `prefLabel` (fallback: `uri`)
- `prefLabel.und` is ensured
- `notation` is preserved; otherwise tries to derive DDC notation from `/class/<notation>/` URIs

### Suggestion cache + `resolve`

`ItemSuggest` emits only `{ uri }`. `ItemSelect` caches the current suggestion result set so it can emit
a full object when available. If the URI is not in the cache and you provided `resolve`, it calls
`resolve(uri)` and emits the returned item (normalized).

### Tree sync

After selecting via typeahead the tree is synced via
`conceptTree.navigateToUri(concept, { select: false })` (best effort).

## Methods

Via component ref (`ref="itemSelect"`):

- `focus()` — focuses the internal `ItemSuggest` input.

## Layout

- `.jskos-vue-itemSelect`
- `.jskos-vue-itemSelect-tree`

See [ItemSuggest](./ItemSuggest) for styling of dropdown and [ConceptTree](./ConceptTree) for styling of tree.

## Examples

::: component-view
<script setup>
import ItemSelect from "../../src/components/ItemSelect.vue"
import ItemSelected from "../../src/components/ItemSelected.vue"
import { ref, reactive, onMounted } from "vue"
import * as jskos from "jskos-tools"
import { cdk } from "cocoda-sdk"
// Local options (languages)
const languageOptions = [
  { uri: "urn:lang:en", prefLabel: { en: "English" } },
  { uri: "urn:lang:de", prefLabel: { en: "German" } },
  { uri: "urn:lang:it", prefLabel: { en: "Italian" } },
]
const languageSelected = ref([])
function addUnique(listRef, item) {
  if (!item?.uri) {
    return
  }
  const exists = listRef.some((i) => i?.uri === item.uri)
  if (!exists) {
    listRef.push(item)
  }
}
// Remote DDC example (coli-conc)
const state = reactive({ registry: null, scheme: null, top: null, selected: [] })
onMounted(async () => {
  state.registry = cdk.initializeRegistry({ provider: "ConceptApi", api: "https://coli-conc.gbv.de/api/" })
  state.scheme = (await state.registry.getSchemes({ params: { uri: "http://bartoc.org/en/node/241" } }))[0]
  state.top = jskos.sortConcepts(await state.scheme._getTop())
})
const suggest = async search => state.scheme._registry.suggest({ search, scheme:state.scheme })

async function loadNarrower(concept) {
  if (concept.narrower && !concept.narrower.includes(null)) return
  concept.narrower = jskos.sortConcepts(await concept._getNarrower())
}
const resolveConcept = async (uri) => (await state.scheme._registry.getConcepts({ concepts: [{ uri }] }))[0]
</script>

<h3>Languages (local options)</h3>
<item-select
  :options="languageOptions"
  placeholder="Pick a language…"
  @select="(item) => addUnique(languageSelected, item)" />
<item-selected v-model="languageSelected" view="tags" />

<h3>DDC (remote suggest) + ConceptTree</h3>
<item-select
  v-if="state.scheme && state.top"
  :search="suggest"
  :resolve="resolveConcept"
  placeholder="Search DDC…"
  :tree-concepts="state.top"
  :tree-load-narrower="loadNarrower"
  @select="(item) => addUnique(state.selected, item)" />
<item-selected v-model="state.selected" view="table" :orderable="true" />
:::