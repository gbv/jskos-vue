<script setup>
import { computed, inject, nextTick, provide, ref, useId, watch } from "vue"
import LoadingIndicator from "./LoadingIndicator.vue"
import QualifiedRelations from "./QualifiedRelations.vue"
import QualifiedLiterals from "./QualifiedLiterals.vue"
import QualifiedDates from "./QualifiedDates.vue"
import { useQualifiedStatementsLocale } from "../locales/qualifiedStatements.js"
import {
  qualifiedStatementsUiKey,
  uriResolutionKey,
  useUriResolution,
} from "../composables/useUriResolution.js"
import "../shared.css"

const props = defineProps({
  item: { type: Object, required: true },
  resolve: { type: Function, default: null },
  registry: { type: Object, default: null },
  labelForUri: { type: Function, default: null },
})

const { t, currentLanguage } = useQualifiedStatementsLocale()

const resolver = computed(() => {
  if (props.resolve) {
    return props.resolve
  }
  if (props.registry?.getConcepts) {
    return async uri => (await props.registry.getConcepts({ concepts: [{ uri }] }))?.[0]
  }
  return null
})

let resolution = inject(uriResolutionKey, null)
if (!resolution) {
  resolution = useUriResolution({
    resolve: resolver,
    labelForUri: computed(() => props.labelForUri),
    language: currentLanguage,
  })
  provide(uriResolutionKey, resolution)
}

const hasRelations = computed(() => Object.keys(props.item?.qualifiedRelations || {}).length > 0)
const hasDates = computed(() => Object.keys(props.item?.qualifiedDates || {}).length > 0)
const hasLiterals = computed(() => Object.keys(props.item?.qualifiedLiterals || {}).length > 0)
const activeStatementId = ref(null)
const activeTrigger = ref(null)
const componentId = useId()

function inspectorId(statementId) {
  return `${componentId}-qualified-statement-${statementId}`
}

function closeInspector({ restoreFocus = true } = {}) {
  const trigger = activeTrigger.value
  activeStatementId.value = null
  activeTrigger.value = null
  if (restoreFocus && trigger) {
    nextTick(() => trigger.focus())
  }
}

// A replacement item can reuse positional IDs, so discard the old inspector
// without focusing its detached disclosure button.
watch(() => props.item, () => closeInspector({ restoreFocus: false }))

function toggleInspector(statementId, trigger) {
  if (activeStatementId.value === statementId) {
    closeInspector()
    return
  }
  activeStatementId.value = statementId
  activeTrigger.value = trigger
}

function onKeydown(event) {
  if (event.key === "Escape" && activeStatementId.value) {
    event.preventDefault()
    event.stopPropagation()
    closeInspector()
  }
}

provide(qualifiedStatementsUiKey, {
  activeStatementId,
  closeInspector,
  inspectorId,
  toggleInspector,
})
</script>

<template>
  <section
    v-if="hasRelations || hasDates || hasLiterals"
    class="jskos-vue-qualifiedStatements"
    @keydown="onKeydown">
    <div class="jskos-vue-qualifiedStatements-title">
      {{ t("title") }}:
      <LoadingIndicator
        v-if="resolution.anyLoading.value"
        size="sm" />
    </div>
    <QualifiedRelations
      v-if="hasRelations"
      :relations="item.qualifiedRelations" />
    <QualifiedDates
      v-if="hasDates"
      :dates="item.qualifiedDates" />
    <QualifiedLiterals
      v-if="hasLiterals"
      :literals="item.qualifiedLiterals" />
  </section>
</template>

