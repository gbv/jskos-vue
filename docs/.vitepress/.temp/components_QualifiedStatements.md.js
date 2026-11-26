import { reactive, computed, unref, inject, ref, watch, mergeProps, createVNode, resolveDynamicComponent, withCtx, openBlock, createBlock, Fragment, renderList, createTextVNode, toDisplayString, createCommentVNode, nextTick, useSSRContext, provide, useId } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderVNode, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _sfc_main$a } from './LoadingIndicator.e8vfq6Bx.js';
import { _ as _sfc_main$8 } from './AutoLink.BuusOaCI.js';
import { _ as _sfc_main$9 } from './Arrow.C-ZbZRg0.js';
import { _ as _sfc_main$7 } from './RemoveIcon.CI4k6I8F.js';
import { a as useLocale, u as useContentLanguage } from './utils.Br9Zv_eu.js';
/* empty css                */
import 'jskos-tools';

const namespace = "jskosVue.qualifiedStatements";
const namespacedKey = key => `${namespace}.${key}`;

// useLocale reads local fallbacks by exact key, so dotted keys stay flat here.
function namespaced(messages) {
  return Object.fromEntries(Object.entries(messages)
    .map(([key, value]) => [namespacedKey(key), value]))
}

const messages = {
  en: namespaced({
    altLabel: "Alternative labels",
    alternatives: "alternatives",
    alreadyInPath: "Already in this path",
    breadcrumb: "Breadcrumb",
    changeNote: "Change note",
    close: "Close",
    date: "Date",
    definition: "Definition",
    deprecated: "Deprecated",
    details: "Details",
    editorialNote: "Editorial note",
    endDate: "End date",
    example: "Example",
    false: "No",
    from: "From",
    hiddenLabel: "Hidden labels",
    hideDetails: "Hide details",
    historyNote: "History note",
    language: "Language",
    literal: "Literal",
    mapping: "Mapping",
    mappings: "Mappings",
    mappingType: "Type",
    memberSet: "Members",
    navigateTo: "Open",
    note: "Note",
    notation: "Notation",
    ordered: "ordered",
    place: "Place",
    preferred: "Preferred",
    prefLabel: "Preferred labels",
    qualifiedDates: "Qualified dates",
    qualifiedLiterals: "Qualified literals",
    qualifiedRelations: "Qualified relations",
    rank: "Rank",
    resource: "Resource",
    scopeNote: "Scope note",
    set: "set",
    showDetails: "Show details",
    source: "Sources",
    sourceItem: "Source",
    startDate: "Start date",
    statement: "Statement",
    string: "Value",
    title: "Additional details",
    to: "To",
    true: "Yes",
    type: "Types",
    unnamedValue: "Unnamed value",
    uri: "URI",
    url: "URL",
  }),
  de: namespaced({
    altLabel: "Alternative Benennungen",
    alternatives: "Alternativen",
    alreadyInPath: "Bereits in diesem Pfad",
    breadcrumb: "Navigationspfad",
    changeNote: "Änderungsnotiz",
    close: "Schließen",
    date: "Datum",
    definition: "Definition",
    deprecated: "Veraltet",
    details: "Details",
    editorialNote: "Redaktionelle Anmerkung",
    endDate: "Enddatum",
    example: "Beispiel",
    false: "Nein",
    from: "Von",
    hiddenLabel: "Verborgene Benennungen",
    hideDetails: "Details ausblenden",
    historyNote: "Historische Anmerkung",
    language: "Sprache",
    literal: "Literal",
    mapping: "Mapping",
    mappings: "Mappings",
    mappingType: "Typ",
    memberSet: "Mitglieder",
    navigateTo: "Öffnen",
    note: "Anmerkung",
    notation: "Notation",
    ordered: "geordnet",
    place: "Ort",
    preferred: "Bevorzugt",
    prefLabel: "Bevorzugte Benennungen",
    qualifiedDates: "Qualifizierte Datumsangaben",
    qualifiedLiterals: "Qualifizierte Literale",
    qualifiedRelations: "Qualifizierte Relationen",
    rank: "Rang",
    resource: "Ressource",
    scopeNote: "Anwendungsbereich",
    set: "Menge",
    showDetails: "Details anzeigen",
    source: "Quellen",
    sourceItem: "Quelle",
    startDate: "Startdatum",
    statement: "Aussage",
    string: "Wert",
    title: "Zusätzliche Details",
    to: "Nach",
    true: "Ja",
    type: "Typen",
    unnamedValue: "Unbenannter Wert",
    uri: "URI",
    url: "URL",
  }),
};

function useQualifiedStatementsLocale() {
  const locale = useLocale(messages);

  return {
    ...locale,
    t(key) {
      const fullKey = namespacedKey(key);
      const translated = locale.t(fullKey);

      // Preserve the existing fallback for dynamic, unknown JSKOS properties.
      return translated === fullKey ? key : translated
    },
  }
}

const uriResolutionKey = Symbol("jskos-vue-uri-resolution");
const qualifiedStatementsUiKey = Symbol("jskos-vue-qualified-statements-ui");

function uriOf(value) {
  return typeof value === "string" ? value : value?.uri
}

/**
 * Resolve URI labels for Qualified Statements without depending on a specific
 * registry. One instance is shared with nested statements through provide/inject.
 */
