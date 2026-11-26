import { computed, createVNode, resolveDynamicComponent, unref, mergeProps, withCtx, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, createTextVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot, ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import * as jskos from 'jskos-tools';
import { _ as _sfc_main$3 } from './ItemName.BpIluzQm.js';
import { _ as _sfc_main$5 } from './ItemList.CtBWb-Jg.js';
import { Tabs, Tab } from 'jskos-vue-tabs';
import { a as useLocale, u as useContentLanguage, e as dateToString, c as dragAndDrop } from './utils.Br9Zv_eu.js';
/* empty css                */
/* empty css               */
import { _ as _sfc_main$2 } from './AutoLink.BuusOaCI.js';
import { _ as _sfc_main$4 } from './LicenseInfo._OuJ6Rc-.js';

// Localization

const _sfc_main$1 = {
  __name: 'ItemDetailsTabs',
  __ssrInlineRender: true,
  props: {
  // JSKOS item to be displayed
  item: {
    type: Object,
    required: true,
  },
  // Whether details are displayed as tabs or flat
  flat: {
    type: Boolean,
    default: false,
  },
  // Configure which fields of the item are displayed
  fields: {
    type: Object,
    default: () => ({}),
  },
},
  setup(__props) {

const { t } = useLocale({
  en: {
    created: "Created",
    modified: "Modified",
    issued: "Issued",
    altLabels: "Alternative Labels",
    definition: "Definition",
    info: "Info",
    identifier: "Identifier",
    labels: "Labels",
    editorial: "Editorial",
    scope: "Scope",
    languages: "Languages",
    type: "Type",
    publisher: "Publisher",
  },
  de: {
    created: "Erstellung",
    modified: "Änderung",
    issued: "Veröffentlicht",
    altLabels: "Alternative Bezeichnungen",
    definition: "Definition",
    info: "Info",
    identifier: "Identifier",
    labels: "Bezeichnungen",
    editorial: "Editorial",
    scope: "Scope",
    languages: "Sprachen",
    type: "Art",
    publisher: "Herausgeber",
  },
});
const { prefLabel, selectLanguage } = useContentLanguage();

/**
 * TODO!
 * Icons
 */
const props = __props;

const iterateLanguageMapContent = (item, prop) => {
  const languageMap = (item && item[prop]) || {};
  const preferredLanguage = selectLanguage(languageMap);
  /** Explanation:
          1. Get all language keys for altLabels (Object.keys)
          2. Create objects in the form { language, label } (map)
          3. Flatten the array (reduce)
          4. Filter `-` language (filter)
          5. Sort current language higher (sort)
       */
  return Object.keys(languageMap)
    .map(language => {
      const map = languageMap[language];
      return (Array.isArray(map) ? map : [map]).map(label => ({ language, label }))
    })
    .reduce((prev, cur) => prev.concat(cur), [])
    .filter(item => item.language != "-")
    .sort((a, b) => {
      if (a.language === preferredLanguage && b.language !== preferredLanguage) {
        return -1
      }
      if (b.language === preferredLanguage && a.language !== preferredLanguage) {
        return 1
      }
      return 0
    })
};

const types = computed(() => {
  if (!props.item) {
    return []
  }
  let types = [];
  let schemeTypes = (props.item && props.item.inScheme && props.item.inScheme[0] && props.item.inScheme[0].types) || [];
  for (let type of props.item.type || []) {
    if (typeof type !== "object") {
      type = { uri: type };
    }
    if (!type || ["http://www.w3.org/2004/02/skos/core#Concept", "http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(type.uri)) {
      continue
    }
    // Try to find type in scheme types
    type = schemeTypes.find(t => jskos.compare(t, type)) || type;
    types.push(type);
  }
  return types
});

const fields_ = computed(() => Object.assign({
  identifier: true,
  type: true,
  publisher: !jskos.isConcept(props.item),
  created: true,
  issued: true,
  modified: true,
  languages: true,
  definition: true,
  prefLabel: true,
  altLabel: true,
  scopeNote: true,
  editorialNote: true,
}, props.fields));


return (_ctx, _push, _parent, _attrs) => {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.flat ? 'div' : unref(Tabs)), mergeProps({
    borders: "bottom",
    size: "sm",
    class: "jskos-vue-itemDetails-tabs"
  }, _attrs), {
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        if (['identifier', 'type', 'publisher', 'created', 'issued', 'modified', 'languages', 'definition'].filter(p => fields_.value[p]).length) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.flat ? 'div' : unref(Tab)), {
            title: unref(t)('info')
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                if (fields_.value.identifier) {
                  _push(`<ul class="jskos-vue-itemDetails-list"${_scopeId}>`);
                  if (__props.flat) {
                    _push(`<li${
                      _scopeId
                    }><b${
                      _scopeId
                    }>${
                      ssrInterpolate(unref(t)("identifier"))
                    }:</b></li>`);
                  } else {
                    _push(`<!---->`);
                  }
                  _push(`<!--[-->`);
                  ssrRenderList([__props.item.uri].concat(__props.item.identifier).filter(identifier => identifier != null), (identifier, index) => {
                    _push(`<li${_scopeId}>`);
                    _push(ssrRenderComponent(_sfc_main$2, { href: identifier }, null, _parent, _scopeId));
                    if (identifier === __props.item.uri) {
                      _push(`<span class="jskos-vue-text-lightGrey"${_scopeId}> (URI)</span>`);
                    } else {
                      _push(`<!---->`);
                    }
                    _push(`</li>`);
                  });
                  _push(`<!--]--></ul>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<ul class="jskos-vue-itemDetails-list"${_scopeId}>`);
                if (fields_.value.type && types.value.length) {
                  _push(`<li${
                    _scopeId
                  }><b${
                    _scopeId
                  }>${
                    ssrInterpolate(unref(t)("type"))
                  }:</b> ${
                    ssrInterpolate(types.value.map(type => unref(prefLabel)(type)).join(", "))
                  }</li>`);
                } else {
                  _push(`<!---->`);
                }
                if (fields_.value.publisher && __props.item.publisher?.length) {
                  _push(`<li${
                    _scopeId
                  }><b${
                    _scopeId
                  }>${
                    ssrInterpolate(unref(t)("publisher"))
                  }: </b><!--[-->`);
                  ssrRenderList(__props.item.publisher, (publisher, index) => {
                    _push(`<!--[-->`);
                    if (index > 0) {
                      _push(`<!--[--> · <!--]-->`);
                    } else {
                      _push(`<!---->`);
                    }
                    _push(ssrRenderComponent(_sfc_main$2, {
                      href: publisher.url || publisher.uri,
                      text: unref(prefLabel)(publisher)
                    }, null, _parent, _scopeId));
                    _push(`<!--]-->`);
                  });
                  _push(`<!--]--></li>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<!--[-->`);
                ssrRenderList(['created', 'issued', 'modified'].filter(p => fields_.value[p]), (prop) => {
                  _push(`<!--[-->`);
                  if (__props.item[prop]) {
                    _push(`<li${
                      _scopeId
                    }><b${
                      _scopeId
                    }>${
                      ssrInterpolate(unref(t)(prop))
                    }:</b> ${
                      ssrInterpolate(dateToString(__props.item[prop]))
                    }</li>`);
                  } else {
                    _push(`<!---->`);
                  }
                  _push(`<!--]-->`);
                });
                _push(`<!--]-->`);
                if (fields_.value.languages && __props.item.languages) {
                  _push(`<li${
                    _scopeId
                  }><b${
                    _scopeId
                  }>${
                    ssrInterpolate(unref(t)("languages"))
                  }:</b> ${
                    ssrInterpolate(__props.item.languages.join(", "))
                  }</li>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`</ul>`);
                if (fields_.value.definition && jskos.languageMapContent(__props.item, 'definition')) {
                  _push(`<ul class="jskos-vue-itemDetails-list"${
                    _scopeId
                  }><li${
                    _scopeId
                  }><b${
                    _scopeId
                  }>${
                    ssrInterpolate(unref(t)("definition"))
                  }:</b></li><!--[-->`);
                  ssrRenderList(iterateLanguageMapContent(__props.item, 'definition'), ({ language, label }, index) => {
                    _push(`<li${
                      ssrRenderAttr("lang", `${language}`)
                    }${
                      _scopeId
                    }>${
                      ssrInterpolate(label)
                    }</li>`);
                  });
                  _push(`<!--]--></ul>`);
                } else {
                  _push(`<!---->`);
                }
              } else {
                return [
                  (fields_.value.identifier)
                    ? (openBlock(), createBlock("ul", {
                        key: 0,
                        class: "jskos-vue-itemDetails-list"
                      }, [
                        (__props.flat)
                          ? (openBlock(), createBlock("li", { key: 0 }, [
                              createVNode("b", null, toDisplayString(unref(t)("identifier")) + ":", 1)
                            ]))
                          : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList([__props.item.uri].concat(__props.item.identifier).filter(identifier => identifier != null), (identifier, index) => {
                          return (openBlock(), createBlock("li", { key: index }, [
                            createVNode(_sfc_main$2, { href: identifier }, null, 8, ["href"]),
                            (identifier === __props.item.uri)
                              ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "jskos-vue-text-lightGrey"
                                }, " (URI)"))
                              : createCommentVNode("", true)
                          ]))
                        }), 128))
                      ]))
                    : createCommentVNode("", true),
                  createVNode("ul", { class: "jskos-vue-itemDetails-list" }, [
                    (fields_.value.type && types.value.length)
                      ? (openBlock(), createBlock("li", { key: 0 }, [
                          createVNode("b", null, toDisplayString(unref(t)("type")) + ":", 1),
                          createTextVNode(" " + toDisplayString(types.value.map(type => unref(prefLabel)(type)).join(", ")), 1)
                        ]))
                      : createCommentVNode("", true),
                    (fields_.value.publisher && __props.item.publisher?.length)
                      ? (openBlock(), createBlock("li", { key: 1 }, [
                          createVNode("b", null, toDisplayString(unref(t)("publisher")) + ": ", 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.item.publisher, (publisher, index) => {
                            return (openBlock(), createBlock(Fragment, {
                              key: `publisher-${index}`
                            }, [
                              (index > 0)
                                ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(" · ")
                                  ], 64))
                                : createCommentVNode("", true),
                              createVNode(_sfc_main$2, {
                                href: publisher.url || publisher.uri,
                                text: unref(prefLabel)(publisher)
                              }, null, 8, ["href", "text"])
                            ], 64))
                          }), 128))
                        ]))
                      : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(['created', 'issued', 'modified'].filter(p => fields_.value[p]), (prop) => {
                      return (openBlock(), createBlock(Fragment, null, [
                        (__props.item[prop])
                          ? (openBlock(), createBlock("li", { key: prop }, [
                              createVNode("b", null, toDisplayString(unref(t)(prop)) + ":", 1),
                              createTextVNode(" " + toDisplayString(dateToString(__props.item[prop])), 1)
                            ]))
                          : createCommentVNode("", true)
                      ], 64))
                    }), 256)),
                    (fields_.value.languages && __props.item.languages)
                      ? (openBlock(), createBlock("li", { key: 2 }, [
                          createVNode("b", null, toDisplayString(unref(t)("languages")) + ":", 1),
                          createTextVNode(" " + toDisplayString(__props.item.languages.join(", ")), 1)
                        ]))
                      : createCommentVNode("", true)
                  ]),
                  (fields_.value.definition && jskos.languageMapContent(__props.item, 'definition'))
                    ? (openBlock(), createBlock("ul", {
                        key: 1,
                        class: "jskos-vue-itemDetails-list"
                      }, [
                        createVNode("li", null, [
                          createVNode("b", null, toDisplayString(unref(t)("definition")) + ":", 1)
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'definition'), ({ language, label }, index) => {
                          return (openBlock(), createBlock("li", {
                            key: `${language}-${index}`,
                            lang: `${language}`
                          }, toDisplayString(label), 9, ["lang"]))
                        }), 128))
                      ]))
                    : createCommentVNode("", true)
                ]
              }
            }),
            _: 1
          }), _parent, _scopeId);
        } else {
          _push(`<!---->`);
        }
        if (fields_.value.prefLabel || fields_.value.altLabel) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.flat ? 'div' : unref(Tab)), {
            title: unref(t)('labels')
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                if (fields_.value.prefLabel) {
                  _push(`<ul class="jskos-vue-itemDetails-list"${_scopeId}>`);
                  if (__props.flat) {
                    _push(`<li${
                      _scopeId
                    }><b${
                      _scopeId
                    }>${
                      ssrInterpolate(unref(t)("labels"))
                    }:</b></li>`);
                  } else {
                    _push(`<!---->`);
                  }
                  _push(`<!--[-->`);
                  ssrRenderList(iterateLanguageMapContent(__props.item, 'prefLabel'), ({ language, label }, index) => {
                    _push(`<li${
                      ssrRenderAttr("lang", `${language}`)
                    }${
                      _scopeId
                    }>${
                      ssrInterpolate(label)
                    }</li>`);
                  });
                  _push(`<!--]--></ul>`);
                } else {
                  _push(`<!---->`);
                }
                if (fields_.value.altLabel && jskos.languageMapContent(__props.item, 'altLabel')) {
                  _push(`<ul class="jskos-vue-itemDetails-list"${
                    _scopeId
                  }><li${
                    _scopeId
                  }><b${
                    _scopeId
                  }>${
                    ssrInterpolate(unref(t)("altLabels"))
                  }:</b></li><!--[-->`);
                  ssrRenderList(iterateLanguageMapContent(__props.item, 'altLabel'), ({ language, label }, index) => {
                    _push(`<li${
                      ssrRenderAttr("lang", `${language}`)
                    }${
                      _scopeId
                    }>${
                      ssrInterpolate(label)
                    }</li>`);
                  });
                  _push(`<!--]--></ul>`);
                } else {
                  _push(`<!---->`);
                }
              } else {
                return [
                  (fields_.value.prefLabel)
                    ? (openBlock(), createBlock("ul", {
                        key: 0,
                        class: "jskos-vue-itemDetails-list"
                      }, [
                        (__props.flat)
                          ? (openBlock(), createBlock("li", { key: 0 }, [
                              createVNode("b", null, toDisplayString(unref(t)("labels")) + ":", 1)
                            ]))
                          : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'prefLabel'), ({ language, label }, index) => {
                          return (openBlock(), createBlock("li", {
                            key: `${language}-${index}`,
                            lang: `${language}`
                          }, toDisplayString(label), 9, ["lang"]))
                        }), 128))
                      ]))
                    : createCommentVNode("", true),
                  (fields_.value.altLabel && jskos.languageMapContent(__props.item, 'altLabel'))
                    ? (openBlock(), createBlock("ul", {
                        key: 1,
                        class: "jskos-vue-itemDetails-list"
                      }, [
                        createVNode("li", null, [
                          createVNode("b", null, toDisplayString(unref(t)("altLabels")) + ":", 1)
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'altLabel'), ({ language, label }, index) => {
                          return (openBlock(), createBlock("li", {
                            key: `${language}-${index}`,
                            lang: `${language}`
                          }, toDisplayString(label), 9, ["lang"]))
                        }), 128))
                      ]))
                    : createCommentVNode("", true)
                ]
              }
            }),
            _: 1
          }), _parent, _scopeId);
        } else {
          _push(`<!---->`);
        }
        if (fields_.value.scopeNote && jskos.languageMapContent(__props.item, 'scopeNote')) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.flat ? 'div' : unref(Tab)), {
            title: unref(t)('scope')
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<ul class="jskos-vue-itemDetails-list"${_scopeId}>`);
                if (__props.flat) {
                  _push(`<li${
                    _scopeId
                  }><b${
                    _scopeId
                  }>${
                    ssrInterpolate(unref(t)("scope"))
                  }:</b></li>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<!--[-->`);
                ssrRenderList(iterateLanguageMapContent(__props.item, 'scopeNote'), ({ language, label }, index) => {
                  _push(`<li${
                    ssrRenderAttr("lang", `${language}`)
                  }${
                    _scopeId
                  }>${
                    ssrInterpolate(label)
                  }</li>`);
                });
                _push(`<!--]--></ul>`);
              } else {
                return [
                  createVNode("ul", { class: "jskos-vue-itemDetails-list" }, [
                    (__props.flat)
                      ? (openBlock(), createBlock("li", { key: 0 }, [
                          createVNode("b", null, toDisplayString(unref(t)("scope")) + ":", 1)
                        ]))
                      : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'scopeNote'), ({ language, label }, index) => {
                      return (openBlock(), createBlock("li", {
                        key: `${language}-${index}`,
                        lang: `${language}`
                      }, toDisplayString(label), 9, ["lang"]))
                    }), 128))
                  ])
                ]
              }
            }),
            _: 1
          }), _parent, _scopeId);
        } else {
          _push(`<!---->`);
        }
        if (fields_.value.editorialNote && jskos.languageMapContent(__props.item, 'editorialNote')) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.flat ? 'div' : unref(Tab)), {
            title: unref(t)('editorial')
          }, {
            default: withCtx((_, _push, _parent, _scopeId) => {
              if (_push) {
                _push(`<ul class="jskos-vue-itemDetails-list"${_scopeId}>`);
                if (__props.flat) {
                  _push(`<li${
                    _scopeId
                  }><b${
                    _scopeId
                  }>${
                    ssrInterpolate(unref(t)("editorial"))
                  }:</b></li>`);
                } else {
                  _push(`<!---->`);
                }
                _push(`<!--[-->`);
                ssrRenderList(iterateLanguageMapContent(__props.item, 'editorialNote'), ({ language, label }, index) => {
                  _push(`<li${
                    ssrRenderAttr("lang", `${language}`)
                  }${
                    _scopeId
                  }>${
                    ssrInterpolate(label)
                  }</li>`);
                });
                _push(`<!--]--></ul>`);
              } else {
                return [
                  createVNode("ul", { class: "jskos-vue-itemDetails-list" }, [
                    (__props.flat)
                      ? (openBlock(), createBlock("li", { key: 0 }, [
                          createVNode("b", null, toDisplayString(unref(t)("editorial")) + ":", 1)
                        ]))
                      : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'editorialNote'), ({ language, label }, index) => {
                      return (openBlock(), createBlock("li", {
                        key: `${language}-${index}`,
                        lang: `${language}`
                      }, toDisplayString(label), 9, ["lang"]))
                    }), 128))
                  ])
                ]
              }
            }),
            _: 1
          }), _parent, _scopeId);
        } else {
          _push(`<!---->`);
        }
        if (!__props.flat) {
          ssrRenderSlot(_ctx.$slots, "additionalTabs", {}, null, _push, _parent, _scopeId);
        } else {
          ssrRenderSlot(_ctx.$slots, "additionalFlat", {}, null, _push, _parent, _scopeId);
        }
      } else {
        return [
          (['identifier', 'type', 'publisher', 'created', 'issued', 'modified', 'languages', 'definition'].filter(p => fields_.value[p]).length)
            ? (openBlock(), createBlock(resolveDynamicComponent(__props.flat ? 'div' : unref(Tab)), {
                key: 0,
                title: unref(t)('info')
              }, {
                default: withCtx(() => [
                  (fields_.value.identifier)
                    ? (openBlock(), createBlock("ul", {
                        key: 0,
                        class: "jskos-vue-itemDetails-list"
                      }, [
                        (__props.flat)
                          ? (openBlock(), createBlock("li", { key: 0 }, [
                              createVNode("b", null, toDisplayString(unref(t)("identifier")) + ":", 1)
                            ]))
                          : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList([__props.item.uri].concat(__props.item.identifier).filter(identifier => identifier != null), (identifier, index) => {
                          return (openBlock(), createBlock("li", { key: index }, [
                            createVNode(_sfc_main$2, { href: identifier }, null, 8, ["href"]),
                            (identifier === __props.item.uri)
                              ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "jskos-vue-text-lightGrey"
                                }, " (URI)"))
                              : createCommentVNode("", true)
                          ]))
                        }), 128))
                      ]))
                    : createCommentVNode("", true),
                  createVNode("ul", { class: "jskos-vue-itemDetails-list" }, [
                    (fields_.value.type && types.value.length)
                      ? (openBlock(), createBlock("li", { key: 0 }, [
                          createVNode("b", null, toDisplayString(unref(t)("type")) + ":", 1),
                          createTextVNode(" " + toDisplayString(types.value.map(type => unref(prefLabel)(type)).join(", ")), 1)
                        ]))
                      : createCommentVNode("", true),
                    (fields_.value.publisher && __props.item.publisher?.length)
                      ? (openBlock(), createBlock("li", { key: 1 }, [
                          createVNode("b", null, toDisplayString(unref(t)("publisher")) + ": ", 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.item.publisher, (publisher, index) => {
                            return (openBlock(), createBlock(Fragment, {
                              key: `publisher-${index}`
                            }, [
                              (index > 0)
                                ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(" · ")
                                  ], 64))
                                : createCommentVNode("", true),
                              createVNode(_sfc_main$2, {
                                href: publisher.url || publisher.uri,
                                text: unref(prefLabel)(publisher)
                              }, null, 8, ["href", "text"])
                            ], 64))
                          }), 128))
                        ]))
                      : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(['created', 'issued', 'modified'].filter(p => fields_.value[p]), (prop) => {
                      return (openBlock(), createBlock(Fragment, null, [
                        (__props.item[prop])
                          ? (openBlock(), createBlock("li", { key: prop }, [
                              createVNode("b", null, toDisplayString(unref(t)(prop)) + ":", 1),
                              createTextVNode(" " + toDisplayString(dateToString(__props.item[prop])), 1)
                            ]))
                          : createCommentVNode("", true)
                      ], 64))
                    }), 256)),
                    (fields_.value.languages && __props.item.languages)
                      ? (openBlock(), createBlock("li", { key: 2 }, [
                          createVNode("b", null, toDisplayString(unref(t)("languages")) + ":", 1),
                          createTextVNode(" " + toDisplayString(__props.item.languages.join(", ")), 1)
                        ]))
                      : createCommentVNode("", true)
                  ]),
                  (fields_.value.definition && jskos.languageMapContent(__props.item, 'definition'))
                    ? (openBlock(), createBlock("ul", {
                        key: 1,
                        class: "jskos-vue-itemDetails-list"
                      }, [
                        createVNode("li", null, [
                          createVNode("b", null, toDisplayString(unref(t)("definition")) + ":", 1)
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'definition'), ({ language, label }, index) => {
                          return (openBlock(), createBlock("li", {
                            key: `${language}-${index}`,
                            lang: `${language}`
                          }, toDisplayString(label), 9, ["lang"]))
                        }), 128))
                      ]))
                    : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["title"]))
            : createCommentVNode("", true),
          (fields_.value.prefLabel || fields_.value.altLabel)
            ? (openBlock(), createBlock(resolveDynamicComponent(__props.flat ? 'div' : unref(Tab)), {
                key: 1,
                title: unref(t)('labels')
              }, {
                default: withCtx(() => [
                  (fields_.value.prefLabel)
                    ? (openBlock(), createBlock("ul", {
                        key: 0,
                        class: "jskos-vue-itemDetails-list"
                      }, [
                        (__props.flat)
                          ? (openBlock(), createBlock("li", { key: 0 }, [
                              createVNode("b", null, toDisplayString(unref(t)("labels")) + ":", 1)
                            ]))
                          : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'prefLabel'), ({ language, label }, index) => {
                          return (openBlock(), createBlock("li", {
                            key: `${language}-${index}`,
                            lang: `${language}`
                          }, toDisplayString(label), 9, ["lang"]))
                        }), 128))
                      ]))
                    : createCommentVNode("", true),
                  (fields_.value.altLabel && jskos.languageMapContent(__props.item, 'altLabel'))
                    ? (openBlock(), createBlock("ul", {
                        key: 1,
                        class: "jskos-vue-itemDetails-list"
                      }, [
                        createVNode("li", null, [
                          createVNode("b", null, toDisplayString(unref(t)("altLabels")) + ":", 1)
                        ]),
                        (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'altLabel'), ({ language, label }, index) => {
                          return (openBlock(), createBlock("li", {
                            key: `${language}-${index}`,
                            lang: `${language}`
                          }, toDisplayString(label), 9, ["lang"]))
                        }), 128))
                      ]))
                    : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["title"]))
            : createCommentVNode("", true),
          (fields_.value.scopeNote && jskos.languageMapContent(__props.item, 'scopeNote'))
            ? (openBlock(), createBlock(resolveDynamicComponent(__props.flat ? 'div' : unref(Tab)), {
                key: 2,
                title: unref(t)('scope')
              }, {
                default: withCtx(() => [
                  createVNode("ul", { class: "jskos-vue-itemDetails-list" }, [
                    (__props.flat)
                      ? (openBlock(), createBlock("li", { key: 0 }, [
                          createVNode("b", null, toDisplayString(unref(t)("scope")) + ":", 1)
                        ]))
                      : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'scopeNote'), ({ language, label }, index) => {
                      return (openBlock(), createBlock("li", {
                        key: `${language}-${index}`,
                        lang: `${language}`
                      }, toDisplayString(label), 9, ["lang"]))
                    }), 128))
                  ])
                ]),
                _: 1
              }, 8, ["title"]))
            : createCommentVNode("", true),
          (fields_.value.editorialNote && jskos.languageMapContent(__props.item, 'editorialNote'))
            ? (openBlock(), createBlock(resolveDynamicComponent(__props.flat ? 'div' : unref(Tab)), {
                key: 3,
                title: unref(t)('editorial')
              }, {
                default: withCtx(() => [
                  createVNode("ul", { class: "jskos-vue-itemDetails-list" }, [
                    (__props.flat)
                      ? (openBlock(), createBlock("li", { key: 0 }, [
                          createVNode("b", null, toDisplayString(unref(t)("editorial")) + ":", 1)
                        ]))
                      : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(iterateLanguageMapContent(__props.item, 'editorialNote'), ({ language, label }, index) => {
                      return (openBlock(), createBlock("li", {
                        key: `${language}-${index}`,
                        lang: `${language}`
                      }, toDisplayString(label), 9, ["lang"]))
                    }), 128))
                  ])
                ]),
                _: 1
              }, 8, ["title"]))
            : createCommentVNode("", true),
          (!__props.flat)
            ? renderSlot(_ctx.$slots, "additionalTabs", { key: 4 })
            : renderSlot(_ctx.$slots, "additionalFlat", { key: 5 })
        ]
      }
    }),
    _: 3
  }), _parent);
}
}

};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/ItemDetailsTabs.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};

