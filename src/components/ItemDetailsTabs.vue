<template>
  <component
    :is="flat ? 'div' : 'tabs'"
    borders="bottom"
    size="sm"
    class="jskos-vue-itemDetails-tabs">
    <component
      :is="flat ? 'div' : 'tab'"
      v-if="['identifier', 'type', 'publisher', 'created', 'issued', 'modified', 'languages', 'definition'].filter(p => fields_[p]).length"
      :title="t('info')">
      <!-- Identifier -->
      <ul  
        v-if="fields_.identifier"
        class="jskos-vue-itemDetails-list">
        <li v-if="flat">
          <b>{{ t("identifier") }}:</b>
        </li>
        <li
          v-for="(identifier, index) in [item.uri].concat(item.identifier).filter(identifier => identifier != null)"
          :key="index">
          <auto-link :href="identifier" />
          <template v-if="identifier === item.uri">
            <span class="jskos-vue-text-lightGrey"> (URI)</span>
          </template>
        </li>
      </ul>
      <ul class="jskos-vue-itemDetails-list">
        <li v-if="fields_.type && types.length">
          <b>{{ t("type") }}:</b> {{ types.map(t => jskos.prefLabel(t)).join(", ") }}
        </li>
        <li v-if="fields_.publisher && item.publisher?.length">
          <b>{{ t("publisher") }}: </b>
          <template 
            v-for="(publisher, index) in item.publisher"
            :key="`publisher-${index}`">
            <template v-if="index > 0">
              ·
            </template>
            <auto-link
              :href="publisher.url || publisher.uri"
              :text="jskos.prefLabel(publisher)" />
          </template>
        </li>
        <template v-for="prop in ['created', 'issued', 'modified'].filter(p => fields_[p])">
          <li
            v-if="item[prop]"
            :key="prop">
            <b>{{ t(prop) }}:</b> {{ utils.dateToString(item[prop]) }}
          </li>
        </template>
        <li v-if="fields_.languages && item.languages">
          <b>{{ t("languages") }}:</b> {{ item.languages.join(", ") }}
        </li>
      </ul>
      <ul
        v-if="fields_.definition && jskos.languageMapContent(item, 'definition')"
        class="jskos-vue-itemDetails-list">
        <li>
          <b>{{ t("definition") }}:</b>
        </li>
        <li
          v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'definition')"
          :key="`${language}-${index}`"
          :lang="`${language}`">
          {{ label }}
        </li>
      </ul>
    </component>
    <component
      :is="flat ? 'div' : 'tab'"
      v-if="fields_.prefLabel || fields_.altLabel"
      :title="t('labels')">
      <!-- prefLabel -->
      <ul 
        v-if="fields_.prefLabel"
        class="jskos-vue-itemDetails-list">
        <li v-if="flat">
          <b>{{ t("labels") }}:</b>
        </li>
        <li
          v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'prefLabel')"
          :key="`${language}-${index}`"
          :lang="`${language}`">
          {{ label }}
        </li>
      </ul>
      <!-- altLabel -->
      <ul
        v-if="fields_.altLabel && jskos.languageMapContent(item, 'altLabel')"
        class="jskos-vue-itemDetails-list">
        <li>
          <b>{{ t("altLabels") }}:</b>
        </li>
        <li
          v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'altLabel')"
          :key="`${language}-${index}`"
          :lang="`${language}`">
          {{ label }}
        </li>
      </ul>
    </component>
    <!-- scopeNote -->
    <component
      :is="flat ? 'div' : 'tab'" 
      v-if="fields_.scopeNote && jskos.languageMapContent(item, 'scopeNote')"
      :title="t('scope')">
      <ul class="jskos-vue-itemDetails-list">
        <li v-if="flat">
          <b>{{ t("scope") }}:</b>
        </li>
        <li
          v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'scopeNote')"
          :key="`${language}-${index}`"
          :lang="`${language}`">
          {{ label }}
        </li>
      </ul>
    </component>
    <!-- editorialNote -->
    <component
      :is="flat ? 'div' : 'tab'" 
      v-if="fields_.editorialNote && jskos.languageMapContent(item, 'editorialNote')"
      :title="t('editorial')">
      <ul class="jskos-vue-itemDetails-list">
        <li v-if="flat">
          <b>{{ t("editorial") }}:</b>
        </li>
        <li
          v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'editorialNote')"
          :key="`${language}-${index}`"
          :lang="`${language}`">
          {{ label }}
        </li>
      </ul>
    </component>
    <!-- Slot for additional tabs -->
    <slot name="additionalTabs" />
  </component>