function useUriResolution({ resolve, labelForUri, language } = {}) {
  // These objects are reactive so labels and loading indicators update after a
  // resolver request finishes.
  const cache = reactive({});
  const loading = reactive({});
  const { prefLabel: contentPrefLabel } = useContentLanguage();

  function shorten(uri) {
    try {
      const url = new URL(uri);
      const host = url.hostname.replace(/^www\./, "");
      const segments = url.pathname.split("/").filter(Boolean);
      const path = segments.length > 2 ? `/…/${segments.at(-1)}` : `/${segments.join("/")}`;
      return (host + path + url.hash).replace(/\/$/, "")
    } catch {
      return uri
    }
  }

  const fmtRange = (start, end) => (start || end) ? `${start || "…"}–${end || "…"}` : "";

  function prefLabel(resource) {
    if (!resource) {
      return ""
    }
    return contentPrefLabel(resource, {
      fallbackToUri: false,
      language: unref(language),
    }) || ""
  }

  function customLabel(uri) {
    if (!uri) {
      return ""
    }
    const getLabel = unref(labelForUri);
    return typeof getLabel === "function" ? getLabel(uri) : ""
  }

  async function ensure(value) {
    const uri = uriOf(value);
    if (!uri) {
      return
    }

    // Cache embedded data, but do not replace it with a URI-only reference.
    if (typeof value === "object"
      && (!cache[uri] || Object.keys(value).some(key => key !== "uri"))) {
      cache[uri] = value;
    }
    // A local label or an embedded/cached prefLabel is already sufficient.
    // loading also prevents duplicate requests for the same URI.
    if (customLabel(uri) || prefLabel(cache[uri]) || loading[uri]) {
      return cache[uri]
    }

    const resolver = unref(resolve);
    if (typeof resolver !== "function") {
      return cache[uri]
    }

    loading[uri] = true;
    try {
      const resource = await resolver(uri);
      if (resource
        && (!cache[uri] || Object.keys(resource).some(key => key !== "uri"))) {
        cache[uri] = resource;
      }
      return resource
    } catch {
      // Resolution failures are non-fatal: label() can still use the URI fallback.
    } finally {
      loading[uri] = false;
    }
  }

  function prefetch(values) {
    return Promise.all((values || []).map(ensure))
  }

  function label(value) {
    const uri = uriOf(value);
    const resource = typeof value === "object" ? value : cache[uri];
    // Application labels take precedence, followed by embedded and resolved
    // JSKOS labels. A shortened URI is the final offline/error fallback.
    return customLabel(uri) || prefLabel(resource) || prefLabel(cache[uri]) || shorten(uri || "")
  }

  const anyLoading = computed(() => Object.values(loading).some(Boolean));

  return { cache, loading, anyLoading, ensure, prefetch, label, shorten, fmtRange }
}

const _sfc_main$6 = {
  __name: 'QualifiedStatementInspector',
  __ssrInlineRender: true,
  props: {
  id: { type: String, required: true },
  statement: { type: Object, required: true },
  title: { type: String, required: true },
},
  setup(__props) {

const props = __props;

const resolution = inject(uriResolutionKey);
const ui = inject(qualifiedStatementsUiKey);
const inspector = ref(null);
const path = ref([]);
const { t } = useQualifiedStatementsLocale();

// The inspector converts the current JSKOS object into display entries instead
// of exposing its raw structure. A path of resources and qualified statements
// drives both the current view and breadcrumbs. Statements retain their own
// identity because several statements can qualify the same resource differently.
function resetPath() {
  path.value = [{
    label: props.title,
    qualifiedStatement: isObject(props.statement.resource),
    value: props.statement,
  }];
}

watch(() => props.statement, resetPath, { immediate: true });

const current = computed(() => path.value.at(-1)?.value);
const currentNode = computed(() => path.value.at(-1));
const currentLabel = computed(() => path.value.at(-1)?.label || props.title);

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
  const translated = t(key);
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
  const indexedLabel = itemCount > 1 ? `${label} ${index + 1}` : label;
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
  const languageMap = isLanguageMap(key, value);
  const localizedValues = languageMap ? languageMapValues(value) : null;
  const literal = isLiteral(value);
  const compactUri = ["uri", "url"].includes(key) && isUri(value);
  // URI-only objects are terminal links, not useful navigation levels.
  const navigable = isObject(value)
    && !languageMap
    && !literal
    && Object.keys(value).some(field => !["uri", "url"].includes(field));
  let text;
  if (compactUri) {
    text = resolution.shorten(value);
  } else if (languageMap) {
    text = localizedValues[0]?.text || "";
  } else if (literal) {
    text = `${value.string}${value.language ? ` [${value.language}]` : ""}`;
  } else if (isObject(value)) {
    text = objectLabel(value, label, index);
  } else if (isUri(value)) {
    text = resolution.label(value);
  } else {
    text = scalarText(value);
  }
  const linkUri = isObject(value) ? value.uri || value.url : isUri(value) ? value : null;
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
const bundleTypes = ["memberSet", "memberChoice", "memberList"];

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
  };
  return `${t(side)} (${semantics[bundleType]})`
}

function entriesForBundle(bundle, side, mappingIndex) {
  if (!isObject(bundle)) {
    return []
  }
  const entries = [];
  for (const bundleType of bundleTypes) {
    if (!Array.isArray(bundle[bundleType])) {
      continue
    }
    const label = bundleLabel(side, bundleType);
    const concepts = bundle[bundleType];
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
    });
  }
  const metadata = Object.fromEntries(Object.entries(bundle)
    .filter(([key]) => !bundleTypes.includes(key)));
  entries.push(...entriesForFields(metadata, {
    keyPrefix: `mapping-${mappingIndex}-${side}-metadata-`,
    labelPrefix: t(side),
  }));
  return entries
}

