# Introduction

## What is jskos-vue?
jskos-vue is a library for [Vue 3](https://v3.vuejs.org) containing components and utilities related to the [JSKOS data format](https://gbv.github.io/jskos/) and the [coli-conc project](https://coli-conc.gbv.de). It was developed to make it easier to use JSKOS data and the coli-conc infrastructure in front-end projects.

Note that it was specifically developed with the needs of our [Cocoda Mapping Tool](https://github.com/gbv/cocoda) and [BARTOC](https://github.com/gbv/bartoc.org) in mind. So if certain decisions seem odd to you, it is probably because it was needed in one of those projects. Nevertheless feel free to [contact us](https://github.com/gbv/jskos-vue/issues) with your questions, suggestions, and use-cases!

## Overview
This library provides the following Vue components (plus some helper components and utility functions):

- [ItemName] - label or identifier of a JSKOS item
- [ItemList] - list of JSKOS items
- [ConceptTree] - hierarchical browsing of JSKOS concepts
- [ItemSuggest] - input field to search and select an item
- [ItemDetails] - full but condense details of a JSKOS item

[ItemName]: components/ItemName.html
[ItemList]: components/ItemList.html
[ConceptTree]: components/ConceptTree.html
[ItemSuggest]: components/ItemSuggest.html
[ItemDetails]: components/ItemDetails.html

## Requirements
- [Vue 3](https://v3.vuejs.org)
- One of the following:
  - [Node.js](https://nodejs.org/) version >=20
  - A modern browser
- [jskos-tools](https://github.com/gbv/jskos-tools)
  - Needed for ConceptTree, ItemDetails, ItemList, and ItemName.
- [jskos-vue-tabs]
  - Needed for ItemDetails.
- [vue-scrollto](https://github.com/rigor789/vue-scrollto)
  - Needed for ItemSuggest, ConceptTree, ItemDetails, and ItemList.

For a Node.js project, it is recommended to use [Vite](https://vitejs.dev). For access to JSKOS data via web APIs we recommend [cocoda-sdk] or [jskos-providers].

The library also supports [Vue I18n], see [I18n](#i18n).

[jskos-vue-tabs]: https://github.com/gbv/jskos-vue-tabs
[cocoda-sdk]: https://github.com/gbv/cocoda-sdk#readme
[jskos-providers]: https://github.com/gbv/jskos-providers#readme

## Installation
```bash
npm install jskos-vue
```

## Usage
### Globally in a Vue project
This adds all of jskos-vue's components globally to your Vue project (`src/main.js`):
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import * as JskosVue from "jskos-vue"
app.use(JskosVue)

// Import stylesheet
import "jskos-vue/dist/style.css"

app.mount('#app')
```

### Globally in a Vue project (individual components)
This adds individual components (tree-shakable) globally to your Vue project (`src/main.js`):
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { ItemName } from "jskos-vue"
app.use(ItemName)

// Import stylesheet
import "jskos-vue/dist/style.css"

app.mount('#app')
```

### Locally in a Vue project
You can also add individual components where needed (e.g. in some SFC, tree-shakable):
```js
import { defineComponent } from "vue"
import { ItemName } from "jskos-vue"
// Import stylesheet
import "jskos-vue/dist/style.css"

export default defineComponent({
  // ...
  components: {
    ItemName,
  },
  // ...
})
```

### Browser
The library can be used in the browser, for example via jsDelivr. [![](https://data.jsdelivr.com/v1/package/npm/jskos-vue/badge?style=rounded)](https://www.jsdelivr.com/package/npm/jskos-vue)

Fully working HTML example:

```html
<!-- @include: ../example/index.html -->
```

## I18n

The library comes with translated messages in English and German. The messages can be exported as object `messages` for all components and as property `messages` of each individual component, to be used with a library such as [Vue I18n].

*This is not fully implemented yet*

[Vue I18n]: https://vue-i18n.intlify.dev/

## Styling Notes

### Stylesheet

In order for the components to work properly, you **need** to include the library's stylesheet in your project. All the CSS classes and variables are prefixed with `jskos-vue`, so there should be no conflicts. The stylesheet is available under `dist/style.css` in the npm package and you can either use `import` or `<style>` to include it (see above).

### Box Sizing

It is recommended to use the following CSS snippet in your applications to make sure box sizing is correctly calculated ([more info](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)):

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

This is not included by default because it might break client applications that haven't accounted for this.

### CSS Variables

Many of the Vue components in jskos-vue use [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), in particular for colors. These can easily be adjusted to match the components to your application. CSS variables are listed in each component's documentation and are defined in [`shared.css`](https://github.com/gbv/jskos-vue/blob/main/src/shared.css). There are two main ways of changing these variables:

1. Via CSS `:root` or class

```css
:root {
  --jskos-vue-arrow-color: blue;
}
/* or use a CSS selector that matches the component */
.jskos-vue-arrow {
  --jskos-vue-arrow-color: blue;
}
```

2. Via `style` property

```html
<arrow
  direction="right"
  style="--jskos-vue-arrow-color: blue;" />
```

There are also some global CSS variables that are used by multiple components:
- `--jskos-vue-bgColor` - general background color
  - default: `white`
- `--jskos-vue-highlight-bgColor` - highlight background color
  - default: `#fdbd5888`
- `--jskos-vue-color-lightGrey` - light grey color
  - default: `#737373`

Note that this list is likely going to grow and that defaults can change any time during 0.x.x releases.
## Development

Please refer to the [GitHub README](https://github.com/gbv/jskos-vue#development) for development instructions.

## Related works

The [TS4NFDI Terminology Service Suite](https://github.com/ts4nfdi/terminology-service-suite) (TSS) provides similar components based on React instead of Vue and TSS includes API calls where jskos-vue leaves this to [cocoda-sdk] or other methods. A very rough correspondence of components and widgets, ignoring conceptual differences:

jskos-vue     | TSS 
--------------|-------------------------
[ItemName]    | [TitleWidget]
[ItemList]    | *planned [EntityListWidget](https://github.com/ts4nfdi/terminology-service-suite/issues/318)*
[ConceptTree] | [HierarchyWidget]
/             | [GraphViewWidget]
[ItemSuggest] | [AutocompleteWidget]
[ItemDetails] | [EntityInfoWidget]
/             | [EntityRelationsWidget]

In addition [jskos-vue-tabs] is similar to TSS [TabWidget]. A mapping Widget is planned in [both jskos-vue](https://github.com/gbv/jskos-vue/issues/26) and in [in TSS](https://github.com/ts4nfdi/terminology-service-suite/issues/305).

[EntityInfoWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_additional-entity-metadata-entityinfowidget--docs
[EntityRelationsWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_additional-entity-metadata-entityrelationswidget--docs
[HierarchyWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_hierarchy-and-graph-hierarchywidget--docs
[GraphViewWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_hierarchy-and-graph-graphviewwidget--docs
[AutocompleteWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/html_search-autocompletewidget--docs
[TabWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_additional-entity-metadata-tabwidget--docs
[TitleWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_entity-metadata-titlewidget--docs
