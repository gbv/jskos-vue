# useLocale

Get method `t` to localize strings and the current locale `currentlLanguage`.

Returns global properties `$t` and `$i18n.locale` as defined by [Vue I18n] or
any other library. If not both of these exist, the function uses
`languagePreference` from [jskos-tools] with messages provided as argument.

If neither global properties no an argument is available, this falls back to
build in messages as exported as part of `utils`.

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
```

## Parameters

- `messages` - object with messages, indexed by language and id
  - optional
