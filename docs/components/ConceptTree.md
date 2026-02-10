# ConceptTree

Component to display a hierarchical concept tree (based on `narrower`), implemented as a thin wrapper around [`ItemList`](./ItemList).

It supports:

- selecting a concept (`v-model`)
- expanding/collapsing nodes (`open` / `close`)
- programmatic scrolling (`scrollToUri`)
- programmatic navigation in the hierarchy (`navigateToUri`) 

---

## Props

- `modelValue` *(object, v-model)* — currently selected concept (highlighted)  
  default: `null`
  
- `concepts` *(array, required)* — array of JSKOS concepts to be displayed (usually top concepts)
  
- `hierarchy` *(boolean)* — whether to display concept hierarchy (via `narrower`)  
  default: `true`
  
- `itemListOptions` *(object)* — options passed through to [`ItemList`](./ItemList) via `v-bind`  
  default: `{}`
  

---

## Slots

All slots are forwarded to the internal `ItemList`.

- `beforeList` — content shown above the list.
- `afterList` — content shown below the list.
- `beforeItem` — content shown before an item *(slot prop: `{ item }` where `item` is the concept)*.
- `afterItem` — content shown after an item *(slot prop: `{ item }` where `item` is the concept)*.

---

## Methods

The following methods are exposed via component ref (`ref="conceptTree"`):

