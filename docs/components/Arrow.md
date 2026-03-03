# Arrow

Arrows via CSS.

## Props

- `direction` *string, required*\
  up/down/left/right
- `clickable` *boolean, default `false`*\
  adjusts color and mouse pointer if `true`

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