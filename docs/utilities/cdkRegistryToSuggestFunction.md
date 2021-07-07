# cdkRegistryToSuggestFunction

Helper function that converts a [cocoda-sdk] registry into a suggest function for concepts that can be used with [ItemSuggest].

By default, it will use `suggest` (i.e. for concepts). With the parameter `options.voc`, it is possible to use `vocSuggest` for concept schemes instead.

```js
import { utils } from "jskos-vue"
const suggest = utils.cdkRegistryToSuggestFunction(registry, { voc = false, scheme })
```

## Parameters

- `registry` (object) - a registry object initialized by [cocoda-sdk]
- `options` (object)
  - `options.scheme` (object) - JSKOS concept scheme to suggest concepts from
  - `options.voc` (boolean) - whether to use `vocSuggest` instead of `suggest`

## Examples

Please refer to [ItemSuggest] for examples.

[cocoda-sdk]: https://github.com/gbv/cocoda-sdk
[ItemSuggest]: ../components/ItemSuggest