// Expand mapping sides so bundle semantics and mapping metadata remain visible.
function entriesForMappings(mappings) {
  return mappings.flatMap((mapping, index) => {
    const entries = [{
      key: `mapping-${index}-heading`,
      label: `${t("mapping")} ${index + 1}`,
      mappingHeading: true,
    }];
    const types = Array.isArray(mapping.type) ? mapping.type : mapping.type ? [mapping.type] : [];
    if (types.length && types.every(isUri)) {
      entries.push(makeTypeEntry({
        key: "type",
        keyPrefix: `mapping-${index}-`,
        label: t("mappingType"),
        values: types,
      }));
    } else if (mapping.type !== undefined) {
      entries.push(makeEntry({
        key: "type",
        keyPrefix: `mapping-${index}-`,
        label: t("mappingType"),
        value: mapping.type,
      }));
    }
    entries.push(...entriesForBundle(mapping.from, "from", index));
    entries.push(...entriesForBundle(mapping.to, "to", index));
    const metadata = Object.fromEntries(Object.entries(mapping)
      .filter(([key]) => !["from", "to", "type"].includes(key)));
    entries.push(...entriesForFields(metadata, { keyPrefix: `mapping-${index}-metadata-` }));
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
  const entries = [];
  for (const [key, fieldValue] of Object.entries(value)) {
    if (key === "resource" && statementFields) {
      // Resource properties are rendered separately from statement qualifiers.
      continue
    }
    const propertyName = propertyLabel(key);
    const fieldLabel = labelPrefix
      ? `${labelPrefix}: ${propertyName}`
      : propertyName;

    // Qualified properties map each property URI to its statement array.
    if (key.startsWith("qualified") && isObject(fieldValue)) {
      for (const [propertyUri, statements] of Object.entries(fieldValue)) {
        for (const [index, statement] of (statements || []).entries()) {
          const qualifiedPropertyName = resolution.label(propertyUri);
          const qualifiedStatement = key === "qualifiedRelations" && isObject(statement?.resource);
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
          }));
        }
      }
      continue
    }

    if (Array.isArray(fieldValue)) {
      if (!fieldValue.length) {
        entries.push(makeEntry({ key, keyPrefix, label: fieldLabel, value: null }));
      } else if (isMappingList(fieldValue)) {
        entries.push(makeEntry({
          key,
          keyPrefix,
          label: fieldLabel,
          navigationBase: fieldLabel,
          value: fieldValue,
        }));
      } else if (key === "type" && fieldValue.every(isUri)) {
        // Type URIs share one row while retaining their individual links.
        entries.push(makeTypeEntry({ key, keyPrefix, label: fieldLabel, values: fieldValue }));
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
        })));
      }
      continue
    }

    entries.push(makeEntry({ key, keyPrefix, label: fieldLabel, value: fieldValue }));
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
  });
  const statementEntries = entriesForFields(value, {
    keyPrefix: "statement-",
    statementFields: true,
  });

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
}));

const entryGroups = computed(() => {
  const groups = [];
  for (const entry of entries.value) {
    if (entry.mappingHeading || entry.statementHeading) {
      groups.push({ heading: entry, entries: [] });
      continue
    }
    if (!groups.length) {
      groups.push({ heading: null, entries: [] });
    }
    groups.at(-1).entries.push(entry);
  }
  return groups
});

// Prefetch labels for the current view, including property URIs and mapping members.
function collectResolvable(value) {
  const values = [];
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
      values.push(key);
    }
    const fields = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
    for (const field of fields) {
      if (isUri(field) || field?.uri) {
        values.push(field);
      }
    }
    if (key.startsWith("qualified") && isObject(fieldValue)) {
      values.push(...Object.keys(fieldValue));
    }
  }
  return values
}

watch(currentNode, node => {
  const values = collectResolvable(node?.value);
  if (node?.qualifiedStatement) {
    values.push(...collectResolvable(node.value?.resource));
  }
  resolution.prefetch(values);
}, { immediate: true });

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
  const value = contextValue(entry.value, entry.qualifiedStatement);
  if (!isObject(value)) {
    return false
  }
  return path.value.some(node => {
    const nodeValue = contextValue(node.value, node.qualifiedStatement);
    return nodeValue === value || (value.uri && nodeValue?.uri === value.uri)
  })
}

// Keep keyboard focus in the inspector when its navigation context changes.
function focusInspector() {
  nextTick(() => inspector.value?.focus());
}

function navigate(entry) {
  if (!entry.navigable || isInPath(entry)) {
    return
  }
  path.value.push({
    label: entry.navigationLabel,
    qualifiedStatement: entry.qualifiedStatement,
    value: entry.value,
  });
  focusInspector();
}

