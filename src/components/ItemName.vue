<template>
  <span
    :class="{
      'jskos-vue-itemName': true,
      clickable,
    }">
    <span
      v-if="showNotation || label === ''"
      class="jskos-vue-itemName-notation"
      v-html="notation" />
    {{ label }}
    <template v-if="notation === '' && label === ''">
      {{ fallbackLabel }}
    </template>
  </span>
</template>

<script>
import { defineComponent, reactive, computed } from "vue"
import * as jskos from "jskos-tools"
import "../shared.css"

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

const component = defineComponent({
  name: "ItemName",
  props: {
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
  },
  setup(props) {
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
    return {
      notation,
      label,
    }
  },
})

// Add methods to component for adding plugins
component.addLabelPlugin = (plugin) => {
  plugins.label.push(plugin)
}
component.addNotationPlugin = (plugin) => {
  plugins.notation.push(plugin)
}

export default component
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
