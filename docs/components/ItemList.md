# ItemList
A list of JSKOS items with their notation and label.

Uses [ItemName](./ItemName). Also uses [dragAndDrop](../utilities/dragAndDrop) and rows are draggable by default.

## Props
- `items` (array) - array of objects
  - required
- `itemProperty` (string) - defines which property on the objects contains the JSKOS item
  - by default, the objects themselves will be considered the JSKOS items
- `rowMode` (boolean) - if enabled, the whole row will have a background color on hover (CSS var `--jskos-vue-itemList-hover-bgColor`) and be clickable
  - default: `true`
- `draggable` (boolean) - whether the item is draggable
  - default: `true`
  - This will also set `itemNameOptions.draggable` if it's not set separately.
- `itemNameOptions` (object) - options that are passed along to [ItemName](./ItemName) via v-bind
- `indicatorByUri` (object) - object that maps item URIs to either color strings or boolean values
  - If either a color or `true` is given for a particular item, an indicator will be shown to the right side of the item in the list.
  - Note that lists use the full width of the page, so it makes sense to define a maximum width to make sure indicators can be associated with the right item.
- `highlightByUri` (object) - object that maps item URIs to either color strings or boolean values
  - If either a color or `true` is given for a particular item, a highlight background color will be used for that item (CSS var `--jskos-vue-conceptTree-selected-bgColor` by default).

## Slots
- beforeItem: Content shown before an item (includes parameter `item`).
- afterItem: Content shown after an item (includes parameter `item`).

## Methods
- `isUriInView(uri, partial = 60)` - checks whether a certain item (via its URI) is currently in view
  - By default, it will return `true` when the item's element is at least 60% visible. To only return `true` when it is fully visible, set `partial` to `false`.
- `scrollToUri(uri, onlyIfNotInView = false)` - scrolls the item list to a certain item via its URI
  - When `onlyIfNotInView` is given, scrolling only occurs if the item is not already visible (using `isUriInView`'s default).

## Events
- `select`
  - Emitted when an item or a row (if `rowMode` prop is `true`) is clicked.
  - Parameter is an object with properties `item` (containing the clicked JSKOS item) and `row` (containing a boolean which is `true` when the click was initiated via the row, not on the item directly).

## CSS Variables
- `--jskos-vue-itemList-hover-bgColor` - row hover background color (for `rowMode` = `true`)
  - default: `#fdbd58aa`
- `--jskos-vue-itemList-indicator-color` - default indicator color (for `true` values)
  - default: `green`

## Examples

<script setup>
import ItemList from "../../src/components/ItemList.vue"

const concepts = []
for (let i = 0; i <= 15; i += 1) {
  concepts.push({
    uri: `uri:${i}`,
    notation: [`${i}`],
    prefLabel: {
      en: `Concept no. ${i}`,
    },
  })
}

const select = ({ item, row }) => {
  alert(`Item with URI ${item.uri} selected (row: ${row}).`)
}
</script>

<h3>Default, clickable = true, with indicators and slot</h3>
<item-list
  :items="concepts"
  :indicator-by-uri="{
    'uri:2': true,
    'uri:3': true,
    'uri:12': 'blue',
    'uri:13': 'yellow',
    'uri:14': 'black',
  }"
  @select="select">
  <template v-slot:afterItem="{ item }">
    <!-- Show a rocket after all items with URIs starting with 1 -->
    <template v-if="item.uri.startsWith('uri:1')">
      🚀
    </template>
  </template>
</item-list>

<h3>rowMode = false, with itemNameOptions</h3>
<item-list
  :items="concepts.slice(0, 5)"
  :row-mode="false"
  :item-name-options="{
    clickable: true,
    draggable: false,
  }"
  @select="select" />

```vue
<template>
  <h3>Default, clickable = true, with indicators and slot</h3>
  <item-list
    :items="concepts"
    :indicator-by-uri="{
      'uri:2': true,
      'uri:3': true,
      'uri:12': 'blue',
      'uri:13': 'yellow',
      'uri:14': 'black',
    }"
    @select="select">
    <template v-slot:afterItem="{ item }">
      <!-- Show a rocket after all items with URIs starting with 1 -->
      <template v-if="item.uri.startsWith('uri:1')">
        🚀
      </template>
    </template>
  </item-list>

  <h3>rowMode = false, with itemNameOptions</h3>
  <item-list
    :items="concepts.slice(0, 5)"
    :row-mode="false"
    :item-name-options="{
      clickable: true,
      draggable: false,
    }"
    @select="select" />
</template>

<script setup>
import { ItemList } from "jskos-vue"

const concepts = []
for (let i = 0; i <= 15; i += 1) {
  concepts.push({
    uri: `uri:${i}`,
    notation: [`${i}`],
    prefLabel: {
      en: `Concept no. ${i}`,
    },
  })
}

const select = ({ item, row }) => {
  alert(`Item with URI ${item.uri} selected (row: ${row}).`)
}
</script>
```
