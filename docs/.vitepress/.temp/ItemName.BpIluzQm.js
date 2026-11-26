import { computed, mergeProps, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import * as jskos from 'jskos-tools';
import { u as useContentLanguage } from './utils.Br9Zv_eu.js';
/* empty css                */

const plugins = reactive({
  label: [],
  processLabel(label, options) {
    for (let plugin of this.label) {
      label = plugin(label, options);
    }
    return label
  },
  notation: [],
  processNotation(notation, options) {
    for (let plugin of this.notation) {
      notation = plugin(notation, options);
    }
    return notation
  },
});

const __default__ = {
  addLabelPlugin(plugin) {
    plugins.label.push(plugin);
  },
  addNotationPlugin(plugin) {
    plugins.notation.push(plugin);
  },
};

const _sfc_main = /*@__PURE__*/Object.assign(__default__, {
  __name: 'ItemName',
  __ssrInlineRender: true,
  props: {
  // JSKOS item
  item: {
    type: Object,
    required: true,
  },
  // whether to show the item's notation
  showNotation: {
    type: Boolean,
    default: true,
  },
  // whether to show the item's label
  showLabel: {
    type: Boolean,
    default: true,
  },
  // fallback label (only shown if both notation and label are empty)
  fallbackLabel: {
    type: String,
    default: "???",
  },
  // change language of the label (by default uses jskos-tools' "languagePreference")
  language: {
    type: String,
    default: "",
  },
  // whether the item is clickable
  clickable: {
    type: Boolean,
    default: false,
  },
  // whether the item is draggable
  draggable: {
    type: Boolean,
    default: true,
  },
},
  setup(__props) {
const { prefLabel: contentPrefLabel } = useContentLanguage();

const props = __props;

const notation = computed(() =>
  props.showNotation
    ? plugins.processNotation(jskos.notation(props.item), props)
    : "",
);
const label = computed(() =>
  props.showLabel
    ? plugins.processLabel(contentPrefLabel(props.item, {
      fallbackToUri: !notation.value,
      language: props.language,
    }), props)
    : "",
);

return (_ctx, _push, _parent, _attrs) => {
  _push(`<span${ssrRenderAttrs(mergeProps({
    class: {
      'jskos-vue-itemName': true,
      'jskos-vue-clickable': __props.clickable
    },
    draggable: __props.draggable
  }, _attrs))}>`);
  if (__props.showNotation || label.value === '') {
    _push(`<span class="jskos-vue-itemName-notation">${(notation.value) ?? ''}</span>`);
  } else {
    _push(`<!---->`);
  }
  if (label.value !== '') {
    _push(`<!--[-->`);
    if (__props.showNotation && notation.value !== '') {
      _push(`<span>${(' ')}</span>`);
    } else {
      _push(`<!---->`);
    }
    _push(` ${ssrInterpolate(label.value)}<!--]-->`);
  } else {
    _push(`<!---->`);
  }
  if ((!__props.showNotation || notation.value === '') && label.value === '') {
    _push(`<!--[-->${ssrInterpolate(__props.fallbackLabel)}<!--]-->`);
  } else {
    _push(`<!---->`);
  }
  _push(`</span>`);
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/ItemName.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
