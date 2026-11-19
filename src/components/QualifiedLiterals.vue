<script setup>
import { inject, watch } from "vue"
import AutoLink from "./AutoLink.vue"
import QualifiedStatement from "./QualifiedStatement.vue"
import { uriResolutionKey } from "../composables/useUriResolution.js"

const props = defineProps({
  literals: { type: Object, required: true },
})

const resolution = inject(uriResolutionKey)

function collectResources() {
  const resources = []
  for (const [propertyUri, statements] of Object.entries(props.literals || {})) {
    resources.push(propertyUri)
    for (const statement of statements || []) {
      if (statement.uri) {
        resources.push(statement.uri)
      }
    }
  }
  return resources
}

watch(
  () => props.literals,
  () => resolution.prefetch(collectResources()),
  { immediate: true, deep: true },
)
</script>

<template>
  <ul class="jskos-vue-qualifiedStatements-tree">
    <li
      v-for="(statements, propertyUri, propertyIndex) in literals"
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
          kind="literal"
          :statement="statement"
          :statement-id="`literal-${propertyIndex}-${index}`" />
      </ul>
    </li>
  </ul>
</template>
