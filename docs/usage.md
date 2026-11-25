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
- [Vue 3](https://vuejs.org)
- [jskos-tools](https://github.com/gbv/jskos-tools)
  - Needed for ConceptTree, ItemDetails, ItemList, ItemName.
  - Used for [localization](#localization) of content
- [jskos-vue-tabs]
  - Needed for ItemDetails.
- [vue-scrollto](https://github.com/rigor789/vue-scrollto)
  - Needed for ItemSuggest, ConceptTree, ItemDetails, and ItemList.

For a Node.js project, it is recommended to use [Vite](https://vite.dev). For access to JSKOS data via web APIs we recommend [cocoda-sdk].

The library also supports [Vue I18n], see [Localization](#localization).

[jskos-vue-tabs]: https://github.com/gbv/jskos-vue-tabs
[cocoda-sdk]: https://github.com/gbv/cocoda-sdk#readme
[jskos-tools]: https://github.com/gbv/jskos-tools

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

See `examples` directory in the git repository of jskos-vue for an additional example.

# Localization

The library comes with translated messages in English and German. Additional messages can be provided with [Vue I18n] or its subset [petite-vue-i18n](https://www.npmjs.com/package/petite-vue-i18n).

Without Vue I18n, UI messages use the available component translations and
jskos-tools language preferences. Applications cannot override or extend those
UI messages globally.

UI messages and JSKOS content languages are selected independently. Content labels prefer an explicit component language, configured jskos-tools language preferences, the Vue I18n locale, and finally an available JSKOS language.

See [useLocale](./utilities/useLocale) for UI messages and
[useContentLanguage](./utilities/useContentLanguage) for JSKOS content.

The following demo uses separate controls for the UI locale and content language. Select “Follow UI locale” to disable explicit content preferences.

::: component-view
<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from "vue"
import { useI18n } from "petite-vue-i18n"
import * as jskos from "jskos-tools"
import { ItemName, LicenseInfo } from "../src/index.js"

const { locale: uiLocale } = useI18n({ useScope: "global" })
const ready = ref(false)
const contentPreference = reactive({
  language: "de",
  get languages() {
    return this.language ? [this.language] : []
  },
})
const item = {
  uri: "https://example.org/fish",
  prefLabel: { en: "Fish", de: "Fisch" },
  license: [{
    uri: "https://example.org/license",
    prefLabel: { en: "Example license", de: "Beispiellizenz" },
  }],
  publisher: [{
    url: "https://example.org/publisher",
    prefLabel: { en: "Example publisher", de: "Beispielverlag" },
  }],
}

let previousStore
let previousPath
let previousUiLocale

onMounted(() => {
  previousStore = jskos.languagePreference.store
  previousPath = jskos.languagePreference.path
  previousUiLocale = uiLocale.value
  jskos.languagePreference.store = contentPreference
  jskos.languagePreference.path = "languages"
  uiLocale.value = "en"
  ready.value = true
})

onBeforeUnmount(() => {
  if (jskos.languagePreference.store === contentPreference) {
    jskos.languagePreference.store = previousStore
    jskos.languagePreference.path = previousPath
  }
  uiLocale.value = previousUiLocale
})
</script>

<ClientOnly>
  <div
    v-if="ready"
    class="localization-example">
    <div class="localization-example-controls">
      <label for="localization-ui-locale">UI locale</label>
      <select id="localization-ui-locale" v-model="uiLocale">
        <option value="en">English</option>
        <option value="de">German</option>
      </select>
      <label for="localization-content-language">Content language</label>
      <select id="localization-content-language" v-model="contentPreference.language">
        <option value="">Follow UI locale</option>
        <option value="en">English</option>
        <option value="de">German</option>
      </select>
    </div>
    <dl class="localization-example-output">
      <dt>ItemName</dt>
      <dd><ItemName :item="item" /></dd>
      <dt>LicenseInfo</dt>
      <dd>
        <LicenseInfo :item="item" />
        <small class="localization-example-hint">
          Its tooltip combines the UI locale with the selected content labels.
        </small>
      </dd>
    </dl>
  </div>
</ClientOnly>
:::

[Vue I18n]: https://vue-i18n.intlify.dev/
