import { onBeforeMount, ref, computed, mergeProps, useSSRContext, withCtx, createVNode, createTextVNode, unref } from 'vue';
import { ssrRenderTeleport, ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
/* empty css                */
import { _ as _export_sfc } from './plugin-vue_export-helper.pcqpp-6-.js';
import { Tabs, Tab } from 'jskos-vue-tabs';
/* empty css               */

const _sfc_main$1 = /*@__PURE__*/Object.assign({
  inheritAttrs: false,
}, {
  __name: 'Modal',
  __ssrInlineRender: true,
  props: {
  modelValue: {
    type: Boolean,
    required: false,
    default: undefined,
  },
},
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {



const props = __props;

const emit = __emit;

onBeforeMount(() => {
  // Check if #jskos-vue-modal-area already exists
  const id = "jskos-vue-modal-area";
  const existing = document.getElementById(id);
  if (!existing) {
    // Create element and append to body
    const element = document.createElement("div");
    element.id = id;
    document.body.appendChild(element);
  }
});

const internalShown = ref(false);
const shown = computed({
  get() {
    if (props.modelValue === undefined) {
      return internalShown.value
    }
    return props.modelValue
  },
  set(value) {
    internalShown.value = value;
    emit("update:modelValue", value);
  },
});

const show = () => {
  shown.value = true;
};
const hide = () => {
  shown.value = false;
};

__expose({
  show,
  hide,
});

return (_ctx, _push, _parent, _attrs) => {
  ssrRenderTeleport(_push, (_push) => {
    if (shown.value) {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "jskos-vue-modal" }, _ctx.$attrs))} data-v-8a852e95><div class="jskos-vue-modal-dialog" data-v-8a852e95><header class="jskos-vue-modal-header" data-v-8a852e95>`);
      ssrRenderSlot(_ctx.$slots, "header", {}, () => {
        _push(`<h1 data-v-8a852e95></h1>`);
      }, _push, _parent);
      _push(`<button type="button" aria-label="Close" data-v-8a852e95> × </button></header><div class="jskos-vue-modal-body" data-v-8a852e95>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><footer data-v-8a852e95>`);
      ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
      _push(`</footer></div><div class="jskos-vue-modal-backdrop" data-v-8a852e95></div></div>`);
    } else {
      _push(`<!---->`);
    }
  }, "#jskos-vue-modal-area", false, _parent);
}
}

});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("../src/components/Modal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined
};
const Modal = /*#__PURE__*/_export_sfc(_sfc_main$1, [['__scopeId',"data-v-8a852e95"]]);

const __pageData = JSON.parse("{\"title\":\"Modal\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"components/Modal.md\",\"filePath\":\"components/Modal.md\"}");
const __default__ = {name:"components/Modal.md"};
const _sfc_main = /*@__PURE__*/Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {

const modalShown = ref(false);
const testModal = ref();

// Second example
const tabsModalShown = ref(false);

return (_ctx, _push, _parent, _attrs) => {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="modal" tabindex="-1">Modal <a class="header-anchor" href="#modal" aria-label="Permalink to &quot;Modal&quot;">​</a></h1><p>A full-screen modal.</p><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><ul><li><code>modelValue</code> <em>boolean, v-model</em> — whether the modal is currently shown</li></ul><h2 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h2><ul><li><code>default</code> — body content</li><li><code>header</code> — header content</li><li><code>footer</code> — footer content</li></ul><h2 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h2><ul><li><code>show</code> — show the modal</li><li><code>hide</code> — hide the modal</li></ul><h2 id="css-variables" tabindex="-1">CSS Variables <a class="header-anchor" href="#css-variables" aria-label="Permalink to &quot;CSS Variables&quot;">​</a></h2><ul><li><code>--jskos-vue-modal-bgColor</code> — background color for header and body of the modal</li><li><code>--jskos-vue-modal-minWidth</code> — minimum width of the modal. Set this value to <code>var(--jskos-vue-modal-maxWidth)</code> to have a consistently sized full-screen modal.</li><li><code>--jskos-vue-modal-maxWidth</code> — maximum width of the modal</li><li><code>--jskos-vue-modal-minHeight</code> — minimum height of the modal. Set this value to <code>var(--jskos-vue-modal-maxHeight)</code> to have a consistently sized full-screen modal.</li><li><code>--jskos-vue-modal-maxHeight</code> — maximum height of the modal</li><li><code>--jskos-vue-modal-zIndexBase</code> — base value for <code>z-index</code></li></ul><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2><h3 id="two-different-ways-to-show-hide-modals" tabindex="-1">Two different ways to show/hide modals <a class="header-anchor" href="#two-different-ways-to-show-hide-modals" aria-label="Permalink to &quot;Two different ways to show/hide modals&quot;">​</a></h3><p><button>Show Modal via v-model value</button><button>Show Modal via method</button></p>`);
  _push(ssrRenderComponent(Modal, {
    modelValue: modalShown.value,
    "onUpdate:modelValue": $event => ((modalShown).value = $event),
    ref_key: "testModal",
    ref: testModal
  }, {
    header: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<h1${_scopeId}>Test Header</h1>`);
      } else {
        return [
          createVNode("h1", null, "Test Header")
        ]
      }
    }),
    footer: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`Test Footer`);
      } else {
        return [
          createTextVNode("Test Footer")
        ]
      }
    }),
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<div style="${
          ssrRenderStyle({"padding":"10px"})
        }"${
          _scopeId
        }>Test Content</div>`);
      } else {
        return [
          createVNode("div", { style: {"padding":"10px"} }, "Test Content")
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">button</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> v-on</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">:</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">click</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">modalShown </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> true</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Show Modal via v-model value&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">button</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">button</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> v-on</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">:</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">click</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">showTestModal</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Show Modal via method&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">button</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">modal</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    v-model</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">modalShown</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    ref</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;testModal&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> v-slot</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">:</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">header</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">h1</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Test Header&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">h1</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> v-slot</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">:</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">footer</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Test Footer&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"})
  }">    &lt;!-- Note that by default, there is no padding or margins for the content div. --&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> style</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">padding</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">10</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">px</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Test Content&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">div</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">modal</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> setup</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { Modal } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { ref } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;vue&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> modalShown</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> ref</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">false</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">)</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> testModal</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> ref</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">()</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> showTestModal</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> () </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=&gt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> {</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  testModal.value.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">show</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">()</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">}</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span></code></pre></div><h3 id="modal-with-tabs-and-fixed-size" tabindex="-1">Modal with tabs and fixed size <a class="header-anchor" href="#modal-with-tabs-and-fixed-size" aria-label="Permalink to &quot;Modal with tabs and fixed size&quot;">​</a></h3><p><button>Show Modal</button></p>`);
  _push(ssrRenderComponent(Modal, {
    modelValue: tabsModalShown.value,
    "onUpdate:modelValue": $event => ((tabsModalShown).value = $event),
    style: {"--jskos-vue-modal-minWidth":"var(--jskos-vue-modal-maxWidth)","--jskos-vue-modal-minHeight":"var(--jskos-vue-modal-maxHeight)"}
  }, {
    header: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`<h1${_scopeId}>Test Header</h1>`);
      } else {
        return [
          createVNode("h1", null, "Test Header")
        ]
      }
    }),
    footer: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(`Test Footer`);
      } else {
        return [
          createTextVNode("Test Footer")
        ]
      }
    }),
    default: withCtx((_, _push, _parent, _scopeId) => {
      if (_push) {
        _push(ssrRenderComponent(unref(Tabs), { style: {"position":"absolute","top":"0","left":"0","right":"0","bottom":"0"} }, {
          default: withCtx((_, _push, _parent, _scopeId) => {
            if (_push) {
              _push(ssrRenderComponent(unref(Tab), { title: "Tab 1" }, {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    _push(`<p${
                      _scopeId
                    }>Because the &quot;Tabs&quot; component changes dimensions with the tab content, we fixate <code${
                      _scopeId
                    }>minWidth</code> and <code${
                      _scopeId
                    }>minHeight</code> via CSS variables.</p>`);
                  } else {
                    return [
                      createVNode("p", null, [
                        createTextVNode("Because the \"Tabs\" component changes dimensions with the tab content, we fixate "),
                        createVNode("code", null, "minWidth"),
                        createTextVNode(" and "),
                        createVNode("code", null, "minHeight"),
                        createTextVNode(" via CSS variables.")
                      ])
                    ]
                  }
                }),
                _: 1
              }, _parent, _scopeId));
              _push(ssrRenderComponent(unref(Tab), { title: "Tab 2 with long title" }, {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    _push(`<p${_scopeId}>Nothing to see here.</p>`);
                  } else {
                    return [
                      createVNode("p", null, "Nothing to see here.")
                    ]
                  }
                }),
                _: 1
              }, _parent, _scopeId));
              _push(ssrRenderComponent(unref(Tab), { title: "Tab 3 with longer title and scrolling content" }, {
                default: withCtx((_, _push, _parent, _scopeId) => {
                  if (_push) {
                    _push(`<p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p><p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p><p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p><p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p><p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p><p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p><p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p><p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p><p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p><p${
                      _scopeId
                    }>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</p>`);
                  } else {
                    return [
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                      createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.")
                    ]
                  }
                }),
                _: 1
              }, _parent, _scopeId));
            } else {
              return [
                createVNode(unref(Tab), { title: "Tab 1" }, {
                  default: withCtx(() => [
                    createVNode("p", null, [
                      createTextVNode("Because the \"Tabs\" component changes dimensions with the tab content, we fixate "),
                      createVNode("code", null, "minWidth"),
                      createTextVNode(" and "),
                      createVNode("code", null, "minHeight"),
                      createTextVNode(" via CSS variables.")
                    ])
                  ]),
                  _: 1
                }),
                createVNode(unref(Tab), { title: "Tab 2 with long title" }, {
                  default: withCtx(() => [
                    createVNode("p", null, "Nothing to see here.")
                  ]),
                  _: 1
                }),
                createVNode(unref(Tab), { title: "Tab 3 with longer title and scrolling content" }, {
                  default: withCtx(() => [
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                    createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.")
                  ]),
                  _: 1
                })
              ]
            }
          }),
          _: 1
        }, _parent, _scopeId));
      } else {
        return [
          createVNode(unref(Tabs), { style: {"position":"absolute","top":"0","left":"0","right":"0","bottom":"0"} }, {
            default: withCtx(() => [
              createVNode(unref(Tab), { title: "Tab 1" }, {
                default: withCtx(() => [
                  createVNode("p", null, [
                    createTextVNode("Because the \"Tabs\" component changes dimensions with the tab content, we fixate "),
                    createVNode("code", null, "minWidth"),
                    createTextVNode(" and "),
                    createVNode("code", null, "minHeight"),
                    createTextVNode(" via CSS variables.")
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(Tab), { title: "Tab 2 with long title" }, {
                default: withCtx(() => [
                  createVNode("p", null, "Nothing to see here.")
                ]),
                _: 1
              }),
              createVNode(unref(Tab), { title: "Tab 3 with longer title and scrolling content" }, {
                default: withCtx(() => [
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero."),
                  createVNode("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.")
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">button</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> v-on</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">:</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">click</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">tabsModalShown </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> true</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Show Modal&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">button</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">modal</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    v-model</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">tabsModalShown</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">    style</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"})
  }">--jskos-vue-modal-minWidth</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">var</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"})
  }">--jskos-vue-modal-maxWidth</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">); </span><span style="${
    ssrRenderStyle({"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"})
  }">--jskos-vue-modal-minHeight</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">var</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"})
  }">--jskos-vue-modal-maxHeight</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">);</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> v-slot</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">:</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">header</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">h1</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Test Header&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">h1</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> v-slot</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">:</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">footer</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Test Footer&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">tabs</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> style</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">position</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">absolute</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">; </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">top</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">0</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">; </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">left</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">0</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">; </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">right</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">0</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">; </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">bottom</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">0</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">tab</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> title</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;Tab 1&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Because the &quot;Tabs&quot; component changes dimensions with the tab content, we fixate &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">code</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;minWidth&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">code</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt; and &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">code</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;minHeight&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">code</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt; via CSS variables.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">tab</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">tab</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> title</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;Tab 2 with long title&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Nothing to see here.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">tab</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">tab</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> title</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;Tab 3 with longer title and scrolling content&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">        &lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">p</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">      &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">tab</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">    &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">tabs</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  &lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">modal</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">template</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> setup</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { Modal } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { ref } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;vue&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"})
  }">// Include jskos-vue-tabs with necessary CSS</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { Tabs, Tab } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue-tabs&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue-tabs/dist/style.css&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }"> tabsModalShown</span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }"> =</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }"> ref</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">false</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">)</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&lt;/</span><span style="${
    ssrRenderStyle({"--shiki-light":"#22863A","--shiki-dark":"#85E89D"})
  }">script</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">&gt;</span></span></code></pre></div></div>`);
}
}

});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("components/Modal.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};

export { __pageData, _sfc_main as default };