return (_ctx, _push, _parent, _attrs) => {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: __props.id,
    ref_key: "inspector",
    ref: inspector,
    class: "jskos-vue-qualifiedStatements-inspector",
    tabindex: "-1",
    "aria-label": `${unref(t)('details')}: ${currentLabel.value}`
  }, _attrs))}><div class="jskos-vue-qualifiedStatements-inspectorHeader">`);
  if (path.value.length > 1) {
    _push(`<nav class="jskos-vue-qualifiedStatements-breadcrumb"${ssrRenderAttr("aria-label", unref(t)('breadcrumb'))}><ol><!--[-->`);
    ssrRenderList(path.value, (entry, index) => {
      _push(`<li>`);
      if (index < path.value.length - 1) {
        _push(`<button type="button">${ssrInterpolate(entry.label)}</button>`);
      } else {
        _push(`<span aria-current="page">${ssrInterpolate(entry.label)}</span>`);
      }
      _push(`</li>`);
    });
    _push(`<!--]--></ol></nav>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_sfc_main$7, {
    class: "jskos-vue-qualifiedStatements-close",
    "aria-label": unref(t)('close'),
    onClick: $event => (unref(ui).closeInspector())
  }, null, _parent));
  _push(`</div><!--[-->`);
  ssrRenderList(entryGroups.value, (group) => {
    _push(`<!--[-->`);
    if (group.heading) {
      _push(`<h3 class="${
        ssrRenderClass({
          'jskos-vue-qualifiedStatements-mappingHeading': group.heading.mappingHeading,
          'jskos-vue-qualifiedStatements-statementHeading': group.heading.statementHeading,
        })
      }">${
        ssrInterpolate(group.heading.label)
      }</h3>`);
    } else {
      _push(`<!---->`);
    }
    _push(`<dl class="jskos-vue-qualifiedStatements-inspectorList"><!--[-->`);
    ssrRenderList(group.entries, (entry) => {
      _push(`<div class="jskos-vue-qualifiedStatements-inspectorRow"><dt>`);
      if (entry.propertyUri) {
        _push(ssrRenderComponent(_sfc_main$8, {
          href: entry.propertyUri,
          text: entry.label
        }, null, _parent));
      } else {
        _push(`<!--[-->${ssrInterpolate(entry.label)}<!--]-->`);
      }
      _push(`</dt><dd class="jskos-vue-qualifiedStatements-inspectorValue">`);
      if (entry.languageMapValues) {
        _push(`<span class="jskos-vue-qualifiedStatements-languageMap"><!--[-->`);
        ssrRenderList(entry.languageMapValues, (item, index) => {
          _push(`<span class="jskos-vue-qualifiedStatements-languageMapValue"><span${
            ssrRenderAttr("lang", item.language)
          }>${
            ssrInterpolate(item.text)
          }</span><small class="jskos-vue-qualifiedStatements-languageMapLanguage"> (${
            ssrInterpolate(item.language)
          }) </small></span>`);
        });
        _push(`<!--]--></span>`);
      } else if (entry.memberList) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(entry.memberList), { class: "jskos-vue-qualifiedStatements-mappingMembers" }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(`<!--[-->`);
              ssrRenderList(entry.items, (item) => {
                _push(`<li${_scopeId}>`);
                if (item.linkUri) {
                  _push(ssrRenderComponent(_sfc_main$8, {
                    href: item.linkUri,
                    text: item.text
                  }, null, _parent, _scopeId));
                } else {
                  _push(`<!--[-->${ssrInterpolate(item.text)}<!--]-->`);
                }
                if (item.navigable && !isInPath(item)) {
                  _push(`<button type="button" class="jskos-vue-qualifiedStatements-navigate"${
                    ssrRenderAttr("aria-label", `${unref(t)('navigateTo')}: ${item.text}`)
                  }${
                    _scopeId
                  }>`);
                  _push(ssrRenderComponent(_sfc_main$9, {
                    "aria-hidden": "true",
                    direction: "right"
                  }, null, _parent, _scopeId));
                  _push(`</button>`);
                } else if (item.navigable) {
                  _push(`<span class="jskos-vue-qualifiedStatements-cycle"${
                    _scopeId
                  }>${
                    ssrInterpolate(unref(t)("alreadyInPath"))
                  }</span>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</li>`);
              });
              _push(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(entry.items, (item) => {
                  return (openBlock(), createBlock("li", {
                    key: item.key
                  }, [
                    (item.linkUri)
                      ? (openBlock(), createBlock(_sfc_main$8, {
                          key: 0,
                          href: item.linkUri,
                          text: item.text
                        }, null, 8, ["href", "text"]))
                      : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode(toDisplayString(item.text), 1)
                        ], 64)),
                    (item.navigable && !isInPath(item))
                      ? (openBlock(), createBlock("button", {
                          key: 2,
                          type: "button",
                          class: "jskos-vue-qualifiedStatements-navigate",
                          "aria-label": `${unref(t)('navigateTo')}: ${item.text}`,
                          onClick: $event => (navigate(item))
                        }, [
                          createVNode(_sfc_main$9, {
                            "aria-hidden": "true",
                            direction: "right"
                          })
                        ], 8, ["aria-label", "onClick"]))
                      : (item.navigable)
                        ? (openBlock(), createBlock("span", {
                            key: 3,
                            class: "jskos-vue-qualifiedStatements-cycle"
                          }, toDisplayString(unref(t)("alreadyInPath")), 1))
                        : createCommentVNode("", true)
                  ]))
                }), 128))
              ]
            }
          }),
          _: 2
        }), _parent);
      } else if (entry.items) {
        _push(`<span><!--[-->`);
        ssrRenderList(entry.items, (item, index) => {
          _push(`<!--[-->`);
          if (index) {
            _push(`<!--[-->, <!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (item.linkUri) {
            _push(ssrRenderComponent(_sfc_main$8, {
              href: item.linkUri,
              text: item.text
            }, null, _parent));
          } else {
            _push(`<!--[-->${ssrInterpolate(item.text)}<!--]-->`);
          }
          if (item.navigable && !isInPath(item)) {
            _push(`<button type="button" class="jskos-vue-qualifiedStatements-navigate"${ssrRenderAttr("aria-label", `${unref(t)('navigateTo')}: ${item.text}`)}>`);
            _push(ssrRenderComponent(_sfc_main$9, {
              "aria-hidden": "true",
              direction: "right"
            }, null, _parent));
            _push(`</button>`);
          } else if (item.navigable) {
            _push(`<span class="jskos-vue-qualifiedStatements-cycle">${ssrInterpolate(unref(t)("alreadyInPath"))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></span>`);
      } else {
        _push(`<!--[-->`);
        if (entry.linkUri) {
          _push(ssrRenderComponent(_sfc_main$8, {
            href: entry.linkUri,
            title: entry.fullUri || undefined,
            text: entry.text
          }, null, _parent));
        } else {
          _push(`<span>${ssrInterpolate(entry.text)}</span>`);
        }
        _push(`<!--]-->`);
      }
      if (entry.navigable && !isInPath(entry)) {
        _push(`<button type="button" class="jskos-vue-qualifiedStatements-navigate"${ssrRenderAttr("aria-label", `${unref(t)('navigateTo')}: ${entry.text}`)}>`);
        _push(ssrRenderComponent(_sfc_main$9, {
          "aria-hidden": "true",
          direction: "right"
        }, null, _parent));
        _push(`</button>`);
      } else if (entry.navigable) {
        _push(`<span class="jskos-vue-qualifiedStatements-cycle">${ssrInterpolate(unref(t)("alreadyInPath"))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</dd></div>`);
    });
    _push(`<!--]--></dl><!--]-->`);
  });
  _push(`<!--]--></section>`);
}
}

};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/QualifiedStatementInspector.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : undefined
};

const _sfc_main$5 = {
  __name: 'QualifiedStatement',
  __ssrInlineRender: true,
  props: {
  statement: { type: Object, required: true },
  statementId: { type: String, required: true },
  kind: {
    type: String,
    required: true,
    validator: value => ["relation", "literal", "date"].includes(value),
  },
},
  setup(__props) {

const props = __props;

const resolution = inject(uriResolutionKey);
const ui = inject(qualifiedStatementsUiKey);
const { t } = useQualifiedStatementsLocale();

const resource = computed(() => props.statement.resource);
const primaryUri = computed(() => {
  if (props.kind === "relation") {
    return resource.value?.uri || resource.value?.url
  }
  if (props.kind === "literal") {
    return props.statement.uri
  }
  return null
});
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
});
const language = computed(() => props.kind === "literal" ? props.statement.literal?.language : null);
const expanded = computed(() => ui.activeStatementId.value === props.statementId);
const controlsId = computed(() => ui.inspectorId(props.statementId));

function hasAdditionalKeys(value, excluded) {
  return value && typeof value === "object" && Object.keys(value)
    .some(key => !excluded.includes(key) && !key.startsWith("_"))
}

const hasDetails = computed(() => {
  const common = ["rank", "startDate", "endDate"];
  if (props.kind === "relation") {
    return hasAdditionalKeys(props.statement, [...common, "resource"])
      || hasAdditionalKeys(resource.value, ["uri"])
  }
  if (props.kind === "literal") {
    return hasAdditionalKeys(props.statement, [...common, "literal", "uri"])
  }
  return hasAdditionalKeys(props.statement, [...common, "date"])
});

return (_ctx, _push, _parent, _attrs) => {
  _push(`<li${ssrRenderAttrs(mergeProps({
    class: `jskos-vue-qualifiedStatements-rank-${__props.statement.rank || 'normal'}`
  }, _attrs))}><div class="jskos-vue-qualifiedStatements-row"><div class="jskos-vue-qualifiedStatements-primary">`);
  if (primaryUri.value) {
    _push(ssrRenderComponent(_sfc_main$8, {
      href: primaryUri.value,
      text: primaryLabel.value
    }, null, _parent));
  } else {
    _push(`<span${
      ssrRenderAttr("lang", language.value || undefined)
    }>${
      ssrInterpolate(primaryLabel.value)
    }`);
    if (language.value) {
      _push(`<sup>${ssrInterpolate(language.value)}</sup>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</span>`);
  }
  if (__props.statement.startDate || __props.statement.endDate) {
    _push(`<small class="jskos-vue-qualifiedStatements-range">${ssrInterpolate(unref(resolution).fmtRange(__props.statement.startDate, __props.statement.endDate))}</small>`);
  } else {
    _push(`<!---->`);
  }
  if (__props.statement.rank === 'preferred' || __props.statement.rank === 'deprecated') {
    _push(`<small class="jskos-vue-qualifiedStatements-rank">${ssrInterpolate(unref(t)(__props.statement.rank))}</small>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if (hasDetails.value) {
    _push(`<button type="button" class="jskos-vue-qualifiedStatements-disclosure"${
      ssrRenderAttr("aria-label", `${expanded.value ? unref(t)('hideDetails') : unref(t)('showDetails')}: ${primaryLabel.value}`)
    }${
      ssrRenderAttr("aria-expanded", expanded.value)
    }${
      ssrRenderAttr("aria-controls", controlsId.value)
    }>`);
    _push(ssrRenderComponent(_sfc_main$9, {
      "aria-hidden": "true",
      direction: expanded.value ? 'down' : 'right'
    }, null, _parent));
    _push(`</button>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
  if (expanded.value) {
    _push(ssrRenderComponent(_sfc_main$6, {
      id: controlsId.value,
      statement: __props.statement,
      title: primaryLabel.value
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</li>`);
}
}

};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/QualifiedStatement.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined
};

const _sfc_main$4 = {
  __name: 'QualifiedRelations',
  __ssrInlineRender: true,
  props: {
  relations: { type: Object, required: true },
},
  setup(__props) {

const props = __props;

const resolution = inject(uriResolutionKey);

function collectResources() {
  const resources = [];
  for (const [propertyUri, statements] of Object.entries(props.relations || {})) {
    resources.push(propertyUri);
    for (const statement of statements || []) {
      if (statement.resource) {
        resources.push(statement.resource);
      }
    }
  }
  return resources
}

watch(
  () => props.relations,
  () => resolution.prefetch(collectResources()),
  { immediate: true, deep: true },
);

return (_ctx, _push, _parent, _attrs) => {
  _push(`<ul${ssrRenderAttrs(mergeProps({ class: "jskos-vue-qualifiedStatements-tree" }, _attrs))}><!--[-->`);
  ssrRenderList(__props.relations, (statements, propertyUri, propertyIndex) => {
    _push(`<li class="jskos-vue-qualifiedStatements-branch"><div class="jskos-vue-qualifiedStatements-property">`);
    _push(ssrRenderComponent(_sfc_main$8, {
      href: propertyUri,
      text: unref(resolution).label(propertyUri)
    }, null, _parent));
    _push(`</div><ul class="jskos-vue-qualifiedStatements-values"><!--[-->`);
    ssrRenderList(statements, (statement, index) => {
      _push(ssrRenderComponent(_sfc_main$5, {
        key: `${propertyUri}-${index}`,
        kind: "relation",
        statement: statement,
        "statement-id": `relation-${propertyIndex}-${index}`
      }, null, _parent));
    });
    _push(`<!--]--></ul></li>`);
  });
  _push(`<!--]--></ul>`);
}
}

};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/QualifiedRelations.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined
};

