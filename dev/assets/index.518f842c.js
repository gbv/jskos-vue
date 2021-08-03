import{r as e,d as t,c as l,a as o,b as s,e as n,t as i,F as a,j as r,w as c,o as p,f as u,_ as m,g as d,h as g,i as h,m as f,k as b,l as y,V as v,p as k,n as w,q as L,s as x,u as C,v as I,x as S,y as T,z as j,A as D,B as N,C as O,D as $,E as _,G as A,H as z}from"./vendor.7a629f02.js";const U=e({label:[],processLabel(e,t){for(let l of this.label)e=l(e,t);return e},notation:[],processNotation(e,t){for(let l of this.notation)e=l(e,t);return e}}),B=t({name:"ItemName",props:{item:{type:Object,required:!0},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},fallbackLabel:{type:String,default:"???"},language:{type:String,default:""},clickable:{type:Boolean,default:!1}},setup(e){const t=l((()=>e.showNotation?U.processNotation(r.exports.notation(e.item),e):"")),o=l((()=>e.showLabel?U.processLabel(r.exports.prefLabel(e.item,{fallbackToUri:!t.value,language:e.language||r.exports.languagePreference.selectLanguage(e.item.prefLabel)}),e):""));return{notation:t,label:o}}});B.addLabelPlugin=e=>{U.label.push(e)},B.addNotationPlugin=e=>{U.notation.push(e)};const P=B,M=c()(((e,t,l,r,c,u)=>(p(),o("span",{class:{"jskos-vue-itemName":!0,clickable:e.clickable}},[e.showNotation||""===e.label?(p(),o("span",{key:0,class:"jskos-vue-itemName-notation",innerHTML:e.notation},null,8,["innerHTML"])):s("",!0),n(" "+i(e.label)+" ",1),""===e.notation&&""===e.label?(p(),o(a,{key:1},[n(i(e.fallbackLabel),1)],64)):s("",!0)],2))));P.render=M,P.__scopeId="data-v-3f804bc6";P.addNotationPlugin(((e,{item:t})=>{let l="";if(r.exports.compare({uri:"http://dewey.info/scheme/edition/e23/",identifier:["http://bartoc.org/en/node/241","http://bartoc.org/en/node/18497","http://www.wikidata.org/entity/Q67011877","http://id.loc.gov/vocabulary/classSchemes/sdnb","http://uri.gbv.de/terminology/sdnb"]},t.inScheme&&t.inScheme[0])&&!isNaN(parseInt(e)))for(;e.length+l.length<3;)l+="0";return l.length&&(e+=`<span class='jskos-vue-text-lightGrey'>${l}</span>`),e})),Array.prototype.move=function(e,t){return this.splice(t,0,this.splice(e,1)[0]),this};const E=u.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),R=e({detailed:{itemListOptions:{clickable:!0,indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}]}},detailedScheme:{item:{prefLabel:{de:"Dewey-Dezimalklassifikation",en:"Dewey Decimal Classification"},license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"},{uri:"some:other:license"}],uri:"http://bartoc.org/en/node/241",url:"http://www.oclc.org/dewey/",publisher:[{uri:"http://viaf.org/viaf/156508705",prefLabel:{en:"Online Computer Library Center (OCLC)"}},{uri:"http://d-nb.info/gnd/1086052218",prefLabel:{de:"OCLC"},altLabel:{de:["OCLC Online Computer Library Center"]},url:"https://www.oclc.org/"}],identifier:["http://www.wikidata.org/entity/Q48460","http://dewey.info/scheme/edition/e23/"],created:"2013-09-06T14:57:00Z",issued:"1876",modified:"2021-03-15T15:09:24.994Z",languages:["ar","nb","zh","fr","de"],type:["http://www.w3.org/2004/02/skos/core#ConceptScheme","http://w3id.org/nkos/nkostype#classification_schema"]}},conceptTree:{scheme:null,async loadScheme(){this.scheme=(await E.getSchemes({params:{uri:"http://bartoc.org/en/node/241"}}))[0]},concepts:null,async loadConcepts(){this.concepts=r.exports.sortConcepts(await this.scheme._getTop())},async loadNarrower(e){e.narrower&&!e.narrower.includes(null)||(e.narrower=r.exports.sortConcepts(await e._getNarrower()))},selected:null,itemListOptions:{indicatorByUri:{"http://dewey.info/class/00/e23/":!0,"http://dewey.info/class/1/e23/":!0,"http://dewey.info/class/2/e23/":!0,"http://dewey.info/class/4/e23/":!0}}},longConceptList:[],conceptSearch:{selected:null,async setSelected(e){this.selected=e;const t=e._registry||e.inScheme[0]._registry;t&&((e=(await t.getConcepts({concepts:[e]}))[0]).narrower=r.exports.sortConcepts(await e._getNarrower()),e.ancestors=r.exports.sortConcepts(await e._getAncestors()),e&&(this.selected=e))}}}),V=t({name:"App",components:{Tab:m},setup(){const t=e({languages:["en","de","fr"]});r.exports.languagePreference.store=t,r.exports.languagePreference.path="languages",(async()=>{await R.conceptTree.loadScheme(),await R.conceptTree.loadConcepts()})();return{state:t,examples:R,loadLongItemList:async()=>{const e=await fetch("https://coli-conc.gbv.de/api/voc/concepts?uri=http://dewey.info/scheme/edition/e23/&limit=10000"),t=await e.json();R.longConceptList=t},longItemListGetRandomUri:()=>{const e=Math.floor(Math.random()*R.longConceptList.length);return console.log(R.longConceptList[e].uri),R.longConceptList[e]&&R.longConceptList[e].uri}}},methods:{handleClick({item:e,row:t}){alert(`Clicked on item with URI ${e.uri}. (row: ${t})`)},alert(){alert(...arguments)}}}),q=d("h1",null,"jskos-vue",-1),G=n(" Change language: "),H=n(" - "),F=n(" Loading indicator: "),Q=n(" Arrows: "),K=n(" (left) "),W=n(" (right) "),Z=n(" (up + clickable) "),Y=n(" (down + clickable) "),J=n(" Item (notation+label): "),X=n(" Item (no label): "),ee=n(" Item (no notation): "),te=n(" Item (clickable): "),le=n(" Item (multiple languages): "),oe=d("br",null,null,-1),se=d("br",null,null,-1),ne=n(" Item (without notation/label, fallback to URI): "),ie=n(" Item (without notation/label/uri): "),ae=n(" Item List: "),re=n(" Item List (styled with slots): "),ce=n(" 🚀 "),pe=d("h2",null," ItemList with 10,000 items (scrolling) ",-1),ue=d("h2",null,"Item Details",-1),me=n(" Settings: "),de=n(' This tab was added via the "tabs" slot. '),ge=d("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),he=n(" 🆇 "),fe=n(" ⭐️ "),be=d("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),ye=d("h2",null," ConceptSearch - DDC from API, with ItemDetails for selected ",-1),ve=d("h2",null," ConceptTree ",-1),ke=d("h2",null," ConceptTree - DDC from API + Scroll ",-1),we=d("h2",null," ConceptTree - DDC from API + Scroll + beforeItem/afterItem + itemListOptions ",-1),Le=d("h2",null," ConceptTree - DDC from API + no hierarchy ",-1);V.render=function(e,t,l,r,c,u){const m=y("loading-indicator"),v=y("arrow"),k=y("item-name"),w=y("item-list"),L=y("tab"),x=y("item-details"),C=y("concept-search"),I=y("concept-tree");return p(),o(a,null,[q,d("p",null,[G,(p(!0),o(a,null,g(e.state.languages,((t,l)=>(p(),o("span",{key:l},[d("a",{href:"",onClick:b((t=>e.state.languages.move(l,0)),["prevent"])},i(t),9,["onClick"]),H])))),128))]),d("p",null,[F,d(m,{size:"sm"}),d(m,{size:"md"}),d(m,{size:"lg"}),d(m,{size:"xl"})]),d("p",null,[Q,d(v,{direction:"left"}),K,d(v,{direction:"right"}),W,d(v,{direction:"up",clickable:!0}),Z,d(v,{direction:"down",clickable:!0}),Y]),d("p",null,[J,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName"}}})]),d("p",null,[X,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName"}},"show-label":!1})]),d("p",null,[ee,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName"}},"show-notation":!1})]),d("p",null,[te,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName"}},clickable:!0,onClick:t[1]||(t[1]=t=>e.handleClick({item:{uri:"uri:clickableItem"}}))})]),d("p",null,[le,oe,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName",de:"ItemName (de)"}}},null,8,["item"]),se,d(k,{item:{notation:["IN"],prefLabel:{en:"ItemName",de:"ItemName (de)"}},language:"de"},null,8,["item"])]),d("p",null,[ne,d(k,{item:{uri:"some:uri"},clickable:!0})]),d("p",null,[ie,d(k,{item:{}})]),d("p",null,[ae,d(w,{items:[{uri:"test:1",notation:["1"],prefLabel:{en:"Concept 1"}},{uri:"test:2",notation:["2"],prefLabel:{en:"Concept 2"}},{uri:"test:3",notation:["3"],prefLabel:{en:"Concept 3"}}],clickable:!0,"indicator-by-uri":{"test:1":!0},onSelect:t[2]||(t[2]=t=>!t.row&&e.handleClick(t))})]),d("p",null,[re,d(w,{class:"item-list-styled",items:[{uri:"test:1",notation:["1"],prefLabel:{en:"Concept 1"}},{uri:"test:2",notation:["2"],prefLabel:{en:"Concept 2"}},{uri:"test:3",notation:["3"],prefLabel:{en:"Concept 3"}},null],"indicator-by-uri":{"test:1":!0,"test:2":"red","test:3":"blue"},onSelect:e.handleClick},{beforeItem:h((()=>[ce])),afterItem:h((({item:e})=>[n(" ("+i(e&&e.uri)+") ",1)])),_:1},8,["onSelect"])]),pe,d("p",null,[d("button",{onClick:t[3]||(t[3]=(...t)=>e.loadLongItemList&&e.loadLongItemList(...t))}," Load data "),d("button",{onClick:t[4]||(t[4]=t=>e.$refs.longItemList.scrollToUri(e.longItemListGetRandomUri()))}," Scroll to random ")]),d(w,{ref:"longItemList",style:{height:"300px",overflow:"scroll",border:"2px solid #0001"},items:e.examples.longConceptList,clickable:!0,onSelect:e.handleClick},null,8,["items","onSelect"]),ue,d("p",null,[me,d("button",{onClick:t[5]||(t[5]=t=>e.examples.detailed.itemListOptions.clickable=!e.examples.detailed.itemListOptions.clickable)}," clickable: "+i(e.examples.detailed.itemListOptions.clickable),1),d("button",{onClick:t[6]||(t[6]=()=>{e.examples.detailed.itemListOptions.indicatorByUri?(e.examples.detailed.itemListOptions._indicatorByUri=e.examples.detailed.itemListOptions.indicatorByUri,delete e.examples.detailed.itemListOptions.indicatorByUri):(e.examples.detailed.itemListOptions.indicatorByUri=e.examples.detailed.itemListOptions._indicatorByUri,delete e.examples.detailed.itemListOptions._indicatorByUri)})}," indicators: "+i(!!e.examples.detailed.itemListOptions.indicatorByUri),1),e.examples.detailed.item.scopeNote?s("",!0):(p(),o("button",{key:0,onClick:t[7]||(t[7]=t=>e.examples.detailed.item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]})}," Add scopeNote "))]),d("p",null,[d(x,f(e.examples.detailed,{onSelect:e.handleClick}),{tabs:h((()=>[d(L,{title:"Test"},{default:h((()=>[de])),_:1}),ge])),beforeName:h((()=>[he])),afterName:h((()=>[fe,be])),_:1},16,["onSelect"])]),d("p",null,[d(x,f(e.examples.detailedScheme,{onSelect:e.handleClick}),null,16,["onSelect"])]),ye,d("p",null,[d("button",{onClick:t[8]||(t[8]=b((t=>e.$refs.conceptSearch.focus()),["stop"]))}," Focus input "),d("button",{onClick:t[9]||(t[9]=b((t=>e.$refs.conceptSearch.setQuery("test")),["stop"]))}," Set query "),d("button",{onClick:t[10]||(t[10]=b((t=>e.$refs.conceptSearch.setQuery("tests",!0)),["stop"]))}," Set query and focus "),e.examples.conceptTree.scheme?(p(),o(C,{key:0,ref:"conceptSearch",scheme:e.examples.conceptTree.scheme,onSelect:t[11]||(t[11]=t=>e.examples.conceptSearch.setSelected(t))},null,8,["scheme"])):s("",!0)]),d("p",null,[e.examples.conceptSearch.selected?(p(),o(x,{key:0,item:e.examples.conceptSearch.selected,"item-list-options":{clickable:!0},onSelect:t[12]||(t[12]=t=>{t.row||e.examples.conceptSearch.setSelected(t.item)})},null,8,["item"])):s("",!0)]),ve,d(I,{concepts:[e.examples.detailed.item],onSelect:e.handleClick},null,8,["concepts","onSelect"]),ke,d("p",null,[d("button",{onClick:t[13]||(t[13]=t=>e.$refs.conceptTree.scrollToUri("http://dewey.info/class/6--0/e23/"))}," Scroll to 6--0 "),n(" Selected: "+i(e.examples.conceptTree.selected&&e.examples.conceptTree.selected.notation[0]||"none")+" ",1),d("button",{onClick:t[14]||(t[14]=t=>e.examples.conceptTree.selected=null)}," deselect ")]),e.examples.conceptTree.concepts?(p(),o(I,{key:0,ref:"conceptTree",modelValue:e.examples.conceptTree.selected,"onUpdate:modelValue":t[15]||(t[15]=t=>e.examples.conceptTree.selected=t),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:e.examples.conceptTree.concepts,onOpen:t[16]||(t[16]=t=>e.examples.conceptTree.loadNarrower(t))},null,8,["modelValue","concepts"])):s("",!0),we,e.examples.conceptTree.concepts?(p(),o(I,{key:1,modelValue:e.examples.conceptTree.selected,"onUpdate:modelValue":t[17]||(t[17]=t=>e.examples.conceptTree.selected=t),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:e.examples.conceptTree.concepts,"item-list-options":e.examples.conceptTree.itemListOptions,onOpen:t[18]||(t[18]=t=>e.examples.conceptTree.loadNarrower(t)),onSelect:e.handleClick},{beforeItem:h((({item:t})=>[d("span",{class:"opacity-hover",onClick:b((l=>e.alert(`Clicked on Star for item ${t.uri}`)),["stop"])}," ⭐️ ",8,["onClick"])])),afterItem:h((({item:t})=>[d("div",{class:"opacity-hover",style:{position:"absolute",width:"20px",right:"2px",top:"50%",transform:"translateY(-50%)"},onClick:b((l=>e.alert(`Clicked on Rocket for item ${t.uri}`)),["stop"])}," 🚀 ",8,["onClick"])])),_:1},8,["modelValue","concepts","item-list-options","onSelect"])):s("",!0),Le,e.examples.conceptTree.concepts?(p(),o(I,{key:2,modelValue:e.examples.conceptTree.selected,"onUpdate:modelValue":t[19]||(t[19]=t=>e.examples.conceptTree.selected=t),style:{border:"2px solid #0001"},concepts:e.examples.conceptTree.concepts.slice(0,6),hierarchy:!1},null,8,["modelValue","concepts"])):s("",!0)],64)};const xe=t({name:"LoadingIndicator",props:{size:{type:String,default:"sm"},primaryColor:{type:String,default:"lightgray"},secondaryColor:{type:String,default:"blue"}},setup:e=>({sizePixels:l((()=>({sm:9,md:15,lg:21,xl:27}[e.size])))})}),Ce=c()(((e,t,l,s,n,i)=>(p(),o("div",{style:{border:`${e.sizePixels/3}px solid ${e.primaryColor}`,"border-top":`${e.sizePixels/3}px solid ${e.secondaryColor}`,width:`${e.sizePixels}px`,height:`${e.sizePixels}px`},class:"jskos-vue-loadingIndicator"},null,4))));xe.render=Ce,xe.__scopeId="data-v-4a63949c";const Ie=t({name:"ItemList",components:{ItemName:P,LoadingIndicator:xe},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},clickable:{type:Boolean,default:!1},indicatorByUri:{type:Object,default:()=>({})},indicatorColor:{type:String,default:"green"}},emits:["select"],methods:{styleForItem(e){let t={},l=this.indicatorByUri[e&&e.uri];return!0===l&&(l=this.indicatorColor),l&&(t.boxShadow=`inset -4px 0px 0px 0px ${l}`),t},getItem(e){return this.itemProperty?e[this.itemProperty]:e},scrollToUri(e){const t=this.$el,l=t.querySelectorAll(`[data-uri='${e}']`)[0],o={container:t,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};l&&v.scrollTo(l,200,o)}}}),Se=c();k("data-v-6e1b1d8f");const Te={class:"jskos-vue-itemList"};w();const je=Se(((e,t,l,s,n,i)=>{const r=y("item-name"),c=y("loading-indicator");return p(),o("div",Te,[(p(!0),o(a,null,g(e.items,(t=>(p(),o("div",{key:e.getItem(t)&&e.getItem(t).uri,style:e.styleForItem(e.getItem(t)),"data-uri":e.getItem(t)&&e.getItem(t).uri,onClick:b((l=>e.$emit("select",{item:e.getItem(t),row:!0})),["stop"])},[L(e.$slots,"beforeItem",{item:t},void 0,!0),e.getItem(t)?(p(),o(r,{key:0,item:e.getItem(t),"show-notation":e.showNotation,"show-label":e.showLabel,clickable:e.clickable,onClick:b((l=>e.$emit("select",{item:e.getItem(t),row:!1})),["stop"])},null,8,["item","show-notation","show-label","clickable","onClick"])):(p(),o(c,{key:1,size:"sm"})),L(e.$slots,"afterItem",{item:t},void 0,!0)],12,["data-uri","onClick"])))),128))])}));Ie.render=je,Ie.__scopeId="data-v-6e1b1d8f";const De={name:"AutoLink",props:{href:{type:String,default:""},text:{type:String,default:""}}},Ne={key:1};function Oe(e,t=!1){const l=l=>{for(const o of e()){const e=(o.elements||[]).reduce(((e,t)=>e||t&&t.contains(l.target)),!1);!t&&e||o.handler({event:l,isInside:e})}};x((()=>{document.addEventListener("click",l)})),C((()=>{document.removeEventListener("click",l)}))}function $e(e,t,l){var o;return function(){var s=this,n=arguments,i=function(){o=null,l||e.apply(s,n)},a=l&&!o;clearTimeout(o),o=setTimeout(i,t),a&&e.apply(s,n)}}De.render=function(e,t,l,s,a,r){return l.href.startsWith("http://")||l.href.startsWith("https://")?(p(),o("a",{key:0,href:l.href,target:"_blank"},[L(e.$slots,"default",{},(()=>[n(i(l.text||l.href),1)]))],8,["href"])):(p(),o("span",Ne,[L(e.$slots,"default",{},(()=>[n(i(l.text||l.href),1)]))]))};var _e=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",dateToString:function(e){let t=new Date(e);if(t instanceof Date&&!isNaN(t)){if(e.length<10)return e;let l={year:"numeric",month:"short",day:"numeric"};return e.length>10&&(l=Object.assign({hour:"2-digit",minute:"2-digit",second:"2-digit"},l)),t.toLocaleString(void 0,l)}return"?"},addClickHandlers:Oe,debounce:$e});const Ae={en:{showAllAncestors:"show all ancestors",showLessAncestors:"show less ancesters",created:"Created",modified:"Modified",issued:"Issued",altLabels:"Alternative Labels",definition:"Definition",info:"Info",labels:"Labels",editorial:"Editorial",scope:"Scope",license:"License",languages:"Languages",type:"Type"},de:{showAllAncestors:"zeige alle übergeordneten Konzepte",showLessAncestors:"zeige weniger übergeordnete Konzepte",created:"Erstellung",modified:"Änderung",issued:"Veröffentlicht",altLabels:"Alternative Bezeichnungen",definition:"Definition",info:"Info",labels:"Bezeichnungen",editorial:"Editorial",scope:"Scope",license:"Lizenz",languages:"Sprachen",type:"Art"}},ze=l((()=>r.exports.languagePreference.getLanguages().find((e=>Ae[e]))||"en")),Ue=e=>Ae[ze.value][e],Be=t({name:"ItemDetails",components:{ItemName:P,ItemList:Ie,Tabs:I,Tab:m,AutoLink:De},props:{item:{type:Object,required:!0},itemListOptions:{type:Object,default:()=>({})}},emits:["select"],setup(e){const t=l((()=>{const t=(e.item.publisher||[]).find((e=>e.url));return{url:t.url||e.item.url,label:r.exports.prefLabel(t)||"?"}})),o=l((()=>{if(!e.item)return[];let t=[],l=e.item&&e.item.inScheme&&e.item.inScheme[0]&&e.item.inScheme[0].types||[];for(let o of e.item.type||[])"object"!=typeof o&&(o={uri:o}),o&&!["http://www.w3.org/2004/02/skos/core#Concept","http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(o.uri)&&(o=l.find((e=>r.exports.compare(e,o)))||o,t.push(o));return t}));return{utils:_e,jskos:S,language:ze,t:Ue,iterateLanguageMapContent:(e,t)=>Object.keys(e&&e[t]||{}).map((l=>{const o=e[t][l];return(Array.isArray(o)?o:[o]).map((e=>({language:l,label:e})))})).reduce(((e,t)=>e.concat(t)),[]).filter((e=>"-"!=e.language)).sort(((l,o)=>l.language===r.exports.languagePreference.selectLanguage(e[t])&&o.language!==r.exports.languagePreference.selectLanguage(e[t])?-1:o.language===r.exports.languagePreference.selectLanguage(e[t])&&l.language!==r.exports.languagePreference.selectLanguage(e[t])?1:0)),licenseBadges:{"http://creativecommons.org/publicdomain/zero/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","http://creativecommons.org/licenses/by/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg","http://creativecommons.org/licenses/by-nc-nd/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-nd/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg","http://creativecommons.org/licenses/by-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg","http://opendatacommons.org/licenses/odbl/1.0/":"https://img.shields.io/badge/License-ODbL-lightgrey.svg","http://www.wtfpl.net/":"https://img.shields.io/badge/License-WTFPL-lightgrey.svg"},licenseAttribution:t,types:o}}}),Pe={class:"jskos-vue-itemDetails"},Me={class:"jskos-vue-itemDetails-name"},Ee={key:0},Re={key:1},Ve={class:"jskos-vue-itemDetails-list"},qe={key:0,class:"jskos-vue-text-lightGrey"},Ge={class:"jskos-vue-itemDetails-list"},He={key:0},Fe={key:1},Qe={key:0,class:"jskos-vue-itemDetails-list"},Ke={class:"jskos-vue-text-lightGrey"},We={class:"jskos-vue-itemDetails-list"},Ze={class:"jskos-vue-text-lightGrey"},Ye={key:0,class:"jskos-vue-itemDetails-list"},Je={class:"jskos-vue-text-lightGrey"},Xe={class:"jskos-vue-itemDetails-list"},et={class:"jskos-vue-text-lightGrey"},tt={class:"jskos-vue-itemDetails-list"},lt={class:"jskos-vue-text-lightGrey"};Be.render=function(e,t,l,r,c,u){const m=y("item-list"),b=y("item-name"),v=y("auto-link"),k=y("tab"),w=y("tabs");return p(),o("div",Pe,[d(m,f(e.itemListOptions,{items:e.item.ancestors||[],class:"jskos-vue-itemDetails-ancestors",onSelect:t[1]||(t[1]=t=>e.itemListOptions.clickable&&!t.row&&e.$emit("select",{item:t.item}))}),null,16,["items"]),d(m,f(e.itemListOptions,{items:(e.item.broader||[]).filter((t=>!e.jskos.isContainedIn(t,e.item.ancestors||[]))),class:"jskos-vue-itemDetails-broader",onSelect:t[2]||(t[2]=t=>e.itemListOptions.clickable&&!t.row&&e.$emit("select",{item:t.item}))}),null,16,["items"]),d("div",Me,[L(e.$slots,"beforeName"),d(b,{item:e.item},null,8,["item"]),L(e.$slots,"afterName")]),e.item.license&&e.item.license.length?(p(),o("div",Ee,[n(i(e.t("license"))+":",1),(p(!0),o(a,null,g(e.item.license,((t,l)=>(p(),o(v,{key:l,href:t.uri,class:"jskos-vue-itemDetails-licenseBadge"},{default:h((()=>[e.licenseBadges[t.uri]?(p(),o("img",{key:0,src:e.licenseBadges[t.uri]},null,8,["src"])):(p(),o("span",Re,i(t.uri),1))])),_:2},1032,["href"])))),128))])):s("",!0),d(w,{borders:"bottom",size:"sm",class:"jskos-vue-itemDetails-tabs"},{default:h((()=>[d(k,{title:e.t("info")},{default:h((()=>[d("ul",Ve,[(p(!0),o(a,null,g([e.item.uri].concat(e.item.identifier).filter((e=>null!=e)),((t,l)=>(p(),o("li",{key:l},[d(v,{href:t},null,8,["href"]),t===e.item.uri?(p(),o("span",qe," (URI)")):s("",!0)])))),128))]),d("ul",Ge,[e.types.length?(p(),o("li",He,[d("b",null,i(e.t("type"))+":",1),n(" "+i(e.types.map((t=>e.jskos.prefLabel(t))).join(", ")),1)])):s("",!0),(p(),o(a,null,g(["created","issued","modified"],(t=>(p(),o(a,null,[e.item[t]?(p(),o("li",{key:t},[d("b",null,i(e.t(t))+":",1),n(" "+i(e.utils.dateToString(e.item[t])),1)])):s("",!0)],64)))),64)),e.item.languages?(p(),o("li",Fe,[d("b",null,i(e.t("languages"))+":",1),n(" "+i(e.item.languages.join(", ")),1)])):s("",!0)]),e.jskos.languageMapContent(e.item,"definition")?(p(),o("ul",Qe,[d("li",null,[d("b",null,i(e.t("definition"))+":",1)]),(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"definition"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[n(i(t)+" ",1),d("span",Ke,"("+i(e)+")",1)])))),128))])):s("",!0)])),_:1},8,["title"]),d(k,{title:e.t("labels")},{default:h((()=>[d("ul",We,[(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"prefLabel"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[n(i(t)+" ",1),d("span",Ze,"("+i(e)+")",1)])))),128))]),e.jskos.languageMapContent(e.item,"altLabel")?(p(),o("ul",Ye,[d("li",null,[d("b",null,i(e.t("altLabels"))+":",1)]),(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"altLabel"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[n(i(t)+" ",1),d("span",Je,"("+i(e)+")",1)])))),128))])):s("",!0)])),_:1},8,["title"]),e.jskos.languageMapContent(e.item,"scopeNote")?(p(),o(k,{key:0,title:e.t("scope")},{default:h((()=>[d("ul",Xe,[(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"scopeNote"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[n(i(t)+" ",1),d("span",et,"("+i(e)+")",1)])))),128))])])),_:1},8,["title"])):s("",!0),e.jskos.languageMapContent(e.item,"editorialNote")?(p(),o(k,{key:1,title:e.t("editorial")},{default:h((()=>[d("ul",tt,[(p(!0),o(a,null,g(e.iterateLanguageMapContent(e.item,"editorialNote"),(({language:e,label:t},l)=>(p(),o("li",{key:`${e}-${l}`},[n(i(t)+" ",1),d("span",lt,"("+i(e)+")",1)])))),128))])])),_:1},8,["title"])):s("",!0),L(e.$slots,"tabs")])),_:3}),d(m,f(e.itemListOptions,{items:e.item.narrower||[],class:"jskos-vue-itemDetails-narrower",onSelect:t[3]||(t[3]=t=>e.itemListOptions.clickable&&!t.row&&e.$emit("select",{item:t.item}))}),null,16,["items"])])};const ot=t({name:"Arrow",props:{direction:{type:String,required:!0,validator:e=>["up","down","left","right"].includes(e)},clickable:{type:Boolean,default:!1}}}),st=c()(((e,t,l,s,n,i)=>(p(),o("div",{class:{"jskos-vue-arrow":!0,"jskos-vue-arrow-clickable":e.clickable}},[d("div",{class:`jskos-vue-arrow-${e.direction}`},null,2)],2))));ot.render=st,ot.__scopeId="data-v-6d4fd2c2";const nt=t({name:"ConceptTree",components:{ItemList:Ie,Arrow:ot},props:{modelValue:{type:Object,default:null},concepts:{type:Array,required:!0},hierarchy:{type:Boolean,default:!0},itemListOptions:{type:Object,default:()=>({})},selectedColor:{type:String,default:"#fdbd58aa"},rowHoverColor:{type:String,default:"#fdbd58aa"}},emits:["select","open","close","update:modelValue"],setup(t,{emit:o}){const s=e({}),n=e=>{s[e.uri]=!0,o("open",e)},i=e=>{delete s[e.uri],o("close",e)},a=e=>{let l=[],o=e.concept,n=e.depth+1;if(o&&s[o.uri])for(let s of o.narrower||[]){let e={concept:s,depth:n,isSelected:r.exports.compare(t.modelValue,s)};l.push(e),l=l.concat(a(e))}return l},c=l((()=>{let e=[];for(let l of t.concepts){let o={concept:l,depth:0,isSelected:r.exports.compare(t.modelValue,l)};e.push(o),t.hierarchy&&(e=e.concat(a(o)))}return e})),p=l((()=>({"--row-hover-color":t.rowHoverColor})));return{items:c,isOpen:s,open:n,close:i,toggle:e=>{s[e.uri]?i(e):n(e)},style:p,jskos:S}},methods:{scrollToUri(e){this.$refs.itemList.scrollToUri(e)}}});nt.render=function(e,t,l,n,i,r){const c=y("arrow"),u=y("item-list");return p(),o(u,f({ref:"itemList"},e.itemListOptions,{class:{"jskos-vue-conceptTree":!0,"jskos-vue-conceptTree-noHierarchy":!e.hierarchy},items:e.items,style:e.style,"item-property":"concept",onSelect:t[1]||(t[1]=t=>{e.$emit("select",t),e.$emit("update:modelValue",t.item)})}),{beforeItem:h((({item:t})=>[(p(!0),o(a,null,g(t.depth,(e=>(p(),o("div",{key:e,class:"jskos-vue-conceptTree-depthSpacer"})))),128)),e.hierarchy?(p(),o("div",{key:0,class:"jskos-vue-conceptTree-arrow",onClick:b((l=>e.toggle(t.concept)),["stop"])},[t.concept&&t.concept.narrower&&0!==t.concept.narrower.length?(p(),o(c,{key:0,direction:e.isOpen[t.concept.uri]?"down":"right",clickable:!0},null,8,["direction"])):s("",!0)],8,["onClick"])):s("",!0),e.jskos.compare(t.concept,e.modelValue)?(p(),o("div",{key:1,style:`position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: -1; background-color: ${e.selectedColor};`},null,4)):s("",!0),L(e.$slots,"beforeItem",{item:t.concept})])),afterItem:h((({item:t})=>[L(e.$slots,"afterItem",{item:t.concept})])),_:1},16,["class","items","style"])};function it(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}const at=t({name:"ConceptSearch",components:{LoadingIndicator:xe},props:{scheme:{type:Object,required:!0},registry:{type:Object,default:null}},emits:["select"],setup(e,{emit:t}){const o=l((()=>e.registry||e.scheme._registry)),s=T(!1),n=T(!1),i=T(null),a=T(""),r=T(-1),c=T([]),p=T(!1),u=T(null),m=T(null),d=T(null),g=$e((async t=>{if(!o.value)return[];t=t.trim(),c.value=[],s.value=!0;const l=o.value.suggest({search:t,scheme:e.scheme});let n;i.value=l.cancel;try{n=(await l).slice(1).reduce(((e,t)=>e=t.map(((t,l)=>(e[l]||[]).concat(t)))),[])}catch(r){if("canceled"===r.message)return;console.error(r),n=[]}t===a.value.trim()&&(c.value=n,i.value=null,s.value=!1)}),200);j(a,(e=>{r.value=-1,null!=i.value&&(i.value("There was a newer search query."),i.value=null),""===e?(s.value=!1,n.value=!1):(c.value=["Waiting for you to stop typing..."],s.value=!0,n.value=!0,g(e))})),j((()=>e.scheme),((e,t)=>{A.compare(t,e)||(a.value="",c.value=[],n.value=!1,s.value=!1,r.value=-1)}));const h=()=>{n.value=!1},f=l=>{h(),r.value=-1,t("select",{uri:c.value[l][2],inScheme:[e.scheme]}),document.activeElement!==document.body&&document.activeElement.blur()},b=()=>{const e=d.value.childNodes[r.value+1];if(e){const t=e.parentElement.parentElement,l=e.getBoundingClientRect(),o=t.getBoundingClientRect();v.scrollTo(e,100,{container:t,easing:"ease-in",offset:l.bottom>o.bottom?-o.height+l.height:0,cancelable:!0,x:!1,y:!0,force:!1})}};return Oe((()=>[{elements:[u.value],handler:()=>{n.value=!1,r.value=-1}}])),{isLoading:s,isOpen:n,query:a,searchSelected:r,results:c,uniqueID:"abc",openResults:()=>{n.value=""!==a.value},closeResults:h,chooseResult:f,conceptSearch:u,searchInput:m,resultList:d,mouseover(e){p.value||(r.value=e)},mousemove(){p.value=!1},onArrowDown(){p.value=!0,r.value>=c.value.length-1?r.value=0:r.value+=1,b()},onArrowUp(){p.value=!0,r.value<=0?r.value=c.value.length-1:r.value-=1,b()},onEnter(){let e;s.value||0===c.value.length||(e=r.value<0||r.value>=c.value.length?0:r.value,f(e))},highlightQueryInResult:e=>{if(!a.value.length)return e;const t=a.value,l=new RegExp(t,"ig");let o=l.exec(e),s=0,n="";for(;o;){let i=o.index;n+=it(e.slice(s,i))+"<span class='jskos-vue-text-bold'>"+it(e.slice(i,i+t.length))+"</span>",s=i+t.length,o=l.exec(e)}return n+=it(e.slice(s)),n},focus(){m.value.focus()},setQuery(e,t=!1){a.value=e,t?m.value.focus():D((()=>{h()}))}}}}),rt=c();k("data-v-1193ff6f");const ct={class:"jskos-vue-conceptSearch-results jskos-vue-text-small"},pt={key:0,class:"jskos-vue-conceptSearch-loading"},ut={key:1,ref:"resultList",class:"jskos-vue-conceptSearch-results-list"},mt={key:0,class:"jskos-vue-conceptSearch-results-item"},dt=d("div",null,"No results",-1);w();const gt=rt(((e,t,l,n,i,r)=>{const c=y("loading-indicator");return p(),o("div",{ref:"conceptSearch",class:"jskos-vue-conceptSearch",onMousemove:t[8]||(t[8]=(...t)=>e.mousemove&&e.mousemove(...t))},[N(d("input",{ref:"searchInput","onUpdate:modelValue":t[1]||(t[1]=t=>e.query=t),placeholder:"Type to search...",onClick:t[2]||(t[2]=(...t)=>e.openResults&&e.openResults(...t)),onKeydown:[t[3]||(t[3]=$(b(((...t)=>e.onArrowDown&&e.onArrowDown(...t)),["prevent"]),["down"])),t[4]||(t[4]=$(b(((...t)=>e.onArrowUp&&e.onArrowUp(...t)),["prevent"]),["up"]))],onKeyup:[t[5]||(t[5]=$(((...t)=>e.onEnter&&e.onEnter(...t)),["enter"])),t[6]||(t[6]=$((t=>{e.$refs.searchInput.blur(),e.closeResults()}),["esc"]))],onFocus:t[7]||(t[7]=(...t)=>e.openResults&&e.openResults(...t))},null,544),[[O,e.query]]),N(d("div",ct,[e.isLoading?(p(),o("div",pt,[d(c,{size:"md"})])):(p(),o("ul",ut,[(p(!0),o(a,null,g(e.results,((t,l)=>(p(),o("li",{key:l,class:[{"jskos-vue-conceptSearch-selected":l===e.searchSelected},"jskos-vue-conceptSearch-results-item"],onClick:t=>e.chooseResult(l),onMouseover:t=>e.mouseover(l)},[d("span",{innerHTML:e.highlightQueryInResult(t[0])},null,8,["innerHTML"])],42,["onClick","onMouseover"])))),128)),0==e.results.length?(p(),o("li",mt,[dt])):s("",!0)],512))],512),[[_,e.isOpen]])],544)}));at.render=gt,at.__scopeId="data-v-1193ff6f";var ht=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",ItemName:P,ItemList:Ie,ItemDetails:Be,LoadingIndicator:xe,Arrow:ot,ConceptTree:nt,ConceptSearch:at});for(let bt of Object.values(ht))bt.install||(bt.install=e=>{e.component(bt.name,bt)});var ft=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",install:e=>{for(let t in ht)e.use(ht[t])},ItemName:P,ItemList:Ie,ItemDetails:Be,LoadingIndicator:xe,Arrow:ot,ConceptTree:nt,ConceptSearch:at});z(V).use(ft).mount("#app");