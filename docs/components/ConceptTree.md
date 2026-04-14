# ConceptTree

Component to display a concept tree with hierarchy from concept field `narrower`. The tree is based on [ItemList](./ItemList) and derives all of its slots and methods. The component supports:

- selecting a concept (prop `v-model`)
- expanding/collapsing nodes (events `open` / `close`)
- programmatic scrolling (method `scrollToUri`)
- programmatic navigation in the hierarchy (method [`navigateToUri`](#navigatetouri)) 
- dynamic loading additional concepts (props `registry` and `scheme`)

## Props

- `modelValue` *object, v-model, default `null`* — currently selected concept (highlighted)
- `concepts` *array, default `null`* — JSKOS concepts to be displayed (usually top concepts). Optional if registry and scheme are provided.
- `hierarchy` *boolean, default `true`* — whether to display concept hierarchy (via `narrower`)
- `itemListOptions` *object, default `{}`* — options passed through to [`ItemList`](./ItemList) via `v-bind`
- `registry` *object, default `null`* —  
   Registry to load concepts from
- `scheme` *object, default `null`* —  
   Concept Scheme to load concepts from. Must have field `uri` or `identifier` at least.

## Concept loading

Either `concepts` or both of `registry` and `scheme` are required to show the concept tree. If `registry` is not set, it is taken from internal field `_registry` or `inScheme[0]._registry` of the first concept. A registry object should have the following methods to load concepts from given scheme URI or concept URI:

- `getConcepts({ concepts: [{ uri }] })` — load concept details
- `getTop({ scheme: { uri } })` — load top concepts (only required when prop `concepts` is not set)
- `getNarrower({ concept: { uri } })` — load narrower concepts (only required when `getConcepts` does not include full field `narrower` for every concept)

See [cocoda-sdk](https://github.com/gbv/cocoda-sdk) for a library that provides registry objects for various terminology APIs.

## Slots

The slots are forwarded to the corresponding [slots of ItemList](./ItemList#slots):

- `beforeList` — content shown above the list.
- `afterList` — content shown below the list.
- `beforeItem` — content shown before an item *(slot prop: `{ item }` where `item` is the concept)*.
- `afterItem` — content shown after an item *(slot prop: `{ item }` where `item` is the concept)*.

## Methods

The [methods of ItemList](./ItemList#methods) are exposed to be used on a component reference.

- `isUriInView` — see [ItemList](./ItemList#methods)
- `scrollToUri` — see [ItemList](./ItemList#methods)
- [`navigateToUri`](#navigatetouri) — navigate to a concept in the hierarchy
- [`open`](#open) — open a concept and load narrower concepts if needed
- [`close`](#close) — close an opened concept
- [`collapse`](#collapse) — close all opened concepts

### navigateToUri

**Arguments**

- `uriOrConcept` *string | { uri: string }* — the concept URI to navigate to
- `options` *object, optional*
  - `select` *boolean, default `true`* — whether to set `modelValue` to the target concept
  - `onlyIfNotInView` *boolean, default `true`* — pass-through to `scrollToUri`

If the concept is already rendered, it is scrolled to (and optionally selected). Otherwise the function tries to open the path from the top concepts down to the target by loading missing concepts as needed.

**Returns** a Promise resolving to `true` if navigation succeeded, `false` otherwise.

### close

Close an opened concept. Requires concept object with field `uri`. Note that parents of selected concepts cannot be closed.

### collapse

Close all opened concepts. Note that parents of selected concepts cannot be closed.

## Events

- `select` emitted when a concept is selected. Note that `update:modelValue` is also emitted each time selection changes.
  Parameter is the same payload as `ItemList`’s `select` event: an object with properties:
  - `item` (the clicked concept)
  - `row` (`true` when the click was initiated via the row, not on the item directly)
- `open` emitted when a concept’s narrower concepts are opened. Parameter is the concept.
- `close` emitted when a concept’s narrower concepts are closed. Parameter is the concept.
- `update:modelValue`
  Used for v-model updates. Will always be emitted together with `select` when selection changes.

## CSS Classes

- `.jskos-vue-conceptTree` — the component element
- `.jskos-vue-conceptTree-arrow` — arrow to expand/collapse a subtree
- `.jskos-vue-conceptTree-depthSpacer` — vertical line left to expanded subtrees



## Example

::: component-view
<script setup>
import ConceptTree from "../../src/components/ConceptTree.vue"
import { cdk } from "cocoda-sdk"
import { useTemplateRef, ref } from "vue"

const registry = cdk.initializeRegistry({
  provider: "ConceptApi",
  api: "https://coli-conc.gbv.de/api/",
})

const scheme = {
  uri: "https://www.ixtheo.de/classification/",
}

const selected = ref(null)
const message = ref("")
const conceptTree = useTemplateRef("conceptTree")
</script>

<template>
  <p>
    <button @click="conceptTree.navigateToUri('https://www.ixtheo.de/classification/VB')">
      Navigate to VB Hermeneutik ; Philosophie
    </button>
    <button @click="conceptTree.collapse()">
      Collapse tree
    </button>
  </p>

  <p v-if="message">
    {{ message }}
  </p>

  <p v-if="selected?.uri">
    Selected: {{ selected.uri }}
    <button @click="conceptTree.scrollToUri(selected.uri)">
      Scroll to selected
    </button>
  </p>
  <p v-else>
    Please select a concept.
  </p>

  <concept-tree
    ref="conceptTree"
    v-model="selected"
    :registry="registry"
    :scheme="scheme"
    style="height: 400px; overflow-y: auto; border: 2px solid #0001;">
    <template #beforeItem="slotProps">
      <span
        class="opacity-hover"
        style="margin-right: 5px;"
        @click.stop="message = `Clicked on Star for item ${slotProps.item.uri}`">
        ⭐️
      </span>
    </template>
    <template #afterItem="slotProps">
      <div
        class="opacity-hover"
        style="position: absolute; width: 20px; right: 2px; top: 50%; transform: translateY(-50%);"
        @click.stop="message = `Clicked on Rocket for item ${slotProps.item.uri}`">
        🚀
      </div>
    </template>
  </concept-tree>
</template>
:::