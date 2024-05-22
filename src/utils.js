import { onMounted, onUnmounted } from "vue"

/**
 * Converts a date string to a localized date string.
 * Incomplete dates (YYYY or YYYY-MM) will be returned non-localized.
 * Dates with the exact length of 10 (e.g. YYYY-MM-DD) will be printed as date-only.
 *
 * @param {string} dateString a date string (compatible with new Date())
 */
export function dateToString(dateString) {
  let date = new Date(dateString)
  if (date instanceof Date && !isNaN(date)) {
    if (dateString.length < 10) {
      return dateString
    }
    let options = { year: "numeric", month: "short", day: "numeric" }
    if (dateString.length > 10) {
      options = Object.assign({ hour: "2-digit", minute: "2-digit", second: "2-digit" }, options)
    }
    return date.toLocaleString(undefined, options)
  } else {
    return dateString
  }
}

/**
 * Click handler mixin
 *
 * Handles clicks in the application, e.g. to hide popovers when clicked outside.
 *
 * Only works with the composition API. Takes a function as its first argument which returns an array.
 * Each item in the array is an object with the following properties:
 * - `elements`: An array of elements that the click should be checked against.
 * - `handler`: A function that is called when a click outside the elements is registered.
 *
 * The second argument (optional, default: `false`) forces the handler to be called even if the click is inside the provided elements.
 *
 * Usually for popovers, you should add both the popover element (or the inside div rather) and the button that opens the popover to `elements`.
 *
 * Example:
 * popover: [
 *   {
 *      elements: [document.getElementById("someelement")],
 *      handler: ({ event, isInside }) => {
 *        // do something here
 *      }
 *   }
 * ]
 *
 * @param {Function} getClickHandlers - function that returns an array for click handlers (see above)
 * @param {boolean} force - if `true`, the click handler will be called even if the click is inside (default: false)
 */
export function addClickHandlers(getClickHandlers, force = false) {
  const handleClick = (event) => {
    for (const element of getClickHandlers()) {
      const isInside = (element.elements || []).reduce((total, current) => total || (current && current.contains(event.target)), false)
      if (force || !isInside) {
        element.handler({ event, isInside })
      }
    }
  }
  onMounted(() => {
    document.addEventListener("click", handleClick)
  })
  onUnmounted(() => {
    document.removeEventListener("click", handleClick)
  })
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// (Taken from a presumedly old version of Underscore.js. See: https://davidwalsh.name/javascript-debounce-function)
export function debounce(func, wait, immediate) {
  var timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}

/**
 * Converts a cocoda-sdk registry into a suggest function for concepts that can be used with ItemSuggest.
 *
 * By default, it will use `suggest` (i.e. for concepts). With the parameter `options.voc`, it is possible to use `vocSuggest` for concept schemes instead.
 *
 * @param {object} registry a registry object initialized by cocoda-sdk
 * @param {object} options.scheme concept scheme to suggest concepts from
 * @param {boolean} options.voc whether to use `vocSuggest` instead of `suggest`
 */
export function cdkRegistryToSuggestFunction(registry, { voc = false, scheme }) {
  return async (query) => {
    if (voc) {
      return registry.vocSuggest({ search: query })
    } else {
      return registry.suggest({ search: query, scheme })
    }
  }
}

import { ref } from "vue"
const draggedItem = ref(null)
export const dragAndDrop = {
  draggedItem,
  dragstart(item) {
    draggedItem.value = item
  },
  dragend() {
    draggedItem.value = null
  },
  addDropzone(element, callback) {
    // Can be used to determine whether item is currently dragging over an element
    const isDraggingOver = ref(false)
    let eventTarget
    const dragover = (event) => {
      // prevent default to allow drop
      event.preventDefault()
    }
    const dragenter = (event) => {
      eventTarget = event.target
      isDraggingOver.value = true
    }
    const dragleave = (event) => {
      if (eventTarget === event.target) {
        isDraggingOver.value = false
      }
    }
    const drop = (event, ...params) => {
      event.preventDefault()
      if (draggedItem.value) {
        callback(draggedItem.value, ...params)
      }
      isDraggingOver.value = false
    }
    // Add event listeners to element if given
    if (element) {
      element.addEventListener("dragover", dragover)
      element.addEventListener("dragenter", dragenter)
      element.addEventListener("dragleave", dragleave)
      element.addEventListener("drop", drop)
    }
    return {
      dragover,
      dragenter,
      dragleave,
      drop,
      isDraggingOver,
    }
  },
}
