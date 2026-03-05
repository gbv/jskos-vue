# Arrow

A small arrows implemented in pure CSS.

## Props

- `direction` *string, required* — up/down/left/right
- `clickable` *boolean, default `false`* — adjusts color and mouse pointer if `true`

## CSS Classes

- `.jskos-vue-arrow` — the component element
- `.jskos-vue-clickable` — set if the arrow is clickable

## Example

<script setup>
import { Arrow } from "../../src/index.js"
</script>

::: component-view
<arrow direction="up" />
<arrow direction="down" />
<arrow direction="left" />
<arrow direction="right" />

Clickable:
<arrow direction="up" :clickable="true" />
<arrow direction="down" :clickable="true" />
<arrow direction="left" :clickable="true" />
<arrow direction="right" :clickable="true" />
:::