<style>
.jskos-vue-qualifiedStatements-title,
.jskos-vue-qualifiedStatements-property {
  font-weight: var(--jskos-vue-qualifiedStatements-fontWeight);
}
.jskos-vue-qualifiedStatements-tree {
  list-style: none;
  margin: 0;
  padding-left: 0;
}
.jskos-vue-qualifiedStatements-branch {
  align-items: start;
  column-gap: var(--jskos-vue-qualifiedStatements-groupGap);
  display: grid;
  grid-template-columns: var(--jskos-vue-qualifiedStatements-propertyWidth) minmax(0, 1fr);
  margin-top: var(--jskos-vue-qualifiedStatements-groupGap);
}
.jskos-vue-qualifiedStatements-property {
  min-width: 0;
  overflow-wrap: anywhere;
}
.jskos-vue-qualifiedStatements-property a {
  color: inherit;
  text-decoration: none;
}
.jskos-vue-qualifiedStatements-values {
  display: flex;
  flex-direction: column;
  gap: var(--jskos-vue-qualifiedStatements-statementGap);
  list-style: none;
  margin: 0;
  padding-left: 0;
}
.jskos-vue-qualifiedStatements-range {
  opacity: var(--jskos-vue-qualifiedStatements-mutedOpacity);
}
.jskos-vue-qualifiedStatements sup {
  margin-left: var(--jskos-vue-qualifiedStatements-smallGap);
  opacity: var(--jskos-vue-qualifiedStatements-mutedOpacity);
}
.jskos-vue-qualifiedStatements-row {
  align-items: flex-start;
  display: flex;
  gap: var(--jskos-vue-qualifiedStatements-statementGap);
}
.jskos-vue-qualifiedStatements-primary {
  flex: 0 1 auto;
  min-width: 0;
  overflow-wrap: anywhere;
}
.jskos-vue-qualifiedStatements-primary > a {
  text-decoration: none;
}
.jskos-vue-qualifiedStatements-property a:hover,
.jskos-vue-qualifiedStatements-property a:focus-visible,
.jskos-vue-qualifiedStatements-primary > a:hover,
.jskos-vue-qualifiedStatements-primary > a:focus-visible {
  text-decoration: underline;
  text-underline-offset: var(--jskos-vue-qualifiedStatements-smallGap);
}
.jskos-vue-qualifiedStatements-rank,
.jskos-vue-qualifiedStatements-range {
  color: var(--jskos-vue-color-lightGrey);
  font-size: var(--jskos-vue-fontSize-small);
  margin-left: var(--jskos-vue-qualifiedStatements-statementGap);
}
.jskos-vue-qualifiedStatements-disclosure,
.jskos-vue-qualifiedStatements-close,
.jskos-vue-qualifiedStatements-breadcrumb button,
.jskos-vue-qualifiedStatements-navigate {
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  font: inherit;
  padding: 0;
}
.jskos-vue-qualifiedStatements-disclosure:focus-visible,
.jskos-vue-qualifiedStatements-close:focus-visible,
.jskos-vue-qualifiedStatements-breadcrumb button:focus-visible,
.jskos-vue-qualifiedStatements-navigate:focus-visible {
  outline: var(--jskos-vue-qualifiedStatements-focusOutline);
  outline-offset: var(--jskos-vue-qualifiedStatements-smallGap);
}
.jskos-vue-qualifiedStatements-disclosure {
  color: var(--jskos-vue-color-lightGrey);
  flex: 0 0 auto;
}
.jskos-vue-qualifiedStatements-disclosure .jskos-vue-arrow {
  padding: 0;
}
.jskos-vue-qualifiedStatements-disclosure .jskos-vue-arrow > div {
  border-color: currentColor;
  border-width: 0 1px 1px 0;
  margin: var(--jskos-vue-qualifiedStatements-smallGap);
  padding: var(--jskos-vue-qualifiedStatements-smallGap);
}
.jskos-vue-qualifiedStatements-disclosure:hover {
  color: var(--jskos-vue-arrow-hover-color);
}
.jskos-vue-qualifiedStatements-inspector {
  border-left: var(--jskos-vue-qualifiedStatements-border);
  margin: var(--jskos-vue-qualifiedStatements-smallGap) 0 var(--jskos-vue-qualifiedStatements-gap);
  padding: var(--jskos-vue-qualifiedStatements-gap);
}
.jskos-vue-qualifiedStatements-inspectorHeader,
.jskos-vue-qualifiedStatements-inspectorValue {
  align-items: baseline;
  display: flex;
  gap: var(--jskos-vue-qualifiedStatements-gap);
}
.jskos-vue-qualifiedStatements-inspectorHeader {
  justify-content: space-between;
}
.jskos-vue-qualifiedStatements-inspectorValue {
  gap: var(--jskos-vue-qualifiedStatements-statementGap);
}
.jskos-vue-qualifiedStatements-breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  gap: var(--jskos-vue-qualifiedStatements-smallGap);
  list-style: none;
  margin: 0 0 var(--jskos-vue-qualifiedStatements-gap);
  padding: 0;
}
.jskos-vue-qualifiedStatements-breadcrumb button {
  text-decoration: underline;
  text-underline-offset: var(--jskos-vue-qualifiedStatements-smallGap);
}
.jskos-vue-qualifiedStatements-breadcrumb button:hover {
  color: var(--jskos-vue-arrow-hover-color);
}
.jskos-vue-qualifiedStatements-breadcrumb [aria-current="page"] {
  font-weight: var(--jskos-vue-qualifiedStatements-fontWeight);
}
.jskos-vue-qualifiedStatements-breadcrumb li:not(:last-child)::after {
  content: "›";
  display: inline-block;
  margin-left: var(--jskos-vue-qualifiedStatements-smallGap);
  opacity: var(--jskos-vue-qualifiedStatements-mutedOpacity);
  transform: scale(1.25);
}
.jskos-vue-qualifiedStatements-inspectorList {
  margin: 0;
}
.jskos-vue-qualifiedStatements-inspectorRow {
  display: grid;
  gap: var(--jskos-vue-qualifiedStatements-gap);
  grid-template-columns: var(--jskos-vue-qualifiedStatements-inspectorColumns);
  padding: var(--jskos-vue-qualifiedStatements-smallGap) 0;
}
.jskos-vue-qualifiedStatements-inspectorRow dt {
  font-weight: var(--jskos-vue-qualifiedStatements-fontWeight);
}
.jskos-vue-qualifiedStatements-inspectorRow dd {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}
.jskos-vue-qualifiedStatements-mappingHeading {
  border-top: var(--jskos-vue-qualifiedStatements-border);
  grid-template-columns: minmax(0, 1fr);
  margin-top: var(--jskos-vue-qualifiedStatements-groupGap);
  padding-top: var(--jskos-vue-qualifiedStatements-gap);
}
.jskos-vue-qualifiedStatements-mappingHeading dt {
  font-weight: 700;
}
.jskos-vue-qualifiedStatements-mappingHeading:first-child {
  border-top: 0;
  margin-top: 0;
  padding-top: 0;
}
.jskos-vue-qualifiedStatements-mappingHeading dd {
  display: none;
}
.jskos-vue-qualifiedStatements-mappingMembers {
  margin: 0;
  padding-left: var(--jskos-vue-qualifiedStatements-groupGap);
}
.jskos-vue-qualifiedStatements-languageMap {
  display: flex;
  flex-direction: column;
  gap: var(--jskos-vue-qualifiedStatements-smallGap);
}
.jskos-vue-qualifiedStatements-languageMapLanguage {
  color: var(--jskos-vue-color-lightGrey);
  font-size: var(--jskos-vue-fontSize-small);
  margin-left: var(--jskos-vue-qualifiedStatements-smallGap);
}
.jskos-vue-qualifiedStatements-navigate .jskos-vue-arrow {
  padding: 0;
}
.jskos-vue-qualifiedStatements-navigate .jskos-vue-arrow > div {
  margin: var(--jskos-vue-qualifiedStatements-smallGap);
}
.jskos-vue-qualifiedStatements-cycle {
  color: var(--jskos-vue-color-lightGrey);
  font-size: var(--jskos-vue-fontSize-small);
}
@media (max-width: 35rem) {
  .jskos-vue-qualifiedStatements-branch {
    grid-template-columns: minmax(0, 1fr);
    row-gap: var(--jskos-vue-qualifiedStatements-statementGap);
  }
}
</style>
