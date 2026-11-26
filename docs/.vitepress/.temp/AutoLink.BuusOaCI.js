import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = {
  __name: 'AutoLink',
  __ssrInlineRender: true,
  props: {
  // The string that is potentially a URL.
  href: {
    type: String,
    default: "",
  },
  //  The text that is shown (defaults to URL).
  text: {
    type: String,
    default: "",
  },
},
  setup(__props) {

/**
 * Represents an element that automatically converts a valid URL into a link.
 */



return (_ctx, _push, _parent, _attrs) => {
  if (__props.href.startsWith('http://') || __props.href.startsWith('https://')) {
    _push(`<a${ssrRenderAttrs(mergeProps({
      href: __props.href,
      target: "_blank"
    }, _attrs))}>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, () => {
      _push(`${ssrInterpolate(__props.text || __props.href)}`);
    }, _push, _parent);
    _push(`</a>`);
  } else {
    _push(`<span${ssrRenderAttrs(_attrs)}>`);
    ssrRenderSlot(_ctx.$slots, "default", {}, () => {
      _push(`${ssrInterpolate(__props.text || __props.href)}`);
    }, _push, _parent);
    _push(`</span>`);
  }
}
}

};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/AutoLink.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { _sfc_main as _ };
