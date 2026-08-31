<template>
  <flexible-table
    class="jskos-vue-mappingTable"
    :fields="fields"
    :items="items"
    @hover="item => emit('hover', item)"
    @click="item => emit('click', item)">
    <template #sourceConcepts="{ value }">
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
    <template #targetConcepts="{ value }">
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
  showLabels: {
    type: Boolean,
    default: false,
  },
})

const fields = computed(() => {
  let fields = [
    {
      key: "sourceScheme",
      label: "",
      width: "8%",
      minWidth: "",
      sortable: false,
    },
    {
      key: "sourceConcepts",
      label: "from", // TODO: this.$t("mappingBrowser.from"),
      width: "19%",
      minWidth: "",
      sortable: false,
      compare: (a, b) => jskos.compareFunctions.mappingsByConcepts(a.mapping, b.mapping, "from"),
    },
    {
      key: "type",
      label: "",
      width: "7%",
      minWidth: "",
      sortable: false,
      compare: (a ,b) => {
        let labelA = jskos.prefLabel(a?.type, { fallbackToUri: false })
        let labelB = jskos.prefLabel(b?.type, { fallbackToUri: false })
        return labelA.localeCompare(labelB)
      },
    },
    {
      key: "targetScheme",
      label: "",
      width: "8%",
      minWidth: "",
      sortable: false,
    },
    {
      key: "targetConcepts",
      label: "to", // TODO: this.$t("mappingBrowser.to"),
      width: "19%",
      minWidth: "",
      sortable: false,
      compare: (a, b) => jskos.compareFunctions.mappingsByConcepts(a.mapping, b.mapping, "to"),
    },
    {
      key: "creator",
      label: "creator", // TODO this.$t("mappingBrowser.creator"),
      width: "15%",
      minWidth: "",
      sortable: false,
    },
    {
      key: "date",
      label: "date", // TODO: this.$t("mappingBrowser.date"),
      width: "12%",
      minWidth: "",
      sortable: false,
    },
    /*
    {
      key: "actions",
      label: "",
      width: "7%",
      minWidth: "",
      sortable: false,
    },
    */
  ]
  fields.forEach(field => field.class = `jskos-vue-mappingTable-${field.key}`)
  return fields
})

const items = computed(() => props.mappings.map(mapping => {
  if (mapping?.from && mapping?.to) {
    let item = {}
    item.mapping = mapping
    item.sourceScheme = jskos.notation(mapping.fromScheme)
    item.targetScheme = jskos.notation(mapping.toScheme)
    item.sourceConcepts = mapping.from.memberSet || mapping.from.memberChoice
    item.targetConcepts = mapping.to.memberSet || mapping.to.memberChoice
    item.creator = mapping.creator?.map(creator => jskos.prefLabel(creator)).join("\n")
    item.type = jskos.mappingTypeByType(mapping.type)
    item.date = mapping.modified || mapping.created
    item.date = item.date && item.date.slice(0, 10)
    item._rowClass = mapping._rowClass
    return item
  }
}).filter(Boolean))
</script>

<style>
@import "vue-flexible-table/dist/style.css"
</style>
