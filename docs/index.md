# Introduction

## What is jskos-vue?
jskos-vue is a library for [Vue 3](https://v3.vuejs.org) containing components and utilities related to the [JSKOS data format](https://gbv.github.io/jskos/) and the [coli-conc project](https://coli-conc.gbv.de). It was developed to make it easier to use JSKOS data and the coli-conc infrastructure in front-end projects.

Note that it was specifically developed with the needs of our [Cocoda Mapping Tool](https://github.com/gbv/cocoda) and [BARTOC](https://github.com/gbv/bartoc.org) in mind. So if certain decisions seem odd to you, it is probably because it was needed in one of those projects. Nevertheless feel free to [contact us](https://github.com/gbv/jskos-vue/issues) with your questions, suggestions, and use-cases!

## Overview
This library provides the following Vue components (plus some helper components and utility functions):

- [ItemName] - label or identifier of a JSKOS item
- [ItemList] - list of JSKOS items
- [ConceptTree] - hierarchical browsing of JSKOS concepts
- [ItemSuggest] - input field to search and select an item
- [ItemDetails] - full but condense details of a JSKOS item
- [ItemSelected] - editable list of JSKOS items
- [ItemSelect] - form to select multiple JSKOS items

[ItemName]: components/ItemName.html
[ItemList]: components/ItemList.html
[ConceptTree]: components/ConceptTree.html
[ItemSuggest]: components/ItemSuggest.html
[ItemDetails]: components/ItemDetails.html
[ItemSelect]: components/ItemSelect.html
[ItemSelected]: components/ItemSelected.html

## Related works

The [TS4NFDI Terminology Service Suite](https://github.com/ts4nfdi/terminology-service-suite) (TSS) provides similar components based on React instead of Vue and TSS includes API calls where jskos-vue leaves this to [cocoda-sdk] or other methods. A very rough correspondence of components and widgets, ignoring conceptual differences:

jskos-vue     | TSS 
--------------|-------------------------
[ItemName]    | [TitleWidget]
[ItemList]    | *planned [EntityListWidget](https://github.com/ts4nfdi/terminology-service-suite/issues/318)*
[ConceptTree] | [HierarchyWidget]
/             | [GraphViewWidget]
[ItemSuggest] | [AutocompleteWidget]
[ItemDetails] | [EntityInfoWidget]
/             | [EntityRelationsWidget]

In addition [jskos-vue-tabs] is similar to TSS [TabWidget]. A mapping Widget is planned in [both jskos-vue](https://github.com/gbv/jskos-vue/issues/26) and in [in TSS](https://github.com/ts4nfdi/terminology-service-suite/issues/305).


[EntityInfoWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_additional-entity-metadata-entityinfowidget--docs
[EntityRelationsWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_additional-entity-metadata-entityrelationswidget--docs
[HierarchyWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_hierarchy-and-graph-hierarchywidget--docs
[GraphViewWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_hierarchy-and-graph-graphviewwidget--docs
[AutocompleteWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/html_search-autocompletewidget--docs
[TabWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_additional-entity-metadata-tabwidget--docs
[TitleWidget]: https://terminology.services.base4nfdi.de/tss/comp/latest/?path=/docs/react_entity-metadata-titlewidget--docs
