# QualifiedStatements

Compact display of the JSKOS fields `qualifiedRelations`,
`qualifiedLiterals`, and `qualifiedDates`.

The overview shows property labels and primary statement values. Language,
date range, and significant rank (`Preferred` or `Deprecated`) are shown next
to the value. Types, sources, places, mappings, and nested qualified statements
are available through an inline inspector.
Mapping bundle visualization supports `memberSet`, `memberChoice`, and
`memberList`, but does not explicitly interpret `memberRoles`.

Only one inspector is open at a time. Nested objects are followed through a
breadcrumb path instead of rendering a deeply indented tree. Resource-only
references are treated as cycles when their object or URI is already in the
current path. Distinct qualified statements remain navigable when they reference
the same resource URI but carry separate qualifiers.

## Props

- `item` *object, required* — JSKOS item containing Qualified Statements.
- `resolve` *function, default `null`* — async `resolve(uri)` callback returning
  a JSKOS resource.
- `registry` *object, default `null`* — cocoda-sdk-compatible registry with a
  `getConcepts` method. It is used when `resolve` is not provided.
- `labelForUri` *function, default `null`* — synchronous
  `labelForUri(uri)` callback for application-provided labels.

URI labels use `labelForUri` first, then labels embedded in the data or loaded
through `resolve`/`registry`, and finally a shortened URI.
Embedded and resolved JSKOS labels use the shared
[content language selection](../utilities/useContentLanguage). Inspector
language maps continue to show all available values and language codes.

## Accessibility

Disclosure and breadcrumb controls are native buttons. Disclosure buttons use
`aria-expanded` and `aria-controls`. All resource links remain separate from
buttons. Pressing Escape closes the active inspector and restores focus to its
disclosure button.

## CSS variables and classes

- `--jskos-vue-qualifiedStatements-fontWeight`
- `--jskos-vue-qualifiedStatements-gap`
- `--jskos-vue-qualifiedStatements-smallGap`
- `--jskos-vue-qualifiedStatements-propertyWidth`
- `--jskos-vue-qualifiedStatements-statementGap`
- `--jskos-vue-qualifiedStatements-groupGap`
- `--jskos-vue-qualifiedStatements-mutedOpacity`
- `--jskos-vue-qualifiedStatements-border`
- `--jskos-vue-qualifiedStatements-focusOutline`
- `--jskos-vue-qualifiedStatements-inspectorColumns`
- `.jskos-vue-qualifiedStatements`
- `.jskos-vue-qualifiedStatements-row`
- `.jskos-vue-qualifiedStatements-disclosure`
- `.jskos-vue-qualifiedStatements-inspector`
- `.jskos-vue-qualifiedStatements-breadcrumb`

## Example

<script setup>
import { ref } from "vue"
import { QualifiedStatements } from "../../src/components/index.js"
import examples from "../examples/qualified-statements-examples.json"

const labels = {
  "https://schema.org/gender": "Gender",
  "https://w3id.org/dpv/pd#MaritalStatus": "Marital status",
  "http://www.cidoc-crm.org/cidoc-crm/P11i_participated_in": "Participated in",
  "http://www.cidoc-crm.org/cidoc-crm/P11_had_participant": "Had participant",
  "http://www.w3.org/2004/02/skos/core#Concept": "Concept",
  "http://www.cidoc-crm.org/cidoc-crm/E5_Event": "Event",
  "http://uri.gbv.de/terminology/biographie_chronicle_event/3b093d72-fe56-471b-9e5e-227943e34876": "Birth",
}

const selectedExample = ref("simple")
const labelForUri = uri => labels[uri] || ""
</script>

<div class="qualified-statements-example">
  <div class="qualified-statements-example-controls">
    <label for="qualified-statements-example">Example</label>
    <select id="qualified-statements-example" v-model="selectedExample">
      <option value="simple">Simple — Gender</option>
      <option value="intermediate">Intermediate — Marital status</option>
      <option value="advanced">Advanced — The Birth</option>
    </select>
  </div>

  <QualifiedStatements
    :item="examples[selectedExample]"
    :label-for-uri="labelForUri" />
</div>

The examples are exact subsets of the cocoda-Test-Person JSKOS dataset.

### Code

```vue
<script setup>
import { QualifiedStatements } from "jskos-vue"

const item = {
  qualifiedLiterals: {
    "https://example.org/note": [{
      literal: { string: "Example note", language: "en" },
      source: [{ prefLabel: { en: "Example source" } }],
    }],
  },
}
</script>

<template>
  <QualifiedStatements :item="item" />
</template>
```

## ItemDetails integration

`QualifiedStatements` can be placed after the existing detail tabs without
changing `ItemDetails`:

```vue
<ItemDetails :item="item">
  <template #afterTabs>
    <QualifiedStatements
      :item="item"
      :resolve="resolve" />
  </template>
</ItemDetails>
```
