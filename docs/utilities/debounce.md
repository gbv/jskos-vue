# debounce
Returns a function, that, as long as it continues to be invoked, will not be triggered. The function will be called after it stops being called for N milliseconds. Can be used to reduce the number of API requests when the user is typing, for example in [ItemSuggest](../components/ItemSuggest).

See also: https://davidwalsh.name/javascript-debounce-function

## Usage

```js
import { utils } from "jskos-vue"
const debouncedFunction = utils.debounce(func, wait, immediate)
```

## Parameters

- `func` - a function to be called
  - required
- `wait` - a time in milliseconds for the debounce
  - required
- `immediate` - will trigger the function on the leading edge, instead of the trailing
  - optional, default: `false`
