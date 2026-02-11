<template>
  <div
    class="jskos-vue-itemDetails-licenseInfo">
    <auto-link
      v-for="(license, index) in item.license || []"
      :key="index"
      :href="license.uri"
      :title="title(license)"
      class="jskos-vue-itemDetails-licenseInfo-badge">
      <img
        v-if="licenseBadge(license)"
        :src="licenseBadge(license)">
      <span v-else>
        {{ licenseName(license) }}
      </span>
    </auto-link>
  </div>
</template>

<script setup>
import { computed } from "vue"
import * as jskos from "jskos-tools"
import AutoLink from "./AutoLink.vue"
import { useLocale } from "../utils.js"

const props = defineProps({
  // JSKOS item to be displayed
  item: {
    type: Object,
    required: true,
  },
})

// Localization
const { t, currentLanguage } = useLocale({
  en: { license: "License" },
  de: { license: "Lizenz" },
})

const licenseBadges = {
  "http://creativecommons.org/publicdomain/zero/1.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg",
  "https://creativecommons.org/publicdomain/mark/1.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg",
  "http://creativecommons.org/licenses/by/3.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg",
  "http://creativecommons.org/licenses/by-nc-nd/3.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg",
  "http://creativecommons.org/licenses/by-nc-nd/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg",
  "http://creativecommons.org/licenses/by-nc-sa/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg",
  "http://creativecommons.org/licenses/by-sa/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg",
}

const licenseBadge = license => {
  if (licenseBadges[license.uri]) {
    return licenseBadges[license.uri]
  }
  return null
}

const licenseName = license => {
  const prefLabel = jskos.prefLabel(license, { fallbackToUri: false, language: currentLanguage.value })
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

const attribution = computed(() => {
  const organisation = (props.item.publisher || []).find(o => o.url) ?? props.item.publisher?.[0]
  const url = organisation?.url ?? props.item.url
  return {
    url,
    label: jskos.prefLabel(organisation),
  }
})

const title = license => {
  const str = `${t("license")}: ${licenseName(license)}`
  return attribution.value?.label ? `${str} by ${attribution.value.label}` : str
}
</script>

<style>
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
