# LicenseInfo
Component to display license information for a JSKOS item.

## Props
- `item` (object) - JSKOS item (concept or concept scheme)
  - required

## Examples

<script setup>
import { LicenseInfo } from "../../src/components"

const item = {
  license: [
    {
      uri: "http://creativecommons.org/publicdomain/zero/1.0/",
    },
    {
      uri: "http://example.com/license/",
      prefLabel: { en: "Example License" },
    },
    {
      uri: "http://example.com/license-no-label/",
    },
  ],
  publisher: [
    {
      url: "https://www.gbv.de",
      prefLabel: {
        en: "VZG",
      },
    }
  ],
}
</script>

<license-info :item="item" />

```vue
<script setup>
import { LicenseInfo } from "jskos-vue"

const item = {
  license: [
    {
      uri: "http://creativecommons.org/publicdomain/zero/1.0/",
    },
    {
      uri: "http://example.com/license/",
      prefLabel: { en: "Example License" },
    },
    {
      uri: "http://example.com/license-no-label/",
    },
  ],
  publisher: [
    {
      url: "https://www.gbv.de",
      prefLabel: {
        en: "VZG",
      },
    }
  ],
}
</script>

<template>
  <license-info :item="item" />
</template>
```
