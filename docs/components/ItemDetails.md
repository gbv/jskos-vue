# ItemDetails
Component to display details for a JSKOS item.

Uses [ItemName](./ItemName), [ItemList](./ItemList), [LicenseInfo](./LicenseInfo), [AutoLink](./AutoLink). Also uses [dragAndDrop](../utilities/dragAndDrop) and defines a dropzone for items. Dropped items will trigger the `select` event.

## Props
- `item` (object) - JSKOS item (concept or concept scheme)
  - required
- `itemListOptions` (object) - options that are passed along to [ItemList](./ItemList) via v-bind
  - default: `{}`
- `showTabs` (boolean) - option whether to show ItemDetailsTabs
  - default: `true`
- `showAncestors` (boolean) - option whether to show the item's ancestors
  - default: `true`
- `showBroader` (boolean) - option whether to show the item's broader concepts
  - default: `true`
- `showNarrower` (boolean) - option whether to show the item's narrower concepts
  - default: `true`
- `dropzone` (boolean) - option whether the component is a drop zone for concepts
  - default: `true`
- `draggable` (boolean) - whether item elements are draggable
  - default: `true`
  - This will also set `itemListOptions.draggable` if it's not set separately.

## Slots
- `beforeName`: Content shown before the item's name.
- `afterName`: Content shown after the item's name.
- `additionalTabs`: Slot to add additional tabs (via [jskos-vue-tabs](https://github.com/gbv/jskos-vue-tabs)) or absolutely positioned content for all tabs.

## Events
- `select`
  - Emitted when a concept is selected.
  - Parameter is an object with properties `item` (containing the clicked JSKOS concept) and `row` (containing a boolean which is `true` when the click was initiated via the row, not on the item directly).

## CSS Variables
- `--jskos-vue-itemDetails-dropzone-bgCover` - background color for overlay which is shown when an item is being dragged over ItemDetails
  - default: `#eeeeee99`

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
      This tab was added via the "additionalTabs" slot.
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
        This tab was added via the "additionalTabs" slot.
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
      style="flex: 1;"
      @select="alert(`Clicked on item ${$event.item.uri}`)" />
    <item-details-tabs
      :item="state.item"
      style="flex: 0 0 280px; padding-left: 10px;" />
  </div>
</template>
```
