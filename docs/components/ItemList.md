# ItemList
A list of JSKOS items with their notation and label.

Uses [ItemName](./ItemName).

## Props
- `items` (array) - array of objects
  - required
- `itemProperty` (string) - defines which property on the objects contains the JSKOS item
  - by default, the objects themselves will be considered the JSKOS items
- `showNotation` (boolean) - whether to show an item's notation
  - default: `true`
- `showLabel` (boolean) - whether to show an item's label (`prefLabel`)
  - default: `true`
- `clickable` (boolean) - adjusts mouse pointer and text decoration on hover if `true`
  - default: `false`
- `indicatorByUri` (object) - object that maps item URIs to either color strings or boolean values
  - If either a color or `true` is given for a particular item, an indicator will be shown to the right side of the item in the list.
  - Note that lists use the full width of the page, so it makes sense to define a maximum width to make sure indicators can be associated with the right item.
- `indicatorColor` (string) - default indicator color for `true` values
  - default: green

## Slots
- beforeItem: Content shown before an item (includes parameter `item`).
- afterItem: Content shown after an item (includes parameter `item`).

## Methods
- `scrollToUri(uri)` - scrolls the item list to a certain item via its URI

## Events
- `select`
  - Emitted when an item or a row is clicked.
  - Parameter is an object with properties `item` (containing the clicked JSKOS item) and `row` (containing a boolean which is `true` when the click was initiated via the row, not on the item directly).

## CSS Variables
- `--jskos-vue-itemList-indicator-color` - default indicator color (for `true` values)
  - default: green

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

<item-list
  :items="concepts"
  :clickable="true"
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

```vue
<template>
  <item-list
    :items="concepts"
    :clickable="true"
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