const _sfc_main$3 = {
  __name: 'QualifiedLiterals',
  __ssrInlineRender: true,
  props: {
  literals: { type: Object, required: true },
},
  setup(__props) {

const props = __props;

const resolution = inject(uriResolutionKey);

function collectResources() {
  const resources = [];
  for (const [propertyUri, statements] of Object.entries(props.literals || {})) {
    resources.push(propertyUri);
    for (const statement of statements || []) {
      if (statement.uri) {
        resources.push(statement.uri);
      }
    }
  }
  return resources
}

watch(
  () => props.literals,
  () => resolution.prefetch(collectResources()),
  { immediate: true, deep: true },
);

return (_ctx, _push, _parent, _attrs) => {
  _push(`<ul${ssrRenderAttrs(mergeProps({ class: "jskos-vue-qualifiedStatements-tree" }, _attrs))}><!--[-->`);
  ssrRenderList(__props.literals, (statements, propertyUri, propertyIndex) => {
    _push(`<li class="jskos-vue-qualifiedStatements-branch"><div class="jskos-vue-qualifiedStatements-property">`);
    _push(ssrRenderComponent(_sfc_main$8, {
      href: propertyUri,
      text: unref(resolution).label(propertyUri)
    }, null, _parent));
    _push(`</div><ul class="jskos-vue-qualifiedStatements-values"><!--[-->`);
    ssrRenderList(statements, (statement, index) => {
      _push(ssrRenderComponent(_sfc_main$5, {
        key: `${propertyUri}-${index}`,
        kind: "literal",
        statement: statement,
        "statement-id": `literal-${propertyIndex}-${index}`
      }, null, _parent));
    });
    _push(`<!--]--></ul></li>`);
  });
  _push(`<!--]--></ul>`);
}
}

};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/QualifiedLiterals.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined
};

