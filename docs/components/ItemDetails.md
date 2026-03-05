# ItemDetails

Component to display details for a JSKOS item.

Uses [ItemName](./ItemName), [ItemList](./ItemList), [LicenseInfo](./LicenseInfo), [AutoLink](./AutoLink). Also uses [dragAndDrop](../utilities/dragAndDrop) and defines a dropzone for items. Dropped items will trigger the `select` event.

## Props

- `item` *object, required* — JSKOS item (concept or concept scheme)
- `itemListOptions` *object, default `{}` — options that are passed along to [ItemList](./ItemList) via v-bind
- `showTabs` *boolean, default `true`* — option whether to show ItemDetailsTabs
- `showAncestors` *boolean, default `true`* — option whether to show the item's ancestors
- `showBroader` *boolean, default `true`* — option whether to show the item's broader concepts
- `showNarrower` *boolean, default `true`* — option whether to show the item's narrower concepts
- `dropzone` *boolean, default `true`* — option whether the component is a drop zone for concepts
- `draggable` *boolean, default `true`* — whether item elements are draggable. Also sets `itemListOptions.draggable` if not set separately.
- `flat` *boolean, default `false`* — whether details are displayed in a flat layout (opposed to tabs; experimental)
- `fields` *object, default `{}`* — configures which JSKOS fields are shown. By default all fields, except for `publisher` of concepts.

## Slots

- `before` — shown above the component (same as `beforeName`).
- `beforeName` — shown before the item's name.
- `afterName` — shown after the item's name.
- `beforeTabs` — shown right before detail tabs (below ancestors and broader)
- `afterTabs` — shown right after detail tabs (above narrower)
- `after` — shown below the component.
- `additionalTabs` — slot to add additional tabs (via [jskos-vue-tabs](https://github.com/gbv/jskos-vue-tabs)) or absolutely positioned content for all tabs.

## Events

- `select` is emitted when a concept is selected. Parameter is an object with properties `item` (containing the clicked JSKOS concept) and `row` (containing a boolean which is `true` when the click was initiated via the row, not on the item directly).

## CSS variables and classes

- `.jskos-vue-itemDetails` — the component element
- `.jskos-vue-itemDetails-name`
- `.jskos-vue-itemDetails-dropzone`
- `.jskos-vue-itemDetails-ancestors`
- `.jskos-vue-itemDetails-broader`
- `.jskos-vue-itemDetails-narrower`
- `.jskos-vue-itemDetails-tabs`
- `--jskos-vue-itemDetails-dropzone-bgCover` - background color for overlay which is shown when an item is being dragged over ItemDetails

## Examples

<script setup>
import { ItemDetails, ItemDetailsTabs } from "../../src/components/index.js"
import { Tab } from "jskos-vue-tabs"
import * as jskos from "jskos-tools"
import { reactive } from "vue"

const state = reactive({
  itemListOptions: {
    indicatorByUri: {
      "https://example.com/DT2": true,
      "https://example.com/DT3": true,
    },
  },
  dropzone: true,
  draggable: true,
  item: {
    uri: "https://example.com/DT",
    notation: ["DT"],
    license: [
      {
        uri: "http://creativecommons.org/publicdomain/zero/1.0/",
      },
      {
        uri: "http://example.com/license/",
      },
    ],
    prefLabel: {
      en: "Detailed Item",
      de: "Detalliertes Item",
    },
    altLabel: {
      fr: ["Désignation alternative"],
      de: ["Alternative Benennung", "noch eine"],
    },
    editorialNote: {
      en: ["Editorial English"],
      de: ["Editorial Deutsch"],
      fr: ["Editorial Français"],
    },
    identifier: ["uri:detailed", "test"],
    created: "2021-05-27",
    issued: "2021-05-27",
    modified: "2021-05-28",
    definition: {
      en: ["a defintion", "a second definition"],
      de: ["eine Definition"],
    },
    narrower: [
      {
        uri: "https://example.com/DT1",
        notation: ["DT1"],
        prefLabel: {
          en: "a Child",
          de: "ein Unterkonzept",
        },
      },
      {
        uri: "https://example.com/DT2",
        notation: ["DT2"],
        prefLabel: {
          en: "another Child",
          de: "ein weiteres Unterkonzept",
        },
      },
      {
        uri: "https://example.com/DT3",
        notation: ["DT3"],
        prefLabel: {
          en: "yet another Child",
          de: "noch ein weiteres Unterkonzept",
        },
      },
    ],
    ancestors: [
      {
        uri: "https://example.com/D0",
        notation: ["D0"],
        prefLabel: {
          en: "another Ancestor",
          de: "ein weiteres Elternkonzept",
        },
      },
      {
        uri: "https://example.com/D",
        notation: ["D"],
        prefLabel: {
          en: "an Ancestor",
          de: "ein Elternkonzept",
        },
      },
    ],
    broader: [
      {
        uri: "https://example.com/D",
        notation: ["D"],
        prefLabel: {
          en: "an Ancestor",
          de: "ein Elternkonzept",
        },
      },
      {
        uri: "https://example.com/D-alt",
        notation: ["D-alt"],
        prefLabel: {
          en: "a broader concept",
          de: "ein übergeordnetes Konzept",
        },
      },
    ],
    publisher: [
      {
        url: "https://www.gbv.de",
        prefLabel: {
          en: "VZG",
        },
      }
    ],
  },
})

const alert = (...args) => window.alert(...args)
</script>

### Default

<p>
  Settings:
  <button
    @click="() => {
      if (state.itemListOptions.indicatorByUri) {
        state.itemListOptions._indicatorByUri = state.itemListOptions.indicatorByUri
        delete state.itemListOptions.indicatorByUri
      } else {
        state.itemListOptions.indicatorByUri = state.itemListOptions._indicatorByUri
        delete state.itemListOptions._indicatorByUri
      }
    }">
    indicators: {{ !!state.itemListOptions.indicatorByUri }}
  </button>
  <button
    @click="state.dropzone = !state.dropzone">
    dropzone: {{ !!state.dropzone }}
  </button>
  <button
    @click="state.draggable = !state.draggable">
    draggable: {{ !!state.draggable }}
  </button>
  <button
    @click="() => {
      if (state.item.scopeNote) {
        delete state.item.scopeNote
      } else {
        state.item.scopeNote = {
          de: ['Scope Deutsch'],
          en: ['Scope English'],
        }
      }
    }">
    {{ state.item.scopeNote ? "Remove" : "Add" }} scopeNote
  </button>
