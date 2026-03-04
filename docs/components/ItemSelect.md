# ItemSelect

Pick **one item at a time** (JSKOS concepts, schemes, languages, …) via:

- a typeahead dropdown (via [ItemSuggest](./ItemSuggest))
- optional hierarchy browsing (via [ConceptTree](./ConceptTree))

`ItemSelect` does **not** keep a selection list. It only emits the picked item.
If you want to show/edit a list, combine it with [ItemSelected](./ItemSelected) in your app.

## Props

- `options` *array, default `[]`*\
  local options (small static lists like languages).
- `search` *function*\
  remote search function in **OpenSearch Suggest** format (see [ItemSuggest](./ItemSuggest)).
  Default is based on `options` (if set) or on `registry.suggest` (if both `registry` and `scheme` are set).
- `resolve` *function*\
  optional async resolver to turn a selected **URI** into a full JSKOS item object  
  when it is not available in the internal suggestion cache.  
  Default is based on `options` (if set) or on `registry.getConcepts` (if available).
- `minChars` *number, default `1`*\
  minimum query length before searching (applies to `options` and `search`).
- `registry` *object, default `null`*\
   Registry to load concepts from
- `scheme` *object, default `null`*\
   Concept Scheme to load concepts from. Must have field `uri` or `identifier` at least.
- `treeConcepts` *array*\
  top concepts for the `ConceptTree` browser below the input.  
  Default is loaded via `registry.getTop` if both `registry` and `scheme` are set.

  
See [concept loading of ConceptTree](./ConceptTree#concept-loading) for background information on `registry` and `scheme`.

### UI

- `placeholder` *string, default `"Search…"`*\
  input placeholder.

## Events

- `select` — emitted when an item is picked (via typeahead or tree).  
  Payload is usually a **normalized item**. If resolving is not possible it may fall back to `{ uri }`.

## Behavior notes

Before emitting, items are normalized:

- `__label` is derived from `__label` / `prefLabel` (fallback: `uri`)
- `prefLabel.und` is ensured
- `notation` is preserved; otherwise tries to derive DDC notation from `/class/<notation>/` URIs

`ItemSuggest` emits only `{ uri }`. `ItemSelect` caches the current suggestion result set so it can emit
a full object when available. If the URI is not in the cache and you provided `resolve`, it calls
`resolve(uri)` and emits the returned item (normalized).

After selecting via typeahead the tree is synced via
`conceptTree.navigateToUri(concept, { select: false })` (best effort).

## Methods

Via component ref (`ref="itemSelect"`):

- `focus` — focuses the internal `ItemSuggest` input.

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
  if (item?.uri && !listRef.some(i => i?.uri === item.uri)) {
    listRef.push(item)
  }
}
// Remote DDC example
const selected = ref([])
const registry = cdk.initializeRegistry({ provider: "ConceptApi", api: "https://coli-conc.gbv.de/api/" })
const scheme = { uri: "http://bartoc.org/en/node/241" }
</script>

<h3>Languages (local options)</h3>
<item-select
  :options="languageOptions"
  placeholder="Pick a language…"
  @select="(item) => addUnique(languageSelected, item)" />
<item-selected v-model="languageSelected" view="tags" />

<h3>DDC (remote, with tree)</h3>
<item-select
  placeholder="Search DDC…"
  :registry="registry"
  :scheme="scheme"
  @select="(item) => addUnique(selected, item)" />
<item-selected v-model="selected" view="table" :orderable="true" />
:::
