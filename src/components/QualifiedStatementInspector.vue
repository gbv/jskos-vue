<script setup>
import { computed, inject, nextTick, ref, watch } from "vue"
import Arrow from "./Arrow.vue"
import AutoLink from "./AutoLink.vue"
import { useQualifiedStatementsLocale } from "../locales/qualifiedStatements.js"
import {
  qualifiedStatementsUiKey,
  uriResolutionKey,
} from "../composables/useUriResolution.js"

const props = defineProps({
  id: { type: String, required: true },
  statement: { type: Object, required: true },
  title: { type: String, required: true },
})

const resolution = inject(uriResolutionKey)
const ui = inject(qualifiedStatementsUiKey)
const inspector = ref(null)
const path = ref([])
const { t } = useQualifiedStatementsLocale()

// The inspector converts the current JSKOS object into display entries instead
// of exposing its raw structure. A path of resources and qualified statements
// drives both the current view and breadcrumbs. Statements retain their own
// identity because several statements can qualify the same resource differently.
function resetPath() {
  path.value = [{
    label: props.title,
    qualifiedStatement: isObject(props.statement.resource),
    value: props.statement,
  }]
}

watch(() => props.statement, resetPath, { immediate: true })

const current = computed(() => path.value.at(-1)?.value)
const currentNode = computed(() => path.value.at(-1))
const currentLabel = computed(() => path.value.at(-1)?.label || props.title)

function isObject(value) {
  return value !== null && typeof value === "object"
}

function isUri(value) {
  return typeof value === "string" && /^https?:\/\//.test(value)
}

function isLiteral(value) {
  return isObject(value) && typeof value.string === "string"
}

function isLanguageMap(key, value) {
  return [
    "altLabel",
    "changeNote",
    "definition",
    "editorialNote",
    "example",
    "hiddenLabel",
    "historyNote",
    "note",
    "prefLabel",
    "scopeNote",
  ].includes(key)
    && isObject(value)
    && Object.values(value).every(item => typeof item === "string"
      || (Array.isArray(item) && item.every(entry => typeof entry === "string")))
}

function propertyLabel(key) {
  if (isUri(key)) {
    return resolution.label(key)
  }
  const translated = t(key)
  return translated === key
    ? key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, character => character.toUpperCase())
    : translated
}

function languageMapValues(value) {
  return Object.entries(value)
    .flatMap(([language, labels]) => (Array.isArray(labels) ? labels : [labels])
      .map(text => ({ language, text })))
}

function shortNavigationLabel(label, text, { includeValue = false, index = 0, itemCount = 1 } = {}) {
  const indexedLabel = itemCount > 1 ? `${label} ${index + 1}` : label
  return includeValue && text && text.length <= 60 ? `${indexedLabel}: ${text}` : indexedLabel
}

function objectLabel(value, fallback, index = 0) {
  if (isLiteral(value)) {
    return value.string
  }
  if (value?.resource) {
    return resolution.label(value.resource) || value.resource.url || fallback
  }
  if (value?.literal) {
    return value.literal.string || fallback
  }
  if (value?.date) {
    return value.date
  }
  return resolution.label(value)
    || value?.url && resolution.shorten(value.url)
    || `${fallback}${index ? ` ${index + 1}` : ""}`
}

function scalarText(value) {
  if (value === null || value === undefined || value === "") {
    return "—"
  }
  if (typeof value === "boolean") {
    return t(String(value))
  }
  return String(value)
}

// Normalize JSKOS values into display entries with optional links and navigation,
// keeping the original value available for drill-down.
function makeEntry({
  key,
  keyPrefix = "",
  label,
  value,
  index = 0,
  itemCount = 1,
  navigationBase = null,
  navigationIncludesValue = false,
  propertyUri = null,
  qualifiedStatement = false,
}) {
  const languageMap = isLanguageMap(key, value)
  const localizedValues = languageMap ? languageMapValues(value) : null
  const literal = isLiteral(value)
  const compactUri = ["uri", "url"].includes(key) && isUri(value)
  // URI-only objects are terminal links, not useful navigation levels.
  const navigable = isObject(value)
    && !languageMap
    && !literal
    && Object.keys(value).some(field => !["uri", "url"].includes(field))
  let text
  if (compactUri) {
    text = key === "uri"
      ? resolution.label(value)
      : resolution.shorten(value)
  } else if (languageMap) {
    text = localizedValues[0]?.text || ""
  } else if (literal) {
    text = `${value.string}${value.language ? ` [${value.language}]` : ""}`
  } else if (isObject(value)) {
    text = objectLabel(value, label, index)
  } else if (isUri(value)) {
    text = resolution.label(value)
  } else {
    text = scalarText(value)
  }
  const linkUri = isObject(value) ? value.uri || value.url : isUri(value) ? value : null
  return {
    key: `${keyPrefix}${key}-${index}`,
    label,
    languageMapValues: localizedValues,
    fullUri: compactUri ? value : null,
    linkUri,
    navigable,
    navigationLabel: shortNavigationLabel(navigationBase || label, text, {
      includeValue: navigationIncludesValue,
      index,
      itemCount,
    }),
    propertyUri,
    qualifiedStatement,
    text,
    value,
  }
}

