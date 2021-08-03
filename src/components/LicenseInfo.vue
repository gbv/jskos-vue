<template>
  <div
    class="jskos-vue-itemDetails-licenseInfo">
    <auto-link
      v-for="(license, index) in item.license || []"
      :key="index"
      :href="license.uri"
      :title="`by ${licenseAttribution.label}`"
      class="jskos-vue-itemDetails-licenseInfo-badge">
      <img
        v-if="licenseBadges[license.uri]"
        :src="licenseBadges[license.uri]">
      <span v-else>
        {{ license.uri }}
      </span>
    </auto-link>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue"
import * as jskos from "jskos-tools"
import AutoLink from "./AutoLink.vue"

export default defineComponent({
  name: "ItemDetails",
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
    // TODO: Do this differently? Allow adding additional badges?
    const licenseBadges = {
      "http://creativecommons.org/publicdomain/zero/1.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg",
      "http://creativecommons.org/licenses/by/3.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg",
      "http://creativecommons.org/licenses/by-nc-nd/3.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg",
      "http://creativecommons.org/licenses/by-nc-nd/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg",
      "http://creativecommons.org/licenses/by-nc-sa/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg",
      "http://creativecommons.org/licenses/by-sa/4.0/": "https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg",
      "http://opendatacommons.org/licenses/odbl/1.0/": "https://img.shields.io/badge/License-ODbL-lightgrey.svg",
      "http://www.wtfpl.net/": "https://img.shields.io/badge/License-WTFPL-lightgrey.svg",
    }
    // TODO: Is it enough to show this as "title"?
    const licenseAttribution = computed(() => {
      const organisation = (props.item.publisher || []).find(o => o.url)
      const url = organisation.url || props.item.url
      return {
        url,
        label: jskos.prefLabel(organisation) || "?",
      }
    })
    return {
      licenseBadges,
      licenseAttribution,
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
