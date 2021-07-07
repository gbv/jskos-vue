# addDragAndDrop

## Examples

<script setup>
import { utils } from "../../src"
const {
  dragStart,
  dragEnd,
  dragOver,
  drop,
  draggedItem,
} = utils.addDragAndDrop((item) => {
  alert(`Dropped item with URI ${item.uri}`)
})
const items = [
  { uri: "item:1" },
  { uri: "item:2" },
  { uri: "item:3" },
]
</script>

Currently dragging: {{ draggedItem && draggedItem.uri }}

<div
  v-for="item in items"
  :key="item.uri"
  :item="item"
  draggable="true"
  @dragstart="dragStart(item)"
  @dragend="dragEnd">
  {{ item.uri }}
</div>

<div
  :class="{
    drag: draggedItem,
    noDrag: !draggedItem,
  }"
  @dragover="dragOver"
  @drop="drop">
  {{ draggedItem ? "Try to drop the item here" : "Start dragging an item" }}
</div>

<style>
.drag, .noDrag {
  height: 50px;
  width: 200px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
}
.drag {
  border-style: dashed;
}
</style>
