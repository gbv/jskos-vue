# LicenseInfo

Component to display license information for a JSKOS item.

## Props

- `item` *object, required* —  JSKOS item (concept or concept scheme)

## Examples

::: component-view
<script setup>
import { LicenseInfo } from "../../src/index.js"

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

<license-info :item="item" />
:::
