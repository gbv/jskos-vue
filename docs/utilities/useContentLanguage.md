# useContentLanguage

Selects languages for JSKOS content independently from translated UI messages.
It must be called from a Vue component's `setup()` context.

## API

```js
import { utils } from "jskos-vue"

const { prefLabel, selectLanguage } = utils.useContentLanguage()

prefLabel(item)
selectLanguage(item.prefLabel)
```

- `selectLanguage(languageMap, explicitLanguage = "")` returns a language key
  or `null`.
- `prefLabel(item, options = {})` selects a preferred label. It supports the
  existing `jskos.prefLabel()` options, including `language` and
  `fallbackToUri`.

## Language order

1. An explicit component language, when available.
2. Languages configured through `jskos.languagePreference`.
3. The Vue I18n locale, when available.
4. The existing jskos-tools fallback to an available language.

jskos-tools uses `["en"]` as its implicit default. When no preference store is
configured, `useContentLanguage()` treats this as implicit so that Vue I18n can
provide the fallback language. To explicitly prefer English, configure it
through `jskos.languagePreference.store` and `path`.

Without Vue I18n, the existing jskos-tools behavior is preserved. Reactive
language preferences and Vue I18n locale changes update labels when the helper
is used from a reactive Vue context.

See the interactive [localization demo](../usage#localization).
