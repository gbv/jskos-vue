# addClickHandlers

Handles clicks in the application, e.g. to hide popovers when clicked outside.

Is used in [ItemSuggest](../components/ItemSuggest)

## Usage

```js
import { utils } from "jskos-vue"
utils.addClickHandlers(() => [
  {
    elements: [
      // Some DOM elements
    ],
    handler: ({ event, isInside }) => {
      // Handle click event
    },
  },
])
```

Takes a function as its first argument which returns an array. Each item in the array is an object with the following properties:

- `elements` - An array of elements that the click should be checked against.
- `handler` - A function that is called when a click **outside** the elements is registered.

The second argument (optional, default: `false`) forces the handler to be called even if the click is **inside** the provided elements. In this case, `isInside` will be set to `true` when calling the handler function.

Usually for popovers, you should add both the popover element (or rather the inside div) and the button that opens the popover to `elements`.

## Example

<script setup>
import { ref } from "vue"
import { utils } from "../../src"

const showPopover = ref(false)

// No need to put this in `onMounted` since everything will be called on demand
utils.addClickHandlers(() => [
  {
    elements: [
      document.getElementById("exampleButton"),
      document.getElementById("examplePopover"),
    ],
    handler: () => {
      showPopover.value = false
    },
  },
])
</script>

<button
  id="exampleButton"
  v-on:click="showPopover = !showPopover">
  Toggle Popover
</button>
<div
  v-show="showPopover"
  id="examplePopover"
  style="border: 1px dotted black;">
  This can contain any kind of interactive content. A click in here will not hide it. But a click anywhere else will call the click handler (which hides this popover).
</div>

```vue
<script setup>
import { ref } from "vue"
import { utils } from "jskos-vue"

const showPopover = ref(false)

// No need to put this in `onMounted` since everything will be called on demand
utils.addClickHandlers(() => [
  {
    elements: [
      document.getElementById("exampleButton"),
      document.getElementById("examplePopover"),
    ],
    handler: () => {
      showPopover.value = false
    },
  },
])
</script>

<template>
  <button
    id="exampleButton"
    v-on:click="showPopover = !showPopover">
    Toggle Popover
  </button>
  <div
    v-show="showPopover"
    id="examplePopover"
    style="border: 1px dotted black;">
    This can contain any kind of interactive content. A click in here will not hide it. But a click anywhere else will call the click handler (which hides this popover).
  </div>
</template>
```