function makeTypeEntry({ key, keyPrefix, label, values }) {
  return {
    items: values.map((value, index) => makeEntry({ key, keyPrefix, label, value, index })),
    key: `${keyPrefix}${key}`,
    label,
  }
}

// JSKOS mappings group concepts as a set, alternatives, or an ordered list.
const bundleTypes = ["memberSet", "memberChoice", "memberList"]

function isConceptBundle(value) {
  return isObject(value) && bundleTypes.some(key => Array.isArray(value[key]))
}

function isMapping(value) {
  return isObject(value) && (isConceptBundle(value.from) || isConceptBundle(value.to))
}

function isMappingList(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isMapping)
}

function bundleLabel(side, bundleType) {
  const semantics = {
    memberChoice: t("alternatives"),
    memberList: t("ordered"),
    memberSet: t("set"),
  }
  return `${t(side)} (${semantics[bundleType]})`
}

function entriesForBundle(bundle, side, mappingIndex) {
  if (!isObject(bundle)) {
    return []
  }
  const entries = []
  for (const bundleType of bundleTypes) {
    if (!Array.isArray(bundle[bundleType])) {
      continue
    }
    const label = bundleLabel(side, bundleType)
    const concepts = bundle[bundleType]
    entries.push({
      items: concepts.map((concept, index) => makeEntry({
        index,
        itemCount: concepts.length,
        key: bundleType,
        keyPrefix: `mapping-${mappingIndex}-${side}-`,
        label,
        navigationIncludesValue: true,
        value: concept,
      })),
      key: `mapping-${mappingIndex}-${side}-${bundleType}`,
      label,
      memberList: bundleType === "memberList" ? "ol" : concepts.length > 1 ? "ul" : null,
    })
  }
  const metadata = Object.fromEntries(Object.entries(bundle)
    .filter(([key]) => !bundleTypes.includes(key)))
  entries.push(...entriesForFields(metadata, {
    keyPrefix: `mapping-${mappingIndex}-${side}-metadata-`,
    labelPrefix: t(side),
  }))
  return entries
}

// Expand mapping sides so bundle semantics and mapping metadata remain visible.
function entriesForMappings(mappings) {
  return mappings.flatMap((mapping, index) => {
    const entries = [{
      key: `mapping-${index}-heading`,
      label: `${t("mapping")} ${index + 1}`,
      mappingHeading: true,
    }]
    const types = Array.isArray(mapping.type) ? mapping.type : mapping.type ? [mapping.type] : []
    if (types.length && types.every(isUri)) {
      entries.push(makeTypeEntry({
        key: "type",
        keyPrefix: `mapping-${index}-`,
        label: t("mappingType"),
        values: types,
      }))
    } else if (mapping.type !== undefined) {
      entries.push(makeEntry({
        key: "type",
        keyPrefix: `mapping-${index}-`,
        label: t("mappingType"),
        value: mapping.type,
      }))
    }
    entries.push(...entriesForBundle(mapping.from, "from", index))
    entries.push(...entriesForBundle(mapping.to, "to", index))
    const metadata = Object.fromEntries(Object.entries(mapping)
      .filter(([key]) => !["from", "to", "type"].includes(key)))
    entries.push(...entriesForFields(metadata, { keyPrefix: `mapping-${index}-metadata-` }))
    return entries
  })
}

