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
    <!-- License -->
    <div
      v-if="item.license && item.license.length">
      {{ t("license") }}: <license-info :item="item" />
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
    <item-details-tabs
      :item="item">
      <template #additionalTabs>
        <slot name="additionalTabs" />
      </template>
    </item-details-tabs>
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
import ItemName from "./ItemName.vue"
import ItemList from "./ItemList.vue"
import ItemDetailsTabs from "./ItemDetailsTabs.vue"
import LicenseInfo from "./LicenseInfo.vue"
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
    license: "License",
    dropzone: "Drop an item here to select it.",
  },
  de: {
    showAllAncestors: "zeige alle übergeordneten Konzepte",
    showLessAncestors: "zeige weniger übergeordnete Konzepte",
    license: "Lizenz",
    dropzone: "Ziehe ein Item hierrein, um es auszuwählen.",
  },
}
// Determines current language from jskos.languagePreference and locale
const currentLanguage = computed(() => jskos.languagePreference.getLanguages().find(lang => locale[lang]) || "en")
const t = (prop) => locale[currentLanguage.value][prop]

/**
 * TODO!
 * Icons
 */
export default defineComponent({
  name: "ItemDetails",
  components: {
    ItemName,
    ItemList,
    LicenseInfo,
    ItemDetailsTabs,
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
      currentLanguage,
      t,
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
