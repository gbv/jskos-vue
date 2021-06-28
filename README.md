# jskos-vue
[![Test and build](https://github.com/gbv/jskos-vue/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/gbv/jskos-vue/actions/workflows/test-and-build.yml)
[![GitHub package version](https://img.shields.io/github/package-json/v/gbv/jskos-vue.svg?label=version)](https://github.com/gbv/jskos-vue)
[![NPM package name](https://img.shields.io/badge/npm-jskos--vue-blue.svg)](https://www.npmjs.com/package/jskos-vue)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

> A suite of components and utilities for Vue 3 related to [JSKOS](https://gbv.github.io/jskos/jskos.html).

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

Development server on port 4310:
```bash
npm run dev
```

Browser build:
```bash
npm run build
```

Documentation:
```bash
npm run docs:dev # documentation dev server on port 4311
npm run docs:build # documentation build
BASE=/dist/ npm run docs:build # documentation build with base path
```

### Publish
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
