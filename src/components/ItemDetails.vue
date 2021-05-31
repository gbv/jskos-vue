<template>
  <div class="item-details">
    <!-- Ancestors -->
    <!-- TODO: Only show part of ancestors? -->
    <item-list
      v-bind="itemListOptions"
      :items="item.ancestors || []"
      class="item-details-ancestors"
      @select="itemListOptions.clickable && !$event.row && $emit('select', { item: $event.item })" />
    <!-- Broader -->
    <item-list
      v-bind="itemListOptions"
      :items="(item.broader || []).filter(i => !jskos.isContainedIn(i, item.ancestors || []))"
      class="item-details-broader"
      @select="itemListOptions.clickable && !$event.row && $emit('select', { item: $event.item })" />
    <div class="item-details-name">
      <slot name="beforeName" />
      <item-name
        :item="item" />
      <slot name="afterName" />
    </div>
    <!-- License -->
    <div
      v-if="item.license && item.license.length">
      {{ t("license") }}:<a
        v-for="(license, index) in item.license"
        :key="index"
        :href="license.uri"
        target="_blank"
        class="item-details-licenseBadge">
        <img
          v-if="licenseBadges[license.uri]"
          :src="licenseBadges[license.uri]">
        <span v-else>
          {{ license.uri }}
        </span>
      </a>
    </div>
    <tabs
      borders="bottom"
      size="sm"
      class="item-details-tabs">
      <tab :title="t('info')">
        <!-- Identifier -->
        <ul class="item-details-list">
          <li
            v-for="(identifier, index) in [item.uri].concat(item.identifier).filter(identifier => identifier != null)"
            :key="index">
            <auto-link :link="identifier" />
            <template v-if="identifier === item.uri">
              <span class="jskos-vue-text-lightGrey"> (URI)</span>
            </template>
          </li>
        </ul>
        <ul class="item-details-list">
          <template v-for="prop in ['created', 'issued', 'modified']">
            <li
              v-if="item[prop]"
              :key="prop">
              <b>{{ t(prop) }}:</b> {{ utils.dateToString(item[prop]) }}
            </li>
          </template>
          <li v-if="item.languages">
            <b>{{ t("languages") }}:</b> {{ item.languages.join(", ") }}
          </li>
          <!-- TODO: KOS Types -->
          <!-- TODO: Publisher -->
        </ul>
        <ul
          v-if="jskos.languageMapContent(item, 'definition')"
          class="item-details-list">
          <li>
            <b>{{ t("definition") }}:</b>
          </li>
          <li
            v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'definition')"
            :key="`${language}-${index}`">
            {{ label }}
            <span class="jskos-vue-text-lightGrey">({{ language }})</span>
          </li>
        </ul>
      </tab>
      <tab :title="t('labels')">
        <ul class="item-details-list">
          <li
            v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'prefLabel')"
            :key="`${language}-${index}`">
            {{ label }}
            <span class="jskos-vue-text-lightGrey">({{ language }})</span>
          </li>
        </ul>
        <ul
          v-if="jskos.languageMapContent(item, 'altLabel')"
          class="item-details-list">
          <li>
            <b>{{ t("altLabels") }}:</b>
          </li>
          <li
            v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'altLabel')"
            :key="`${language}-${index}`">
            {{ label }}
            <span class="jskos-vue-text-lightGrey">({{ language }})</span>
          </li>
        </ul>
      </tab>
      <tab
        v-if="jskos.languageMapContent(item, 'scopeNote')"
        :title="t('scope')">
        <ul class="item-details-list">
          <li
            v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'scopeNote')"
            :key="`${language}-${index}`">
            {{ label }}
            <span class="jskos-vue-text-lightGrey">({{ language }})</span>
          </li>
        </ul>
      </tab>
      <tab
        v-if="jskos.languageMapContent(item, 'editorialNote')"
        :title="t('editorial')">
        <ul class="item-details-list">
          <li
            v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'editorialNote')"
            :key="`${language}-${index}`">
            {{ label }}
            <span class="jskos-vue-text-lightGrey">({{ language }})</span>
          </li>
        </ul>
      </tab>
      <slot name="tabs" />
    </tabs>
    <!-- Narrower -->
    <item-list
      v-bind="itemListOptions"
      :items="item.narrower || []"
      class="item-details-narrower"
      @select="itemListOptions.clickable && !$event.row && $emit('select', { item: $event.item })" />
  </div>
