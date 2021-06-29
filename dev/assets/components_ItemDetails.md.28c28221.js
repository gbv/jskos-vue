import{j as n,e as s,_ as a,I as t,G as e,E as o,q as p,o as i,c,s as l,b as u,H as r,r as k,d as g,t as m,F as d,B as h,f,g as b,D as q,u as v,a as y}from"./app.8613c751.js";import{_ as L}from"./ItemName.bae5aaf7.js";import{_ as D}from"./ItemList.1ed8beae.js";import{_ as w}from"./AutoLink.9586cc2d.js";import{u as j}from"./ConceptSearch.47356921.js";import"./shared.690f4af6.js";import"./LoadingIndicator.5f377c22.js";import"./Arrow.1ef364b6.js";import"./ConceptTree.763b3e7d.js";const x={en:{showAllAncestors:"show all ancestors",showLessAncestors:"show less ancesters",created:"Created",modified:"Modified",issued:"Issued",altLabels:"Alternative Labels",definition:"Definition",info:"Info",labels:"Labels",editorial:"Editorial",scope:"Scope",license:"License",languages:"Languages",type:"Type"},de:{showAllAncestors:"zeige alle übergeordneten Konzepte",showLessAncestors:"zeige weniger übergeordnete Konzepte",created:"Erstellung",modified:"Änderung",issued:"Veröffentlicht",altLabels:"Alternative Bezeichnungen",definition:"Definition",info:"Info",labels:"Bezeichnungen",editorial:"Editorial",scope:"Scope",license:"Lizenz",languages:"Sprachen",type:"Art"}},T=n((()=>o.exports.languagePreference.getLanguages().find((n=>x[n]))||"en")),_=n=>x[T.value][n],O=s({name:"ItemDetails",components:{ItemName:L,ItemList:D,Tabs:a,Tab:t,AutoLink:w},props:{item:{type:Object,required:!0},itemListOptions:{type:Object,default:()=>({})}},emits:["select"],setup(s){const a=n((()=>{const n=(s.item.publisher||[]).find((n=>n.url));return{url:n.url||s.item.url,label:o.exports.prefLabel(n)||"?"}})),t=n((()=>{if(!s.item)return[];let n=[],a=s.item&&s.item.inScheme&&s.item.inScheme[0]&&s.item.inScheme[0].types||[];for(let t of s.item.type||[])"object"!=typeof t&&(t={uri:t}),t&&!["http://www.w3.org/2004/02/skos/core#Concept","http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(t.uri)&&(t=a.find((n=>o.exports.compare(n,t)))||t,n.push(t));return n}));return{utils:j,jskos:e,language:T,t:_,iterateLanguageMapContent:(n,s)=>Object.keys(n&&n[s]||{}).map((a=>{const t=n[s][a];return(Array.isArray(t)?t:[t]).map((n=>({language:a,label:n})))})).reduce(((n,s)=>n.concat(s)),[]).filter((n=>"-"!=n.language)).sort(((a,t)=>a.language===o.exports.languagePreference.selectLanguage(n[s])&&t.language!==o.exports.languagePreference.selectLanguage(n[s])?-1:t.language===o.exports.languagePreference.selectLanguage(n[s])&&a.language!==o.exports.languagePreference.selectLanguage(n[s])?1:0)),licenseBadges:{"http://creativecommons.org/publicdomain/zero/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","http://creativecommons.org/licenses/by/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg","http://creativecommons.org/licenses/by-nc-nd/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-nd/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg","http://creativecommons.org/licenses/by-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg","http://opendatacommons.org/licenses/odbl/1.0/":"https://img.shields.io/badge/License-ODbL-lightgrey.svg","http://www.wtfpl.net/":"https://img.shields.io/badge/License-WTFPL-lightgrey.svg"},licenseAttribution:a,types:t}}}),C={class:"jskos-vue-itemDetails"},S={class:"jskos-vue-itemDetails-name"},A={key:0},N={key:1},I={class:"jskos-vue-itemDetails-list"},B={key:0,class:"jskos-vue-text-lightGrey"},U={class:"jskos-vue-itemDetails-list"},z={key:0},E={key:1},$={key:0,class:"jskos-vue-itemDetails-list"},P={class:"jskos-vue-text-lightGrey"},M={class:"jskos-vue-itemDetails-list"},G={class:"jskos-vue-text-lightGrey"},K={key:0,class:"jskos-vue-itemDetails-list"},R={class:"jskos-vue-text-lightGrey"},V={class:"jskos-vue-itemDetails-list"},F={class:"jskos-vue-text-lightGrey"},J={class:"jskos-vue-itemDetails-list"},H={class:"jskos-vue-text-lightGrey"};O.render=function(n,s,a,t,e,o){const b=p("item-list"),q=p("item-name"),v=p("auto-link"),y=p("tab"),L=p("tabs");return i(),c("div",C,[l(" Ancestors "),l(" TODO: Only show part of ancestors? "),u(b,r(n.itemListOptions,{items:n.item.ancestors||[],class:"jskos-vue-itemDetails-ancestors",onSelect:s[1]||(s[1]=s=>n.$emit("select",{item:s.item}))}),null,16,["items"]),l(" Broader "),u(b,r(n.itemListOptions,{items:(n.item.broader||[]).filter((s=>!n.jskos.isContainedIn(s,n.item.ancestors||[]))),class:"jskos-vue-itemDetails-broader",onSelect:s[2]||(s[2]=s=>n.$emit("select",{item:s.item}))}),null,16,["items"]),u("div",S,[k(n.$slots,"beforeName"),u(q,{item:n.item},null,8,["item"]),k(n.$slots,"afterName")]),l(" License "),n.item.license&&n.item.license.length?(i(),c("div",A,[g(m(n.t("license"))+":",1),(i(!0),c(d,null,h(n.item.license,((s,a)=>(i(),c(v,{key:a,href:s.uri,class:"jskos-vue-itemDetails-licenseBadge"},{default:f((()=>[n.licenseBadges[s.uri]?(i(),c("img",{key:0,src:n.licenseBadges[s.uri]},null,8,["src"])):(i(),c("span",N,m(s.uri),1))])),_:2},1032,["href"])))),128))])):l("v-if",!0),u(L,{borders:"bottom",size:"sm",class:"jskos-vue-itemDetails-tabs"},{default:f((()=>[u(y,{title:n.t("info")},{default:f((()=>[l(" Identifier "),u("ul",I,[(i(!0),c(d,null,h([n.item.uri].concat(n.item.identifier).filter((n=>null!=n)),((s,a)=>(i(),c("li",{key:a},[u(v,{href:s},null,8,["href"]),s===n.item.uri?(i(),c("span",B," (URI)")):l("v-if",!0)])))),128))]),u("ul",U,[n.types.length?(i(),c("li",z,[u("b",null,m(n.t("type"))+":",1),g(" "+m(n.types.map((s=>n.jskos.prefLabel(s))).join(", ")),1)])):l("v-if",!0),(i(),c(d,null,h(["created","issued","modified"],(s=>(i(),c(d,null,[n.item[s]?(i(),c("li",{key:s},[u("b",null,m(n.t(s))+":",1),g(" "+m(n.utils.dateToString(n.item[s])),1)])):l("v-if",!0)],64)))),64)),n.item.languages?(i(),c("li",E,[u("b",null,m(n.t("languages"))+":",1),g(" "+m(n.item.languages.join(", ")),1)])):l("v-if",!0),l(" TODO: Publisher ")]),n.jskos.languageMapContent(n.item,"definition")?(i(),c("ul",$,[u("li",null,[u("b",null,m(n.t("definition"))+":",1)]),(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"definition"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[g(m(s)+" ",1),u("span",P,"("+m(n)+")",1)])))),128))])):l("v-if",!0)])),_:1},8,["title"]),u(y,{title:n.t("labels")},{default:f((()=>[l(" prefLabel "),u("ul",M,[(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"prefLabel"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[g(m(s)+" ",1),u("span",G,"("+m(n)+")",1)])))),128))]),l(" altLabel "),n.jskos.languageMapContent(n.item,"altLabel")?(i(),c("ul",K,[u("li",null,[u("b",null,m(n.t("altLabels"))+":",1)]),(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"altLabel"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[g(m(s)+" ",1),u("span",R,"("+m(n)+")",1)])))),128))])):l("v-if",!0)])),_:1},8,["title"]),l(" scopeNote "),n.jskos.languageMapContent(n.item,"scopeNote")?(i(),c(y,{key:0,title:n.t("scope")},{default:f((()=>[u("ul",V,[(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"scopeNote"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[g(m(s)+" ",1),u("span",F,"("+m(n)+")",1)])))),128))])])),_:1},8,["title"])):l("v-if",!0),l(" editorialNote "),n.jskos.languageMapContent(n.item,"editorialNote")?(i(),c(y,{key:1,title:n.t("editorial")},{default:f((()=>[u("ul",J,[(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"editorialNote"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[g(m(s)+" ",1),u("span",H,"("+m(n)+")",1)])))),128))])])),_:1},8,["title"])):l("v-if",!0),l(" Slot for additional tabs "),k(n.$slots,"tabs")])),_:3}),l(" Narrower "),u(b,r(n.itemListOptions,{items:n.item.narrower||[],class:"jskos-vue-itemDetails-narrower",onSelect:s[3]||(s[3]=s=>n.$emit("select",{item:s.item}))}),null,16,["items"])])};const W=y('<h1 id="itemdetails"><a class="header-anchor" href="#itemdetails" aria-hidden="true">#</a> ItemDetails</h1><p>Component to display details for a JSKOS item.</p><p>Uses <a href="./ItemName.html">ItemName</a>, <a href="./ItemList.html">ItemList</a>, <a href="./AutoLink.html">AutoLink</a>.</p><h2 id="props"><a class="header-anchor" href="#props" aria-hidden="true">#</a> Props</h2><ul><li><code>item</code> (object) - JSKOS item (concept or concept scheme) <ul><li>required</li></ul></li><li><code>itemListOptions</code> (object) - options that are passed along to <a href="./ItemList.html">ItemList</a> via v-bind <ul><li>default: <code>{}</code></li></ul></li></ul><h2 id="slots"><a class="header-anchor" href="#slots" aria-hidden="true">#</a> Slots</h2><ul><li><code>beforeName</code>: Content shown before the item&#39;s name.</li><li><code>afterName</code>: Content shown after the item&#39;s name.</li><li><code>tabs</code>: Slot to add additional tabs (via <a href="https://github.com/gbv/jskos-vue-tabs" target="_blank" rel="noopener noreferrer">jskos-vue-tabs</a>) or absolutely positioned content for all tabs.</li></ul><h2 id="events"><a class="header-anchor" href="#events" aria-hidden="true">#</a> Events</h2><ul><li><code>select</code><ul><li>Emitted when a concept is selected.</li><li>Parameter is an object with properties <code>item</code> (containing the clicked JSKOS concept) and <code>row</code> (containing a boolean which is <code>true</code> when the click was initiated via the row, not on the item directly).</li></ul></li></ul><h2 id="examples"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h2>',10),Q=g(" Settings: "),X=g(' This tab was added via the "tabs" slot. '),Y=u("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),Z=g(" 🆇 "),nn=g(" ⭐️ "),sn=u("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),an=y('<div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ItemDetails <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> Tab <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;jskos-vue-tabs&quot;</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> jskos <span class="token keyword">from</span> <span class="token string">&quot;jskos-tools&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> reactive <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue&quot;</span>\n\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> cdk <span class="token keyword">from</span> <span class="token string">&quot;cocoda-sdk&quot;</span>\n<span class="token keyword">const</span> registry <span class="token operator">=</span> cdk<span class="token punctuation">.</span><span class="token function">initializeRegistry</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  provider<span class="token operator">:</span> <span class="token string">&quot;ConceptApi&quot;</span><span class="token punctuation">,</span>\n  api<span class="token operator">:</span> <span class="token string">&quot;https://coli-conc.gbv.de/api/&quot;</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">reactive</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  itemListOptions<span class="token operator">:</span> <span class="token punctuation">{</span>\n    indicatorByUri<span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token string">&quot;https://example.com/DT2&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      <span class="token string">&quot;https://example.com/DT3&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  item<span class="token operator">:</span> <span class="token punctuation">{</span>\n    uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT&quot;</span><span class="token punctuation">,</span>\n    notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n      en<span class="token operator">:</span> <span class="token string">&quot;Detailed Item&quot;</span><span class="token punctuation">,</span>\n      de<span class="token operator">:</span> <span class="token string">&quot;Detalliertes Item&quot;</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    altLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n      fr<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Désignation alternative&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n      de<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Alternative Benennung&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;noch eine&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    editorialNote<span class="token operator">:</span> <span class="token punctuation">{</span>\n      en<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial English&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n      de<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial Deutsch&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n      fr<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Editorial Français&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    identifier<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;uri:detailed&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;test&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    created<span class="token operator">:</span> <span class="token string">&quot;2021-05-27&quot;</span><span class="token punctuation">,</span>\n    issued<span class="token operator">:</span> <span class="token string">&quot;2021-05-27&quot;</span><span class="token punctuation">,</span>\n    modified<span class="token operator">:</span> <span class="token string">&quot;2021-05-28&quot;</span><span class="token punctuation">,</span>\n    definition<span class="token operator">:</span> <span class="token punctuation">{</span>\n      en<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;a defintion&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;a second definition&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n      de<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;eine Definition&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    narrower<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT1&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT1&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;a Child&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein Unterkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT2&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT2&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;another Child&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein weiteres Unterkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/DT3&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;DT3&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;yet another Child&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;noch ein weiteres Unterkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    ancestors<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/D&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;an Ancestor&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein Elternkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    broader<span class="token operator">:</span> <span class="token punctuation">[</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/D&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;an Ancestor&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein Elternkonzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">{</span>\n        uri<span class="token operator">:</span> <span class="token string">&quot;https://example.com/D-alt&quot;</span><span class="token punctuation">,</span>\n        notation<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D-alt&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        prefLabel<span class="token operator">:</span> <span class="token punctuation">{</span>\n          en<span class="token operator">:</span> <span class="token string">&quot;a broader concept&quot;</span><span class="token punctuation">,</span>\n          de<span class="token operator">:</span> <span class="token string">&quot;ein übergeordnetes Konzept&quot;</span><span class="token punctuation">,</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">alert</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>\n    Settings:\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>\n      <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>() =&gt; {\n        if (state.itemListOptions.indicatorByUri) {\n          state.itemListOptions._indicatorByUri = state.itemListOptions.indicatorByUri\n          delete state.itemListOptions.indicatorByUri\n        } else {\n          state.itemListOptions.indicatorByUri = state.itemListOptions._indicatorByUri\n          delete state.itemListOptions._indicatorByUri\n        }\n      }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      indicators: {{ !!state.itemListOptions.indicatorByUri }}\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span>\n      <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>() =&gt; {\n        if (state.item.scopeNote) {\n          delete state.item.scopeNote\n        } else {\n          state.item.scopeNote = {\n            de: [<span class="token punctuation">&#39;</span>Scope Deutsch<span class="token punctuation">&#39;</span>],\n            en: [<span class="token punctuation">&#39;</span>Scope English<span class="token punctuation">&#39;</span>],\n          }\n        }\n      }<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      {{ state.item.scopeNote ? &quot;Remove&quot; : &quot;Add&quot; }} scopeNote\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>item-details</span>\n    <span class="token attr-name">v-bind</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>state<span class="token punctuation">&quot;</span></span>\n    <span class="token attr-name">@select</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>alert(`Clicked on item ${$event.item.uri}`)<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>tabs</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tab</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Test<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        This tab was added via the &quot;tabs&quot; slot.\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tab</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\n        🚀\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>beforeName</span><span class="token punctuation">&gt;</span></span>\n      🆇\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name"><span class="token namespace">v-slot:</span>afterName</span><span class="token punctuation">&gt;</span></span>\n      ⭐️\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span> <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span>\n        ➕\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>item-details</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',1),tn='{"title":"ItemDetails","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemDetails.md","lastUpdated":1624965811376}',en={};const on=Object.assign(en,{expose:[],setup:function(n){b.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"});const s=q({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}]}});return(n,a)=>(i(),c("div",null,[W,u("p",null,[Q,u("button",{onClick:a[1]||(a[1]=()=>{v(s).itemListOptions.indicatorByUri?(v(s).itemListOptions._indicatorByUri=v(s).itemListOptions.indicatorByUri,delete v(s).itemListOptions.indicatorByUri):(v(s).itemListOptions.indicatorByUri=v(s).itemListOptions._indicatorByUri,delete v(s).itemListOptions._indicatorByUri)})}," indicators: "+m(!!v(s).itemListOptions.indicatorByUri),1),u("button",{onClick:a[2]||(a[2]=()=>{v(s).item.scopeNote?delete v(s).item.scopeNote:v(s).item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},m(v(s).item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),u(v(O),r(v(s),{onSelect:a[3]||(a[3]=n=>((...n)=>window.alert(...n))(`Clicked on item ${n.item.uri}`))}),{tabs:f((()=>[u(v(t),{title:"Test"},{default:f((()=>[X])),_:1}),Y])),beforeName:f((()=>[Z])),afterName:f((()=>[nn,sn])),_:1},16),an]))}});export default on;export{tn as __pageData};
