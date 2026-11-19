import { computed, reactive, unref } from "vue"
import * as jskos from "jskos-tools"

export const uriResolutionKey = Symbol("jskos-vue-uri-resolution")
export const qualifiedStatementsUiKey = Symbol("jskos-vue-qualified-statements-ui")

function uriOf(value) {
  return typeof value === "string" ? value : value?.uri
}

export function useUriResolution({ resolve, labelForUri, language } = {}) {
  const cache = reactive({})
  const loading = reactive({})
  const errors = reactive({})

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
    const getLabel = unref(labelForUri)
    return typeof getLabel === "function" ? getLabel(uri) : ""
  }

  async function ensure(value) {
    const uri = uriOf(value)
    if (!uri) {
      return
    }

    if (typeof value === "object") {
      cache[uri] = value
    }
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
      errors[uri] = error
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
    return customLabel(uri) || prefLabel(resource) || prefLabel(cache[uri]) || shorten(uri || "")
  }

  const anyLoading = computed(() => Object.values(loading).some(Boolean))

  return { cache, loading, errors, anyLoading, ensure, prefetch, label, shorten, fmtRange }
}
