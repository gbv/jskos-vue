# ItemSelected

A list of JSKOS items where items can be reordered and removed from.

It supports three views:

- **`list`**: list rendering via [`ItemList`](./ItemList)
- **`tags`**: inline list of compact tags
- **`table`**: rows with ordering controls (up/down)

Uses [`ItemName`](./ItemName) to display items.

## Props

- `items` (array) - items to render
  - default: `[]`
  
- `view` (string) - display mode: `"tags" | "table" | "list"`  
  - default: `"tags"`
  
- `orderable` (boolean) - show move up/down buttons in `table` view
  - default: `false`
 
- `itemNameOptions` (object) - props forwarded to [`ItemName`](./ItemName)
  - default: `{ draggable: false }`
  - Field `draggable` is set to `false`, unless explicitly enabled

## Events

- `remove`  
  Emitted when the user clicks the remove button on an item.  
  Payload: the removed `item`.
  
- `move`  
  Emitted when the user clicks *Move up* / *Move down* (only if `orderable` is enabled and `view="table"`).  
  Payload: `{ from: number, to: number }`
  
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
const selected = ref([
  { uri: "urn:lang:en", prefLabel: { en: "English" } },
  { uri: "urn:lang:de", prefLabel: { en: "German" } },
  { uri: "urn:lang:it", prefLabel: { en: "Italian" } },
])
function remove(item) {
  selected.value = selected.value.filter(i => i.uri !== item.uri)
}
function alertSelect({ item }) {
  window.alert(`Clicked on ${item.uri}`)
}
</script>

<p>
  Change layout:
  <button v-for="v in ['tags','table','list']" :key="v" @click="view=v">{{v}}</button>
  <label>
    <input type="checkbox" v-model="orderable"> orderable
  </label>
</p>


<item-selected
 :items="selected"
 :view="view"
 :orderable="orderable"
 @remove="remove"
 @select="alertSelect" />

