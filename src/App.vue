<template>
  <p>
    Item (notation+label):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }" />
  </p>
  <p>
    Item (no label):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }"
      :show-label="false" />
  </p>
  <p>
    Item (no notation):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }"
      :show-notation="false" />
  </p>
  <p>
    Item (clickable):
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName' } }"
      :clickable="true"
      @click="handleClick({ item: { uri: 'uri:clickableItem' }})" />
  </p>
  <p>
    Item (multiple languages):
    <br>
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName', de: 'ItemName (de)' } }" />
    <br>
    <item-name
      :item="{ notation: ['IN'], prefLabel: { en: 'ItemName', de: 'ItemName (de)' } }"
      language="de" />
  </p>
  <p>
    Item (without notation/label, fallback to URI):
    <item-name
      :item="{ uri: 'some:uri' }"
      :clickable="true" />
  </p>
  <p>
    Item (without notation/label/uri):
    <item-name
      :item="{}" />
  </p>
  <p>
    Item List:
    <item-list
      :items="[
        { notation: ['1'], prefLabel: { en: 'Concept 1' } },
        { notation: ['2'], prefLabel: { en: 'Concept 2' } },
        { notation: ['3'], prefLabel: { en: 'Concept 3' } },
      ]"
      :clickable="true" />
  </p>
  <p>
    Item List (styled with slots):
    <!-- TODO: How to detect clicks on li? -->
    <item-list
      class="item-list-styled"
      :items="[
        { uri: 'test:1', notation: ['1'], prefLabel: { en: 'Concept 1' } },
        { uri: 'test:2', notation: ['2'], prefLabel: { en: 'Concept 2' } },
        { uri: 'test:3', notation: ['3'], prefLabel: { en: 'Concept 3' } },
      ]"
      @click="handleClick">
      <template #beforeItem>
        🚀
      </template>
      <template #afterItem="{ item }">
        ({{ item.uri }})
      </template>
    </item-list>
  </p>
</template>

<script>
import { defineComponent } from "vue"
import ItemName from "./components/item-name"
import ItemList from "./components/item-list"

export default defineComponent({
  name: "App",
  components: {
    ItemName,
    ItemList,
  },
  methods: {
    handleClick({ item, row }) {
      alert(`Clicked on item with URI ${item.uri}. (row: ${row})`)
    },
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item-list-styled {
  background: lightcoral;
}
.item-list-styled > li:hover {
  cursor: pointer;
  background: red;
}
</style>
