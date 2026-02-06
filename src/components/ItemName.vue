<template>
  <span
    :class="{
      'jskos-vue-itemName': true,
      clickable,
    }"
    :draggable="draggable"
    @dragstart="dragstart(item)"
    @dragend="dragend">
    <span
      v-if="showNotation || label === ''"
      class="jskos-vue-itemName-notation"
      v-html="notation" />
    <template v-if="label !== ''">
      <!-- Whitespace between notation and label -->
      <span
        v-if="showNotation && notation !== ''"
        v-html="' '" />
      {{ label }}
    </template>
    <template v-if="(!showNotation || notation === '') && label === ''">
      {{ fallbackLabel }}
    </template>
  </span>
</template>

<script>
import { reactive } from "vue"

const plugins = reactive({
  label: [],
  processLabel(label, options) {
    for (let plugin of this.label) {
      label = plugin(label, options)
    }
    return label
  },
  notation: [],
  processNotation(notation, options) {
    for (let plugin of this.notation) {
      notation = plugin(notation, options)
    }
    return notation
  },
})

export default {
  addLabelPlugin(plugin) {
    plugins.label.push(plugin)
  },
  addNotationPlugin(plugin) {
    plugins.notation.push(plugin)
  },
}
</script>

<script setup>
import { computed } from "vue"
import * as jskos from "jskos-tools"
import { dragAndDrop } from "../utils"
import "../shared.css"

const { dragstart, dragend } = dragAndDrop

const props = defineProps({
  // JSKOS item
  item: {
    type: Object,
    required: true,
  },
  // whether to show the item's notation
  showNotation: {
    type: Boolean,
    default: true,
  },
  // whether to show the item's label
  showLabel: {
    type: Boolean,
    default: true,
  },
  // fallback label (only shown if both notation and label are empty)
  fallbackLabel: {
    type: String,
    default: "???",
  },
  // change language of the label (by default uses jskos-tools' "languagePreference")
  language: {
    type: String,
    default: "",
  },
  // whether the item is clickable
  clickable: {
    type: Boolean,
    default: false,
  },
  // whether the item is draggable
  draggable: {
    type: Boolean,
    default: true,
  },
})

const notation = computed(() =>
  props.showNotation
    ? plugins.processNotation(jskos.notation(props.item), props)
    : "",
)
const label = computed(() =>
  props.showLabel
    ? plugins.processLabel(jskos.prefLabel(props.item, {
      fallbackToUri: !notation.value,
      language: props.language || jskos.languagePreference.selectLanguage(props.item.prefLabel),
    }), props)
    : "",
)
</script>

<style scoped>
.jskos-vue-itemName-notation {
  font-weight: bold;
}
.jskos-vue-itemName.clickable:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
