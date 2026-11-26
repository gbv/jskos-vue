import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './plugin-vue_export-helper.pcqpp-6-.js';

const __pageData = JSON.parse("{\"title\":\"useLocale\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"utilities/useLocale.md\",\"filePath\":\"utilities/useLocale.md\"}");
const _sfc_main = {name:"utilities/useLocale.md"};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(_attrs)
  }><h1 id="uselocale" tabindex="-1">useLocale <a class="header-anchor" href="#uselocale" aria-label="Permalink to &quot;useLocale&quot;">​</a></h1><p>Returns <code>t()</code> for UI messages and <code>currentLanguage</code> for the current UI locale. It does not select languages from JSKOS content. Use <a href="./useContentLanguage.html">useContentLanguage</a> for labels and language maps.</p><p>When Vue I18n provides <code>\$t</code> and <code>\$i18n.locale</code>, <code>useLocale()</code> uses them. Without Vue I18n, it chooses among the supplied UI messages using <code>languagePreference</code> from <a href="https://github.com/gbv/jskos-tools" target="_blank" rel="noreferrer">jskos-tools</a>, then falls back to English.</p><p>Passed messages are only used as fallback for global messages.</p><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { utils } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue&quot;</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">t</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">currentLanguage</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> utils.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">useLocale</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">({</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  en: { greet: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;Hello!&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> },</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">  de: { greet: </span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&quot;Hallo!&quot;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> }</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">})</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">t</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }">&#39;greet&#39;</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">)</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">console.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">log</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(currentLanguage.value)</span></span></code></pre></div><h2 id="parameters" tabindex="-1">Parameters <a class="header-anchor" href="#parameters" aria-label="Permalink to &quot;Parameters&quot;">​</a></h2><ul><li><code>messages</code> - object with messages, indexed by language and id <ul><li>optional</li></ul></li></ul></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("utilities/useLocale.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const useLocale = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { __pageData, useLocale as default };