function entriesForFields(value, {
  keyPrefix = "",
  labelPrefix = null,
  statementFields = false,
} = {}) {
  if (!isObject(value)) {
    return []
  }
  const entries = []
  for (const [key, fieldValue] of Object.entries(value)) {
    if (key === "resource" && statementFields) {
      // Resource properties are rendered separately from statement qualifiers.
      continue
    }
    const propertyName = propertyLabel(key)
    const fieldLabel = labelPrefix
      ? `${labelPrefix}: ${propertyName}`
      : propertyName

    // Qualified properties map each property URI to its statement array.
    if (key.startsWith("qualified") && isObject(fieldValue)) {
      for (const [propertyUri, statements] of Object.entries(fieldValue)) {
        for (const [index, statement] of (statements || []).entries()) {
          const qualifiedPropertyName = resolution.label(propertyUri)
          const qualifiedStatement = key === "qualifiedRelations" && isObject(statement?.resource)
          entries.push(makeEntry({
            index,
            itemCount: statements.length,
            key: `${key}-${propertyUri}`,
            keyPrefix,
            label: qualifiedPropertyName,
            navigationIncludesValue: qualifiedStatement,
            propertyUri,
            qualifiedStatement,
            value: statement,
          }))
        }
      }
      continue
    }

    if (Array.isArray(fieldValue)) {
      if (!fieldValue.length) {
        entries.push(makeEntry({ key, keyPrefix, label: fieldLabel, value: null }))
      } else if (isMappingList(fieldValue)) {
        entries.push(makeEntry({
          key,
          keyPrefix,
          label: fieldLabel,
          navigationBase: fieldLabel,
          value: fieldValue,
        }))
      } else if (key === "type" && fieldValue.every(isUri)) {
        // Type URIs share one row while retaining their individual links.
        entries.push(makeTypeEntry({ key, keyPrefix, label: fieldLabel, values: fieldValue }))
      } else {
        fieldValue.forEach((item, index) => entries.push(makeEntry({
          index,
          itemCount: fieldValue.length,
          key,
          keyPrefix,
          label: fieldLabel,
          navigationBase: key === "source"
            ? `${statementFields ? `${t("statement")}: ` : ""}${t("sourceItem")}`
            : fieldLabel,
          value: item,
        })))
      }
      continue
    }

    entries.push(makeEntry({ key, keyPrefix, label: fieldLabel, value: fieldValue }))
  }
  return entries
}

function entriesForObject(value, { qualifiedStatement = false } = {}) {
  if (isMappingList(value)) {
    return entriesForMappings(value)
  }
  if (!qualifiedStatement || !isObject(value?.resource)) {
    return entriesForFields(value)
  }

  const resourceEntries = entriesForFields(value.resource, {
    keyPrefix: "resource-",
  })
  const statementEntries = entriesForFields(value, {
    keyPrefix: "statement-",
    statementFields: true,
  })

  return [
    ...resourceEntries,
    ...(statementEntries.length ? [{
      key: "statement-heading",
      label: t("statement"),
      statementHeading: true,
    }] : []),
    ...statementEntries,
  ]
}

const entries = computed(() => entriesForObject(current.value, {
  qualifiedStatement: currentNode.value?.qualifiedStatement,
}))

// Prefetch labels for the current view, including property URIs and mapping members.
function collectResolvable(value) {
  const values = []
  if (!isObject(value)) {
    return values
  }
  if (isMappingList(value)) {
    return value.flatMap(mapping => [
      ...collectResolvable(mapping),
      ...collectResolvable(mapping.from),
      ...collectResolvable(mapping.to),
    ])
  }
  for (const [key, fieldValue] of Object.entries(value)) {
    if (isUri(key)) {
      values.push(key)
    }
    const fields = Array.isArray(fieldValue) ? fieldValue : [fieldValue]
    for (const field of fields) {
      if (isUri(field) || field?.uri) {
        values.push(field)
      }
    }
    if (key.startsWith("qualified") && isObject(fieldValue)) {
      values.push(...Object.keys(fieldValue))
    }
  }
  return values
}

watch(currentNode, node => {
  const values = collectResolvable(node?.value)
  if (node?.qualifiedStatement) {
    values.push(...collectResolvable(node.value?.resource))
  }
  resolution.prefetch(values)
}, { immediate: true })

function contextValue(value, qualifiedStatement) {
  return qualifiedStatement && isObject(value?.resource) ? value.resource : value
}

function isInPath(entry) {
  // Qualified statements with qualifiers use object identity: distinct statements
  // may reference the same resource. Resource-only repetitions still use their
  // object or URI identity to stop genuine navigation cycles.
  if (entry.qualifiedStatement
    && isObject(entry.value)
    && Object.keys(entry.value).some(key => key !== "resource")) {
    return path.value.some(node => node.value === entry.value)
  }
  const value = contextValue(entry.value, entry.qualifiedStatement)
  if (!isObject(value)) {
    return false
  }
  return path.value.some(node => {
    const nodeValue = contextValue(node.value, node.qualifiedStatement)
    return nodeValue === value || (value.uri && nodeValue?.uri === value.uri)
  })
}

// Keep keyboard focus in the inspector when its navigation context changes.
function focusInspector() {
  nextTick(() => inspector.value?.focus())
}

function navigate(entry) {
  if (!entry.navigable || isInPath(entry)) {
    return
  }
  path.value.push({
    label: entry.navigationLabel,
    qualifiedStatement: entry.qualifiedStatement,
    value: entry.value,
  })
  focusInspector()
}

