# AutoLink
Replacement for the `<a>` element that automatically links the URL if it's valid, and only shows text if it's invalid.

## Props
- `href` (string) - a string that could be a URL
- `text` (string) - text shown for the link
  - default: `href` property

## Slots
- default: Alternative to the `text` property.

## Examples

<script setup>
import AutoLink from "../../src/components/AutoLink.vue"
</script>

<ul>
  <li>URL without text: <auto-link href="https://coli-conc.gbv.de" /></li>
  <li>URL with text (via prop): <auto-link href="https://coli-conc.gbv.de" text="coli-conc" /></li>
  <li>URL with text (via slot): <auto-link href="https://coli-conc.gbv.de">coli-conc</auto-link></li>
  <li>Not a URL (show as text): <auto-link href="some text" /></li>
</ul>

```vue
<template>
  <ul>
    <li>URL without text: <auto-link href="https://coli-conc.gbv.de" /></li>
    <li>URL with text (via prop): <auto-link href="https://coli-conc.gbv.de" text="coli-conc" /></li>
    <li>URL with text (via slot): <auto-link href="https://coli-conc.gbv.de">coli-conc</auto-link></li>
    <li>Not a URL (show as text): <auto-link href="some text" /></li>
  </ul>
</template>

<script setup>
import { AutoLink } from "jskos-vue"
</script>
```
