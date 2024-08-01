# LicenseInfo
Component to display license information for a JSKOS item.

## Props
- `item` (object) - JSKOS item (concept or concept scheme)
  - required
- `shieldsIoOptIn` (boolean) - opt into fallback badges from shields.io
  - default: `false`

## Examples

<script setup>
import { LicenseInfo } from "../../src/components"

const item = {
  license: [
    {
      uri: "http://creativecommons.org/publicdomain/zero/1.0/",
      notation: ["CC0"],
    },
    {
      uri: "http://example.com/license/",
      prefLabel: { en: "Example License" },
      notation: ["EX"],
    },
    {
      uri: "http://example.com/license-no-label/",
      notation: ["NOL"],
    },
    {
      uri: "http://example.com/license-only-label/",
      prefLabel: { en: "Test Label" },
    },
    {
      uri: "http://example.com/license-no-label-no-notation/",
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

<license-info 
  :item="item"
  :shields-io-opt-in="true" />

```vue
<script setup>
import { LicenseInfo } from "jskos-vue"

const item = {
  license: [
    {
      uri: "http://creativecommons.org/publicdomain/zero/1.0/",
      notation: ["CC0"],
    },
    {
      uri: "http://example.com/license/",
      prefLabel: { en: "Example License" },
      notation: ["EX"],
    },
    {
      uri: "http://example.com/license-no-label/",
      notation: ["NOL"],
    },
    {
      uri: "http://example.com/license-only-label/",
      prefLabel: { en: "Test Label" },
    },
    {
      uri: "http://example.com/license-no-label-no-notation/",
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
  <license-info 
    :item="item"
    :shields-io-opt-in="true" />
</template>
```
