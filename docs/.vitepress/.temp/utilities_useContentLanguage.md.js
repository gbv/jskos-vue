import { ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { _ as _export_sfc } from './plugin-vue_export-helper.pcqpp-6-.js';

const __pageData = JSON.parse("{\"title\":\"useContentLanguage\",\"description\":\"\",\"frontmatter\":{},\"headers\":[],\"relativePath\":\"utilities/useContentLanguage.md\",\"filePath\":\"utilities/useContentLanguage.md\"}");
const _sfc_main = {name:"utilities/useContentLanguage.md"};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${
    ssrRenderAttrs(_attrs)
  }><h1 id="usecontentlanguage" tabindex="-1">useContentLanguage <a class="header-anchor" href="#usecontentlanguage" aria-label="Permalink to &quot;useContentLanguage&quot;">​</a></h1><p>Selects languages for JSKOS content independently from translated UI messages. It must be called from a Vue component&#39;s <code>setup()</code> context.</p><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">import</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { utils } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">from</span><span style="${
    ssrRenderStyle({"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"})
  }"> &quot;jskos-vue&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">const</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> { </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">prefLabel</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">, </span><span style="${
    ssrRenderStyle({"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"})
  }">selectLanguage</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> } </span><span style="${
    ssrRenderStyle({"--shiki-light":"#D73A49","--shiki-dark":"#F97583"})
  }">=</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }"> utils.</span><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">useContentLanguage</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">()</span></span>
<span class="line"></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">prefLabel</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(item)</span></span>
<span class="line"><span style="${
    ssrRenderStyle({"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"})
  }">selectLanguage</span><span style="${
    ssrRenderStyle({"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"})
  }">(item.prefLabel)</span></span></code></pre></div><ul><li><code>selectLanguage(languageMap, explicitLanguage = &quot;&quot;)</code> returns a language key or <code>null</code>.</li><li><code>prefLabel(item, options = {})</code> selects a preferred label. It supports the existing <code>jskos.prefLabel()</code> options, including <code>language</code> and <code>fallbackToUri</code>.</li></ul><h2 id="language-order" tabindex="-1">Language order <a class="header-anchor" href="#language-order" aria-label="Permalink to &quot;Language order&quot;">​</a></h2><ol><li>An explicit component language, when available.</li><li>Languages configured through <code>jskos.languagePreference</code>.</li><li>The Vue I18n locale, when available.</li><li>The existing jskos-tools fallback to an available language.</li></ol><p>jskos-tools uses <code>[&quot;en&quot;]</code> as its implicit default. When no preference store is configured, <code>useContentLanguage()</code> treats this as implicit so that Vue I18n can provide the fallback language. To explicitly prefer English, configure it through <code>jskos.languagePreference.store</code> and <code>path</code>.</p><p>Without Vue I18n, the existing jskos-tools behavior is preserved. Reactive language preferences and Vue I18n locale changes update labels when the helper is used from a reactive Vue context.</p><p>See the interactive <a href="./../usage.html#localization">localization demo</a>.</p></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("utilities/useContentLanguage.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const useContentLanguage = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

export { __pageData, useContentLanguage as default };
