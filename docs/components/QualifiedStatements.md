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
import { QualifiedStatements } from "../../src/components/index.js"

const labels = {
  "https://example.org/participatedIn": "Participated in",
  "https://schema.org/pagination": "Pagination",
}

const item = {
  uri: "https://example.org/person",
  qualifiedRelations: {
    "https://example.org/participatedIn": [{
      rank: "preferred",
      startDate: "2020",
      resource: {
        uri: "https://example.org/event",
        prefLabel: { en: "Example event" },
        qualifiedLiterals: {
          "https://schema.org/pagination": [{
            literal: { string: "Page 12" },
          }],
        },
      },
    }],
  },
  qualifiedLiterals: {
    "https://example.org/note": [{
      literal: { string: "Example note", language: "en" },
      source: [{
        prefLabel: { en: "Example source" },
        qualifiedLiterals: {
          "https://schema.org/pagination": [{
            literal: { string: "Page 24" },
          }],
        },
      }],
    }],
  },
}

const labelForUri = uri => labels[uri] || ""
</script>

<QualifiedStatements
  :item="item"
  :label-for-uri="labelForUri" />

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