const _sfc_main = {
  __name: 'ItemDetails',
  __ssrInlineRender: true,
  props: {
  // JSKOS item to be displayed
  item: {
    type: Object,
    required: true,
  },
  // options to be passed along to ItemList component instances
  itemListOptions: {
    type: Object,
    default: () => ({}),
  },
  showTabs: {
    type: Boolean,
    default: true,
  },
  showAncestors: {
    type: Boolean,
    default: true,
  },
  showBroader: {
    type: Boolean,
    default: true,
  },
  showNarrower: {
    type: Boolean,
    default: true,
  },
  dropzone: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  // whether details are displayed as tabs or flat
  flat: {
    type: Boolean,
    default: false,
  },
  // Configure which fields of the item are displayed
  fields: {
    type: Object,
    default: () => ({}),
  },
},
  emits: ["select"],
  setup(__props, { emit: __emit }) {

const { draggedItem, addDropzone } = dragAndDrop;

const { t } = useLocale();

const props = __props;

const emit = __emit;

// Drag and drop
const isDraggedConceptDifferent = computed(() => {
  return !jskos.compare(props.item, draggedItem.value)
});
const { isDraggingOver } = addDropzone(null, (item) => {
  props.dropzone && isDraggedConceptDifferent.value && emit("select", { item });
});
const itemListOptions_ = computed(() => Object.assign({ draggable: props.draggable }, props.itemListOptions));

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${
    ssrRenderAttrs(mergeProps({ class: "jskos-vue-itemDetails" }, _attrs))
  }><div class="jskos-vue-itemDetails-dropzone jskos-vue-text-small" style="${
    ssrRenderStyle((__props.dropzone && unref(isDraggingOver) && isDraggedConceptDifferent.value) ? null : { display: "none" })
  }">${
    ssrInterpolate(unref(t)("dropzone"))
  }</div><div class="jskos-vue-itemDetails-name">`);
  ssrRenderSlot(_ctx.$slots, "before", {}, null, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "beforeName", {}, null, _push, _parent);
  _push(ssrRenderComponent(_sfc_main$3, {
    item: __props.item,
    draggable: __props.draggable
  }, null, _parent));
  ssrRenderSlot(_ctx.$slots, "afterName", {}, null, _push, _parent);
  _push(`</div>`);
  if (__props.fields.license !== false && __props.item.license && __props.item.license.length) {
    _push(`<div>${ssrInterpolate(unref(t)("license"))}: `);
    _push(ssrRenderComponent(_sfc_main$4, { item: __props.item }, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if (__props.showAncestors) {
    _push(ssrRenderComponent(_sfc_main$5, mergeProps(itemListOptions_.value, {
      items: (__props.item.ancestors || []).filter(Boolean).reverse(),
      indent: true,
      class: "jskos-vue-itemDetails-ancestors",
      onSelect: $event => (_ctx.$emit('select', { item: $event.item }))
    }), null, _parent));
  } else {
    _push(`<!---->`);
  }
  if (__props.showBroader) {
    _push(ssrRenderComponent(_sfc_main$5, mergeProps(itemListOptions_.value, {
      items: (__props.item.broader || []).filter(i => !jskos.isContainedIn(i, __props.item.ancestors || [])),
      class: "jskos-vue-itemDetails-broader",
      onSelect: $event => (_ctx.$emit('select', { item: $event.item }))
    }), null, _parent));
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "beforeTabs", {}, null, _push, _parent);
  if (__props.showTabs) {
    _push(ssrRenderComponent(_sfc_main$1, {
      item: __props.item,
      flat: __props.flat,
      fields: __props.fields
    }, {
      additionalTabs: withCtx((_, _push, _parent, _scopeId) => {
        if (_push) {
          ssrRenderSlot(_ctx.$slots, "additionalTabs", {}, null, _push, _parent, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "additionalTabs")
          ]
        }
      }),
      _: 3
    }, _parent));
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "afterTabs", {}, null, _push, _parent);
  if (__props.showNarrower) {
    _push(ssrRenderComponent(_sfc_main$5, mergeProps(itemListOptions_.value, {
      items: __props.item.narrower || [],
      class: "jskos-vue-itemDetails-narrower",
      onSelect: $event => (_ctx.$emit('select', { item: $event.item }))
    }), null, _parent));
  } else {
    _push(`<!---->`);
  }
  ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
  _push(`</div>`);
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/ItemDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _, _sfc_main$1 as a };
