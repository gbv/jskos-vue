# RemoveIcon

Small button component showing a “×” remove icon.

## Props

- `ariaLabel` (string) — aria-label for the button.
  default: [localized label](#localized-labels) `remove`
- `title` (string) — tooltip title with supplementary information.
  default: same as ariaLabel

## Events

- `click`
  Emitted when the button is clicked.
  Parameter is the native click event.

## CSS

- Class `.jskos-vue-removeIcon`

## Localized labels

- `remove` has localization in English (`"Remove"`) and German (`"Entfernen"`)

## Examples

<script setup>
import RemoveIcon from "../../src/components/RemoveIcon.vue"
const onRemove = () => alert("remove clicked")
</script>

<remove-icon @click="onRemove" /> (default) <br>
<remove-icon aria-label="Remove item" @click="onRemove" /> (aria-label) <br>
<remove-icon title="Remove item" @click="onRemove" /> (title) <br>
<remove-icon title="" @click="onRemove" /> (no title)

```vue
<template>
  <remove-icon @click="onRemove" /> (default) <br>
  <remove-icon aria-label="Remove item" @click="onRemove" /> (aria-label) <br>
  <remove-icon title="Remove item" @click="onRemove" /> (title) <br>
  <remove-icon title="" @click="onRemove" /> (no title)
</template>

<script setup>
import { RemoveIcon } from "jskos-vue"
const onRemove = () => alert("remove clicked")
</script>
```
