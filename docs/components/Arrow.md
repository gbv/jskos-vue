# Arrow
CSS arrows.

## Props
- `direction` (string) - up/down/left/right
  - required
- `clickable` (boolean) - adjusts color and mouse pointer if `true`
  - default: `false`

## Slots
None

## Methods
None

## Events
None

## Examples

<script setup>
import Arrow from "../../src/components/Arrow.vue"
</script>

<arrow direction="up" />
<arrow direction="down" />
<arrow direction="left" />
<arrow direction="right" />

Clickable:
<arrow direction="up" :clickable="true" />
<arrow direction="down" :clickable="true" />
<arrow direction="left" :clickable="true" />
<arrow direction="right" :clickable="true" />

```vue
<template>
  <arrow direction="up" />
  <arrow direction="down" />
  <arrow direction="left" />
  <arrow direction="right" />

  Clickable:
  <arrow direction="up" :clickable="true" />
  <arrow direction="down" :clickable="true" />
  <arrow direction="left" :clickable="true" />
  <arrow direction="right" :clickable="true" />
</template>

<script setup>
import { Arrow } from "jskos-vue"
</script>
```
