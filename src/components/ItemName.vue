<template>
  <span
    :class="{
      'item-name': true,
      clickable,
    }">
    <span
      v-if="showNotation || label === ''"
      class="notation"
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
    item: {
      type: Object,
      required: true,
    },
    showNotation: {
      type: Boolean,
      default: true,
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    fallbackLabel: {
      type: String,
      default: "???",
    },
    language: {
      type: String,
      default: "",
    },
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
.notation {
  font-weight: bold;
}
.item-name.clickable:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
