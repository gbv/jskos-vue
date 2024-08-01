<template>
  <div
    class="jskos-vue-itemDetails-licenseInfo">
    <auto-link
      v-for="(license, index) in item.license || []"
      :key="index"
      :href="license.uri"
      :title="`${getLicenseName(license)} by ${licenseAttribution.label}`"
      class="jskos-vue-itemDetails-licenseInfo-badge">
      <img
        v-if="getLicenseBadge(license)"
        :src="getLicenseBadge(license)">
      <span v-else>
        {{ getLicenseName(license) }}
      </span>
    </auto-link>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue"
import * as jskos from "jskos-tools"
import AutoLink from "./AutoLink.vue"

export default defineComponent({
  name: "LicenseInfo",
  components: {
    AutoLink,
  },
  props: {
    // JSKOS item to be displayed
    item: {
      type: Object,
      required: true,
    },
    shieldsIoOptIn: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const licenseBadges = {
      "http://creativecommons.org/publicdomain/zero/1.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg",
      "https://creativecommons.org/publicdomain/mark/1.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg",
      "http://creativecommons.org/licenses/by/3.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg",
      "http://creativecommons.org/licenses/by-nc-nd/3.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg",
      "http://creativecommons.org/licenses/by-nc-nd/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg",
      "http://creativecommons.org/licenses/by-nc-sa/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg",
      "http://creativecommons.org/licenses/by-sa/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg",
    }
    const getLicenseBadge = (license) => {
      if (licenseBadges[license.uri]) {
        return licenseBadges[license.uri]
      }
      const text = license.notation?.[0] || jskos.prefLabel(license, { fallbackToUri: false })
      if (props.shieldsIoOptIn && text) {
        // Create a dynamic shields.io badge with notation
        return `https://img.shields.io/badge/${encodeURIComponent(text).replaceAll("_", "__").replaceAll("-", "--")}-000000?style=flat-square`
      }
      return null
    }
    const getLicenseName = (license) => {
      const prefLabel = jskos.prefLabel(license, { fallbackToUri: false })
      let notation = jskos.notation(license)
      if (prefLabel && notation) {
        notation = ` (${notation})`
      }
      let name = prefLabel + notation
      if (!name) {
        name = license.uri
      }
      return name
    }
    // TODO: Is it enough to show this as "title"?
    const licenseAttribution = computed(() => {
      const organisation = (props.item.publisher || []).find(o => o.url) ?? props.item.publisher?.[0]
      const url = organisation?.url ?? props.item.url
      return {
        url,
        label: jskos.prefLabel(organisation) || "?",
      }
    })
    return {
      licenseAttribution,
      getLicenseBadge,
      getLicenseName,
      jskos,
    }
  },
})
</script>

<style>
.jskos-vue-itemDetails-licenseInfo {
  display: inline-block;
}
.jskos-vue-itemDetails-licenseInfo-badge {
  padding-left: 5px;
}
.jskos-vue-itemDetails-licenseInfo-badge > img {
  height: 1em;
  vertical-align: middle;
  padding-bottom: 4px;
  display: inline-block;
}
</style>