const _sfc_main$2 = {
  __name: 'QualifiedDates',
  __ssrInlineRender: true,
  props: {
  dates: { type: Object, required: true },
},
  setup(__props) {

const props = __props;

const resolution = inject(uriResolutionKey);

function collectResources() {
  const resources = [];
  for (const propertyUri of Object.keys(props.dates || {})) {
    resources.push(propertyUri);
  }
  return resources
}

watch(
  () => props.dates,
  () => resolution.prefetch(collectResources()),
  { immediate: true, deep: true },
);

return (_ctx, _push, _parent, _attrs) => {
  _push(`<ul${ssrRenderAttrs(mergeProps({ class: "jskos-vue-qualifiedStatements-tree" }, _attrs))}><!--[-->`);
  ssrRenderList(__props.dates, (statements, propertyUri, propertyIndex) => {
    _push(`<li class="jskos-vue-qualifiedStatements-branch"><div class="jskos-vue-qualifiedStatements-property">`);
    _push(ssrRenderComponent(_sfc_main$8, {
      href: propertyUri,
      text: unref(resolution).label(propertyUri)
    }, null, _parent));
    _push(`</div><ul class="jskos-vue-qualifiedStatements-values"><!--[-->`);
    ssrRenderList(statements, (statement, index) => {
      _push(ssrRenderComponent(_sfc_main$5, {
        key: `${propertyUri}-${index}`,
        kind: "date",
        statement: statement,
        "statement-id": `date-${propertyIndex}-${index}`
      }, null, _parent));
    });
    _push(`<!--]--></ul></li>`);
  });
  _push(`<!--]--></ul>`);
}
}

};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/QualifiedDates.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined
};

