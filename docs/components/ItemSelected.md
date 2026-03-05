# ItemSelected

A list of JSKOS items where items can be reordered and removed from.

It supports three views:

- **`list`** — list rendering via [`ItemList`](./ItemList)
- **`tags`** — inline list of compact tags
- **`table`** — rows with ordering controls (up/down)

Uses [`ItemName`](./ItemName) to display items.

## Props
 
- `modelValue` *array, default `[]`* — selected items.
  Use watch option `{ deep: true }` to get change events.
- `view` *string, default `"tags"`* — display mode: `"tags" | "table" | "list"`
- `orderable` *boolean, default `false`* — show move up/down buttons in `table` view
- `itemNameOptions` *object, default `{ draggable: false }`* —  
  props forwarded to [`ItemName`](./ItemName)
  - Field `draggable` is set to `false`, unless explicitly enabled
- `removable` *boolean, default `false`* — if `true`, show a remove icon in `view="list"` (like Cocoda)
- `removeable` *boolean, default `false`* — legacy spelling, treated like `removable`
  
## Events

- `select`  
  Emitted with payload `{ item }` when the user clicks on an item

## CSS variables and classes

- `--jskos-vue-itemSelected-tags-bgColor` — background color of tags. Set to `--jskos-vue-highlight-bgColor` by default.
- `--jskos-vue-itemSelected-tags-color` — text color of tags. Set to `inherit` by default.

## Example

::: component-view
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
    <input type="checkbox" v-model="orderable"> orderable
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
:::
