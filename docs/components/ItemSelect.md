<script setup>
  import ItemSelect from "../../src/components/ItemSelect.vue"

  import * as jskos from "jskos-tools"
  import { cdk } from "cocoda-sdk"
  import { reactive, onMounted } from "vue"
  import { utils } from "jskos-vue"

  let registry
  const state = reactive({
    scheme: null,
    async loadScheme() {
      this.scheme = (await registry.getSchemes({
        params: {
          uri: "http://bartoc.org/en/node/241", // DDC
        },
      }))[0]
    },
    concepts: null,
    async loadConcepts() {
      this.concepts = jskos.sortConcepts(await this.scheme._getTop())
    },
    async loadNarrower(concept) {
      if (concept.narrower && !concept.narrower.includes(null)) {
        return
      }
      concept.narrower = jskos.sortConcepts(await concept._getNarrower())
    },
    itemSelect: {
      selected: [],
    },
  })

  onMounted(async () => {
    registry = cdk.initializeRegistry({
      provider: "ConceptApi",
      api: "https://coli-conc.gbv.de/api/",
    })
    await state.loadScheme()
    await state.loadConcepts()
  })

  const alert = (...args) => window.alert(...args)

</script>


<h2>ItemSelect DDC concepts from API (typeahead / suggest )</h2>
<h3>Tags</h3>
<item-select
  v-if="state.scheme"
  v-model="state.itemSelect.selected"
  :search="utils.cdkRegistryToSuggestFunction(state.scheme._registry, { scheme: state.scheme })"
  label="DDC with tag view"
  placeholder="Search DDC concepts…"
  selected-view="tags" />

<h3>Table</h3>
<item-select
  v-if="state.scheme"
  v-model="state.itemSelect.selected"
  :search="utils.cdkRegistryToSuggestFunction(state.scheme._registry, { scheme: state.scheme })"
  label="DDC with table view"
  placeholder="Search DDC concepts…"
  orderable
  selected-view="table" />  

<h3>List</h3>
<item-select
  v-if="state.scheme"
  v-model="state.itemSelect.selected"
  :search="utils.cdkRegistryToSuggestFunction(state.scheme._registry, { scheme: state.scheme })"
  label="DDC with list view"
  placeholder="Search DDC concepts…"
  selected-view="list" />

<h2>ItemSelect DDC concepts from API (typeahead / suggest ) and conceptTree browsing UX</h2>
<h3>Table</h3>
<item-select
  v-if="state.scheme"
  v-model="state.itemSelect.selected"
  :search="utils.cdkRegistryToSuggestFunction(state.scheme._registry, { scheme: state.scheme })"
  label="DDC with table view"
  placeholder="Search DDC concepts…"
  orderable
  selected-view="table"
  :show-tree="true"
  :tree-concepts="state.concepts"
  :tree-load-narrower="state.loadNarrower" />
<div v-else>
  Loading concepts...
</div>