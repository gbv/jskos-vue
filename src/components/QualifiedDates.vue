<script setup>
import { inject, watch } from "vue"
import AutoLink from "./AutoLink.vue"
import QualifiedStatement from "./QualifiedStatement.vue"
import { uriResolutionKey } from "../composables/useUriResolution.js"

const props = defineProps({
  dates: { type: Object, required: true },
})

const resolution = inject(uriResolutionKey)

function collectResources() {
  const resources = []
  for (const propertyUri of Object.keys(props.dates || {})) {
    resources.push(propertyUri)
  }
  return resources
}

watch(
  () => props.dates,
  () => resolution.prefetch(collectResources()),
  { immediate: true, deep: true },
)
</script>

<template>
  <ul class="jskos-vue-qualifiedStatements-tree">
    <li
      v-for="(statements, propertyUri, propertyIndex) in dates"
      :key="propertyUri"
      class="jskos-vue-qualifiedStatements-branch">
      <div class="jskos-vue-qualifiedStatements-property">
        <AutoLink
          :href="propertyUri"
          :text="resolution.label(propertyUri)" />
      </div>
      <ul class="jskos-vue-qualifiedStatements-values">
        <QualifiedStatement
          v-for="(statement, index) in statements"
          :key="`${propertyUri}-${index}`"
          kind="date"
          :statement="statement"
          :statement-id="`date-${propertyIndex}-${index}`" />
      </ul>
    </li>
  </ul>
</template>
