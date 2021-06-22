# jskos-vue
[![Test and build](https://github.com/gbv/jskos-vue/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/gbv/jskos-vue/actions/workflows/test-and-build.yml)
[![GitHub package version](https://img.shields.io/github/package-json/v/gbv/jskos-vue.svg?label=version)](https://github.com/gbv/jskos-vue)
[![NPM package name](https://img.shields.io/badge/npm-jskos--vue-blue.svg)](https://www.npmjs.com/package/jskos-vue)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

> A suite of components and plugins for Vue 3 related to [JSKOS](https://gbv.github.io/jskos/jskos.html).

## Table of Contents <!-- omit in toc -->
- [Development](#development)
- [Usage](#usage)
  - [Node](#node)
  - [Browser](#browser)
  - [Additional Notes](#additional-notes)
- [Publish](#publish)
- [License](#license)

## Development
```bash
git clone https://github.com/gbv/jskos-vue.git
cd jskos-vue
npm install
npm run dev # for Vite dev server
npm run build # for Vite build
```

## Usage

### Node

1\. Add the library to your Vue project:
```bash
npm install jskos-vue
```

2a. Add all components globally (in `src/main.js` for your project):
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import * as JskosVue from "jskos-vue"
app.use(JskosVue)

app.mount('#app')
```

2b. Add individual components globally (tree-shakable):
```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { ItemName } from "jskos-vue"
app.use(ItemName)

app.mount('#app')
```

2c. Add individual components where needed (e.g. in some SFC, tree-shakable):
```js
import { defineComponent } from "vue"
import { ItemName } from "jskos-vue"

export default defineComponent({
  // ...
  components: {
    ItemName,
  },
  // ...
})
```

### Browser
The library can be used in the browser, for example via jsDelivr.

[![](https://data.jsdelivr.com/v1/package/npm/jskos-vue/badge?style=rounded)](https://www.jsdelivr.com/package/npm/jskos-vue)

Fully working HTML example:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue App</title>
  </head>
  <body>
    <div id="app">
      <!-- TODO -->
    </div>
    <!-- Vue 3 production build -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
    <!-- TODO: Additional libraries, i.e. jskos-tools, jskos-vue-tabs, cocoda-sdk, etc. -->
    <!-- Our library (adjust version if necessary) -->
    <script src="https://cdn.jsdelivr.net/npm/jskos-vue@0.1/dist/jskos-vue.umd.min.js"></script>
    <script>
      // Here, we are creating an empty Vue app and include the library as a plugin.
      Vue.createApp({}).use(ViteTestLibrary).mount("#app")
    </script>
  </body>
</html>
```

### Additional Notes
It is recommended to use the following CSS snippet in your applications to make sure box sizing is correctly calculated ([more info](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/)):

```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```

## Publish
Please work on the `dev` branch during development (or better yet, develop in a feature branch and merge into `dev` when ready).

When a new release is ready (i.e. the features are finished, merged into `dev`, and all tests succeed), run the included release script (replace "patch" with "minor" or "major" if necessary):

```bash
npm run release:patch
```

This will:
- Check that we are on `dev`
- Run tests and build to make sure everything works
- Make sure `dev` is up-to-date
- Run `npm version patch` (or "minor"/"major")
- Push changes to `dev`
- Switch to `main`
- Merge changes from `dev`
- Push `main` with tags
- Switch back to `dev`

After running this, GitHub Actions will **automatically publish the new version to npm**. It will also create a new GitHub Release draft. Please **edit and publish the release draft manually**.

## License
MIT Copyright (c) 2021 Verbundzentrale des GBV (VZG)
