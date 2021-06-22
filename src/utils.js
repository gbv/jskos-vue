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
    return "?"
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