function goTo(index) {
  path.value = path.value.slice(0, index + 1)
  focusInspector()
}
</script>

<template>
  <section
    :id="id"
    ref="inspector"
    class="jskos-vue-qualifiedStatements-inspector"
    tabindex="-1"
    :aria-label="`${t('details')}: ${currentLabel}`">
    <div class="jskos-vue-qualifiedStatements-inspectorHeader">
      <nav
        class="jskos-vue-qualifiedStatements-breadcrumb"
        :aria-label="t('breadcrumb')">
        <ol>
          <li
            v-for="(entry, index) in path"
            :key="index">
            <button
              v-if="index < path.length - 1"
              type="button"
              @click="goTo(index)">
              {{ entry.label }}
            </button>
            <span
              v-else
              aria-current="page">
              {{ entry.label }}
            </span>
          </li>
        </ol>
      </nav>
      <button
        type="button"
        class="jskos-vue-qualifiedStatements-close"
        @click="ui.closeInspector()">
        {{ t("close") }}
      </button>
    </div>

    <dl class="jskos-vue-qualifiedStatements-inspectorList">
      <div
        v-for="entry in entries"
        :key="entry.key"
        :class="{
          'jskos-vue-qualifiedStatements-inspectorRow': true,
          'jskos-vue-qualifiedStatements-mappingHeading': entry.mappingHeading,
          'jskos-vue-qualifiedStatements-statementHeading': entry.statementHeading,
        }">
        <dt>
          <AutoLink
            v-if="entry.propertyUri"
            :href="entry.propertyUri"
            :text="entry.label" />
          <template v-else>
            {{ entry.label }}
          </template>
        </dt>
        <dd class="jskos-vue-qualifiedStatements-inspectorValue">
          <span
            v-if="entry.languageMapValues"
            class="jskos-vue-qualifiedStatements-languageMap">
            <span
              v-for="(item, index) in entry.languageMapValues"
              :key="`${item.language}-${index}`"
              class="jskos-vue-qualifiedStatements-languageMapValue">
              <span :lang="item.language">{{ item.text }}</span>
              <small class="jskos-vue-qualifiedStatements-languageMapLanguage">
                ({{ item.language }})
              </small>
            </span>
          </span>
          <component
            :is="entry.memberList"
            v-else-if="entry.memberList"
            class="jskos-vue-qualifiedStatements-mappingMembers">
            <li
              v-for="item in entry.items"
              :key="item.key">
              <AutoLink
                v-if="item.linkUri"
                :href="item.linkUri"
                :text="item.text" />
              <template v-else>
                {{ item.text }}
              </template>
              <button
                v-if="item.navigable && !isInPath(item)"
                type="button"
                class="jskos-vue-qualifiedStatements-navigate"
                :aria-label="`${t('navigateTo')}: ${item.text}`"
                @click="navigate(item)">
                <Arrow
                  aria-hidden="true"
                  direction="right" />
              </button>
              <span
                v-else-if="item.navigable"
                class="jskos-vue-qualifiedStatements-cycle">
                {{ t("alreadyInPath") }}
              </span>
            </li>
          </component>
          <template v-else-if="entry.items">
            <span
              v-for="(item, index) in entry.items"
              :key="item.key">
              <template v-if="index">, </template>
              <AutoLink
                v-if="item.linkUri"
                :href="item.linkUri"
                :text="item.text" />
              <template v-else>
                {{ item.text }}
              </template>
              <button
                v-if="item.navigable && !isInPath(item)"
                type="button"
                class="jskos-vue-qualifiedStatements-navigate"
                :aria-label="`${t('navigateTo')}: ${item.text}`"
                @click="navigate(item)">
                <Arrow
                  aria-hidden="true"
                  direction="right" />
              </button>
              <span
                v-else-if="item.navigable"
                class="jskos-vue-qualifiedStatements-cycle">
                {{ t("alreadyInPath") }}
              </span>
            </span>
          </template>
          <template v-else>
            <AutoLink
              v-if="entry.linkUri"
              :href="entry.linkUri"
              :title="entry.fullUri || undefined"
              :text="entry.text" />
            <span v-else>{{ entry.text }}</span>
          </template>
          <button
            v-if="entry.navigable && !isInPath(entry)"
            type="button"
            class="jskos-vue-qualifiedStatements-navigate"
            :aria-label="`${t('navigateTo')}: ${entry.text}`"
            @click="navigate(entry)">
            <Arrow
              aria-hidden="true"
              direction="right" />
          </button>
          <span
            v-else-if="entry.navigable"
            class="jskos-vue-qualifiedStatements-cycle">
            {{ t("alreadyInPath") }}
          </span>
        </dd>
      </div>
    </dl>
  </section>
</template>
