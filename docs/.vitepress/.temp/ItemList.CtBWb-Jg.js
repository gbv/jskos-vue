import { computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './ItemName.BpIluzQm.js';
import { _ as _sfc_main$2 } from './LoadingIndicator.e8vfq6Bx.js';
import VueScrollTo from 'vue-scrollto';
/* empty css                */

const _sfc_main = {
  __name: 'ItemList',
  __ssrInlineRender: true,
  props: {
  items: {
    type: Array,
    required: true,
  },
  // property for the JSKOS item inside each object in `items` (no property by default)
  itemProperty: {
    type: String,
    default: null,
  },
  rowMode: {
    type: Boolean,
    default: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  // option to add small indent to items further down the list (e.g. for ancestor concepts)
  indent: {
    type: Boolean,
    default: false,
  },
  // options to be passed along to ItemName component
  itemNameOptions: {
    type: Object,
    default: () => ({}),
  },
  // show indicator to the right of each item in the list
  // values can be either boolean or string color values
  indicatorByUri: {
    type: Object,
    default: () => ({}),
  },
  highlightByUri: {
    type: Object,
    default: () => ({}),
  },
},
  emits: ["select"],
  setup(__props, { expose: __expose }) {
const props = __props;



const itemNameOptions_ = computed(() => {
  return Object.assign({ draggable: props.draggable }, props.itemNameOptions || {})
});

function styleForItem(item, index) {
  let style = {};
  let color = props.indicatorByUri[item && item.uri];
  if (!color) {
    color = "transparent";
  }
  // only override color if it's not the default color (`true`)
  if (color !== true) {
    style["--jskos-vue-itemList-indicator-color"] = color;
  }
  let background = props.highlightByUri[item && item.uri];
  if (!background) {
    background = "transparent";
  } else {
    style["background-color"] = background === true ? "var(--jskos-vue-conceptTree-selected-bgColor)" : background;
  }
  // add indent if necessary
  if (props.indent) {
    style["padding-left"] = `${(index + 1) * 5}px`;
  }
  return style
}

// returns the actual JSKOS item
function getItem(item) {
  if (props.itemProperty) {
    return item[props.itemProperty]
  }
  return item
}

// checks if a certain URI is in view
function isUriInView(uri, partial = 60) {
  const container = this.$el;
  const element = container.querySelectorAll(`[data-uri='${uri}']`)[0];
  if (!container || !element) {
    return false
  }
  // Adapted from https://stackoverflow.com/a/49253390 and https://stackoverflow.com/a/43386795:
  let cTop = container.scrollTop;
  let cBottom = cTop + container.clientHeight;
  let eTop = element.offsetTop - container.offsetTop;
  let eBottom = eTop + element.clientHeight;
  let isTotal = (eTop >= cTop && eBottom <= cBottom);
  let isPartial;
  if (partial === true) {
    isPartial = (eTop < cTop && eBottom > cTop) || (eBottom > cBottom && eTop < cBottom);
  } else if(typeof partial === "number"){
    if (eTop < cTop && eBottom > cTop) {
      isPartial = ((eBottom - cTop) * 100) / element.clientHeight > partial;
    } else if (eBottom > cBottom && eTop < cBottom){ 
      isPartial = ((cBottom - eTop) * 100) / element.clientHeight > partial;
    }
  }
  return !!(isTotal || partial && isPartial)
}

// scrolls to a certain URI in the list
function scrollToUri(uri, onlyIfNotInView = false) {
  if (onlyIfNotInView && this.isUriInView(uri)) {
    return
  }
  const container = this.$el;
  const el = container.querySelectorAll(`[data-uri='${uri}']`)[0];
  const options = {
    container,
    easing: "ease-in",
    offset: -15,
    cancelable: true,
    x: false,
    y: true,
  };
  if (el) {
    VueScrollTo.scrollTo(el, 200, options);
  }
}

__expose({ isUriInView, scrollToUri });

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "jskos-vue-itemList" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "beforeList", {}, null, _push, _parent);
  _push(`<!--[-->`);
  ssrRenderList(__props.items, (item, index) => {
    _push(`<div class="${
      ssrRenderClass({
        'jskos-vue-itemList-item': true,
        'jskos-vue-itemList-row': __props.rowMode,
        'jskos-vue-itemList-row-selectable': __props.rowMode && !!getItem(item),
      })
    }" style="${
      ssrRenderStyle(styleForItem(getItem(item), index))
    }"${
      ssrRenderAttr("data-uri", getItem(item) && getItem(item).uri)
    }${
      ssrRenderAttr("draggable", __props.rowMode && __props.draggable && !!getItem(item))
    }>`);
    ssrRenderSlot(_ctx.$slots, "beforeItem", { item: item }, null, _push, _parent);
    if (getItem(item)) {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ ref_for: true }, itemNameOptions_.value, {
        item: getItem(item),
        draggable: (itemNameOptions_.value.draggable !== false) && !__props.rowMode,
        onClick: $event => (_ctx.$emit('select', { item: getItem(item), row: false }))
      }), null, _parent));
    } else {
      _push(ssrRenderComponent(_sfc_main$2, { style: {"align-self":"center"} }, null, _parent));
    }
    ssrRenderSlot(_ctx.$slots, "afterItem", { item: item }, null, _push, _parent);
    _push(`</div>`);
  });
  _push(`<!--]-->`);
  ssrRenderSlot(_ctx.$slots, "afterList", {}, null, _push, _parent);
  _push(`</div>`);
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/ItemList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
