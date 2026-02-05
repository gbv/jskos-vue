# dateToString

Converts a date string to a localized date string. Incomplete dates (YYYY or YYYY-MM) will be returned non-localized. Dates with the exact length of 10 (e.g. YYYY-MM-DD) will be printed as date-only. If it was not possible to convert the string to a date, the input will be returned unchanged.

## Usage

```js
import { utils } from "jskos-vue"
const localizedDateString = utils.dateToString(dateString)
```

## Parameters

- `dateString` - some kind of date or datetime string
  - required
