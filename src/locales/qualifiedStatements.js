import { useLocale } from "../utils.js"

const namespace = "jskosVue.qualifiedStatements"
const namespacedKey = key => `${namespace}.${key}`

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
}

export function useQualifiedStatementsLocale() {
  const locale = useLocale(messages)

  return {
    ...locale,
    t(key) {
      const fullKey = namespacedKey(key)
      const translated = locale.t(fullKey)

      // Preserve the existing fallback for dynamic, unknown JSKOS properties.
      return translated === fullKey ? key : translated
    },
  }
}
