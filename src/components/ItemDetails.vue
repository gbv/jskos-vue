<template>
  <div class="item-details">
    <item-name
      :item="item" />
    <tabs
      borders="bottom"
      size="sm">
      <tab title="Info">
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
              <b>{{ prop }}:</b> {{ utils.dateToString(item[prop]) }}
            </li>
          </template>
        </ul>
        <template v-if="item.definition">
          <ul class="item-details-list">
            <li>
              <b>Definitions:</b>
            </li>
            <li
              v-for="language in [jskos.languagePreference.selectLanguage(item.definition)].concat(Object.keys(item.definition).filter(language => language != jskos.languagePreference.selectLanguage(item.definition) && language != '-'))"
              :key="language">
              {{ jskos.definition(item, { language }).join(", ") }} <span class="jskos-vue-text-lightGrey">({{ language }})</span>
            </li>
          </ul>
        </template>
      </tab>
      <tab title="Labels">
        TODO
      </tab>
    </tabs>
  </div>
</template>

<script>
import * as jskos from "jskos-tools"
import { Tabs, Tab } from "jskos-vue-tabs"
import ItemName from "./ItemName.vue"
import AutoLink from "./AutoLink.vue"
import * as utils from "../utils.js"
import { defineComponent } from "vue"

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
  },
  setup() {
    // ...
    return {
      utils,
      jskos,
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
</style>
