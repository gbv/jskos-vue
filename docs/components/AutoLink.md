# AutoLink

Replacement for the `<a>` element that automatically links the URL if it's valid, and only shows text if it's invalid.

## Props

- `href` *string*\
  a string that could be a URL
- `text` *string, default value from `href`*\
  text shown for the link

## Slots

- `default` alternative to the `text` property

## Example

<script setup>
import { AutoLink } from "../../src/index.js"
</script>

::: component-view
<ul>
  <li>URL without text: <auto-link href="https://coli-conc.gbv.de" /></li>
  <li>URL with text (via prop): <auto-link href="https://coli-conc.gbv.de" text="coli-conc" /></li>
  <li>URL with text (via slot): <auto-link href="https://coli-conc.gbv.de">coli-conc</auto-link></li>
  <li>Not a URL (show as text): <auto-link href="some text" /></li>
</ul>
:::
