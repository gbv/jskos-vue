# useLocale

Get method `t` to localize strings and, a `currentLanguage` to get the current locale.

Returns global properties `$t` and `$i18n.locale` as defined by [Vue I18n] or
any other library. If not both of these exist, the function uses
`languagePreference` from [jskos-tools].

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
