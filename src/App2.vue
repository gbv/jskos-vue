<script setup>
import personData from "../examples/cocoda-test-person-original.json"

const item = personData[0]

const labels = {
  "http://gov.genealogy.net/ontology.owl#hasDenomination": "Denomination",
  "http://uri.gbv.de/terminology/ontologic_relation/complementOf": "complementOf",
  "http://uri.gbv.de/terminology/ontologic_relation/hasPart": "hasPart",
  "http://uri.gbv.de/terminology/ontologic_relation/partOf": "partOf",
  "http://uri.gbv.de/terminology/ontologic_relation/related": "related",
  "http://uri.gbv.de/terminology/person_relation/925afccb-de36-4b94-85cd-ec1709856332": "Person relation",
  "http://uri.gbv.de/terminology/person_relation/a72c812a-0d5c-4a6d-b812-ac4c66f54867": "Person relation",
  "http://www.cidoc-crm.org/cidoc-crm/P11_had_participant": "Had participant",
  "http://www.cidoc-crm.org/cidoc-crm/P11i_participated_in": "Participated in",
  "http://www.w3.org/2004/02/skos/core#changeNote": "Change note",
  "http://www.w3.org/2004/02/skos/core#definition": "Definition",
  "http://www.w3.org/2004/02/skos/core#example": "Example",
  "http://www.w3.org/2004/02/skos/core#historyNote": "History note",
  "http://www.w3.org/2004/02/skos/core#notation": "Notation",
  "http://www.w3.org/2004/02/skos/core#note": "Note",
  "http://www.w3.org/2008/05/skos-xl#altLabel": "Alternative label",
  "http://www.w3.org/2008/05/skos-xl#hiddenLabel": "Hidden label",
  "http://www.w3.org/2008/05/skos-xl#prefLabel": "Preferred label",
  "https://d-nb.info/standards/elementset/gnd#academicDegree": "Academic degree",
  "https://d-nb.info/standards/elementset/gnd#biographicalOrHistoricalInformation": "Biographical or historical information",
  "https://schema.org/gender": "Gender",
  "https://schema.org/hasOccupation": "Occupation",
  "https://schema.org/nationality": "Nationality",
  "https://schema.org/pagination": "Pagination",
  "https://w3id.org/dpv/pd#MaritalStatus": "Marital status",
  "https://www.w3.org/1999/02/22-rdf-syntax-ns#type": "Type",
  "https://www.wikidata.org/wiki/Property:P102": "Political party",
}

function labelForUri(uri) {
  return labels[uri] || ""
}
</script>

<template>
  <main class="local-app">
    <h1>Qualified Statements</h1>
    <p class="jskos-vue-text-lightGrey jskos-vue-text-small">
      Local fixture: cocoda-test-person-original.json
    </p>
    <h2>{{ item.prefLabel?.zxx || item.uri }}</h2>
    <qualified-statements
      :item="item"
      :label-for-uri="labelForUri" />
  </main>
</template>

<style scoped>
.local-app {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  line-height: var(--jskos-vue-itemDetails-lineHeight);
  margin: 0 auto;
  max-width: 56rem;
  padding: var(--jskos-vue-qualifiedStatements-groupGap);
}
</style>
