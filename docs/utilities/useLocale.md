# useLocale

Returns `t()` for UI messages and `currentLanguage` for the current UI locale.
It does not select languages from JSKOS content. Use
[useContentLanguage](./useContentLanguage) for labels and language maps.

When Vue I18n provides `$t` and `$i18n.locale`, `useLocale()` uses them. Without
Vue I18n, it chooses among the supplied UI messages using `languagePreference`
from [jskos-tools], then falls back to English.

Passed messages are only used as fallback for global messages.

[jskos-tools]: https://github.com/gbv/jskos-tools
[Vue I18n]: https://vue-i18n.intlify.dev/

## Usage

```js
import { utils } from "jskos-vue"
const { t, currentLanguage } = utils.useLocale({
  en: { greet: "Hello!" },
  de: { greet: "Hallo!" }
})

t('greet')

console.log(currentLanguage.value)
```

## Parameters

- `messages` - object with messages, indexed by language and id
  - optional
