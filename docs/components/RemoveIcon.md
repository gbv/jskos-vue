# RemoveIcon

Small button component showing a “×” remove icon.

## Props

- `ariaLabel` (string) — aria-label for the button  
  default: `"Remove"`
- `title` (string) — tooltip title  
  default: `"Remove"`
- `color` (string) — any CSS color string (e.g. `"white"`, `"#fff"`, `"red"`, `"var(--...)"`)  
  default: `"white"`

## Events

- `click`  
  Emitted when the button is clicked.  
  Parameter is the native click event.

## CSS

- Class: `.jskos-vue-removeIcon` (scoped to the component)

## Examples

<script setup>
import RemoveIcon from "../../src/components/RemoveIcon.vue"
const onRemove = () => alert("remove clicked")
</script>

<remove-icon @click="onRemove" />
<remove-icon color="black" @click="onRemove" />

```vue
<template>
  <remove-icon @click="onRemove" />
  <remove-icon color="black" @click="onRemove" />
</template>

<script setup>
import { RemoveIcon } from "jskos-vue"

const onRemove = () => alert("remove clicked")
</script>
```