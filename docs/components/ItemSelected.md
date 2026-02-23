# ItemSelected

A list of JSKOS items where items can be reordered and removed from.

It supports three views:

- **`list`**: list rendering via [`ItemList`](./ItemList)
- **`tags`**: inline list of compact tags
- **`table`**: rows with ordering controls (up/down)

Uses [`ItemName`](./ItemName) to display items.

## Props and models
 
- `modelValue` (array) selected items.
   Use watch option `{ deep: true }` to get change events.

- `view` (string) - display mode: `"tags" | "table" | "list"`  
  - default: `"tags"`
  
- `orderable` (boolean) - show move up/down buttons in `table` view
  - default: `false`
 
- `itemNameOptions` (object) - props forwarded to [`ItemName`](./ItemName)
  - default: `{ draggable: false }`
  - Field `draggable` is set to `false`, unless explicitly enabled

- `removable` (boolean) — if `true`, show a remove icon in `view="list"` (like Cocoda)  
  default: `false`
  
- `removeable` (boolean) — legacy spelling, treated like `removable`  
  default: `false`
  

## Events

- `select`  
  Emitted when the user clicks on an item
  Payload: `{ item }`

## CSS Variables

- `--jskos-vue-itemSelected-tags-bgColor` - background color of tags. Set to `--jskos-vue-highlight-bgColor` by default.
- `--jskos-vue-itemSelected-tags-color` - text color of tags. Set to `inherit` by default.

## Example

<script setup>
import { ref } from "vue"
import ItemSelected from "../../src/components/ItemSelected.vue"
const view = ref("tags")
const orderable = ref(true)
const removable = ref(true)
const selected = ref([
  { uri: "urn:lang:en", prefLabel: { en: "English" } },
  { uri: "urn:lang:de", prefLabel: { en: "German" } },
  { uri: "urn:lang:it", prefLabel: { en: "Italian" } },
])
function onSelect({ item }) {
  window.alert(`Clicked on ${item.uri}`)
}
function onChange(ev) {
  console.log("change", ev)
}
</script>

<p>
  View:
  <button v-for="v in ['tags','table','list']" :key="v" @click="view=v">{{ v }}</button>
  <label style="margin-left: 10px;">
    <input type="checkbox" v-model="orderable"> orderable (table only)
  </label>
  <label style="margin-left: 10px;">
    <input type="checkbox" v-model="removable"> removable
  </label>
</p>

<item-selected
 v-model="selected"
 :view="view"
 :orderable="orderable"
 :removable="removable"
 @select="onSelect"
 @change="onChange" />

```vue
<template>
  <ItemSelected
    v-model="selected"
    :view="view"
    :orderable="orderable"
    :removable="removable"
    @select="onSelect"
    @change="onChange" />
</template>

<script setup>
import { ref } from "vue"
import { ItemSelected } from "jskos-vue"

const view = ref("tags")
const orderable = ref(true)
const removable = ref(true)

const selected = ref([
  { uri: "urn:lang:en", prefLabel: { en: "English" }, notation: ["EN"] },
  { uri: "urn:lang:de", prefLabel: { en: "German" }, notation: ["DE"] },
  { uri: "urn:lang:it", prefLabel: { en: "Italian" }, notation: ["IT"] },
])

function onSelect({ item }) {
  window.alert(`Clicked on ${item.uri}`)
}

function onChange(ev) {
  console.log("change", ev)
}
</script>
```