</template>

<script setup>
import * as jskos from "jskos-tools"
import { Tabs, Tab } from "jskos-vue-tabs" // eslint-disable-line no-unused-vars
import AutoLink from "./AutoLink.vue"
import * as utils from "../utils.js"
import { computed } from "vue"
import "../shared.css"
import "jskos-vue-tabs/dist/style.css"

// Localization
const { t } = utils.useLocale({
  en: {
    created: "Created",
    modified: "Modified",
    issued: "Issued",
    altLabels: "Alternative Labels",
    definition: "Definition",
    info: "Info",
    identifier: "Identifier",
    labels: "Labels",
    editorial: "Editorial",
    scope: "Scope",
    languages: "Languages",
    type: "Type",
    publisher: "Publisher",
  },
  de: {
    created: "Erstellung",
    modified: "Änderung",
    issued: "Veröffentlicht",
    altLabels: "Alternative Bezeichnungen",
    definition: "Definition",
    info: "Info",
    identifier: "Identifier",
    labels: "Bezeichnungen",
    editorial: "Editorial",
    scope: "Scope",
    languages: "Sprachen",
    type: "Art",
    publisher: "Herausgeber",
  },
})

/**
 * TODO!
 * Icons
 */
const props = defineProps({
  // JSKOS item to be displayed
  item: {
    type: Object,
    required: true,
  },
  // Whether details are displayed as tabs or flat
  flat: {
    type: Boolean,
    default: false,
  },
  // Configure which fields of the item are displayed
  fields: {
    type: Object,
    default: () => ({}),
  },
})

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

const types = computed(() => {
  if (!props.item) {
    return []
  }
  let types = []
  let schemeTypes = (props.item && props.item.inScheme && props.item.inScheme[0] && props.item.inScheme[0].types) || []
  for (let type of props.item.type || []) {
    if (typeof type !== "object") {
      type = { uri: type }
    }
    if (!type || ["http://www.w3.org/2004/02/skos/core#Concept", "http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(type.uri)) {
      continue
    }
    // Try to find type in scheme types
    type = schemeTypes.find(t => jskos.compare(t, type)) || type
    types.push(type)
  }
  return types
})

const fields_ = computed(() => Object.assign({
  identifier: true,
  type: true,
  publisher: !jskos.isConcept(props.item),
  created: true,
  issued: true,
  modified: true,
  languages: true,
  definition: true,
  prefLabel: true,
  altLabel: true,
  scopeNote: true,
  editorialNote: true,
}, props.fields))

</script>

<style scoped>
.jskos-vue-itemDetails-tabs {
  margin-top: 8px;
  line-height: var(--jskos-vue-itemDetails-lineHeight);
  font-size: var(--jskos-vue-fontSize-small);
}
.jskos-vue-itemDetails-tabs :deep(.jskos-vue-itemDetails-list) {
  list-style: none;
  margin: 0 0 10px 0;
  padding: 0;
}
.jskos-vue-itemDetails-tabs :deep(.jskos-vue-itemDetails-list > li) {
  margin-top: 0;
}
.jskos-vue-itemDetails-tabs :deep(.jskos-vue-itemDetails-list > li:after) {
  content: attr(lang);
  color: var(--jskos-vue-color-lightGrey);
  font-size: 80%;
  top: -0.5em;
  right: -0.2em;
  position: relative;
}
</style>