- [`isUriInView` *(see ItemList)*](./ItemList#methods)
- [`scrollToUri` *(see ItemList)*](./ItemList#methods)

### `navigateToUri(uriOrConcept, options)`

Navigate to a concept URI in the hierarchy:

- If the concept is already rendered: scroll to it (and optionally select it)
- Otherwise: tries to open the path from the top concepts down to the target using:
  - a registry (`_registry`) if present
  - parent pointers (`ancestors[0]` or `broader[0]`)
  - `_getNarrower()` to load children when needed

**Signature**

- `uriOrConcept`: `string | { uri: string }`
- `options` *(optional)*:
  - `select` *(boolean)* — whether to set `modelValue` to the target concept  
    default: `true`
  - `onlyIfNotInView` *(boolean)* — pass-through to `scrollToUri`  
    default: `true`

**Returns**

- `Promise<boolean>` — `true` if navigation succeeded, otherwise `false`.

**Notes / limitations**

- Works best with **coli-conc/cocoda-sdk** concepts where:
  - a registry is attached (`concept._registry` or `concept.inScheme[0]._registry`)
  - concepts support `_getNarrower()`
- If no registry is available, or if the target cannot be reached from the provided `concepts` roots, it returns `false`.

---

## Events

- `select`  
  Emitted when a concept is selected. Parameter is the same payload as `ItemList`’s `select` event: an object with properties:
  
  - `item` (the clicked concept)
  - `row` (`true` when the click was initiated via the row, not on the item directly)
- `open`  
  Emitted when a concept’s narrower concepts are opened. Parameter is the concept.
  
- `close`  
  Emitted when a concept’s narrower concepts are closed. Parameter is the concept.
  
- `update:modelValue`  
  Used for v-model updates. Will always be emitted together with `select` when selection changes.
  

---

## CSS Variables

- `--jskos-vue-conceptTree-selected-bgColor` — row background color for selected concept (v-model)  
  default: `#fdbd58aa`
  
- `--jskos-vue-conceptTree-hover-bgColor` — row hover background color  
  default: `#fdbd58aa`
  

---

## Examples

<script setup>
import ConceptTree from "../../src/components/ConceptTree.vue"
import * as jskos from "jskos-tools"
import { cdk } from "cocoda-sdk"
import { reactive, onMounted, useTemplateRef } from "vue"

let registry
const state = reactive({
  scheme: null,
  async loadScheme() {
    this.scheme = (await registry.getSchemes({
      params: {
        uri: "https://www.ixtheo.de/classification/",
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
})

const conceptTree = useTemplateRef("conceptTree")

onMounted(async () => {
  registry = cdk.initializeRegistry({
    provider: "ConceptApi",
    api: "https://coli-conc.gbv.de/api/",
  })
  await state.loadScheme()
  await state.loadConcepts()
})

const alert = (...args) => window.alert(...args)
</script>
<p>
<button @click="conceptTree.navigateToUri('https://www.ixtheo.de/classification/VB')">
  Navigate to VB Hermeneutik ; Philosophie
</button>
</p>

<p v-if="state.selected?.uri">
  Selected: {{ state.selected.uri }}
  <button @click="conceptTree.scrollToUri(state.selected.uri)">Scroll to selected</button>
</p>
<p v-else>
  Please select a concept.
</p>

<concept-tree
  ref="conceptTree"
  v-if="state.concepts"
  v-model="state.selected"
  style="height: 400px; overflow-y: auto; border: 2px solid #0001;"
  :concepts="state.concepts"
  @open="state.loadNarrower($event)">
  <template v-slot:beforeItem="{ item }">
    <span
      class="opacity-hover"
      style="margin-right: 5px;"
      @click.stop="alert(`Clicked on Star for item ${item.uri}`)">
      ⭐️
    </span>
  </template>
  <template v-slot:afterItem="{ item }">
    <div
      class="opacity-hover"
      style="position: absolute; width: 20px; right: 2px; top: 50%; transform: translateY(-50%);"
      @click.stop="alert(`Clicked on Rocket for item ${item.uri}`)">
      🚀
    </div>
  </template>
</concept-tree>
  <div v-else>
    Loading concepts...
  </div>

<style>
.opacity-hover:hover {
  opacity: 50%;
}
</style>

```vue
<script setup>
import ConceptTree from "../../src/components/ConceptTree.vue"
import * as jskos from "jskos-tools"
import { cdk } from "cocoda-sdk"
import { reactive, onMounted, useTemplateRef } from "vue"

let registry
const state = reactive({
  scheme: null,
  async loadScheme() {
    this.scheme = (await registry.getSchemes({
      params: {
        uri: "https://www.ixtheo.de/classification/",
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
})

const conceptTree = useTemplateRef("conceptTree")

onMounted(async () => {
  registry = cdk.initializeRegistry({
    provider: "ConceptApi",
    api: "https://coli-conc.gbv.de/api/",
  })
  await state.loadScheme()
  await state.loadConcepts()
})

const alert = (...args) => window.alert(...args)
</script>
<p>
<button @click="conceptTree.navigateToUri('https://www.ixtheo.de/classification/VB')">
  Navigate to VB Hermeneutik ; Philosophie
</button>
</p>

<p v-if="state.selected?.uri">
  Selected: {{ state.selected.uri }}
  <button @click="conceptTree.scrollToUri(state.selected.uri)">Scroll to selected</button>
</p>
<p v-else>
  Please select a concept.
</p>

<concept-tree
  ref="conceptTree"
  v-if="state.concepts"
  v-model="state.selected"
  style="height: 400px; overflow-y: auto; border: 2px solid #0001;"
  :concepts="state.concepts"
  @open="state.loadNarrower($event)">
  <template v-slot:beforeItem="{ item }">
    <span
      class="opacity-hover"
      style="margin-right: 5px;"
      @click.stop="alert(`Clicked on Star for item ${item.uri}`)">
      ⭐️
    </span>
  </template>
  <template v-slot:afterItem="{ item }">
    <div
      class="opacity-hover"
      style="position: absolute; width: 20px; right: 2px; top: 50%; transform: translateY(-50%);"
      @click.stop="alert(`Clicked on Rocket for item ${item.uri}`)">
      🚀
    </div>
  </template>
</concept-tree>
  <div v-else>
    Loading concepts...
  </div>

<style>
.opacity-hover:hover {
  opacity: 50%;
}
</style>
```
