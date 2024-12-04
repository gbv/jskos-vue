<template>
  <div
    class="jskos-vue-itemDetails-licenseInfo">
    <auto-link
      v-for="(license, index) in item.license || []"
      :key="index"
      :href="license.uri"
      :title="`${t('license')}: ${getLicenseName(license)} by ${licenseAttribution.label}`"
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

// Localization
import { useLocale } from "../utils.js"
const { t } = useLocale({
  en: {
    license: "License",
  },
  de: {
    license: "Lizenz",
  },
})

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
      t,
    }
  },
})
</script>

<style scoped>
.jskos-vue-itemDetails-licenseInfo {
  display: inline-block;
}
.jskos-vue-itemDetails-licenseInfo-badge {
  padding-left: 5px;
}
.jskos-vue-itemDetails-licenseInfo-badge > img {
  height: 1.3em;
  vertical-align: middle;
  padding-bottom: 4px;
  display: inline-block;
}
.jskos-vue-itemDetails-licenseInfo-badge > span {
  display: inline-block;
  padding: 0.3em 0.5em 0.3em 0.5em;
  font-size: 0.6em;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  background-color: black;
  color: white;
  /* Fix alignment with badges */
  margin-top: -0.45em;
  vertical-align: middle;
}
</style>