const _sfc_main$1 = {
  __name: 'QualifiedStatements',
  __ssrInlineRender: true,
  props: {
  item: { type: Object, required: true },
  resolve: { type: Function, default: null },
  registry: { type: Object, default: null },
  labelForUri: { type: Function, default: null },
},
  setup(__props) {

const props = __props;

const { t } = useQualifiedStatementsLocale();

const resolver = computed(() => {
  if (props.resolve) {
    return props.resolve
  }
  if (props.registry?.getConcepts) {
    return async uri => (await props.registry.getConcepts({ concepts: [{ uri }] }))?.[0]
  }
  return null
});

let resolution = inject(uriResolutionKey, null);
if (!resolution) {
  resolution = useUriResolution({
    resolve: resolver,
    labelForUri: computed(() => props.labelForUri),
  });
  provide(uriResolutionKey, resolution);
}

const hasRelations = computed(() => Object.keys(props.item?.qualifiedRelations || {}).length > 0);
const hasDates = computed(() => Object.keys(props.item?.qualifiedDates || {}).length > 0);
const hasLiterals = computed(() => Object.keys(props.item?.qualifiedLiterals || {}).length > 0);
const activeStatementId = ref(null);
const activeTrigger = ref(null);
const componentId = useId();

function inspectorId(statementId) {
  return `${componentId}-qualified-statement-${statementId}`
}

function closeInspector({ restoreFocus = true } = {}) {
  const trigger = activeTrigger.value;
  activeStatementId.value = null;
  activeTrigger.value = null;
  if (restoreFocus && trigger) {
    nextTick(() => trigger.focus());
  }
}

// A replacement item can reuse positional IDs, so discard the old inspector
// without focusing its detached disclosure button.
watch(() => props.item, () => closeInspector({ restoreFocus: false }));

function toggleInspector(statementId, trigger) {
  if (activeStatementId.value === statementId) {
    closeInspector();
    return
  }
  activeStatementId.value = statementId;
  activeTrigger.value = trigger;
}

provide(qualifiedStatementsUiKey, {
  activeStatementId,
  closeInspector,
  inspectorId,
  toggleInspector,
});

return (_ctx, _push, _parent, _attrs) => {
  if (hasRelations.value || hasDates.value || hasLiterals.value) {
    _push(`<section${
      ssrRenderAttrs(mergeProps({ class: "jskos-vue-qualifiedStatements" }, _attrs))
    }><div class="jskos-vue-qualifiedStatements-title">${
      ssrInterpolate(unref(t)("title"))
    }: `);
    if (unref(resolution).anyLoading.value) {
      _push(ssrRenderComponent(_sfc_main$a, { size: "sm" }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
    if (hasRelations.value) {
      _push(ssrRenderComponent(_sfc_main$4, {
        relations: __props.item.qualifiedRelations
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (hasDates.value) {
      _push(ssrRenderComponent(_sfc_main$2, {
        dates: __props.item.qualifiedDates
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (hasLiterals.value) {
      _push(ssrRenderComponent(_sfc_main$3, {
        literals: __props.item.qualifiedLiterals
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</section>`);
  } else {
    _push(`<!---->`);
  }
}
}

};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/QualifiedStatements.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

const simple = {
	uri: "https://officialuri.com/1234_bio_transfer_test_testpool_person",
	prefLabel: {
		zxx: "Testperson für RDF"
	},
	qualifiedRelations: {
		"https://schema.org/gender": [
			{
				rank: "preferred",
				resource: {
					prefLabel: {
						de: "männlich",
						en: "male"
					},
					uri: "http://uri.gbv.de/terminology/gender/a0e9160d-2db0-4030-80df-c96b6bfc49e5"
				}
			}
		]
	}
};
const intermediate = {
	uri: "https://officialuri.com/1234_bio_transfer_test_testpool_person",
	prefLabel: {
		zxx: "Testperson für RDF"
	},
	qualifiedRelations: {
		"https://w3id.org/dpv/pd#MaritalStatus": [
			{
				resource: {
					prefLabel: {
						de: "Ledig",
						en: "Unmarried"
					},
					uri: "http://uri.gbv.de/terminology/marital_status/55aa53cb-999f-46c5-8620-ac8d38ee4d50"
				},
				startDate: "1500",
				endDate: "1550",
				rank: "preferred"
			},
			{
				resource: {
					prefLabel: {
						de: "Geschieden",
						en: "Divorced"
					},
					uri: "http://uri.gbv.de/terminology/marital_status/645a1993-7908-4960-9470-804232041357"
				},
				startDate: "1550",
				endDate: "1560",
				rank: "normal"
			},
			{
				resource: {
					prefLabel: {
						de: "Verwitwet",
						en: "Widowed"
					},
					uri: "http://uri.gbv.de/terminology/marital_status/dc3d06a0-1e30-4a44-afa6-bbeaef4054e3"
				},
				rank: "normal"
			}
		]
	}
};
const advanced = {
	uri: "https://officialuri.com/1234_bio_transfer_test_testpool_person",
	prefLabel: {
		zxx: "Testperson für RDF"
	},
	qualifiedRelations: {
		"http://www.cidoc-crm.org/cidoc-crm/P11i_participated_in": [
			{
				resource: {
					prefLabel: {
						de: "Die Geburt",
						en: "The Birth"
					},
					type: [
						"http://www.w3.org/2004/02/skos/core#Concept",
						"http://www.cidoc-crm.org/cidoc-crm/E5_Event",
						"http://uri.gbv.de/terminology/biographie_chronicle_event/3b093d72-fe56-471b-9e5e-227943e34876"
					],
					startDate: "1984/1985",
					endDate: "1984/1985",
					scopeNote: {
						und: [
							"es war neunzehnhundertvierundachtzig!"
						]
					},
					place: [
						{
							prefLabel: {
								und: "Knüllwald"
							},
							altLabel: {
								und: [
									"Saint John (Kanada)",
									"Knuellwald",
									"Oberbeisheim",
									"Niederbeisheim"
								]
							},
							uri: "http://uri.gbv.de/terminology/prizepapers_place/bf0a9e36-1158-45f9-81d7-533e7970e389",
							mappings: [
								{
									type: [
										"http://www.w3.org/2004/02/skos/core#exactMatch"
									],
									from: {
										memberSet: [
											{
												uri: "http://uri.gbv.de/terminology/prizepapers_place/bf0a9e36-1158-45f9-81d7-533e7970e389"
											}
										]
									},
									to: {
										memberChoice: [
											{
												uri: "http://geonames.org/3207179"
											},
											{
												uri: "https://d-nb.info/gnd/4369255-2"
											},
											{
												uri: "http://uri.gbv.de/terminology/gn250/DEBKGGND00000H96"
											},
											{
												uri: "http://vocab.getty.edu/tgn/7124998"
											}
										]
									}
								}
							]
						}
					],
					qualifiedRelations: {
						"http://www.cidoc-crm.org/cidoc-crm/P11_had_participant": [
							{
								resource: {
									prefLabel: {
										de: "__Alexis Girard, Alexis Girald",
										en: "__Alexis Girard, Alexis Girald"
									},
									uri: "http://uri.gbv.de/terminology/dante/0954da34-bc59-4f95-8d70-c156b7e2327b"
								}
							}
						]
					}
				}
			}
		]
	}
};
const examples = {
	simple: simple,
	intermediate: intermediate,
	advanced: advanced
};

const __pageData = JSON.parse("{\"title\":\"QualifiedStatements\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"components/QualifiedStatements.md\",\"filePath\":\"components/QualifiedStatements.md\"}");
const __default__ = {name:"components/QualifiedStatements.md"};
const _sfc_main = /*@__PURE__*/Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {

const labels = {
  "https://schema.org/gender": "Gender",
  "https://w3id.org/dpv/pd#MaritalStatus": "Marital status",
  "http://www.cidoc-crm.org/cidoc-crm/P11i_participated_in": "Participated in",
  "http://www.cidoc-crm.org/cidoc-crm/P11_had_participant": "Had participant",
  "http://www.w3.org/2004/02/skos/core#Concept": "Concept",
  "http://www.cidoc-crm.org/cidoc-crm/E5_Event": "Event",
  "http://uri.gbv.de/terminology/biographie_chronicle_event/3b093d72-fe56-471b-9e5e-227943e34876": "Birth",
};

const selectedExample = ref("simple");
const labelForUri = uri => labels[uri] || "";

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${
    ssrRenderAttrs(_attrs)
  }><h1 id="qualifiedstatements" tabindex="-1">QualifiedStatements <a class="header-anchor" href="#qualifiedstatements" aria-label="Permalink to &quot;QualifiedStatements&quot;">​</a></h1><p>Compact display of the JSKOS fields <code>qualifiedRelations</code>, <code>qualifiedLiterals</code>, and <code>qualifiedDates</code>.</p><p>The overview shows property labels and primary statement values. Language, date range, and significant rank (<code>Preferred</code> or <code>Deprecated</code>) are shown next to the value. Types, sources, places, mappings, and nested qualified statements are available through an inline inspector. Mapping bundle visualization supports <code>memberSet</code>, <code>memberChoice</code>, and <code>memberList</code>, but does not explicitly interpret <code>memberRoles</code>.</p><p>Only one inspector is open at a time. Nested objects are followed through a breadcrumb path instead of rendering a deeply indented tree. Resource-only references are treated as cycles when their object or URI is already in the current path. Distinct qualified statements remain navigable when they reference the same resource URI but carry separate qualifiers.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><ul><li><code>item</code> <em>object, required</em> — JSKOS item containing Qualified Statements.</li><li><code>resolve</code> <em>function, default <code>null</code></em> — async <code>resolve(uri)</code> callback returning a JSKOS resource.</li><li><code>registry</code> <em>object, default <code>null</code></em> — cocoda-sdk-compatible registry with a <code>getConcepts</code> method. It is used when <code>resolve</code> is not provided.</li><li><code>labelForUri</code> <em>function, default <code>null</code></em> — synchronous <code>labelForUri(uri)</code> callback for application-provided labels.</li></ul><p>URI labels use <code>labelForUri</code> first, then labels embedded in the data or loaded through <code>resolve</code>/<code>registry</code>, and finally a shortened URI. Embedded and resolved JSKOS labels use the shared <a href="./../utilities/useContentLanguage.html">content language selection</a>. Inspector language maps continue to show all available values and language codes.</p><h2 id="accessibility" tabindex="-1">Accessibility <a class="header-anchor" href="#accessibility" aria-label="Permalink to &quot;Accessibility&quot;">​</a></h2><p>Disclosure and breadcrumb controls are native buttons. Disclosure buttons use <code>aria-expanded</code> and <code>aria-controls</code>. All resource links remain separate from buttons. Pressing Escape closes the active inspector and restores focus to its disclosure button.</p><h2 id="css-variables-and-classes" tabindex="-1">CSS variables and classes <a class="header-anchor" href="#css-variables-and-classes" aria-label="Permalink to &quot;CSS variables and classes&quot;">​</a></h2><ul><li><code>--jskos-vue-qualifiedStatements-fontWeight</code></li><li><code>--jskos-vue-qualifiedStatements-gap</code></li><li><code>--jskos-vue-qualifiedStatements-smallGap</code></li><li><code>--jskos-vue-qualifiedStatements-propertyWidth</code></li><li><code>--jskos-vue-qualifiedStatements-statementGap</code></li><li><code>--jskos-vue-qualifiedStatements-groupGap</code></li><li><code>--jskos-vue-qualifiedStatements-mutedOpacity</code></li><li><code>--jskos-vue-qualifiedStatements-border</code></li><li><code>--jskos-vue-qualifiedStatements-focusOutline</code></li><li><code>--jskos-vue-qualifiedStatements-inspectorColumns</code></li><li><code>.jskos-vue-qualifiedStatements</code></li><li><code>.jskos-vue-qualifiedStatements-row</code></li><li><code>.jskos-vue-qualifiedStatements-disclosure</code></li><li><code>.jskos-vue-qualifiedStatements-inspector</code></li><li><code>.jskos-vue-qualifiedStatements-breadcrumb</code></li></ul><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><div class="qualified-statements-example"><div class="qualified-statements-example-controls"><label for="qualified-statements-example">Example</label><select id="qualified-statements-example"><option value="simple"${
    (ssrIncludeBooleanAttr((Array.isArray(selectedExample.value))
      ? ssrLooseContain(selectedExample.value, "simple")
      : ssrLooseEqual(selectedExample.value, "simple"))) ? " selected" : ""
  }>Simple — Gender</option><option value="intermediate"${
    (ssrIncludeBooleanAttr((Array.isArray(selectedExample.value))
      ? ssrLooseContain(selectedExample.value, "intermediate")
      : ssrLooseEqual(selectedExample.value, "intermediate"))) ? " selected" : ""
  }>Intermediate — Marital status</option><option value="advanced"${
    (ssrIncludeBooleanAttr((Array.isArray(selectedExample.value))
      ? ssrLooseContain(selectedExample.value, "advanced")
      : ssrLooseEqual(selectedExample.value, "advanced"))) ? " selected" : ""
  }>Advanced — The Birth</option></select></div>`);
  _push(ssrRenderComponent(unref(_sfc_main$1), {
    item: unref(examples)[selectedExample.value],
    "label-for-uri": labelForUri
  }, null, _parent));
  _push(`</div><p>The examples are exact subsets of the cocoda-Test-Person JSKOS dataset.</p><h3 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> setup</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { QualifiedStatements } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  qualifiedLiterals: {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">    &quot;https://example.org/note&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: [{</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      literal: { string: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;Example note&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, language: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;en&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> },</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      source: [{ prefLabel: { en: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;Example source&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> } }],</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    }],</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  },</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">}</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">QualifiedStatements</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> :</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> /&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span></code></pre></div><h2 id="itemdetails-integration" tabindex="-1">ItemDetails integration <a class="header-anchor" href="#itemdetails-integration" aria-label="Permalink to &quot;ItemDetails integration&quot;">​</a></h2><p><code>QualifiedStatements</code> can be placed after the existing detail tabs without changing <code>ItemDetails</code>:</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">ItemDetails</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> :</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">item</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;template #afterTabs&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    &lt;QualifiedStatements</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      :item=&quot;item&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      :resolve=&quot;resolve&quot; /&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;/template&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">ItemDetails</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span></code></pre></div></div>`);
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/QualifiedStatements.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { __pageData, _sfc_main as default };
