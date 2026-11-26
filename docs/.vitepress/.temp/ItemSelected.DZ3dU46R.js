import { useModel, computed, mergeProps, createSlots, withCtx, createVNode, withModifiers, mergeModels, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _sfc_main$3 } from './Arrow.C-ZbZRg0.js';
import { _ as _sfc_main$4 } from './ItemList.CtBWb-Jg.js';
import { _ as _sfc_main$1 } from './ItemName.BpIluzQm.js';
import { _ as _sfc_main$2 } from './RemoveIcon.CI4k6I8F.js';

const _sfc_main = /*@__PURE__*/Object.assign({ name: "ItemSelected" }, {
  __name: 'ItemSelected',
  __ssrInlineRender: true,
  props: /*@__PURE__*/mergeModels({
  view: { type: String, default: "tags" }, // "tags" | "table" | "list"
  labelField: { type: String, default: "__label" },
  orderable: { type: Boolean, default: false },
  itemNameOptions: { type: Object, default: () => ({}) },
  removeable: { type: Boolean, default: false },
  removable: { type: Boolean, default: false },
}, {
    "modelValue": { type: Array, default: () => [] },
    "modelModifiers": {},
  }),
  emits: /*@__PURE__*/mergeModels(["select"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {



const items = useModel(__props, "modelValue");

const props = __props;

const emit = __emit;

const removableEffective = computed(() => props.removable || props.removeable);

const itemNameProps = computed(() => ({
  ...props.itemNameOptions,
  clickable: true,
  draggable: false,
}));

const tagItemNameProps = computed(() => ({
  ...props.itemNameOptions,
  draggable: false,
  clickable: true,
  showNotation: true,
  showLabel: true,
}));

const listItemNameOptions = computed(() => ({
  ...props.itemNameOptions,
  clickable: false,
  draggable: false,
  showNotation: true,
  showLabel: true,
}));


function indexOfItem(target) {
  if (!target) {
    return -1
  }
  const uri = target?.uri;
  if (uri) {
    return items.value.findIndex(i => i?.uri === uri)
  }
  return items.value.indexOf(target)
}


function removeItem(item) {
  const idx = indexOfItem(item);
  if (idx === -1) {
    return
  }
  items.value.splice(idx, 1); // in-place
}

function onListSelect(ev) {
  if (ev?.item) {
    emit("select", { item: ev.item });
  }
}


return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "jskos-vue-itemSelected" }, _attrs))}>`);
  if (__props.view === 'tags' && items.value.length) {
    _push(`<div class="jskos-vue-itemSelected-tags"><!--[-->`);
    ssrRenderList(items.value, (item, index) => {
      _push(`<span class="jskos-vue-itemSelected-tag">`);
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ item: item }, { ref_for: true }, tagItemNameProps.value, {
        onClick: $event => (emit('select', { item }))
      }), null, _parent));
      if (removableEffective.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          onClick: $event => (removeItem(item))
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
    });
    _push(`<!--]--></div>`);
  } else if (__props.view === 'table' && items.value.length) {
    _push(`<div class="jskos-vue-itemSelected-table"><!--[-->`);
    ssrRenderList(items.value, (item, index) => {
      _push(`<div class="jskos-vue-itemSelected-row"><div class="jskos-vue-itemSelected-cell">`);
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ item: item }, { ref_for: true }, itemNameProps.value, {
        onClick: $event => (emit('select', { item }))
      }), null, _parent));
      _push(`</div><div class="jskos-vue-itemSelected-actions"><div class="jskos-vue-itemSelected-actionGroup">`);
      if (__props.orderable) {
        _push(`<button type="button" class="jskos-vue-itemSelected-actionBtn"${(ssrIncludeBooleanAttr(index === 0)) ? " disabled" : ""} aria-label="Move up" title="Move up">`);
        _push(ssrRenderComponent(_sfc_main$3, { direction: "up" }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.orderable) {
        _push(`<button type="button" class="jskos-vue-itemSelected-actionBtn"${(ssrIncludeBooleanAttr(index === items.value.length - 1)) ? " disabled" : ""} aria-label="Move down" title="Move down">`);
        _push(ssrRenderComponent(_sfc_main$3, { direction: "down" }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      if (removableEffective.value) {
        _push(ssrRenderComponent(_sfc_main$2, {
          class: "jskos-vue-itemSelected-actionBtn",
          onClick: $event => (removeItem(item))
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    });
    _push(`<!--]--></div>`);
  } else if (__props.view === 'list' && items.value.length) {
    _push(ssrRenderComponent(_sfc_main$4, {
      items: items.value,
      "item-name-options": listItemNameOptions.value,
      onSelect: onListSelect
    }, createSlots({ _: 2 }, [
      (removableEffective.value)
        ? {
            name: "afterItem",
            fn: withCtx(({ item }, _push, _parent, _scopeId) => {
              if (_push) {
                _push(ssrRenderComponent(_sfc_main$2, {
                  class: "jskos-vue-itemSelected-listRemove",
                  onClick: $event => (removeItem(item))
                }, null, _parent, _scopeId));
              } else {
                return [
                  createVNode(_sfc_main$2, {
                    class: "jskos-vue-itemSelected-listRemove",
                    onClick: withModifiers($event => (removeItem(item)), ["stop"])
                  }, null, 8, ["onClick"])
                ]
              }
            }),
            key: "0"
          }
        : undefined
    ]), _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/ItemSelected.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
