# dragAndDrop

Helper to add drag and drop functionality to JSKOS items.

## Usage

```js
import { utils } from "jskos-vue"
const { draggedItem, dragstart, dragend, addDropzone } = utils.dragAndDrop
```

### `draggedItem`

A reactive reference to the currently dragged item. (`null` if no item is being dragged.)

### `dragstart(item)`, `dragend()`

Can be used to define a draggable item. (See [below](#defining-a-draggable-item) on how to use this.)

### `addDropzone(element, callback)`

Defines a new dropzone. (See [below](#defining-a-dropzone) on how to use this.)

## Defining a Draggable Item

Any element can be defined as a draggable item. [ItemName](../components/ItemName) and rows in [ItemList](../components/ItemList) are draggable by default. To define an element as draggable, you need to set its `draggable` property to `true` and define event handlers for `dragstart` and `dragend` which are exported by `utils.dragAndDrop`.

```vue
<div
  draggable="true"
  @dragstart="dragstart({ uri: 'some:item' })"
  @dragend="dragend">
  Some item
</div>
```

## Defining a Dropzone

Any element can be defined as a dropzone and can therefore receive item drops. [ItemDetails](../components/ItemDetails) is a dropzone by default. To define a dropzone, you need to use the `addDropzone` function that is exported by `utils.dragAndDrop`. It needs to be called separately for every dropzone. It receives two parameters and returns an object with several properties.

### `addDropzone` Parameters

- `element` - a reference to a DOM element
  - optional, but if not given, the event handlers `dragover`, `dragenter`, `dragleave`, and `drop` need to be defined manually on the element
- `callback` (function) - a function that is called when an item is dropped on the dropzone
  - The first parameter will be the dropped item (which is the same as `draggedItem` that is exported by `utils.dragAndDrop`).
  - The other parameters are any additional parameters that are providing to `drop` (usually none).

### `addDropzone` Returned Object Properties

- `isDraggingOver` (boolean) - a reactive boolean reference that is `true` if an item is currently being dragged over the dropzone
  - Requires `dragenter` and `dragleave` events to be defined.
- `dragover` - dragover event handler (required to enable drops)
  - Will be added to `element` if given.
  - If no element is given, this **has** to be defined manually on the dropzone element.
- `dragenter` - dragenter event handler
  - Will be added to `element` if given.
  - If no element is given, this can optionally be defined manually on the dropzone element to enable `isDraggingOver` to work.
- `dragleave` - dragleave event handler
  - Will be added to `element` if given.
  - If no element is given, this can optionally be defined manually on the dropzone element to enable `isDraggingOver` to work.
- `drop` - drop event handler (required to enable drops)
  - Will be added to `element` if given.
  - If no element is given, this **has** to be defined manually on the dropzone element.

See the following examples for how this is used in practice.

## Examples

<script setup>
import { ref, onMounted } from "vue"
import { utils } from "../../src"
import ItemName from "../../src/components/ItemName.vue"
import ItemList from "../../src/components/ItemList.vue"
import ItemDetails from "../../src/components/ItemDetails.vue"
const { draggedItem, dragstart, dragend, addDropzone } = utils.dragAndDrop
const {
  dragover,
  dragenter,
  dragleave,
  drop,
  isDraggingOver,
} = addDropzone(null, (item) => {
  alert(`Dropped item with URI ${item.uri}`)
})
// We need to use onMounted so that dropzone is mounted in DOM
onMounted(() => {
  addDropzone(document.getElementById("dropzone"), (item) => {
    alert(`Dropped item with URI ${item.uri}`)
  })
  addDropzone(document.getElementById("dropzone2"), (item) => {
    alert(`Dropped item with URI ${item.uri}`)
  })
})
const items = [
  { notation: ["1"] },
  { notation: ["2"] },
  { notation: ["3"] },
].map(i => ({ ...i, uri: `item:${i.notation[0]}`, prefLabel: { en: `Item ${i.notation[0]}` } }))
// Selected item for ItemDetails
const selected = ref(items[2])
</script>

### Basic Example

Currently dragging: {{ draggedItem && draggedItem.uri }}

<!-- Defining draggable items -->
<div
  v-for="item in items"
  :key="item.uri"
  draggable="true"
  @dragstart="dragstart(item)"
  @dragend="dragend">
  {{ item.uri }}
</div>

<!-- Dropzone with manually set events and conditional CSS classes -->
<div
  :class="{
    drag: draggedItem,
    noDrag: !draggedItem,
    draggingOver: isDraggingOver,
  }"
  @dragover="dragover"
  @dragenter="dragenter"
  @dragleave="dragleave"
  @drop="drop">
  {{ draggedItem ? "Try to drop the item here" : "Start dragging an item" }}
</div>

<!-- Dropzone that we can get by ID; no conditional CSS classes -->
<div
  id="dropzone"
  class="noDrag"
  style="height: 100px;">
  This zone does not change, but you can drop an item here.
</div>

<style>
.drag, .noDrag {
  height: 50px;
  width: 250px;
  margin: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid black;
}
.drag {
  border-style: dashed;
}
.draggingOver {
  background-color: red;
}
</style>

```vue
<script setup>
import { onMounted } from "vue"
import { utils } from "jskos-vue"
const { draggedItem, dragstart, dragend, addDropzone } = utils.dragAndDrop
const {
  dragover,
  dragenter,
  dragleave,
  drop,
  isDraggingOver,
} = addDropzone(null, (item) => {
  alert(`Dropped item with URI ${item.uri}`)
})
// We need to use onMounted so that dropzone is mounted in DOM
onMounted(() => {
  addDropzone(document.getElementById("dropzone"), (item) => {
    alert(`Dropped item with URI ${item.uri}`)
  })
})
const items = [
  { notation: ["1"] },
  { notation: ["2"] },
  { notation: ["3"] },
].map(i => ({ ...i, uri: `item:${i.notation[0]}`, prefLabel: { en: `Item ${i.notation[0]}` } }))
</script>

<template>
  Currently dragging: {{ draggedItem && draggedItem.uri }}

  <!-- Defining draggable items -->
  <div
    v-for="item in items"
    :key="item.uri"
    draggable="true"
    @dragstart="dragstart(item)"
    @dragend="dragend">
    {{ item.uri }}
  </div>

  <!-- Dropzone with manually set events and conditional CSS classes -->
  <div
    :class="{
      drag: draggedItem,
      noDrag: !draggedItem,
      draggingOver: isDraggingOver,
    }"
    @dragover="dragover"
    @dragenter="dragenter"
    @dragleave="dragleave"
    @drop="drop">
    {{ draggedItem ? "Try to drop the item here" : "Start dragging an item" }}
  </div>

  <!-- Dropzone that we can get by ID; no conditional CSS classes -->
  <div
    id="dropzone"
    class="noDrag"
    style="height: 100px;">
    This zone does not change, but you can drop an item here.
  </div>
</template>

<style>
.drag, .noDrag {
  height: 50px;
  width: 250px;
  margin: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid black;
}
.drag {
  border-style: dashed;
}
.draggingOver {
  background-color: red;
}
</style>
```

### Example with ItemName/ItemList/ItemDetails

<div
  id="dropzone2"
  style="height: 100px; width: 250px; display: flex; justify-content: center; align-items: center; border: 1px solid black;">
  You can drop an item here.
</div>
<p>
 Single item: <item-name :item="items[0]" />
</p>

ItemList:
<item-list
  :items="items" />

ItemDetails (is a dropzone by default):

<item-details
  :item="selected"
  @select="selected = $event.item" />

```vue
<script setup>
import { onMounted } from "vue"
import { utils, ItemName, ItemList, ItemDetails } from "jskos-vue"
const { draggedItem, dragstart, dragend, addDropzone } = utils.dragAndDrop
// We need to use onMounted so that dropzone2 is mounted in DOM
onMounted(() => {
  addDropzone(document.getElementById("dropzone2"), (item) => {
    alert(`Dropped item with URI ${item.uri}`)
  })
})
const items = [
  { notation: ["1"] },
  { notation: ["2"] },
  { notation: ["3"] },
].map(i => ({ ...i, uri: `item:${i.notation[0]}`, prefLabel: { en: `Item ${i.notation[0]}` } }))
// Selected item for ItemDetails
const selected = ref(items[2])
</script>

<template>
  <div
    id="dropzone2"
    style="height: 100px; width: 250px; display: flex; justify-content: center; align-items: center; border: 1px solid black;">
    You can drop an item here.
  </div>
  <p>
  Single item: <item-name :item="items[0]" />
  </p>
  ItemList:
  <item-list :items="items" />
  ItemDetails (is a dropzone by default):

  <item-details
    :item="selected"
    @select="selected = $event.item" />
</template>
```
