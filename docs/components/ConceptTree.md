# ConceptTree
Component to display a concept tree.

## Props
- `modelValue` (object, v-model) - currently selected concept
  - default: `null`
- `concepts` (array) - array of JSKOS concepts to be displayed
  - required
- `hierarchy` (boolean) - whether to display concept hierarchy (via `narrower` property)
  - default: `true`
- `itemListOptions` (object) - options that are passed along to [ItemList](./ItemList) via v-bind
  - default: `{}`

## Slots
- `beforeItem`: Content shown before an item (includes parameter `item` that contains the concept).
- `afterItem`: Content shown after an item (includes parameter `item` that contains the concept).

## Methods
- [`isUriInView` (see ItemList)](./ItemList#methods)
- [`scrollToUri` (see ItemList)](./ItemList#methods)

## Events
- `select`
  - Emitted when a concept is selected.
  - Parameter is an object with properties `item` (containing the clicked JSKOS concept) and `row` (containing a boolean which is `true` when the click was initiated via the row, not on the item directly).
- `open`
  - Emitted when a concept's narrower concepts are opened.
  - Parameter is the JSKOS concept.
- `close`
  - Emitted when a concept's narrower concepts are closed.
  - Parameter is the JSKOS concept.
- `update:modelValue`
  - Used to push changes to v-model value. Will always be emitted together with `select`.

## CSS Variables
- `--jskos-vue-conceptTree-selected-bgColor` - row background color for selected concept (v-model)
  - default: `#fdbd58aa`
- `--jskos-vue-conceptTree-hover-bgColor` - row hover background color
  - default: `#fdbd58aa`

## Examples

<script setup>
import ConceptTree from "../../src/components/ConceptTree.vue"
import * as jskos from "jskos-tools"
import { cdk } from "cocoda-sdk"
import { reactive, onMounted } from "vue"

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
  Selected: {{ state.selected && state.selected.uri || "none" }}
</p>
<concept-tree
  v-if="state.concepts"
  v-model="state.selected"
  style="height: 400px; overflow: scroll; border: 2px solid #0001;"
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
import { ConceptTree } from "jskos-vue"
import * as jskos from "jskos-tools"
import * as cdk from "cocoda-sdk"
import { reactive, onMounted } from "vue"

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

<template>
  <p>
    Selected: {{ state.selected && state.selected.uri || "none" }}
  </p>
  <concept-tree
    v-if="state.concepts"
    v-model="state.selected"
    style="height: 400px; overflow: scroll; border: 2px solid #0001;"
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
</template>

<style>
.opacity-hover:hover {
  opacity: 50%;
}
</style>
```
