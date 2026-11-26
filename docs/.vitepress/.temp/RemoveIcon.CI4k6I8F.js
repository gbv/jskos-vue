import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { a as useLocale } from './utils.Br9Zv_eu.js';

const _sfc_main = /*@__PURE__*/Object.assign({ name: "RemoveIcon" }, {
  __name: 'RemoveIcon',
  __ssrInlineRender: true,
  props: {
  ariaLabel: { type: String, default: undefined },
  title: { type: String, default: undefined },
},
  emits: ["click"],
  setup(__props) {







const { t } = useLocale({
  en: { remove: "Remove" },
  de: { remove: "Entfernen" },
});

return (_ctx, _push, _parent, _attrs) => {
  _push(`<button${ssrRenderAttrs(mergeProps({
    type: "button",
    class: "jskos-vue-removeIcon",
    "aria-label": __props.ariaLabel ?? unref(t)('remove'),
    title: __props.title ?? __props.ariaLabel ?? unref(t)('remove')
  }, _attrs))}><span aria-hidden="true">×</span></button>`);
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/RemoveIcon.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
