import{r as e,d as t,c as l,a as o,b as n,e as s,t as i,F as a,j as r,w as c,o as p,f as u,_ as m,g as d,h as g,i as h,m as f,k as b,l as y,V as v,p as k,n as w,q as L,s as x,u as C,v as I,x as S,y as T,z as j,A as D,B as N,C as O,D as $,E as _,G as A}from"./vendor.b196424f.js";const z=e({label:[],processLabel(e,t){for(let l of this.label)e=l(e,t);return e},notation:[],processNotation(e,t){for(let l of this.notation)e=l(e,t);return e}}),U=t({name:"ItemName",props:{item:{type:Object,required:!0},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},fallbackLabel:{type:String,default:"???"},language:{type:String,default:""},clickable:{type:Boolean,default:!1}},setup(e){const t=l((()=>e.showNotation?z.processNotation(r.exports.notation(e.item),e):"")),o=l((()=>e.showLabel?z.processLabel(r.exports.prefLabel(e.item,{fallbackToUri:!t.value,language:e.language||r.exports.languagePreference.selectLanguage(e.item.prefLabel)}),e):""));return{notation:t,label:o}}});U.addLabelPlugin=e=>{z.label.push(e)},U.addNotationPlugin=e=>{z.notation.push(e)};const B=U,P=c()(((e,t,l,r,c,u)=>(p(),o("span",{class:{"jskos-vue-itemName":!0,clickable:e.clickable}},[e.showNotation||""===e.label?(p(),o("span",{key:0,class:"jskos-vue-itemName-notation",innerHTML:e.notation},null,8,["innerHTML"])):n("",!0),s(" "+i(e.label)+" ",1),""===e.notation&&""===e.label?(p(),o(a,{key:1},[s(i(e.fallbackLabel),1)],64)):n("",!0)],2))));B.render=P,B.__scopeId="data-v-d42ca7d8";B.addNotationPlugin(((e,{item:t})=>{let l="";if(r.exports.compare({uri:"http://dewey.info/scheme/edition/e23/",identifier:["http://bartoc.org/en/node/241","http://bartoc.org/en/node/18497","http://www.wikidata.org/entity/Q67011877","http://id.loc.gov/vocabulary/classSchemes/sdnb","http://uri.gbv.de/terminology/sdnb"]},t.inScheme&&t.inScheme[0])&&!isNaN(parseInt(e)))for(;e.length+l.length<3;)l+="0";return l.length&&(e+=`<span class='jskos-vue-text-lightGrey'>${l}</span>`),e})),Array.prototype.move=function(e,t){return this.splice(t,0,this.splice(e,1)[0]),this};const M=u.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),E=e({detailed:{itemListOptions:{clickable:!0,indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}]}},detailedScheme:{item:{prefLabel:{de:"Dewey-Dezimalklassifikation",en:"Dewey Decimal Classification"},license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"},{uri:"some:other:license"}],uri:"http://bartoc.org/en/node/241",url:"http://www.oclc.org/dewey/",publisher:[{uri:"http://viaf.org/viaf/156508705",prefLabel:{en:"Online Computer Library Center (OCLC)"}},{uri:"http://d-nb.info/gnd/1086052218",prefLabel:{de:"OCLC"},altLabel:{de:["OCLC Online Computer Library Center"]},url:"https://www.oclc.org/"}],identifier:["http://www.wikidata.org/entity/Q48460","http://dewey.info/scheme/edition/e23/"],created:"2013-09-06T14:57:00Z",issued:"1876",modified:"2021-03-15T15:09:24.994Z",languages:["ar","nb","zh","fr","de"],type:["http://www.w3.org/2004/02/skos/core#ConceptScheme","http://w3id.org/nkos/nkostype#classification_schema"]}},conceptTree:{scheme:null,async loadScheme(){this.scheme=(await M.getSchemes({params:{uri:"http://bartoc.org/en/node/241"}}))[0]},concepts:null,async loadConcepts(){this.concepts=r.exports.sortConcepts(await this.scheme._getTop())},async loadNarrower(e){e.narrower&&!e.narrower.includes(null)||(e.narrower=r.exports.sortConcepts(await e._getNarrower()))},selected:null,itemListOptions:{indicatorByUri:{"http://dewey.info/class/00/e23/":!0,"http://dewey.info/class/1/e23/":!0,"http://dewey.info/class/2/e23/":!0,"http://dewey.info/class/4/e23/":!0}}},longConceptList:[],conceptSearch:{selected:null}}),R=t({name:"App",components:{Tab:m},setup(){const t=e({languages:["en","de","fr"]});r.exports.languagePreference.store=t,r.exports.languagePreference.path="languages",(async()=>{await E.conceptTree.loadScheme(),await E.conceptTree.loadConcepts()})();return{state:t,examples:E,loadLongItemList:async()=>{const e=await fetch("https://coli-conc.gbv.de/api/voc/concepts?uri=http://dewey.info/scheme/edition/e23/&limit=10000"),t=await e.json();E.longConceptList=t},longItemListGetRandomUri:()=>{const e=Math.floor(Math.random()*E.longConceptList.length);return console.log(E.longConceptList[e].uri),E.longConceptList[e]&&E.longConceptList[e].uri}}},methods:{handleClick({item:e,row:t}){alert(`Clicked on item with URI ${e.uri}. (row: ${t})`)},alert(){alert(...arguments)}}}),V=d("h1",null,"jskos-vue",-1),q=s(" Change language: "),G=s(" - "),H=s(" Loading indicator: "),F=s(" Arrows: "),K=s(" (left) "),Q=s(" (right) "),W=s(" (up) "),Z=s(" (down) "),Y=s(" Item (notation+label): "),J=s(" Item (no label): "),X=s(" Item (no notation): "),ee=s(" Item (clickable): "),te=s(" Item (multiple languages): "),le=d("br",null,null,-1),oe=d("br",null,null,-1),ne=s(" Item (without notation/label, fallback to URI): "),se=s(" Item (without notation/label/uri): "),ie=s(" Item List: "),ae=s(" Item List (styled with slots): "),re=s(" 🚀 "),ce=d("h2",null," ItemList with 10,000 items (scrolling) ",-1),pe=d("h2",null,"Item Details",-1),ue=s(" Settings: "),me=s(' This tab was added via the "tabs" slot. '),de=d("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),ge=s(" 🆇 "),he=s(" ⭐️ "),fe=d("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),be=d("h2",null," ConceptSearch - DDC from API, with ItemDetails for selected ",-1),ye=d("h2",null," ConceptTree ",-1),ve=d("h2",null," ConceptTree - DDC from API + Scroll ",-1),ke=d("h2",null," ConceptTree - DDC from API + Scroll + beforeItem/afterItem + itemListOptions ",-1),we=d("h2",null," ConceptTree - DDC from API + no hierarchy ",-1);R.render=function(e,t,l,r,c,u){const m=b("loading-indicator"),v=b("arrow"),k=b("item-name"),w=b("item-list"),L=b("tab"),x=b("item-details"),C=b("concept-search"),I=b("concept-tree");return p(),o(a,null,[V,d("p",null,[q,(p(!0),o(a,null,g(e.state.languages,((t,l)=>(p(),o("span",{key:l},[d("a",{href:"",onClick:y((t=>e.state.languages.move(l,0)),["prevent"])},i(t),9,["onClick"]),G])))),128))]),d("p",null,[H,d(m,{size:"sm"}),d(m,{size:"md"}),d(m,{size:"lg"}),d(m,{size:"xl"})]),d("p",null,[F,d(v,{direction:"left"}),K,d(v,{direction:"right"}),Q,d(v,{direction:"up"}),W,d(v,{direction:"down"}),Z]),d("p",null,[Y,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName"}}})]),d("p",null,[J,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName"}},"show-label":!1})]),d("p",null,[X,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName"}},"show-notation":!1})]),d("p",null,[ee,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName"}},clickable:!0,onClick:t[1]||(t[1]=t=>e.handleClick({item:{uri:"uri:clickableItem"}}))})]),d("p",null,[te,le,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName",de:"ItemName (de)"}}},null,8,["item"]),oe,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName",de:"ItemName (de)"}},language:"de"},null,8,["item"])]),d("p",null,[ne,d(k,{item:{uri:"some:uri"},clickable:!0})]),d("p",null,[se,d(k,{item:{}})]),d("p",null,[ie,d(w,{items:[{uri:"test:1",notation:["1"],prefLabel:{en:"Concept 1"}},{uri:"test:2",notation:["2"],prefLabel:{en:"Concept 2"}},{uri:"test:3",notation:["3"],prefLabel:{en:"Concept 3"}}],clickable:!0,"indicator-by-uri":{"test:1":!0},onSelect:t[2]||(t[2]=t=>!t.row&&e.handleClick(t))})]),d("p",null,[ae,d(w,{class:"item-list-styled",items:[{uri:"test:1",notation:["1"],prefLabel:{en:"Concept 1"}},{uri:"test:2",notation:["2"],prefLabel:{en:"Concept 2"}},{uri:"test:3",notation:["3"],prefLabel:{en:"Concept 3"}},null],"indicator-by-uri":{"test:1":!0,"test:2":"red","test:3":"blue"},onSelect:e.handleClick},{beforeItem:h((()=>[re])),afterItem:h((({item:e})=>[s(" ("+i(e&&e.uri)+") ",1)])),_:1},8,["onSelect"])]),ce,d("p",null,[d("button",{onClick:t[3]||(t[3]=(...t)=>e.loadLongItemList&&e.loadLongItemList(...t))}," Load data "),d("button",{onClick:t[4]||(t[4]=t=>e.$refs.longItemList.scrollToUri(e.longItemListGetRandomUri()))}," Scroll to random ")]),d(w,{ref:"longItemList",style:{height:"300px",overflow:"scroll",border:"2px solid #0001"},items:e.examples.longConceptList,clickable:!0,onSelect:e.handleClick},null,8,["items","onSelect"]),pe,d("p",null,[ue,d("button",{onClick:t[5]||(t[5]=t=>e.examples.detailed.itemListOptions.clickable=!e.examples.detailed.itemListOptions.clickable)}," clickable: "+i(e.examples.detailed.itemListOptions.clickable),1),d("button",{onClick:t[6]||(t[6]=()=>{e.examples.detailed.itemListOptions.indicatorByUri?(e.examples.detailed.itemListOptions._indicatorByUri=e.examples.detailed.itemListOptions.indicatorByUri,delete e.examples.detailed.itemListOptions.indicatorByUri):(e.examples.detailed.itemListOptions.indicatorByUri=e.examples.detailed.itemListOptions._indicatorByUri,delete e.examples.detailed.itemListOptions._indicatorByUri)})}," indicators: "+i(!!e.examples.detailed.itemListOptions.indicatorByUri),1),e.examples.detailed.item.scopeNote?n("",!0):(p(),o("button",{key:0,onClick:t[7]||(t[7]=t=>e.examples.detailed.item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]})}," Add scopeNote "))]),d("p",null,[d(x,f(e.examples.detailed,{onSelect:e.handleClick}),{tabs:h((()=>[d(L,{title:"Test"},{default:h((()=>[me])),_:1}),de])),beforeName:h((()=>[ge])),afterName:h((()=>[he,fe])),_:1},16,["onSelect"])]),d("p",null,[d(x,f(e.examples.detailedScheme,{onSelect:e.handleClick}),null,16,["onSelect"])]),be,d("p",null,[d("button",{onClick:t[8]||(t[8]=t=>e.$refs.conceptSearch.focus())}," Focus input "),e.examples.conceptTree.scheme?(p(),o(C,{key:0,ref:"conceptSearch",scheme:e.examples.conceptTree.scheme,onSelect:t[9]||(t[9]=t=>e.examples.conceptSearch.selected=t)},null,8,["scheme"])):n("",!0)]),d("p",null,[e.examples.conceptSearch.selected?(p(),o(x,{key:0,item:e.examples.conceptSearch.selected,onSelect:t[10]||(t[10]=()=>{e.$event.row||(e.examples.conceptSearch.selected=e.$event.item)})},null,8,["item"])):n("",!0)]),ye,d(I,{concepts:[e.examples.detailed.item],onSelect:e.handleClick},null,8,["concepts","onSelect"]),ve,d("p",null,[d("button",{onClick:t[11]||(t[11]=t=>e.$refs.conceptTree.scrollToUri("http://dewey.info/class/6--0/e23/"))}," Scroll to 6--0 "),s(" Selected: "+i(e.examples.conceptTree.selected&&e.examples.conceptTree.selected.notation[0]||"none")+" ",1),d("button",{onClick:t[12]||(t[12]=t=>e.examples.conceptTree.selected=null)}," deselect ")]),e.examples.conceptTree.concepts?(p(),o(I,{key:0,ref:"conceptTree",modelValue:e.examples.conceptTree.selected,"onUpdate:modelValue":t[13]||(t[13]=t=>e.examples.conceptTree.selected=t),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:e.examples.conceptTree.concepts,onOpen:t[14]||(t[14]=t=>e.examples.conceptTree.loadNarrower(t))},null,8,["modelValue","concepts"])):n("",!0),ke,e.examples.conceptTree.concepts?(p(),o(I,{key:1,modelValue:e.examples.conceptTree.selected,"onUpdate:modelValue":t[15]||(t[15]=t=>e.examples.conceptTree.selected=t),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:e.examples.conceptTree.concepts,"item-list-options":e.examples.conceptTree.itemListOptions,onOpen:t[16]||(t[16]=t=>e.examples.conceptTree.loadNarrower(t)),onSelect:e.handleClick},{beforeItem:h((({item:t})=>[d("span",{class:"opacity-hover",onClick:y((l=>e.alert(`Clicked on Star for item ${t.uri}`)),["stop"])}," ⭐️ ",8,["onClick"])])),afterItem:h((({item:t})=>[d("div",{class:"opacity-hover",style:{position:"absolute",width:"20px",right:"2px",top:"50%",transform:"translateY(-50%)"},onClick:y((l=>e.alert(`Clicked on Rocket for item ${t.uri}`)),["stop"])}," 🚀 ",8,["onClick"])])),_:1},8,["modelValue","concepts","item-list-options","onSelect"])):n("",!0),we,e.examples.conceptTree.concepts?(p(),o(I,{key:2,modelValue:e.examples.conceptTree.selected,"onUpdate:modelValue":t[17]||(t[17]=t=>e.examples.conceptTree.selected=t),style:{border:"2px solid #0001"},concepts:e.examples.conceptTree.concepts.slice(0,6),hierarchy:!1},null,8,["modelValue","concepts"])):n("",!0)],64)};const Le=t({name:"LoadingIndicator",props:{size:{type:String,default:"sm"},primaryColor:{type:String,default:"lightgray"},secondaryColor:{type:String,default:"blue"}},setup:e=>({sizePixels:l((()=>({sm:9,md:15,lg:21,xl:27}[e.size])))})}),xe=c()(((e,t,l,n,s,i)=>(p(),o("div",{style:{border:`${e.sizePixels/3}px solid ${e.primaryColor}`,"border-top":`${e.sizePixels/3}px solid ${e.secondaryColor}`,width:`${e.sizePixels}px`,height:`${e.sizePixels}px`},class:"jskos-vue-loadingIndicator"},null,4))));Le.render=xe,Le.__scopeId="data-v-4a63949c";const Ce=t({name:"ItemList",components:{ItemName:B,LoadingIndicator:Le},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},clickable:{type:Boolean,default:!1},indicatorByUri:{type:Object,default:()=>({})},indicatorColor:{type:String,default:"green"}},emits:["select"],methods:{styleForItem(e){let t={},l=this.indicatorByUri[e&&e.uri];return!0===l&&(l=this.indicatorColor),l&&(t.boxShadow=`inset -4px 0px 0px 0px ${l}`),t},getItem(e){return this.itemProperty?e[this.itemProperty]:e},scrollToUri(e){const t=this.$el,l=t.querySelectorAll(`[data-uri='${e}']`)[0],o={container:t,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};l&&v.scrollTo(l,200,o)}}}),Ie=c();k("data-v-2ac83790");const Se={class:"jskos-vue-itemList"};w();const Te=Ie(((e,t,l,n,s,i)=>{const r=b("item-name"),c=b("loading-indicator");return p(),o("div",Se,[(p(!0),o(a,null,g(e.items,(t=>(p(),o("div",{key:e.getItem(t)&&e.getItem(t).uri,style:e.styleForItem(e.getItem(t)),"data-uri":e.getItem(t)&&e.getItem(t).uri,onClick:y((l=>e.$emit("select",{item:e.getItem(t),row:!0})),["stop"])},[L(e.$slots,"beforeItem",{item:t},void 0,!0),e.getItem(t)?(p(),o(r,{key:0,item:e.getItem(t),"show-notation":e.showNotation,"show-label":e.showLabel,clickable:e.clickable,onClick:y((l=>e.$emit("select",{item:e.getItem(t),row:!1})),["stop"])},null,8,["item","show-notation","show-label","clickable","onClick"])):(p(),o(c,{key:1,size:"sm"})),L(e.$slots,"afterItem",{item:t},void 0,!0)],12,["data-uri","onClick"])))),128))])}));Ce.render=Te,Ce.__scopeId="data-v-2ac83790";const je={name:"AutoLink",props:{href:{type:String,default:""},text:{type:String,default:""}}},De={key:1};function Ne(e,t=!1){const l=l=>{for(const o of e()){const e=(o.elements||[]).reduce(((e,t)=>e||t&&t.contains(l.target)),!1);!t&&e||o.handler({event:l,isInside:e})}};x((()=>{document.addEventListener("click",l)})),C((()=>{document.removeEventListener("click",l)}))}function Oe(e,t,l){var o;return function(){var n=this,s=arguments,i=function(){o=null,l||e.apply(n,s)},a=l&&!o;clearTimeout(o),o=setTimeout(i,t),a&&e.apply(n,s)}}je.render=function(e,t,l,n,a,r){return l.href.startsWith("http://")||l.href.startsWith("https://")?(p(),o("a",{key:0,href:l.href,class:"u-textBreak",target:"_blank"},[L(e.$slots,"default",{},(()=>[s(i(l.text||l.href),1)]))],8,["href"])):(p(),o("span",De,[L(e.$slots,"default",{},(()=>[s(i(l.text||l.href),1)]))]))};var $e=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",dateToString:function(e){let t=new Date(e);if(t instanceof Date&&!isNaN(t)){if(e.length<10)return e;let l={year:"numeric",month:"short",day:"numeric"};return e.length>10&&(l=Object.assign({hour:"2-digit",minute:"2-digit",second:"2-digit"},l)),t.toLocaleString(void 0,l)}return"?"},addClickHandlers:Ne,debounce:Oe});const _e={en:{showAllAncestors:"show all ancestors",showLessAncestors:"show less ancesters",created:"Created",modified:"Modified",issued:"Issued",altLabels:"Alternative Labels",definition:"Definition",info:"Info",labels:"Labels",editorial:"Editorial",scope:"Scope",license:"License",languages:"Languages",type:"Type"},de:{showAllAncestors:"zeige alle übergeordneten Konzepte",showLessAncestors:"zeige weniger übergeordnete Konzepte",created:"Erstellung",modified:"Änderung",issued:"Veröffentlicht",altLabels:"Alternative Bezeichnungen",definition:"Definition",info:"Info",labels:"Bezeichnungen",editorial:"Editorial",scope:"Scope",license:"Lizenz",languages:"Sprachen",type:"Art"}},Ae=l((()=>r.exports.languagePreference.getLanguages().find((e=>_e[e]))||"en")),ze=e=>_e[Ae.value][e],Ue=t({name:"ItemDetails",components:{ItemName:B,ItemList:Ce,Tabs:I,Tab:m,AutoLink:je},props:{item:{type:Object,required:!0},itemListOptions:{type:Object,default:()=>({})}},emits:["select"],setup(e){const t=l((()=>{const t=(e.item.publisher||[]).find((e=>e.url));return{url:t.url||e.item.url,label:r.exports.prefLabel(t)||"?"}})),o=l((()=>{if(!e.item)return[];let t=[],l=e.item&&e.item.inScheme&&e.item.inScheme[0]&&e.item.inScheme[0].types||[];for(let o of e.item.type||[])"object"!=typeof o&&(o={uri:o}),o&&!["http://www.w3.org/2004/02/skos/core#Concept","http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(o.uri)&&(o=l.find((e=>r.exports.compare(e,o)))||o,t.push(o));return t}));return{utils:$e,jskos:S,language:Ae,t:ze,iterateLanguageMapContent:(e,t)=>Object.keys(e&&e[t]||{}).map((l=>{const o=e[t][l];return(Array.isArray(o)?o:[o]).map((e=>({language:l,label:e})))})).reduce(((e,t)=>e.concat(t)),[]).filter((e=>"-"!=e.language)).sort(((l,o)=>l.language===r.exports.languagePreference.selectLanguage(e[t])&&o.language!==r.exports.languagePreference.selectLanguage(e[t])?-1:o.language===r.exports.languagePreference.selectLanguage(e[t])&&l.language!==r.exports.languagePreference.selectLanguage(e[t])?1:0)),licenseBadges:{"http://creativecommons.org/publicdomain/zero/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","http://creativecommons.org/licenses/by/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg","http://creativecommons.org/licenses/by-nc-nd/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-nd/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg","http://creativecommons.org/licenses/by-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg","http://opendatacommons.org/licenses/odbl/1.0/":"https://img.shields.io/badge/License-ODbL-lightgrey.svg","http://www.wtfpl.net/":"https://img.shields.io/badge/License-WTFPL-lightgrey.svg"},licenseAttribution:t,types:o}}}),Be={class:"jskos-vue-itemDetails"},Pe={class:"jskos-vue-itemDetails-name"},Me={key:0},Ee={key:1},Re={class:"jskos-vue-itemDetails-list"},Ve={key:0,class:"jskos-vue-text-lightGrey"},qe={class:"jskos-vue-itemDetails-list"},Ge={key:0},He={key:1},Fe={key:0,class:"jskos-vue-itemDetails-list"},Ke={class:"jskos-vue-text-lightGrey"},Qe={class:"jskos-vue-itemDetails-list"},We={class:"jskos-vue-text-lightGrey"},Ze={key:0,class:"jskos-vue-itemDetails-list"},Ye={class:"jskos-vue-text-lightGrey"},Je={class:"jskos-vue-itemDetails-list"},Xe={class:"jskos-vue-text-lightGrey"},et={class:"jskos-vue-itemDetails-list"},tt={class:"jskos-vue-text-lightGrey"};Ue.render=function(e,t,l,r,c,u){const m=b("item-list"),y=b("item-name"),v=b("auto-link"),k=b("tab"),w=b("tabs");return p(),o("div",Be,[d(m,f(e.itemListOptions,{items:e.item.ancestors||[],class:"jskos-vue-itemDetails-ancestors",onSelect:t[1]||(t[1]=t=>e.itemListOptions.clickable&&!t.row&&e.$emit("select",{item:t.item}))}),null,16,["items"]),d(m,f(e.itemListOptions,{items:(e.item.broader||[]).filter((t=>!e.jskos.isContainedIn(t,e.item.ancestors||[]))),class:"jskos-vue-itemDetails-broader",onSelect:t[2]||(t[2]=t=>e.itemListOptions.clickable&&!t.row&&e.$emit("select",{item:t.item}))}),null,16,["items"]),d("div",Pe,[L(e.$slots,"beforeName"),d(y,{item:e.item},null,8,["item"]),L(e.$slots,"afterName")]),e.item.license&&e.item.license.length?(p(),o("div",Me,[s(i(e.t("license"))+":",1),(p(!0),o(a,null,g(e.item.license,((t,l)=>(p(),o(v,{key:l,href:t.uri,class:"jskos-vue-itemDetails-licenseBadge"},{default:h((()=>[e.licenseBadges[t.uri]?(p(),o("img",{key:0,src:e.licenseBadges[t.uri]},null,8,["src"])):(p(),o("span",Ee,i(t.uri),1))])),_:2},1032,["href"])))),128))])):n("",!0),d(w,{borders:"bottom",size:"sm",class:"jskos-vue-itemDetails-tabs"},{default:h((()=>[d(k,{title:e.t("info")},{default:h((()=>[d("ul",Re,[(p(!0),o(a,null,g([e.item.uri].concat(e.item.identifier).filter((e=>null!=e)),((t,l)=>(p(),o("li",{key:l},[d(v,{href:t},null,8,["href"]),t===e.item.uri?(p(),o("span",Ve," (URI)")):n("",!0)])))),128))]),d("ul",qe,[e.types.length?(p(),o("li",Ge,[d("b",null,i(e.t("type"))+":",1),s(" "+i(e.types.map((t=>e.jskos.prefLabel(t))).join(", ")),1)])):n("",!0),(p(),o(a,null,g(["created","issued","modified"],(t=>(p(),o(a,null,[e.item[t]?(p(),o("li",{key:t},[d("b",null,i(e.t(t))+":",1),s(" "+i(e.utils.dateToString(e.item[t])),1)])):n("",!0)],64)))),64)),e.item.languages?(p(),o("li",He,[d("b",null,i(e.t("languages"))+":",1),s(" "+i(e.item.languages.join(", ")),1)])):n("",!0)]),e.jskos.languageMapContent(e.item,"definition")?(p(),o("ul",Fe,[d("li",null,[d("b",null,i(e.t("definition"))+":",1)]),(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"definition"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[s(i(t)+" ",1),d("span",Ke,"("+i(e)+")",1)])))),128))])):n("",!0)])),_:1},8,["title"]),d(k,{title:e.t("labels")},{default:h((()=>[d("ul",Qe,[(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"prefLabel"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[s(i(t)+" ",1),d("span",We,"("+i(e)+")",1)])))),128))]),e.jskos.languageMapContent(e.item,"altLabel")?(p(),o("ul",Ze,[d("li",null,[d("b",null,i(e.t("altLabels"))+":",1)]),(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"altLabel"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[s(i(t)+" ",1),d("span",Ye,"("+i(e)+")",1)])))),128))])):n("",!0)])),_:1},8,["title"]),e.jskos.languageMapContent(e.item,"scopeNote")?(p(),o(k,{key:0,title:e.t("scope")},{default:h((()=>[d("ul",Je,[(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"scopeNote"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[s(i(t)+" ",1),d("span",Xe,"("+i(e)+")",1)])))),128))])])),_:1},8,["title"])):n("",!0),e.jskos.languageMapContent(e.item,"editorialNote")?(p(),o(k,{key:1,title:e.t("editorial")},{default:h((()=>[d("ul",et,[(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"editorialNote"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[s(i(t)+" ",1),d("span",tt,"("+i(e)+")",1)])))),128))])])),_:1},8,["title"])):n("",!0),L(e.$slots,"tabs")])),_:3}),d(m,f(e.itemListOptions,{items:e.item.narrower||[],class:"jskos-vue-itemDetails-narrower",onSelect:t[3]||(t[3]=t=>e.itemListOptions.clickable&&!t.row&&e.$emit("select",{item:t.item}))}),null,16,["items"])])};const lt=t({name:"Arrow",props:{direction:{type:String,required:!0,validator:e=>["up","down","left","right"].includes(e)}}}),ot=c()(((e,t,l,n,s,i)=>(p(),o("div",{class:`jskos-vue-arrow jskos-vue-arrow-${e.direction}`},null,2))));lt.render=ot,lt.__scopeId="data-v-141d0f7a";const nt=t({name:"ConceptTree",components:{ItemList:Ce,Arrow:lt},props:{modelValue:{type:Object,default:null},concepts:{type:Array,required:!0},hierarchy:{type:Boolean,default:!0},itemListOptions:{type:Object,default:()=>({})},selectedColor:{type:String,default:"#fdbd58aa"},rowHoverColor:{type:String,default:"#fdbd58aa"},arrowHoverColor:{type:String,default:"#666"}},emits:["select","open","close","update:modelValue"],setup(t,{emit:o}){const n=e({}),s=e=>{n[e.uri]=!0,o("open",e)},i=e=>{delete n[e.uri],o("close",e)},a=e=>{let l=[],o=e.concept,s=e.depth+1;if(o&&n[o.uri])for(let n of o.narrower||[]){let e={concept:n,depth:s,isSelected:r.exports.compare(t.modelValue,n)};l.push(e),l=l.concat(a(e))}return l},c=l((()=>{let e=[];for(let l of t.concepts){let o={concept:l,depth:0,isSelected:r.exports.compare(t.modelValue,l)};e.push(o),t.hierarchy&&(e=e.concat(a(o)))}return e})),p=l((()=>({"--row-hover-color":t.rowHoverColor,"--arrow-hover-color":t.arrowHoverColor})));return{items:c,isOpen:n,open:s,close:i,toggle:e=>{n[e.uri]?i(e):s(e)},style:p,jskos:S}},methods:{scrollToUri(e){this.$refs.itemList.scrollToUri(e)}}});nt.render=function(e,t,l,s,i,r){const c=b("arrow"),u=b("item-list");return p(),o(u,f({ref:"itemList"},e.itemListOptions,{class:{"jskos-vue-conceptTree":!0,"jskos-vue-conceptTree-noHierarchy":!e.hierarchy},items:e.items,style:e.style,"item-property":"concept",onSelect:t[1]||(t[1]=t=>{e.$emit("select",t),e.$emit("update:modelValue",t.item)})}),{beforeItem:h((({item:t})=>[(p(!0),o(a,null,g(t.depth,(e=>(p(),o("div",{key:e,class:"jskos-vue-conceptTree-depthSpacer"})))),128)),e.hierarchy?(p(),o("div",{key:0,class:"jskos-vue-conceptTree-arrow",onClick:y((l=>e.toggle(t.concept)),["stop"])},[t.concept&&t.concept.narrower&&0!==t.concept.narrower.length?(p(),o(c,{key:0,direction:e.isOpen[t.concept.uri]?"down":"right"},null,8,["direction"])):n("",!0)],8,["onClick"])):n("",!0),e.jskos.compare(t.concept,e.modelValue)?(p(),o("div",{key:1,style:`position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: -1; background-color: ${e.selectedColor};`},null,4)):n("",!0),L(e.$slots,"beforeItem",{item:t.concept})])),afterItem:h((({item:t})=>[L(e.$slots,"afterItem",{item:t.concept})])),_:1},16,["class","items","style"])};function st(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const it=t({name:"ConceptSearch",props:{scheme:{type:Object,required:!0},registry:{type:Object,default:null}},emits:["select"],setup(e,{emit:t}){const o=l((()=>e.registry||e.scheme._registry)),n=T(!1),s=T(!1),i=T(null),a=T(""),r=T(-1),c=T([]),p=T(!1),u=T(null),m=T(null),d=Oe((async t=>{if(!o.value)return[];t=t.trim(),c.value=[],n.value=!0;const l=o.value.suggest({search:t,scheme:e.scheme});let s;i.value=l.cancel;try{s=(await l).slice(1).reduce(((e,t)=>e=t.map(((t,l)=>(e[l]||[]).concat(t)))),[])}catch(r){if("canceled"===r.message)return;console.error(r),s=[]}t===a.value.trim()&&(c.value=s,i.value=null,n.value=!1)}),200);j(a,(e=>{r.value=-1,null!=i.value&&(i.value("There was a newer search query."),i.value=null),""===e?(n.value=!1,s.value=!1):(c.value=["Waiting for you to stop typing..."],n.value=!0,s.value=!0,d(e))})),j((()=>e.scheme),((e,t)=>{_.compare(t,e)||(a.value="",c.value=[],s.value=!1,n.value=!1,r.value=-1)}));const g=()=>{s.value=!1},h=l=>{g(),r.value=-1,t("select",{uri:c.value[l][2],inScheme:[e.scheme]}),document.activeElement!==document.body&&document.activeElement.blur()},f=()=>{const e=m.value.childNodes[r.value+1];if(e){const t=e.parentElement.parentElement,l=e.getBoundingClientRect(),o=t.getBoundingClientRect();v.scrollTo(e,100,{container:t,easing:"ease-in",offset:l.bottom>o.bottom?-o.height+l.height:0,cancelable:!0,x:!1,y:!0,force:!1})}};return Ne((()=>[{elements:[u.value],handler:()=>{s.value=!1,r.value=-1}}])),{isLoading:n,isOpen:s,query:a,searchSelected:r,results:c,uniqueID:"abc",closeResults:g,chooseResult:h,conceptSearch:u,resultList:m,mouseover(e){p.value||(r.value=e)},mousemove(){p.value=!1},onArrowDown(){p.value=!0,r.value>=c.value.length-1?r.value=0:r.value+=1,f()},onArrowUp(){p.value=!0,r.value<=0?r.value=c.value.length-1:r.value-=1,f()},onEnter(){let e;n.value||0===c.value.length||(e=r.value<0||r.value>=c.value.length?0:r.value,h(e))},highlightQueryInResult:e=>{if(!a.value.length)return e;const t=a.value,l=new RegExp(t,"ig");let o=l.exec(e),n=0,s="";for(;o;){let i=o.index;s+=st(e.slice(n,i))+"<span class='jskos-vue-text-bold'>"+st(e.slice(i,i+t.length))+"</span>",n=i+t.length,o=l.exec(e)}return s+=st(e.slice(n)),s}}},methods:{focus(){this.$refs.searchInput&&this.$refs.searchInput.focus()}}}),at=c();k("data-v-5816020a");const rt={class:"jskos-vue-conceptSearch-results jskos-vue-text-small"},ct={key:0,class:"jskos-vue-conceptSearch-loading"},pt={key:1,ref:"resultList",class:"jskos-vue-conceptSearch-results-list"},ut={key:0,class:"jskos-vue-conceptSearch-results-item"},mt=d("div",null,"No results",-1);w();const dt=at(((e,t,l,s,i,r)=>(p(),o("div",{ref:"conceptSearch",class:"jskos-vue-conceptSearch",onMousemove:t[9]||(t[9]=(...t)=>e.mousemove&&e.mousemove(...t))},[D(d("input",{ref:"searchInput","onUpdate:modelValue":t[1]||(t[1]=t=>e.query=t),placeholder:"Type to search...",onClick:t[2]||(t[2]=t=>e.isOpen=""!==e.query),onKeydown:[t[3]||(t[3]=O(y(((...t)=>e.onArrowDown&&e.onArrowDown(...t)),["prevent"]),["down"])),t[4]||(t[4]=O(y(((...t)=>e.onArrowUp&&e.onArrowUp(...t)),["prevent"]),["up"]))],onKeyup:[t[5]||(t[5]=O(((...t)=>e.onEnter&&e.onEnter(...t)),["enter"])),t[6]||(t[6]=O((t=>{e.$refs.searchInput.blur(),e.closeResults()}),["esc"]))],onFocus:t[7]||(t[7]=t=>e.isOpen=""!==e.query),onBlurs:t[8]||(t[8]=(...t)=>e.closeResults&&e.closeResults(...t))},null,544),[[N,e.query]]),D(d("div",rt,[e.isLoading?(p(),o("div",ct," Loading... ")):(p(),o("ul",pt,[(p(!0),o(a,null,g(e.results,((t,l)=>(p(),o("li",{key:l,class:[{"jskos-vue-conceptSearch-selected":l===e.searchSelected},"jskos-vue-conceptSearch-results-item"],onClick:t=>e.chooseResult(l),onMouseover:t=>e.mouseover(l)},[d("span",{innerHTML:e.highlightQueryInResult(t[0])},null,8,["innerHTML"])],42,["onClick","onMouseover"])))),128)),0==e.results.length?(p(),o("li",ut,[mt])):n("",!0)],512))],512),[[$,e.isOpen]])],544))));it.render=dt,it.__scopeId="data-v-5816020a";var gt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",ItemName:B,ItemList:Ce,ItemDetails:Ue,LoadingIndicator:Le,Arrow:lt,ConceptTree:nt,ConceptSearch:it});for(let ft of Object.values(gt))ft.install||(ft.install=e=>{e.component(ft.name,ft)});var ht=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",install:e=>{for(let t in gt)e.use(gt[t])},ItemName:B,ItemList:Ce,ItemDetails:Ue,LoadingIndicator:Le,Arrow:lt,ConceptTree:nt,ConceptSearch:it});A(R).use(ht).mount("#app");