</p>
<item-details
  v-bind="state"
  @select="alert(`Clicked on item ${$event.item.uri}`)">
  <template v-slot:additionalTabs>
    <tab title="Test">
      <ul class="jskos-vue-itemDetails-list">
        <li><b>This tab was added via the "additionalTabs" slot.</b></li>
        <li>This is a list with class "jskos-vue-itemDetails-list" to test if it works inside slots.</li>
      </ul>
    </tab>
    <div style="position: absolute; top: 0; right: 0;">
      🚀
    </div>
  </template>
  <template v-slot:beforeName>
    🆇
  </template>
  <template v-slot:afterName>
    ⭐️
    <div style="position: absolute; top: 0; right: 0;">
      ➕
    </div>
  </template>
</item-details>

```vue
<script setup>
import { ItemDetails } from "jskos-vue"
import { Tab } from "jskos-vue-tabs"
import * as jskos from "jskos-tools"
import { reactive } from "vue"

const state = reactive({
  itemListOptions: {
    indicatorByUri: {
      "https://example.com/DT2": true,
      "https://example.com/DT3": true,
    },
  },
  dropzone: true,
  draggable: true,
  item: {
    uri: "https://example.com/DT",
    notation: ["DT"],
    prefLabel: {
      en: "Detailed Item",
      de: "Detalliertes Item",
    },
    altLabel: {
      fr: ["Désignation alternative"],
      de: ["Alternative Benennung", "noch eine"],
    },
    editorialNote: {
      en: ["Editorial English"],
      de: ["Editorial Deutsch"],
      fr: ["Editorial Français"],
    },
    identifier: ["uri:detailed", "test"],
    created: "2021-05-27",
    issued: "2021-05-27",
    modified: "2021-05-28",
    definition: {
      en: ["a defintion", "a second definition"],
      de: ["eine Definition"],
    },
    narrower: [
      {
        uri: "https://example.com/DT1",
        notation: ["DT1"],
        prefLabel: {
          en: "a Child",
          de: "ein Unterkonzept",
        },
      },
      {
        uri: "https://example.com/DT2",
        notation: ["DT2"],
        prefLabel: {
          en: "another Child",
          de: "ein weiteres Unterkonzept",
        },
      },
      {
        uri: "https://example.com/DT3",
        notation: ["DT3"],
        prefLabel: {
          en: "yet another Child",
          de: "noch ein weiteres Unterkonzept",
        },
      },
    ],
    ancestors: [
      {
        uri: "https://example.com/D0",
        notation: ["D0"],
        prefLabel: {
          en: "another Ancestor",
          de: "ein weiteres Elternkonzept",
        },
      },
      {
        uri: "https://example.com/D",
        notation: ["D"],
        prefLabel: {
          en: "an Ancestor",
          de: "ein Elternkonzept",
        },
      },
    ],
    broader: [
      {
        uri: "https://example.com/D",
        notation: ["D"],
        prefLabel: {
          en: "an Ancestor",
          de: "ein Elternkonzept",
        },
      },
      {
        uri: "https://example.com/D-alt",
        notation: ["D-alt"],
        prefLabel: {
          en: "a broader concept",
          de: "ein übergeordnetes Konzept",
        },
      },
    ],
  },
})

const alert = (...args) => window.alert(...args)
</script>

<template>
  <p>
    Settings:
    <button
      @click="() => {
        if (state.itemListOptions.indicatorByUri) {
          state.itemListOptions._indicatorByUri = state.itemListOptions.indicatorByUri
          delete state.itemListOptions.indicatorByUri
        } else {
          state.itemListOptions.indicatorByUri = state.itemListOptions._indicatorByUri
          delete state.itemListOptions._indicatorByUri
        }
      }">
      indicators: {{ !!state.itemListOptions.indicatorByUri }}
    </button>
    <button
      @click="state.dropzone = !state.dropzone">
      dropzone: {{ !!state.dropzone }}
    </button>
    <button
      @click="state.draggable = !state.draggable">
      draggable: {{ !!state.draggable }}
    </button>
    <button
      @click="() => {
        if (state.item.scopeNote) {
          delete state.item.scopeNote
        } else {
          state.item.scopeNote = {
            de: ['Scope Deutsch'],
            en: ['Scope English'],
          }
        }
      }">
      {{ state.item.scopeNote ? "Remove" : "Add" }} scopeNote
    </button>
  </p>
  <item-details
    v-bind="state"
    @select="alert(`Clicked on item ${$event.item.uri}`)">
    <template v-slot:additionalTabs>
      <tab title="Test">
        <ul class="jskos-vue-itemDetails-list">
          <li><b>This tab was added via the "additionalTabs" slot.</b></li>
          <li>This is a list with class "jskos-vue-itemDetails-list" to test if it works inside slots.</li>
        </ul>
      </tab>
      <div style="position: absolute; top: 0; right: 0;">
        🚀
      </div>
    </template>
    <template v-slot:beforeName>
      🆇
    </template>
    <template v-slot:afterName>
      ⭐️
      <div style="position: absolute; top: 0; right: 0;">
        ➕
      </div>
    </template>
  </item-details>
</template>
```

