<script setup>
import { computed, inject } from "vue"
import Arrow from "./Arrow.vue"
import AutoLink from "./AutoLink.vue"
import QualifiedStatementInspector from "./QualifiedStatementInspector.vue"
import { useQualifiedStatementsLocale } from "../locales/qualifiedStatements.js"
import {
  qualifiedStatementsUiKey,
  uriResolutionKey,
} from "../composables/useUriResolution.js"

const props = defineProps({
  statement: { type: Object, required: true },
  statementId: { type: String, required: true },
  kind: {
    type: String,
    required: true,
    validator: value => ["relation", "literal", "date"].includes(value),
  },
})

const resolution = inject(uriResolutionKey)
const ui = inject(qualifiedStatementsUiKey)
const { t } = useQualifiedStatementsLocale()

const resource = computed(() => props.statement.resource)
const primaryUri = computed(() => {
  if (props.kind === "relation") {
    return resource.value?.uri || resource.value?.url
  }
  if (props.kind === "literal") {
    return props.statement.uri
  }
  return null
})
const primaryLabel = computed(() => {
  if (props.kind === "relation") {
    return resolution.label(resource.value) || resource.value?.url || t("unnamedValue")
  }
  if (props.kind === "literal") {
    return props.statement.literal?.string
      || resolution.label(props.statement.uri)
      || t("unnamedValue")
  }
  return props.statement.date || t("unnamedValue")
})
const language = computed(() => props.kind === "literal" ? props.statement.literal?.language : null)
const expanded = computed(() => ui.activeStatementId.value === props.statementId)
const controlsId = computed(() => ui.inspectorId(props.statementId))

function hasAdditionalKeys(value, excluded) {
  return value && typeof value === "object" && Object.keys(value)
    .some(key => !excluded.includes(key) && !key.startsWith("_"))
}

const hasDetails = computed(() => {
  const common = ["rank", "startDate", "endDate"]
  if (props.kind === "relation") {
    return hasAdditionalKeys(props.statement, [...common, "resource"])
      || hasAdditionalKeys(resource.value, ["uri"])
  }
  if (props.kind === "literal") {
    return hasAdditionalKeys(props.statement, [...common, "literal", "uri"])
  }
  return hasAdditionalKeys(props.statement, [...common, "date"])
})

function toggle(event) {
  ui.toggleInspector(props.statementId, event.currentTarget)
}
</script>

<template>
  <li :class="`jskos-vue-qualifiedStatements-rank-${statement.rank || 'normal'}`">
    <div class="jskos-vue-qualifiedStatements-row">
      <div class="jskos-vue-qualifiedStatements-primary">
        <AutoLink
          v-if="primaryUri"
          :href="primaryUri"
          :text="primaryLabel" />
        <span
          v-else
          :lang="language || undefined">
          {{ primaryLabel }}<sup v-if="language">{{ language }}</sup>
        </span>
        <small
          v-if="statement.startDate || statement.endDate"
          class="jskos-vue-qualifiedStatements-range">
          {{ resolution.fmtRange(statement.startDate, statement.endDate) }}
        </small>
        <small
          v-if="statement.rank === 'preferred' || statement.rank === 'deprecated'"
          class="jskos-vue-qualifiedStatements-rank">
          {{ t(statement.rank) }}
        </small>
      </div>
      <button
        v-if="hasDetails"
        type="button"
        class="jskos-vue-qualifiedStatements-disclosure"
        :aria-label="`${expanded ? t('hideDetails') : t('showDetails')}: ${primaryLabel}`"
        :aria-expanded="expanded"
        :aria-controls="controlsId"
        @click="toggle">
        <Arrow
          aria-hidden="true"
          :direction="expanded ? 'down' : 'right'" />
      </button>
    </div>
    <QualifiedStatementInspector
      v-if="expanded"
      :id="controlsId"
      :statement="statement"
      :title="primaryLabel" />
  </li>
</template>
