<template>
  <div
    class="jskos-vue-itemDetails"
    @dragover="dragover"
    @dragenter="dragenter"
    @dragleave="dragleave"
    @drop="drop">
    <!-- Define a dropzone which is shown only when a concept is being dragged over the component -->
    <div
      v-show="dropzone && isDraggingOver && isDraggedConceptDifferent"
      class="jskos-vue-itemDetails-dropzone jskos-vue-text-small">
      {{ t("dropzone") }}
    </div>
    <div class="jskos-vue-itemDetails-name">
      <slot name="before" />
      <slot name="beforeName" />
      <item-name
        :item="item"
        :draggable="draggable" />
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
      v-if="showAncestors"
      v-bind="itemListOptions_"
      :items="(item.ancestors || []).filter(Boolean).reverse()"
      :indent="true"
      class="jskos-vue-itemDetails-ancestors"
      @select="$emit('select', { item: $event.item })" />
    <!-- Broader -->
    <item-list
      v-if="showBroader"
      v-bind="itemListOptions_"
      :items="(item.broader || []).filter(i => !jskos.isContainedIn(i, item.ancestors || []))"
      class="jskos-vue-itemDetails-broader"
      @select="$emit('select', { item: $event.item })" />
    <slot name="beforeTabs" />
    <item-details-tabs
      v-if="showTabs"
      :item="item"
      :flat="flat"
      :fields="fields">
      <template #additionalTabs>
        <slot name="additionalTabs" />
      </template>
    </item-details-tabs>
    <slot name="afterTabs" />
    <!-- Narrower -->
    <item-list
      v-if="showNarrower"
      v-bind="itemListOptions_"
      :items="item.narrower || []"
      class="jskos-vue-itemDetails-narrower"
      @select="$emit('select', { item: $event.item })" />
    <slot name="after" />
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
const { t, currentLanguage } = utils.useLocale({
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
})

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
    showTabs: {
      type: Boolean,
      default: true,
    },
    showAncestors: {
      type: Boolean,
      default: true,
    },
    showBroader: {
      type: Boolean,
      default: true,
    },
    showNarrower: {
      type: Boolean,
      default: true,
    },
    dropzone: {
      type: Boolean,
      default: true,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    // whether details are displayed as tabs or flat
    flat: {
      type: Boolean,
      default: false,
    },
    // Configure which fields of the item are displayed
    fields: {
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
      props.dropzone && isDraggedConceptDifferent.value && emit("select", { item })
    })
    const itemListOptions_ = computed(() => Object.assign({ draggable: props.draggable }, props.itemListOptions))
    return {
      utils,
      jskos,
      currentLanguage,
      t,
      draggedItem,
      ...dropzone,
      isDraggedConceptDifferent,
      itemListOptions_,
    }
  },
})
</script>

<style scoped>
.jskos-vue-itemDetails {
  position: relative;
  font-size: var(--jskos-vue-fontSize-small);
  line-height: var(--jskos-vue-itemDetails-lineHeight);
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
