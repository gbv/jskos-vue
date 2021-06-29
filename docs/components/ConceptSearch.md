# ConceptSearch

## Props
- `scheme` (object) - JSKOS scheme to search in
  - required
- `registry` (object) - [cocoda-sdk](https://github.com/gbv/cocoda-sdk) registry to access the scheme
  - required if `scheme._registry` is not defined

## Methods
- `focus()` - focuses the input field
- `setQuery(newQuery, focus = false)` - sets the query (input field) to `newQuery`; optionally focuses the input field

## Events
- `select`
  - Emitted when a search result is selected (either via click or enter).
  - Parameter is the JSKOS concept of the selected result (with `uri` and `inScheme` properties).

## Examples

<script setup>
import ConceptSearch from "../../src/components/ConceptSearch.vue"

import * as cdk from "cocoda-sdk"
const registry = cdk.initializeRegistry({
  provider: "ConceptApi",
  api: "https://coli-conc.gbv.de/api/",
})

const scheme = {
  uri: "http://dewey.info/scheme/edition/e23/",
  license: [
    {
      uri: "http://creativecommons.org/licenses/by-nc-nd/3.0/"
    }
  ],
}
</script>

<ConceptSearch
  :scheme="scheme"
  :registry="registry" />

```vue
<template>
  <ConceptSearch
    :scheme="scheme"
    :registry="registry" />
</template>

<script setup>
import { ConceptSearch } from "jskos-vue"

import * as cdk from "cocoda-sdk"
const registry = cdk.initializeRegistry({
  provider: "ConceptApi",
  api: "https://coli-conc.gbv.de/api/",
})

const scheme = {
  uri: "http://dewey.info/scheme/edition/e23/",
  license: [
    {
      uri: "http://creativecommons.org/licenses/by-nc-nd/3.0/"
    }
  ],
}
</script>
```