### Hide tabs and show them next to component

Note: This works best when using a fixed width for ItemDetailsTabs (otherwise wrapping might change depending on the selected tab).

<div style="display: flex; flex-wrap: wrap;">
  <item-details
    v-bind="state"
    :showTabs="false"
    :fields="{ license: false }"
    style="flex: 1;"
    @select="alert(`Clicked on item ${$event.item.uri}`)" />
  <item-details-tabs
    :item="state.item"
    style="flex: 0 0 280px; padding-left: 10px;" />
</div>

```vue
<script setup>
import { ItemDetails, ItemDetailsTabs } from "jskos-vue"
import { reactive } from "vue"

const state = reactive({
  item: {
    uri: "https://example.com/DT",
    notation: ["DT"],
    prefLabel: {
      en: "Detailed Item",
      de: "Detalliertes Item",
    },
    altLabel: {
      fr: ["Désignation alternative"],
      de: ["Alternative Benennung", "noch eine"],
    },
    editorialNote: {
      en: ["Editorial English"],
      de: ["Editorial Deutsch"],
      fr: ["Editorial Français"],
    },
    identifier: ["uri:detailed", "test"],
    created: "2021-05-27",
    issued: "2021-05-27",
    modified: "2021-05-28",
    definition: {
      en: ["a defintion", "a second definition"],
      de: ["eine Definition"],
    },
    narrower: [
      {
        uri: "https://example.com/DT1",
        notation: ["DT1"],
        prefLabel: {
          en: "a Child",
          de: "ein Unterkonzept",
        },
      },
      {
        uri: "https://example.com/DT2",
        notation: ["DT2"],
        prefLabel: {
          en: "another Child",
          de: "ein weiteres Unterkonzept",
        },
      },
      {
        uri: "https://example.com/DT3",
        notation: ["DT3"],
        prefLabel: {
          en: "yet another Child",
          de: "noch ein weiteres Unterkonzept",
        },
      },
    ],
    ancestors: [
      {
        uri: "https://example.com/D0",
        notation: ["D0"],
        prefLabel: {
          en: "another Ancestor",
          de: "ein weiteres Elternkonzept",
        },
      },
      {
        uri: "https://example.com/D",
        notation: ["D"],
        prefLabel: {
          en: "an Ancestor",
          de: "ein Elternkonzept",
        },
      },
    ],
    broader: [
      {
        uri: "https://example.com/D",
        notation: ["D"],
        prefLabel: {
          en: "an Ancestor",
          de: "ein Elternkonzept",
        },
      },
      {
        uri: "https://example.com/D-alt",
        notation: ["D-alt"],
        prefLabel: {
          en: "a broader concept",
          de: "ein übergeordnetes Konzept",
        },
      },
    ],
  },
})

const alert = (...args) => window.alert(...args)
</script>

<template>
  <div style="display: flex; flex-wrap: wrap;">
    <item-details
      v-bind="state"
      :showTabs="false"
      :fields="{ license: false }"
      style="flex: 1;"
      @select="alert(`Clicked on item ${$event.item.uri}`)" />
    <item-details-tabs
      :item="state.item"
      style="flex: 0 0 280px; padding-left: 10px;" />
  </div>
</template>
```
