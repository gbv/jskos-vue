# Introduction

## What is jskos-vue?
jskos-vue is a library for [Vue 3](https://v3.vuejs.org) containing components and utilities related to the [JSKOS data format](https://gbv.github.io/jskos/) and the [coli-conc project](https://coli-conc.gbv.de). It was developed to make it easier to use JSKOS data and the coli-conc infrastructure in front-end projects.

Note that it was specifically developed with the needs of our [Cocoda Mapping Tool](https://github.com/gbv/cocoda) and [BARTOC](https://github.com/gbv/bartoc.org) in mind. So if certain decisions seem odd to you, it is probably because it was needed in one of those projects. Nevertheless feel free to [contact us](https://github.com/gbv/jskos-vue/issues) with your questions, suggestions, and use-cases!

## Requirements
- [Vue 3](https://v3.vuejs.org)
- One of the following:
  - [Node.js](https://nodejs.org/) version >=12.0.0
  - A modern browser
- [jskos-tools](https://github.com/gbv/jskos-tools)
  - Needed for ConceptSearch, ConceptTree, ItemDetails, ItemList, and ItemName.
- [jskos-vue-tabs](https://github.com/gbv/jskos-vue-tabs)
  - Needed for ItemDetails.
- [vue-scrollto](https://github.com/rigor789/vue-scrollto)
  - Needed for ConceptSearch, ConceptTree, ItemDetails, and ItemList.

For a Node.js project, it is recommended to use either [Vue CLI](https://cli.vuejs.org) or [Vite](https://vitejs.dev).

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
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue App</title>
    <!-- Our library's stylesheet here (adjust version if necessary) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jskos-vue@0.1/dist/style.css">
  </head>
  <body>
    <div id="app">
      <!-- You can use the components here -->
      <button @click="scroll">Scroll to 25</button>
      <item-list
        ref="itemList"
        style="height: 100px; overflow: scroll; border: 1px solid black; margin-top: 20px;"
        :items="Array.from({ length: 50 }, (v, i) => ({ uri: `uri:${i}`, notation: [`${i}`], prefLabel: { en: `Test ${i}` }}))" />
    </div>
    <!-- Vue 3 production build -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
    <!-- Additional libraries (refer to "Requirements" above to see which are needed) -->
    <script src="https://cdn.jsdelivr.net/npm/jskos-tools@1"></script>
    <script src="https://cdn.jsdelivr.net/npm/jskos-vue-tabs"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-scrollto@2"></script>
    <!-- Our library (adjust version if necessary) -->
    <script src="https://cdn.jsdelivr.net/npm/jskos-vue@0.1/dist/jskos-vue.umd.min.js"></script>
    <script>
      // Here, we are creating an empty Vue app and include the library as a plugin.
      Vue.createApp({
        methods: {
          scroll() {
            this.$refs.itemList.scrollToUri("uri:25")
          }
        },
      }).use(JskosVue).mount("#app")
    </script>
  </body>
</html>
```

## Additional Notes
It is recommended to use the following CSS snippet in your applications to make sure box sizing is correctly calculated ([more info](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)):

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```