</template>

<script>
import * as jskos from "jskos-tools"
import { Tabs, Tab } from "jskos-vue-tabs"
import ItemName from "./ItemName.vue"
import ItemList from "./ItemList.vue"
import AutoLink from "./AutoLink.vue"
import * as utils from "../utils.js"
import { computed, defineComponent } from "vue"

const locale = {
  en: {
    showAllAncestors: "show all ancestors",
    showLessAncestors: "show less ancesters",
    created: "Created",
    modified: "Modified",
    issued: "Issued",
    altLabels: "Alternative Labels",
    definition: "Definition",
    info: "Info",
    labels: "Labels",
    editorial: "Editorial",
    scope: "Scope",
    license: "License",
    languages: "Languages",
  },
  de: {
    showAllAncestors: "zeige alle übergeordneten Konzepte",
    showLessAncestors: "zeige weniger übergeordnete Konzepte",
    created: "Erstellung",
    modified: "Änderung",
    issued: "Veröffentlicht",
    altLabels: "Alternative Bezeichnungen",
    definition: "Definition",
    info: "Info",
    labels: "Bezeichnungen",
    editorial: "Editorial",
    scope: "Scope",
    license: "Lizenz",
    languages: "Sprachen",
  },
}
// Determines current language from jskos.languagePreference and locale
const language = computed(() => jskos.languagePreference.getLanguages().find(lang => locale[lang]) || "en")
const t = (prop) => locale[language.value][prop]

/**
 * TODO!
 * Icons
 */
export default defineComponent({
  name: "ItemDetails",
  components: {
    ItemName,
    ItemList,
    Tabs,
    Tab,
    AutoLink,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemListOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["select"],
  setup(props) {
    const iterateLanguageMapContent = (item, prop) => {
      /** Explanation:
          1. Get all language keys for altLabels (Object.keys)
          2. Create objects in the form { language, label } (map)
          3. Flatten the array (reduce)
          4. Filter `-` language (filter)
          5. Sort current language higher (sort)
       */
      return Object.keys((item && item[prop]) || {})
        .map(language => {
          const map = item[prop][language]
          return (Array.isArray(map) ? map : [map]).map(label => ({ language, label }))
        })
        .reduce((prev, cur) => prev.concat(cur), [])
        .filter(item => item.language != "-")
        .sort((a, b) => {
          if (a.language === jskos.languagePreference.selectLanguage(item[prop]) && b.language !== jskos.languagePreference.selectLanguage(item[prop])) {
            return -1
          }
          if (b.language === jskos.languagePreference.selectLanguage(item[prop]) && a.language !== jskos.languagePreference.selectLanguage(item[prop])) {
            return 1
          }
          return 0
        })
    }
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
    const licenseAttribution = computed(() => {
      const organisation = (props.item.publisher || []).find(o => o.url)
      const url = organisation.url || props.item.url
      return {
        url,
        label: jskos.prefLabel(organisation) || "?",
      }
    })
    return {
      utils,
      jskos,
      language,
      t,
      iterateLanguageMapContent,
      licenseBadges,
      licenseAttribution,
    }
  },
})
</script>

<style>
.item-details {
  position: relative;
  font-size: 0.85rem;
}
.item-details-name {
  position: relative;
  font-size: 1rem;
}
.item-details-tabs {
  margin-top: 8px;
}
.item-details-list {
  list-style: none;
  margin: 0 0 10px 0;
  padding: 0;
}
.item-details-narrower, .item-details-ancestors, .item-details-broader {
  margin-top: 4px;
  margin-bottom: 4px;
}
.item-details-narrower > li:before, .item-details-ancestors > li:before, .item-details-broader > li:before {
  font-family: monospace;
  font-size: 1.3em;
  padding-right: 2px;
}
.item-details-narrower > li:before {
  content: "↳";
}
.item-details-ancestors > li:before {
  content: "↱";
}
.item-details-broader > li:before {
  content: "˄";
}
.item-details-licenseBadge {
  padding-left: 5px;
}
.item-details-licenseBadge > img {
  height: 1em;
  vertical-align: middle;
  padding-bottom: 4px;
  display: inline-block;
}
</style>
