import { computed, reactive, unref } from "vue"
import * as jskos from "jskos-tools"

export const uriResolutionKey = Symbol("jskos-vue-uri-resolution")
export const qualifiedStatementsUiKey = Symbol("jskos-vue-qualified-statements-ui")

function uriOf(value) {
  return typeof value === "string" ? value : value?.uri
}

/**
 * Resolve URI labels for Qualified Statements without depending on a specific
 * registry. One instance is shared with nested statements through provide/inject.
 */
export function useUriResolution({ resolve, labelForUri, language } = {}) {
  // These objects are reactive so labels and loading indicators update after a
  // resolver request finishes.
  const cache = reactive({})
  const loading = reactive({})

  function shorten(uri) {
    try {
      const url = new URL(uri)
      const host = url.hostname.replace(/^www\./, "")
      const segments = url.pathname.split("/").filter(Boolean)
      const path = segments.length > 2 ? `/…/${segments.at(-1)}` : `/${segments.join("/")}`
      return (host + path + url.hash).replace(/\/$/, "")
    } catch {
      return uri
    }
  }

  const fmtRange = (start, end) => (start || end) ? `${start || "…"}–${end || "…"}` : ""

  function prefLabel(resource) {
    if (!resource) {
      return ""
    }
    return jskos.prefLabel(resource, {
      fallbackToUri: false,
      language: unref(language),
    }) || ""
  }

  function customLabel(uri) {
    if (!uri) {
      return ""
    }
    const getLabel = unref(labelForUri)
    return typeof getLabel === "function" ? getLabel(uri) : ""
  }

  async function ensure(value) {
    const uri = uriOf(value)
    if (!uri) {
      return
    }

    // Cache embedded data, but do not replace it with a URI-only reference.
    if (typeof value === "object"
      && (!cache[uri] || Object.keys(value).some(key => key !== "uri"))) {
      cache[uri] = value
    }
    // A local label or an embedded/cached prefLabel is already sufficient.
    // loading also prevents duplicate requests for the same URI.
    if (customLabel(uri) || prefLabel(cache[uri]) || loading[uri]) {
      return cache[uri]
    }

    const resolver = unref(resolve)
    if (typeof resolver !== "function") {
      return cache[uri]
    }

    loading[uri] = true
    try {
      const resource = await resolver(uri)
      if (resource
        && (!cache[uri] || Object.keys(resource).some(key => key !== "uri"))) {
        cache[uri] = resource
      }
      return resource
    } catch {
      // Resolution failures are non-fatal: label() can still use the URI fallback.
    } finally {
      loading[uri] = false
    }
  }

  function prefetch(values) {
    return Promise.all((values || []).map(ensure))
  }

  function label(value) {
    const uri = uriOf(value)
    const resource = typeof value === "object" ? value : cache[uri]
    // Application labels take precedence, followed by embedded and resolved
    // JSKOS labels. A shortened URI is the final offline/error fallback.
    return customLabel(uri) || prefLabel(resource) || prefLabel(cache[uri]) || shorten(uri || "")
  }

  const anyLoading = computed(() => Object.values(loading).some(Boolean))

  return { cache, loading, anyLoading, ensure, prefetch, label, shorten, fmtRange }
}
