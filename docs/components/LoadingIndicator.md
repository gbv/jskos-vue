# LoadingIndicator
Spinning loading indicator.

## Props
- `size` (string) - sm/md/lg/xl
  - default: md

## Slots
None

## Methods
None

## Events
None

## CSS Variables
- `--jskos-vue-loadingIndicator-primary-color` - color of the ring
  - default: lightgray
- `--jskos-vue-loadingIndicator-secondary-color` - color of the spinner
  - default: blue

## Examples

<script setup>
import LoadingIndicator from "../../src/components/LoadingIndicator.vue"
</script>

<ul>
  <li v-for="size in ['sm', 'md', 'lg', 'xl']" :key="size">
    {{ size }}: <loading-indicator :size="size" />
  </li>
  <li>
    Different color: <loading-indicator style="--jskos-vue-loadingIndicator-secondary-color: red;" />
  </li>
</ul>

```vue
<template>
  <ul>
    <li v-for="size in ['sm', 'md', 'lg', 'xl']" :key="size">
      {{ size }}: <loading-indicator :size="size" />
    </li>
    <li>
      Different color: <loading-indicator style="--jskos-vue-loadingIndicator-secondary-color: red;" />
    </li>
  </ul>
</template>

<script setup>
import { LoadingIndicator } from "jskos-vue"
</script>
```
