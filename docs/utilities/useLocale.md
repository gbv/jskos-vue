# useLocale

Returns method `t(key)` to localize UI messages and Vue ref object
`currentLanguage` with the current UI locale language code. When [Vue I18n]
provides `$t` and `$i18n.locale`, these will be used, for `t` and
`currentLanguage`. Passed messages are only used as fallback for global
messages.

Otherwise the current language is computed based on [jskos-tools] store
`languagePreference` and available messages, with fallback to `$i18n.locale` or
English.

This method is meant to be used for localization of UI. See method
[useContentLanguage](./useContentLanguage) for localization of JSKOS content.

[jskos-tools]: https://github.com/gbv/jskos-tools
[Vue I18n]: https://vue-i18n.intlify.dev/

## Usage

```js
import { utils } from "jskos-vue"
const { t, currentLanguage } = utils.useLocale({
  en: { greet: "Hello!" },
  es: { greet: "¡Hola!" }
})

t('greet')

console.log(currentLanguage.value)
```

## Parameters

- `messages` *object, optional* — messages, indexed by language code and message key
