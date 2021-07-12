<template>
  <div
    class="jskos-vue-itemDetails"
    @dragover="dragover"
    @dragenter="dragenter"
    @dragleave="dragleave"
    @drop="drop">
    <!-- Define a dropzone which is shown only when a concept is being dragged over the component -->
    <div
      v-show="isDraggingOver && isDraggedConceptDifferent"
      class="jskos-vue-itemDetails-dropzone jskos-vue-text-small">
      {{ t("dropzone") }}
    </div>
    <div class="jskos-vue-itemDetails-name">
      <slot name="beforeName" />
      <item-name
        :item="item" />
      <slot name="afterName" />
    </div>
    <!-- Ancestors -->
    <!-- TODO: Only show part of ancestors? -->
    <item-list
      v-bind="itemListOptions"
      :items="item.ancestors || []"
      class="jskos-vue-itemDetails-ancestors"
      @select="$emit('select', { item: $event.item })" />
    <!-- Broader -->
    <item-list
      v-bind="itemListOptions"
      :items="(item.broader || []).filter(i => !jskos.isContainedIn(i, item.ancestors || []))"
      class="jskos-vue-itemDetails-broader"
      @select="$emit('select', { item: $event.item })" />
    <!-- License -->
    <div
      v-if="item.license && item.license.length">
      {{ t("license") }}:<auto-link
        v-for="(license, index) in item.license"
        :key="index"
        :href="license.uri"
        class="jskos-vue-itemDetails-licenseBadge">
        <img
          v-if="licenseBadges[license.uri]"
          :src="licenseBadges[license.uri]">
        <span v-else>
          {{ license.uri }}
        </span>
      </auto-link>
    </div>
    <tabs
      borders="bottom"
      size="sm"
      class="jskos-vue-itemDetails-tabs">
      <tab :title="t('info')">
        <!-- Identifier -->
        <ul class="jskos-vue-itemDetails-list">
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
          <li v-if="types.length">
            <b>{{ t("type") }}:</b> {{ types.map(t => jskos.prefLabel(t)).join(", ") }}
          </li>
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
          <!-- TODO: Publisher -->
        </ul>
        <ul
          v-if="jskos.languageMapContent(item, 'definition')"
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
      </tab>
      <tab :title="t('labels')">
        <!-- prefLabel -->
        <ul class="jskos-vue-itemDetails-list">
          <li
            v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'prefLabel')"
            :key="`${language}-${index}`"
            :lang="`${language}`">
            {{ label }}
          </li>
        </ul>
        <!-- altLabel -->
        <ul
          v-if="jskos.languageMapContent(item, 'altLabel')"
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
      </tab>
      <!-- scopeNote -->
      <tab
        v-if="jskos.languageMapContent(item, 'scopeNote')"
        :title="t('scope')">
        <ul class="jskos-vue-itemDetails-list">
          <li
            v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'scopeNote')"
            :key="`${language}-${index}`"
            :lang="`${language}`">
            {{ label }}
          </li>
        </ul>
      </tab>
      <!-- editorialNote -->
      <tab
        v-if="jskos.languageMapContent(item, 'editorialNote')"
        :title="t('editorial')">
        <ul class="jskos-vue-itemDetails-list">
          <li
            v-for="({ language, label }, index) in iterateLanguageMapContent(item, 'editorialNote')"
            :key="`${language}-${index}`"
            :lang="`${language}`">
            {{ label }}
          </li>
        </ul>
      </tab>
      <!-- Slot for additional tabs -->
      <slot name="tabs" />
    </tabs>
    <!-- Narrower -->
    <item-list
      v-bind="itemListOptions"
      :items="item.narrower || []"
      class="jskos-vue-itemDetails-narrower"
      @select="$emit('select', { item: $event.item })" />
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
const { draggedItem, addDropzone } = utils.dragAndDrop
import "../shared.css"
import "jskos-vue-tabs/dist/style.css"

// Localization
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
    type: "Type",
    dropzone: "Drop an item here to select it.",
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
    type: "Art",
    dropzone: "Ziehe ein Item hierrein, um es auszuwählen.",
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
    // JSKOS item to be displayed
    item: {
      type: Object,
      required: true,
    },
    // options to be passed along to ItemList component instances
    itemListOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["select"],
  setup(props, { emit }) {
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
    const licenseAttribution = computed(() => {
      const organisation = (props.item.publisher || []).find(o => o.url)
      const url = organisation.url || props.item.url
      return {
        url,
        label: jskos.prefLabel(organisation) || "?",
      }
    })
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
    // Drag and drop
    const isDraggedConceptDifferent = computed(() => {
      return !jskos.compare(props.item, draggedItem.value)
    })
    const dropzone = addDropzone(null, (item) => {
      isDraggedConceptDifferent.value && emit("select", { item })
    })
    return {
      utils,
      jskos,
      language,
      t,
      iterateLanguageMapContent,
      licenseBadges,
      licenseAttribution,
      types,
      draggedItem,
      ...dropzone,
      isDraggedConceptDifferent,
    }
  },
})
</script>

<style>
.jskos-vue-itemDetails {
  position: relative;
  font-size: 0.85rem;
}
.jskos-vue-itemDetails-name {
  position: relative;
  font-size: 1rem;
}
.jskos-vue-itemDetails-tabs {
  margin-top: 8px;
}
.jskos-vue-itemDetails-list {
  list-style: none;
  margin: 0 0 10px 0;
  padding: 0;
}
.jskos-vue-itemDetails-list > li:after {
  content: attr(lang);
  color: var(--jskos-vue-color-lightGrey);
  font-size: 80%;
  top: -0.5em;
  right: -0.2em;
  position: relative;
}
.jskos-vue-itemDetails-narrower, .jskos-vue-itemDetails-ancestors, .jskos-vue-itemDetails-broader {
  margin-top: 4px;
  margin-bottom: 4px;
}
.jskos-vue-itemDetails-narrower > div:before, .jskos-vue-itemDetails-ancestors > div:before, .jskos-vue-itemDetails-broader > div:before {
  font-family: monospace;
  padding-right: 2px;
}
.jskos-vue-itemDetails-narrower > div:before {
  content: "↳";
}
.jskos-vue-itemDetails-ancestors > div:before {
  content: "↱";
}
.jskos-vue-itemDetails-broader > div:before {
  content: "˄";
}
.jskos-vue-itemDetails-licenseBadge {
  padding-left: 5px;
}
.jskos-vue-itemDetails-licenseBadge > img {
  height: 1em;
  vertical-align: middle;
  padding-bottom: 4px;
  display: inline-block;
}
.jskos-vue-itemDetails-dropzone {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: var(--jskos-vue-itemDetails-dropzone-bgCover);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
