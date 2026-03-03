# Usage

## Installation

```bash
npm install jskos-vue
```

See below for [usage in browser](#browser).

## Requirements
- One of the following:
  - [Node.js](https://nodejs.org/) version >=20
  - A modern browser
- [Vue 3](https://v3.vuejs.org)
- [jskos-tools](https://github.com/gbv/jskos-tools)
  - Needed for ConceptTree, ItemDetails, ItemList, ItemName.
  - Used for [localization](#localization) of content
- [jskos-vue-tabs]
  - Needed for ItemDetails.
- [vue-scrollto](https://github.com/rigor789/vue-scrollto)
  - Needed for ItemSuggest, ConceptTree, ItemDetails, and ItemList.

For a Node.js project, it is recommended to use [Vite](https://vitejs.dev). For access to JSKOS data via web APIs we recommend [cocoda-sdk].

The library also supports [Vue I18n], see [I18n](#i18n) (still experimental).

[jskos-vue-tabs]: https://github.com/gbv/jskos-vue-tabs
[cocoda-sdk]: https://github.com/gbv/cocoda-sdk#readme
[jskos-providers]: https://github.com/gbv/jskos-providers#readme

## Globally in a Vue project

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

## Globally in a Vue project (individual components)

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

## Locally in a Vue project

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

## Browser

The library can be used in the browser, for example via jsDelivr. [![](https://data.jsdelivr.com/v1/package/npm/jskos-vue/badge?style=rounded)](https://www.jsdelivr.com/package/npm/jskos-vue)

Fully working HTML example:

```html
<!-- @include: ../examples/browser.html -->
```

# Localization

The library comes with translated messages in English and German. Additional messages can be provided with library [Vue I18n] or its subset petite-vue-i18n. See test file `tests/i18n.test.js` for usage. 

If Vue I18n is not used, localization is controlled by [jskos-tools] language preferences (function `getLanguages` and `selectLanguage`) but there is no way to override or extend translation messages.

Localization of JSKOS itemt content (e.g. labels) is always controlled by jskos-tools language preferences.

[Vue I18n]: https://vue-i18n.intlify.dev/
