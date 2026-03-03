# Layout

## Stylesheet

In order for the components to work properly, you **need** to include the library's stylesheet in your project. All the CSS classes and variables are prefixed with `jskos-vue`, so there should be no conflicts. The stylesheet is available under `dist/style.css` in the npm package and you can either use `import` or `<style>` to include it (see above).

## Box Sizing

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

## CSS Variables

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

There are also some global CSS variables used by multiple components:

- `--jskos-vue-bgColor` - general background color
  - default: `white`
- `--jskos-vue-highlight-bgColor` - highlight background color
  - default: `#fdbd5888`
- `--jskos-vue-color-lightGrey` - light grey color
  - default: `#737373`
- `--jskos-vue-fontSize-small`
  - default: `0.85rem`
- ...

