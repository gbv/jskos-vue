import { computed, ref, watch, useTemplateRef, reactive, mergeProps, withCtx, renderSlot, openBlock, createBlock, Fragment, renderList, withModifiers, createCommentVNode, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList } from 'vue/server-renderer';
import * as jskos from 'jskos-tools';
import { _ as _sfc_main$1 } from './ItemList.CtBWb-Jg.js';
import { _ as _sfc_main$2 } from './Arrow.C-ZbZRg0.js';
/* empty css                */
import { _ as _export_sfc } from './plugin-vue_export-helper.pcqpp-6-.js';

const _sfc_main = /*@__PURE__*/Object.assign({ name: "ConceptTree" }, {
  __name: 'ConceptTree',
  __ssrInlineRender: true,
  props: {
  // v-model value is the selected concept, marked specifically
  modelValue: {
    type: Object,
    default: null,
  },
  // array of concepts to be displayed
  concepts: {
    type: Array,
    default: null,
  },
  // whether to display concept hierarchy (via narrower concepts)
  hierarchy: {
    type: Boolean,
    default: true,
  },
  // options to be passed along to ItemList component
  itemListOptions: {
    type: Object,
    default: () => ({}),
  },
  // load concepts via registry object
  registry: {
    type: Object,
    default: null,
  },
  // load concepts from this concept scheme
  scheme: {
    type: Object,
    default: null,
  },
},
  emits: ["select", "open", "close", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {



const props = __props;

const registry = computed(() => {
  if (!props.registry) {
    const top0 = props.concepts?.[0];
    return top0?._registry || top0?.inScheme?.[0]?._registry
  }
  return props.registry
});

const loadedConcepts = ref([]);

watch(
  () => props.concepts,
  (value) => {
    loadedConcepts.value = value || [];
  },
  { immediate: true },
);

const getTop = async () => {
  if (props.concepts?.length) {
    return loadedConcepts.value
  }
  if (registry.value?.getTop && props.scheme?.uri && !props.concepts) {
    loadedConcepts.value = jskos.sortConcepts(
      await registry.value.getTop({ scheme: props.scheme }),
    );
  }
  return loadedConcepts.value
};

async function ensureTopConcepts() {
  if (loadedConcepts.value?.length) {
    return loadedConcepts.value
  }
  return await getTop()
}

watch(() => props.registry, getTop);
watch(() => props.scheme, getTop, { immediate: true });

const emit = __emit;

const itemListRef = useTemplateRef("itemList");

// reactive object of concept URIs to open status values
const isOpen = reactive({});
// recursively get all children (narrower) items for a concept, depending on open status
const getChildrenItems = (item) => {
  let out = [];
  let concept = item.concept;
  let depth = item.depth + 1;
  
  if (concept && isOpen[concept.uri]) {
    for (const child of concept.narrower || []) {
      const row = {
        concept: child,
        depth,
        isSelected: jskos.compare(props.modelValue, child),
      };
      out.push(row);
      out = out.concat(getChildrenItems(row));
    }
  }
  return out
};

// convert list of concepts into items with concept, depth, and isSelected
const items = computed(() => {
  let out = [];
  for (const concept of loadedConcepts.value) {
    const row = {
      concept,
      depth: 0,
      isSelected: jskos.compare(props.modelValue, concept),
    };
    out.push(row);
    if (props.hierarchy) {
      out = out.concat(getChildrenItems(row));
    }
  }
  return out
});

// Load children of a concept if needed and possible
const getNarrower = async (concept) => {
  if (concept.narrower && !concept.narrower.includes(null)) {
    return
  }

  if (registry.value?.getNarrower) {
    concept.narrower = jskos.sortConcepts(
      await registry.value.getNarrower({ concept }),
    );
    return
  }
};

const open = async concept => {
  isOpen[concept.uri] = true;
  // a certain concept's narrower concepts were opened
  emit("open", concept);
  await getNarrower(concept);
};
const close = (concept) => {
  if (!isOpen[concept.uri]) {
    return
  }
  
  // Prevent closing if selected concept is child
  let current = props.modelValue?.uri, initial = current;
  while (current) {
    const currentConcept = items.value.find(i => jskos.compare(i.concept, { uri: current }))?.concept;
    if (current !== initial && jskos.compare(currentConcept, concept)) {
      return
    }
    current = (currentConcept?.ancestors?.[0] || currentConcept?.broader?.[0])?.uri;
  }
  delete isOpen[concept.uri];
  // a certain concept's narrower concepts were closed
  emit("close", concept);
};
const toggle = (concept) => {
  if (isOpen[concept.uri]) {
    close(concept);
  } else {
    open (concept);
  }
};
const collapse = () => {
  for (let uri in isOpen) {
    close({ uri });
  }
};

// --- methods that proxy to ItemList ---
function isUriInView(...args) {
  return itemListRef.value?.isUriInView?.(...args)
}

function scrollToUri(...args) {
  return itemListRef.value?.scrollToUri?.(...args)
}

// Navigate to a concept URI in the hierarchy.
async function navigateToUri(uriOrConcept, { select = true, onlyIfNotInView = true } = {}) {
  const uri = typeof uriOrConcept === "string" ? uriOrConcept : uriOrConcept?.uri;
  if (!uri) {
    return false
  }

  await ensureTopConcepts();

  // Fast path: already rendered -> scroll (+ optional select)
  const rendered = items.value.find(i => jskos.compare(i.concept, { uri }))?.concept;
  if (rendered) {
    if (select) {
      emit("update:modelValue", rendered);
    }
    await nextTick();
    scrollToUri(uri, onlyIfNotInView);
    return true
  }

  if (!props.hierarchy) {
    return false
  }

  // Find registry from top concepts
  if (!registry.value?.getConcepts) {
    return false
  }

  // Build parent chain target -> ... -> root
  let chain = [{ uri }]; // will become [root, ..., target]
  try {
    const fetchOne = async uri => await registry.value?.getConcepts({ concepts: [{ uri }] }).then(c => c?.[0]);
    let current = await fetchOne(uri);
    const seen = new Set([uri]);

    while (current) {
      const parentUri = (current.ancestors?.[0] || current.broader?.[0])?.uri;
      if (!parentUri || seen.has(parentUri)) {
        break
      }
      seen.add(parentUri);
      chain.push({ uri: parentUri });
      current = await fetchOne(parentUri);
    }
    chain.reverse();
  } catch(e) {
    return false
  }

  // Walk from root -> target, opening/loading narrower
  let current = loadedConcepts.value?.find(c => jskos.compare(c, chain[0]));
  if (!current) {
    return false
  }

  for (let i = 1; i < chain.length; i++) {
    // Mark open (reactive)
    isOpen[current.uri] = true;

    // Load children if needed
    await getNarrower(current);

    const next = (current.narrower || []).find(ch => jskos.compare(ch, chain[i]));
    if (!next) {
      return false
    }
    current = next;
  }

  // Select + scroll
  if (select) {
    emit("update:modelValue", current);
  }
  await nextTick();
  scrollToUri(uri, onlyIfNotInView);
  return true
}

__expose({ isUriInView, scrollToUri, navigateToUri, open, close, collapse });

return (_ctx, _push, _parent, _attrs) => {
  _push(ssrRenderComponent(_sfc_main$1, mergeProps({ ref: "itemList" }, __props.itemListOptions, {
    class: {
      'jskos-vue-conceptTree': true,
      'jskos-vue-conceptTree-noHierarchy': !__props.hierarchy,
    },
    items: items.value,
    "item-property": "concept",
    "highlight-by-uri": __props.modelValue?.uri ? { [__props.modelValue.uri]: true } : {},
    onSelect: $event => {_ctx.$emit('select', $event); _ctx.$emit('update:modelValue', $event.item);}
  }, _attrs), {
    beforeItem: withCtx(({ item }, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<!--[-->`);
        ssrRenderList(item.depth, (n) => {
          _push(`<div class="jskos-vue-conceptTree-depthSpacer" data-v-1e66e5b7${_scopeId}></div>`);
        });
        _push(`<!--]-->`);
        if (__props.hierarchy) {
          _push(`<div class="jskos-vue-conceptTree-arrow" data-v-1e66e5b7${_scopeId}>`);
          if (item.concept && item.concept.narrower && item.concept.narrower.length !== 0) {
            _push(ssrRenderComponent(_sfc_main$2, {
              direction: isOpen[item.concept.uri] ? 'down' : 'right',
              clickable: true
            }, null, _parent, _scopeId));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "beforeItem", {
          item: item.concept
        }, null, _push, _parent, _scopeId);
      } else {
        return [
          (openBlock(true), createBlock(Fragment, null, renderList(item.depth, (n) => {
            return (openBlock(), createBlock("div", {
              key: n,
              class: "jskos-vue-conceptTree-depthSpacer"
            }))
          }), 128)),
          (__props.hierarchy)
            ? (openBlock(), createBlock("div", {
                key: 0,
                class: "jskos-vue-conceptTree-arrow",
                onClick: withModifiers($event => (toggle(item.concept)), ["stop"])
              }, [
                (item.concept && item.concept.narrower && item.concept.narrower.length !== 0)
                  ? (openBlock(), createBlock(_sfc_main$2, {
                      key: 0,
                      direction: isOpen[item.concept.uri] ? 'down' : 'right',
                      clickable: true
                    }, null, 8, ["direction"]))
                  : createCommentVNode("", true)
              ], 8, ["onClick"]))
            : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "beforeItem", {
            item: item.concept
          }, undefined, true)
        ]
      }
    }),
    afterItem: withCtx(({ item }, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "afterItem", {
          item: item.concept
        }, null, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "afterItem", {
            item: item.concept
          }, undefined, true)
        ]
      }
    }),
    beforeList: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "beforeList", {}, null, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "beforeList", {}, undefined, true)
        ]
      }
    }),
    afterList: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        ssrRenderSlot(_ctx.$slots, "afterList", {}, null, _push, _parent, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "afterList", {}, undefined, true)
        ]
      }
    }),
    _: 3
  }, _parent));
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/ConceptTree.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const ConceptTree = /*#__PURE__*/_export_sfc(_sfc_main, [['__scopeId',"data-v-1e66e5b7"]]);

export { ConceptTree as C };
