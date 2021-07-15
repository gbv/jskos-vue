# jskos-vue
[![Test and build](https://github.com/gbv/jskos-vue/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/gbv/jskos-vue/actions/workflows/test-and-build.yml)
[![GitHub package version](https://img.shields.io/github/package-json/v/gbv/jskos-vue.svg?label=version)](https://github.com/gbv/jskos-vue)
[![NPM package name](https://img.shields.io/badge/npm-jskos--vue-blue.svg)](https://www.npmjs.com/package/jskos-vue)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

> A suite of components and plugins for Vue 3 related to [JSKOS](https://gbv.github.io/jskos/jskos.html).

**Note that this is still under development and breaking changes can occur at any time!**

## Documentation
Please refer to the documentation on how to install and use jskos-vue in your project.

- Stable (`main`): https://gbv.github.io/jskos-vue/
- Development (`dev`): https://gbv.github.io/jskos-vue/dev/

## Development
Please work on the `dev` branch during development (or better yet, develop in a feature branch and merge into `dev` when ready).

```bash
git clone https://github.com/gbv/jskos-vue.git
cd jskos-vue
npm install
```

We are using [VitePress](https://vitepress.vuejs.org) for documentation as well as component development as it includes live reloading of Vue components as well.

Development server on port 4311 (http://localhost:4311/):
```bash
npm run docs:dev
```

Each of the component as well as each utility method has its own documentation file in `docs/components/` and `docs/utilities/` respectively. Those files include practical examples which also function as a way to develop a component. In each file, you can have one `<script setup>` block that initializes the Vue/JS part of the page. Any variables defined in that block will be available to use in the template. You can use components and other Vue template structures right in the Markdown file. You can also define a `<style>` block if necessary. Note that this only works because VitePress handles these blocks separately from the rest of the Markdown content!

You should include the components via a relative path and you can also include any dependencies like you normally would:

```html
<script setup>
import { ItemDetails } from "../../src/components"
import * as jskos from "jskos-tools"
import { reactive } from "vue"
// ...
</script>
```

For the code block that shows users how to replicate the example, please replace `import { ItemDetails } from "../../src/components"` with `import { ItemDetails } from "jskos-vue"`. Also, the template part of the example needs to be enclosed in a `<template>` tag (only in the code block!) so that it is possible to copy-paste the example into a SFC `.vue` file.

Note that VitePress is still in beta and there are sometimes weird issues still. For instance, at one point in our examples, it wasn't possible to use `@click` to define a click handler and we had to use `v-on:click` instead, even though in other files, `@click` works just fine. Just keep this in mind in case you ever encounter weird error messages.

Documentation build:
```bash
npm run docs:build # documentation build
BASE=/dist/ npm run docs:build # documentation build with base path
```

The documentation build will be in `docs/.vitepress/dist/`.

Library browser build:
```bash
npm run build
```

The browser build files will be in `dist/`.

## Maintainers
- [@stefandesu](https://github.com/stefandesu)
- [@nichtich](https://github.com/nichtich)

## Publish
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
