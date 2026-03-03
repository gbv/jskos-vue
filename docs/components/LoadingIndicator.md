# LoadingIndicator
Spinning loading indicator.

## Props
- `size` *string, default `md`*\
  size of the indicator: `sm | md | lg | xl`

## CSS Variables
- `--jskos-vue-loadingIndicator-primary-color` *string, default `lightgray`*\
  color of the ring
- `--jskos-vue-loadingIndicator-secondary-color` *string, default `blue`*\
  color of the spinner

## Examples

::: component-view
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
:::
