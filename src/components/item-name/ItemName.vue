<template>
  <span
    :class="{
      'item-name': true,
      clickable,
    }">
    <span
      v-if="showNotation || label === ''"
      class="notation">
      {{ notation }}
    </span>
    {{ label }}
    <template v-if="notation === '' && label === ''">
      {{ fallbackLabel }}
    </template>
  </span>
</template>

<script>
import { defineComponent, computed } from "vue"
import * as jskos from "jskos-tools"

export default defineComponent({
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
      default: "en",
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const notation = computed(() =>
      props.showNotation
        ? jskos.notation(props.item)
        : "",
    )
    const label = computed(() =>
      props.showLabel
        ? jskos.prefLabel(props.item, {
          fallbackToUri: !notation.value,
          language: props.language,
        })
        : "",
    )
    return {
      notation,
      label,
    }
  },
})
</script>

<style scoped>
.notation {
  font-weight: bold;
}
.item-name.clickable {
  cursor: pointer;
}
.item-name.clickable:hover {
  text-decoration: underline;
}
</style>
