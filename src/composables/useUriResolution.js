import { computed, reactive, unref } from "vue"
import * as jskos from "jskos-tools"

export const uriResolutionKey = Symbol("jskos-vue-uri-resolution")
export const qualifiedStatementsUiKey = Symbol("jskos-vue-qualified-statements-ui")

/** Return the URI from either a URI string or an embedded JSKOS resource. */
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
  const errors = reactive({})

  /** Shorten an HTTP(S) URI for display while preserving its distinguishing end. */
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

  /** Format an optional start/end range, using an ellipsis for an open boundary. */
  const fmtRange = (start, end) => (start || end) ? `${start || "…"}–${end || "…"}` : ""

  /** Select the preferred JSKOS label for the current language. */
  function prefLabel(resource) {
    if (!resource) {
      return ""
    }
    return jskos.prefLabel(resource, {
      fallbackToUri: false,
      language: unref(language),
    }) || ""
  }

  /** Ask the embedding application for a label supplied through labelForUri. */
  function customLabel(uri) {
    const getLabel = unref(labelForUri)
    return typeof getLabel === "function" ? getLabel(uri) : ""
  }

  /** Cache embedded data and resolve a URI only when no usable label is available. */
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
      if (resource) {
        cache[uri] = resource
      }
      return resource
    } catch (error) {
      // Resolution failures are non-fatal: label() can still use the URI fallback.
      errors[uri] = error
    } finally {
      loading[uri] = false
    }
  }

  /** Ensure that all values in a collection are available in the shared cache. */
  function prefetch(values) {
    return Promise.all((values || []).map(ensure))
  }

  /** Return the best available label, ending with a shortened URI as fallback. */
  function label(value) {
    const uri = uriOf(value)
    const resource = typeof value === "object" ? value : cache[uri]
    // Application labels take precedence, followed by embedded and resolved
    // JSKOS labels. A shortened URI is the final offline/error fallback.
    return customLabel(uri) || prefLabel(resource) || prefLabel(cache[uri]) || shorten(uri || "")
  }

  /** Report whether at least one URI is currently being resolved. */
  const anyLoading = computed(() => Object.values(loading).some(Boolean))

  return { cache, loading, errors, anyLoading, ensure, prefetch, label, shorten, fmtRange }
}
