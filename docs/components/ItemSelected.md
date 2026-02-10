# ItemSelected

`ItemSelected` is a small rendering component for an **already selected** list of items (usually JSKOS concepts, schemes, languages, etc.).  
It is used by [`ItemSelect`](./ItemSelect) to display the current selection, but it can also be used standalone.

It supports three views:

- **`tags`**: compact chips with remove buttons
- **`table`**: rows with optional ordering controls (up/down) and remove buttons
- **`list`**: minimal list rendering via [`ItemList`](./ItemList)

Internally it uses [`ItemName`](./ItemName) for displaying items (notation/label rendering, language preference, fallbacks, etc.).



## Props

- `items` *(array)* — items to render  
  default: `[]`
  
- `view` *(string)* — display mode: `"tags" | "table" | "list"`  
  default: `"tags"`
  
- `orderable` *(boolean)* — show move up/down buttons (only affects `table` view)  
  default: `false`
  
- `clickable` *(boolean)* — whether the displayed items are clickable (emits `select`)  
  default: `true`
  
- `itemNameOptions` *(object)* — props forwarded to [`ItemName`](./ItemName) (merged with the component’s own defaults)  
  default: `{}`
  

> Notes:
> 
> - `draggable` is forced to `false` in all views.
> - In **tags** view, `showNotation` and `showLabel` are enabled by default (you can still override via `itemNameOptions`).



## Events

- `remove`  
  Emitted when the user clicks the remove button on an item.  
  Payload: the removed `item`.
  
- `move`  
  Emitted when the user clicks *Move up* / *Move down* (only if `orderable` is enabled and `view="table"`).  
  Payload: `{ from: number, to: number }`
  
- `select`  
  Emitted when the user clicks on an item label (if `clickable`).  
  Payload: `{ item }`
  



## Slots

This component does not expose custom slots (it focuses on consistent “selected items” rendering).



## Examples

### Tags view (chips)

<script setup>
import { ref } from "vue"
import ItemSelected from "../../src/components/ItemSelected.vue"
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

<item-selected
 :items="selected"
 view="tags"
 @remove="remove"
 @select="alertSelect" />

