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
