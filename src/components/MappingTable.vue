<template>
  <flexible-table
    class="jskos-vue-mappingTable"
    :fields="fields"
    :items="items"
    :hide-header="!header"
    @hover="item => emit('hover', item)"
    @click="item => emit('click', item)">
    <template #from="{ value }">
      <span>
        <item-name
          v-for="concept in value"
          :key="concept.uri"
          :item="concept"
          :show-text="showLabels"
          :is-link="false"
          :is-highlighted="false" />
      </span>
    </template>
    <template #to="{ value }">
      <span>
        <span
          v-for="concept in value"
          :key="concept.uri">
          <item-name
            :item="concept"
            :show-text="showLabels"
            :is-link="false"
            :is-highlighted="false" />
          <br>
        </span>
      </span>
    </template>
    <template #type="{ value }">
      <span>
        <span v-if="value != null">
          {{ jskos.notation(value) }}
        </span>
      </span>
    </template>
  </flexible-table>
</template>

<script setup>
import FlexibleTable from "vue-flexible-table"

import * as jskos from "jskos-tools"
import ItemName from "./ItemName.vue"
import { computed } from "vue"

const emit = defineEmits(["hover", "click"])

const props = defineProps({
  mappings: {
    type: Array,
    required: true,
  },
  fields: {
    type: Array,
    default: () => ["fromScheme:10", "from:22", "type:8", "toScheme:10", "to:22", "creator:16", "date:12"], 
  },
  showLabels: {
    type: Boolean,
    default: false,
  },
  header: {
    type: Boolean,
    default: () => true,
  },
})

const supportedFields = {
  fromScheme: {
    label: "",
  },
  from: {
    label: "from", // TODO: this.$t("mappingBrowser.from"),
    compare: (a, b) => jskos.compareFunctions.mappingsByConcepts(a.mapping, b.mapping, "from"),
  },
  type: {
    label: "",
    compare: (a ,b) => {
      let labelA = jskos.prefLabel(a?.type, { fallbackToUri: false })
      let labelB = jskos.prefLabel(b?.type, { fallbackToUri: false })
      return labelA.localeCompare(labelB)
    },
  },
  toScheme: {
    label: "",
  },
  to: {
    label: "to", // TODO: this.$t("mappingBrowser.to"),
    compare: (a, b) => jskos.compareFunctions.mappingsByConcepts(a.mapping, b.mapping, "to"),
  },
  creator: {
    label: "creator", // TODO this.$t("mappingBrowser.creator"),
  },
  date: {
    label: "date", // TODO: this.$t("mappingBrowser.date"),
  },
  confidence: {
    label: "confidence", // TODO: localization
  },
}

const items = computed(() => props.mappings.map(mapping => {
  if (mapping?.from && mapping?.to) {
    let item = {}
    item.mapping = mapping
    item.fromScheme = jskos.notation(mapping.fromScheme)
    item.toScheme = jskos.notation(mapping.toScheme)
    item.from = mapping.from.memberSet || mapping.from.memberChoice
    item.to = mapping.to.memberSet || mapping.to.memberChoice
    item.creator = mapping.creator?.map(creator => jskos.prefLabel(creator)).join("\n")
    item.type = jskos.mappingTypeByType(mapping.type)
    item.date = mapping.modified || mapping.created
    item.date = item.date && item.date.slice(0, 10)
    item.confidence = typeof item.mappingRelevance === "number" ? `${item.mappingRelevance}%` : null
    item._rowClass = mapping._rowClass
    return item
  }
}).filter(Boolean))

const fields = computed(() => props.fields.map(field => {
  const [key, width] = field.split(":")
  return key in supportedFields ? {
    key,
    class: `jskos-vue-mappingTable-${key}`,
    width: `${width}%`,
    minWidth: "",
    sortable: false,
    ...supportedFields[key],
  } : null
}).filter(Boolean))
</script>

<style>
@import "vue-flexible-table/dist/style.css"
</style>
