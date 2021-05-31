<template>
  <div class="item-details">
    <!-- Ancestors -->
    <item-list
      v-bind="itemListOptions"
      :items="item.ancestors || []"
      class="item-details-ancestors"
      @select="itemListOptions.clickable && !$event.row && $emit('select', { item: $event.item })" />
    <div class="item-details-name">
      <slot name="beforeName" />
      <item-name
        :item="item" />
      <slot name="afterName" />
    </div>
    <tabs
      borders="bottom"
      size="sm">
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
        v-if="item.scopeNote"
        :title="t('scope')">
        TODO
      </tab>
      <tab
        v-if="item.editorialNote"
        :title="t('editorial')">
        TODO
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
  },
}
// Determines current language from jskos.languagePreference and locale
const language = computed(() => jskos.languagePreference.getLanguages().find(lang => locale[lang]) || "en")
const t = (prop) => locale[language.value][prop]

/**
 * TODO!
 * Notes
 * Icons
 * broader
 * Scheme props
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
  setup() {
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
    return {
      utils,
      jskos,
      language,
      t,
      iterateLanguageMapContent,
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
  margin-bottom: 5px;
}
.item-details-list {
  list-style: none;
  margin: 0 0 10px 0;
  padding: 0;
}
.item-details-narrower, .item-details-ancestors {
  margin-top: 5px;
  margin-bottom: 5px;
}
.item-details-narrower > li:before, .item-details-ancestors > li:before {
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
</style>
