<template>
  <div class="item-details">
    <!-- Ancestors -->
    <ul class="item-details-list item-details-ancestors">
      <li
        v-for="(ancestor, index) in item.ancestors || []"
        :key="index">
        <item-name
          :item="ancestor"
          :clickable="clickable"
          @click="clickable && $emit('select', { item: ancestor })" />
      </li>
    </ul>
    <item-name
      :item="item" />
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
        <template v-if="item.definition">
          <ul class="item-details-list">
            <li>
              <b>{{ t("definition") }}:</b>
            </li>
            <li
              v-for="language in [jskos.languagePreference.selectLanguage(item.definition)].concat(Object.keys(item.definition).filter(language => language != jskos.languagePreference.selectLanguage(item.definition) && language != '-'))"
              :key="language">
              {{ jskos.definition(item, { language }).join(", ") }} <span class="jskos-vue-text-lightGrey">({{ language }})</span>
            </li>
          </ul>
        </template>
      </tab>
      <tab :title="t('labels')">
        TODO
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
    </tabs>
    <!-- Narrower -->
    <ul class="item-details-list item-details-narrower">
      <li
        v-for="(narrower, index) in item.narrower || []"
        :key="index">
        <item-name
          :item="narrower"
          :clickable="clickable"
          @click="clickable && $emit('select', { item: narrower })" />
      </li>
    </ul>
  </div>
</template>

<script>
import * as jskos from "jskos-tools"
import { Tabs, Tab } from "jskos-vue-tabs"
import ItemName from "./ItemName.vue"
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
 * Definition
 * Labels
 * Notes
 * Plugin system for additional tabs of information (e.g. coli-ana, GND links)
 * Internationalization via i18n
 */
export default defineComponent({
  name: "ItemDetails",
  components: {
    ItemName,
    Tabs,
    Tab,
    AutoLink,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["select"],
  setup() {
    return {
      utils,
      jskos,
      language,
      t,
    }
  },
})
</script>

<style>
.item-details-list {
  list-style: none;
  margin: 0 0 10px 0;
  padding: 0;
}
.item-details-narrower, .item-details-ancestors {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 0.85em;
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
