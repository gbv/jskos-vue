import{r as e,d as t,c as o,a as i,b as l,e as n,t as s,F as a,j as r,w as c,o as p,f as m,_ as d,g as u,h as g,i as h,m as b,k as f,l as y,V as k,p as L,n as w,q as v,s as C,u as x,v as I}from"./vendor.5bf63d40.js";const S=e({label:[],processLabel(e,t){for(let o of this.label)e=o(e,t);return e},notation:[],processNotation(e,t){for(let o of this.notation)e=o(e,t);return e}}),T=t({name:"ItemName",props:{item:{type:Object,required:!0},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},fallbackLabel:{type:String,default:"???"},language:{type:String,default:""},clickable:{type:Boolean,default:!1}},setup(e){const t=o((()=>e.showNotation?S.processNotation(r.exports.notation(e.item),e):"")),i=o((()=>e.showLabel?S.processLabel(r.exports.prefLabel(e.item,{fallbackToUri:!t.value,language:e.language||r.exports.languagePreference.selectLanguage(e.item.prefLabel)}),e):""));return{notation:t,label:i}}});T.addLabelPlugin=e=>{S.label.push(e)},T.addNotationPlugin=e=>{S.notation.push(e)};const j=T,D=c()(((e,t,o,r,c,m)=>(p(),i("span",{class:{"jskos-vue-itemName":!0,clickable:e.clickable}},[e.showNotation||""===e.label?(p(),i("span",{key:0,class:"jskos-vue-itemName-notation",innerHTML:e.notation},null,8,["innerHTML"])):l("",!0),n(" "+s(e.label)+" ",1),""===e.notation&&""===e.label?(p(),i(a,{key:1},[n(s(e.fallbackLabel),1)],64)):l("",!0)],2))));j.render=D,j.__scopeId="data-v-d42ca7d8";j.addNotationPlugin(((e,{item:t})=>{let o="";if(r.exports.compare({uri:"http://dewey.info/scheme/edition/e23/",identifier:["http://bartoc.org/en/node/241","http://bartoc.org/en/node/18497","http://www.wikidata.org/entity/Q67011877","http://id.loc.gov/vocabulary/classSchemes/sdnb","http://uri.gbv.de/terminology/sdnb"]},t.inScheme&&t.inScheme[0])&&!isNaN(parseInt(e)))for(;e.length+o.length<3;)o+="0";return o.length&&(e+=`<span class='jskos-vue-text-lightGrey'>${o}</span>`),e})),Array.prototype.move=function(e,t){return this.splice(t,0,this.splice(e,1)[0]),this};const N=m.exports.initializeRegistry({provider:"ConceptApi",api:"https://coli-conc.gbv.de/api/"}),$=e({detailed:{itemListOptions:{clickable:!0,indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}]}},detailedScheme:{item:{prefLabel:{de:"Dewey-Dezimalklassifikation",en:"Dewey Decimal Classification"},license:[{uri:"http://creativecommons.org/licenses/by-nc-nd/3.0/"},{uri:"some:other:license"}],uri:"http://bartoc.org/en/node/241",url:"http://www.oclc.org/dewey/",publisher:[{uri:"http://viaf.org/viaf/156508705",prefLabel:{en:"Online Computer Library Center (OCLC)"}},{uri:"http://d-nb.info/gnd/1086052218",prefLabel:{de:"OCLC"},altLabel:{de:["OCLC Online Computer Library Center"]},url:"https://www.oclc.org/"}],identifier:["http://www.wikidata.org/entity/Q48460","http://dewey.info/scheme/edition/e23/"],created:"2013-09-06T14:57:00Z",issued:"1876",modified:"2021-03-15T15:09:24.994Z",languages:["ar","nb","zh","fr","de"],type:["http://www.w3.org/2004/02/skos/core#ConceptScheme","http://w3id.org/nkos/nkostype#classification_schema"]}},conceptTree:{scheme:null,async loadScheme(){this.scheme=(await N.getSchemes({params:{uri:"http://bartoc.org/en/node/241"}}))[0]},concepts:null,async loadConcepts(){this.concepts=r.exports.sortConcepts(await this.scheme._getTop())},async loadNarrower(e){e.narrower&&!e.narrower.includes(null)||(e.narrower=r.exports.sortConcepts(await e._getNarrower()))},selected:null},longConceptList:[]}),O=t({name:"App",components:{Tab:d},setup(){const t=e({languages:["en","de","fr"]});r.exports.languagePreference.store=t,r.exports.languagePreference.path="languages",(async()=>{await $.conceptTree.loadScheme(),await $.conceptTree.loadConcepts()})();return{state:t,examples:$,loadLongItemList:async()=>{const e=await fetch("https://coli-conc.gbv.de/api/voc/concepts?uri=http://dewey.info/scheme/edition/e23/&limit=10000"),t=await e.json();$.longConceptList=t},longItemListGetRandomUri:()=>{const e=Math.floor(Math.random()*$.longConceptList.length);return console.log($.longConceptList[e].uri),$.longConceptList[e]&&$.longConceptList[e].uri}}},methods:{handleClick({item:e,row:t}){alert(`Clicked on item with URI ${e.uri}. (row: ${t})`)},alert(){alert(...arguments)}}}),_=u("h1",null,"jskos-vue",-1),z=n(" Change language: "),A=n(" - "),U=n(" Loading indicator: "),B=n(" Arrows: "),P=n(" (left) "),M=n(" (right) "),V=n(" (up) "),E=n(" (down) "),G=n(" Item (notation+label): "),R=n(" Item (no label): "),q=n(" Item (no notation): "),H=n(" Item (clickable): "),F=n(" Item (multiple languages): "),K=u("br",null,null,-1),W=u("br",null,null,-1),Q=n(" Item (without notation/label, fallback to URI): "),Z=n(" Item (without notation/label/uri): "),Y=n(" Item List: "),J=n(" Item List (styled with slots): "),X=n(" 🚀 "),ee=u("h2",null," ItemList with 10,000 items (scrolling) ",-1),te=u("h2",null,"Item Details",-1),oe=n(" Settings: "),ie=n(' This tab was added via the "tabs" slot. '),le=u("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),ne=n(" 🆇 "),se=n(" ⭐️ "),ae=u("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),re=u("h2",null," ConceptTree ",-1),ce=u("h2",null," ConceptTree - DDC from API + Scroll ",-1),pe=u("h2",null," ConceptTree - DDC from API + Scroll + beforeItem/afterItem ",-1),me=u("h2",null," ConceptTree - DDC from API + no hierarchy ",-1);O.render=function(e,t,o,r,c,m){const d=f("loading-indicator"),k=f("arrow"),L=f("item-name"),w=f("item-list"),v=f("tab"),C=f("item-details"),x=f("concept-tree");return p(),i(a,null,[_,u("p",null,[z,(p(!0),i(a,null,g(e.state.languages,((t,o)=>(p(),i("span",{key:o},[u("a",{href:"",onClick:y((t=>e.state.languages.move(o,0)),["prevent"])},s(t),9,["onClick"]),A])))),128))]),u("p",null,[U,u(d,{size:"sm"}),u(d,{size:"md"}),u(d,{size:"lg"}),u(d,{size:"xl"})]),u("p",null,[B,u(k,{direction:"left"}),P,u(k,{direction:"right"}),M,u(k,{direction:"up"}),V,u(k,{direction:"down"}),E]),u("p",null,[G,u(L,{item:{notation:["IN"],prefLabel:{en:"ItemName"}}})]),u("p",null,[R,u(L,{item:{notation:["IN"],prefLabel:{en:"ItemName"}},"show-label":!1})]),u("p",null,[q,u(L,{item:{notation:["IN"],prefLabel:{en:"ItemName"}},"show-notation":!1})]),u("p",null,[H,u(L,{item:{notation:["IN"],prefLabel:{en:"ItemName"}},clickable:!0,onClick:t[1]||(t[1]=t=>e.handleClick({item:{uri:"uri:clickableItem"}}))})]),u("p",null,[F,K,u(L,{item:{notation:["IN"],prefLabel:{en:"ItemName",de:"ItemName (de)"}}},null,8,["item"]),W,u(L,{item:{notation:["IN"],prefLabel:{en:"ItemName",de:"ItemName (de)"}},language:"de"},null,8,["item"])]),u("p",null,[Q,u(L,{item:{uri:"some:uri"},clickable:!0})]),u("p",null,[Z,u(L,{item:{}})]),u("p",null,[Y,u(w,{items:[{uri:"test:1",notation:["1"],prefLabel:{en:"Concept 1"}},{uri:"test:2",notation:["2"],prefLabel:{en:"Concept 2"}},{uri:"test:3",notation:["3"],prefLabel:{en:"Concept 3"}}],clickable:!0,"indicator-by-uri":{"test:1":!0},onSelect:t[2]||(t[2]=t=>!t.row&&e.handleClick(t))})]),u("p",null,[J,u(w,{class:"item-list-styled",items:[{uri:"test:1",notation:["1"],prefLabel:{en:"Concept 1"}},{uri:"test:2",notation:["2"],prefLabel:{en:"Concept 2"}},{uri:"test:3",notation:["3"],prefLabel:{en:"Concept 3"}},null],"indicator-by-uri":{"test:1":!0,"test:2":"red","test:3":"blue"},onSelect:e.handleClick},{beforeItem:h((()=>[X])),afterItem:h((({item:e})=>[n(" ("+s(e&&e.uri)+") ",1)])),_:1},8,["onSelect"])]),ee,u("p",null,[u("button",{onClick:t[3]||(t[3]=(...t)=>e.loadLongItemList&&e.loadLongItemList(...t))}," Load data "),u("button",{onClick:t[4]||(t[4]=t=>e.$refs.longItemList.scrollToUri(e.longItemListGetRandomUri()))}," Scroll to random ")]),u(w,{ref:"longItemList",style:{height:"300px",overflow:"scroll",border:"2px solid #0001"},items:e.examples.longConceptList,clickable:!0,onSelect:e.handleClick},null,8,["items","onSelect"]),te,u("p",null,[oe,u("button",{onClick:t[5]||(t[5]=t=>e.examples.detailed.itemListOptions.clickable=!e.examples.detailed.itemListOptions.clickable)}," clickable: "+s(e.examples.detailed.itemListOptions.clickable),1),u("button",{onClick:t[6]||(t[6]=()=>{e.examples.detailed.itemListOptions.indicatorByUri?(e.examples.detailed.itemListOptions._indicatorByUri=e.examples.detailed.itemListOptions.indicatorByUri,delete e.examples.detailed.itemListOptions.indicatorByUri):(e.examples.detailed.itemListOptions.indicatorByUri=e.examples.detailed.itemListOptions._indicatorByUri,delete e.examples.detailed.itemListOptions._indicatorByUri)})}," indicators: "+s(!!e.examples.detailed.itemListOptions.indicatorByUri),1),e.examples.detailed.item.scopeNote?l("",!0):(p(),i("button",{key:0,onClick:t[7]||(t[7]=t=>e.examples.detailed.item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]})}," Add scopeNote "))]),u("p",null,[u(C,b(e.examples.detailed,{onSelect:e.handleClick}),{tabs:h((()=>[u(v,{title:"Test"},{default:h((()=>[ie])),_:1}),le])),beforeName:h((()=>[ne])),afterName:h((()=>[se,ae])),_:1},16,["onSelect"])]),u("p",null,[u(C,b(e.examples.detailedScheme,{onSelect:e.handleClick}),null,16,["onSelect"])]),re,u(x,{concepts:[e.examples.detailed.item],onSelect:e.handleClick},null,8,["concepts","onSelect"]),ce,u("p",null,[u("button",{onClick:t[8]||(t[8]=t=>e.$refs.conceptTree.scrollToUri("http://dewey.info/class/6--0/e23/"))}," Scroll to 6--0 "),n(" Selected: "+s(e.examples.conceptTree.selected&&e.examples.conceptTree.selected.notation[0]||"none")+" ",1),u("button",{onClick:t[9]||(t[9]=t=>e.examples.conceptTree.selected=null)}," deselect ")]),e.examples.conceptTree.concepts?(p(),i(x,{key:0,ref:"conceptTree",modelValue:e.examples.conceptTree.selected,"onUpdate:modelValue":t[10]||(t[10]=t=>e.examples.conceptTree.selected=t),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:e.examples.conceptTree.concepts,onOpen:t[11]||(t[11]=t=>e.examples.conceptTree.loadNarrower(t))},null,8,["modelValue","concepts"])):l("",!0),pe,e.examples.conceptTree.concepts?(p(),i(x,{key:1,modelValue:e.examples.conceptTree.selected,"onUpdate:modelValue":t[12]||(t[12]=t=>e.examples.conceptTree.selected=t),style:{height:"400px",overflow:"scroll",border:"2px solid #0001"},concepts:e.examples.conceptTree.concepts,onOpen:t[13]||(t[13]=t=>e.examples.conceptTree.loadNarrower(t)),onSelect:e.handleClick},{beforeItem:h((({item:t})=>[u("span",{class:"opacity-hover",onClick:y((o=>e.alert(`Clicked on Star for item ${t.uri}`)),["stop"])}," ⭐️ ",8,["onClick"])])),afterItem:h((({item:t})=>[u("div",{class:"opacity-hover",style:{position:"absolute",right:"0",top:"50%",transform:"translateY(-50%)"},onClick:y((o=>e.alert(`Clicked on Rocket for item ${t.uri}`)),["stop"])}," 🚀 ",8,["onClick"])])),_:1},8,["modelValue","concepts","onSelect"])):l("",!0),me,e.examples.conceptTree.concepts?(p(),i(x,{key:2,modelValue:e.examples.conceptTree.selected,"onUpdate:modelValue":t[14]||(t[14]=t=>e.examples.conceptTree.selected=t),style:{border:"2px solid #0001"},concepts:e.examples.conceptTree.concepts.slice(0,6),hierarchy:!1},null,8,["modelValue","concepts"])):l("",!0)],64)};const de=t({name:"LoadingIndicator",props:{size:{type:String,default:"sm"},primaryColor:{type:String,default:"lightgray"},secondaryColor:{type:String,default:"blue"}},setup:e=>({sizePixels:o((()=>({sm:9,md:15,lg:21,xl:27}[e.size])))})}),ue=c()(((e,t,o,l,n,s)=>(p(),i("div",{style:{border:`${e.sizePixels/3}px solid ${e.primaryColor}`,"border-top":`${e.sizePixels/3}px solid ${e.secondaryColor}`,width:`${e.sizePixels}px`,height:`${e.sizePixels}px`},class:"jskos-vue-loadingIndicator"},null,4))));de.render=ue,de.__scopeId="data-v-4a63949c";const ge=t({name:"ItemList",components:{ItemName:j,LoadingIndicator:de},props:{items:{type:Array,required:!0},itemProperty:{type:String,default:null},showNotation:{type:Boolean,default:!0},showLabel:{type:Boolean,default:!0},clickable:{type:Boolean,default:!1},indicatorByUri:{type:Object,default:()=>({})},indicatorColor:{type:String,default:"green"}},emits:["select"],methods:{styleForItem(e){let t={},o=this.indicatorByUri[e&&e.uri];return!0===o&&(o=this.indicatorColor),o&&(t.borderRight=`5px solid ${o}`),t},getItem(e){return this.itemProperty?e[this.itemProperty]:e},scrollToUri(e){const t=this.$el,o=t.querySelectorAll(`[data-uri='${e}']`)[0],i={container:t,easing:"ease-in",offset:-15,cancelable:!0,x:!1,y:!0};o&&k.scrollTo(o,200,i)}}}),he=c();L("data-v-e637d31e");const be={class:"jskos-vue-itemList"};w();const fe=he(((e,t,o,l,n,s)=>{const r=f("item-name"),c=f("loading-indicator");return p(),i("div",be,[(p(!0),i(a,null,g(e.items,(t=>(p(),i("div",{key:e.getItem(t)&&e.getItem(t).uri,style:e.styleForItem(e.getItem(t)),"data-uri":e.getItem(t)&&e.getItem(t).uri,onClick:y((o=>e.$emit("select",{item:e.getItem(t),row:!0})),["stop"])},[v(e.$slots,"beforeItem",{item:t},void 0,!0),e.getItem(t)?(p(),i(r,{key:0,item:e.getItem(t),"show-notation":e.showNotation,"show-label":e.showLabel,clickable:e.clickable,onClick:y((o=>e.$emit("select",{item:e.getItem(t),row:!1})),["stop"])},null,8,["item","show-notation","show-label","clickable","onClick"])):(p(),i(c,{key:1,size:"sm"})),v(e.$slots,"afterItem",{item:t},void 0,!0)],12,["data-uri","onClick"])))),128))])}));ge.render=fe,ge.__scopeId="data-v-e637d31e";const ye={name:"AutoLink",props:{href:{type:String,default:""},text:{type:String,default:""}}},ke={key:1};ye.render=function(e,t,o,l,a,r){return o.href.startsWith("http://")||o.href.startsWith("https://")?(p(),i("a",{key:0,href:o.href,class:"u-textBreak",target:"_blank"},[v(e.$slots,"default",{},(()=>[n(s(o.text||o.href),1)]))],8,["href"])):(p(),i("span",ke,[v(e.$slots,"default",{},(()=>[n(s(o.text||o.href),1)]))]))};var Le=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",dateToString:function(e){let t=new Date(e);if(t instanceof Date&&!isNaN(t)){if(e.length<10)return e;let o={year:"numeric",month:"short",day:"numeric"};return e.length>10&&(o=Object.assign({hour:"2-digit",minute:"2-digit",second:"2-digit"},o)),t.toLocaleString(void 0,o)}return"?"}});const we={en:{showAllAncestors:"show all ancestors",showLessAncestors:"show less ancesters",created:"Created",modified:"Modified",issued:"Issued",altLabels:"Alternative Labels",definition:"Definition",info:"Info",labels:"Labels",editorial:"Editorial",scope:"Scope",license:"License",languages:"Languages",type:"Type"},de:{showAllAncestors:"zeige alle übergeordneten Konzepte",showLessAncestors:"zeige weniger übergeordnete Konzepte",created:"Erstellung",modified:"Änderung",issued:"Veröffentlicht",altLabels:"Alternative Bezeichnungen",definition:"Definition",info:"Info",labels:"Bezeichnungen",editorial:"Editorial",scope:"Scope",license:"Lizenz",languages:"Sprachen",type:"Art"}},ve=o((()=>r.exports.languagePreference.getLanguages().find((e=>we[e]))||"en")),Ce=e=>we[ve.value][e],xe=t({name:"ItemDetails",components:{ItemName:j,ItemList:ge,Tabs:C,Tab:d,AutoLink:ye},props:{item:{type:Object,required:!0},itemListOptions:{type:Object,default:()=>({})}},emits:["select"],setup(e){const t=o((()=>{const t=(e.item.publisher||[]).find((e=>e.url));return{url:t.url||e.item.url,label:r.exports.prefLabel(t)||"?"}})),i=o((()=>{if(!e.item)return[];let t=[],o=e.item&&e.item.inScheme&&e.item.inScheme[0]&&e.item.inScheme[0].types||[];for(let i of e.item.type||[])"object"!=typeof i&&(i={uri:i}),i&&!["http://www.w3.org/2004/02/skos/core#Concept","http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(i.uri)&&(i=o.find((e=>r.exports.compare(e,i)))||i,t.push(i));return t}));return{utils:Le,jskos:x,language:ve,t:Ce,iterateLanguageMapContent:(e,t)=>Object.keys(e&&e[t]||{}).map((o=>{const i=e[t][o];return(Array.isArray(i)?i:[i]).map((e=>({language:o,label:e})))})).reduce(((e,t)=>e.concat(t)),[]).filter((e=>"-"!=e.language)).sort(((o,i)=>o.language===r.exports.languagePreference.selectLanguage(e[t])&&i.language!==r.exports.languagePreference.selectLanguage(e[t])?-1:i.language===r.exports.languagePreference.selectLanguage(e[t])&&o.language!==r.exports.languagePreference.selectLanguage(e[t])?1:0)),licenseBadges:{"http://creativecommons.org/publicdomain/zero/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","http://creativecommons.org/licenses/by/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg","http://creativecommons.org/licenses/by-nc-nd/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-nd/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg","http://creativecommons.org/licenses/by-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg","http://opendatacommons.org/licenses/odbl/1.0/":"https://img.shields.io/badge/License-ODbL-lightgrey.svg","http://www.wtfpl.net/":"https://img.shields.io/badge/License-WTFPL-lightgrey.svg"},licenseAttribution:t,types:i}}}),Ie={class:"jskos-vue-itemDetails"},Se={class:"jskos-vue-itemDetails-name"},Te={key:0},je={key:1},De={class:"jskos-vue-itemDetails-list"},Ne={key:0,class:"jskos-vue-text-lightGrey"},$e={class:"jskos-vue-itemDetails-list"},Oe={key:0},_e={key:1},ze={key:0,class:"jskos-vue-itemDetails-list"},Ae={class:"jskos-vue-text-lightGrey"},Ue={class:"jskos-vue-itemDetails-list"},Be={class:"jskos-vue-text-lightGrey"},Pe={key:0,class:"jskos-vue-itemDetails-list"},Me={class:"jskos-vue-text-lightGrey"},Ve={class:"jskos-vue-itemDetails-list"},Ee={class:"jskos-vue-text-lightGrey"},Ge={class:"jskos-vue-itemDetails-list"},Re={class:"jskos-vue-text-lightGrey"};xe.render=function(e,t,o,r,c,m){const d=f("item-list"),y=f("item-name"),k=f("auto-link"),L=f("tab"),w=f("tabs");return p(),i("div",Ie,[u(d,b(e.itemListOptions,{items:e.item.ancestors||[],class:"jskos-vue-itemDetails-ancestors",onSelect:t[1]||(t[1]=t=>e.itemListOptions.clickable&&!t.row&&e.$emit("select",{item:t.item}))}),null,16,["items"]),u(d,b(e.itemListOptions,{items:(e.item.broader||[]).filter((t=>!e.jskos.isContainedIn(t,e.item.ancestors||[]))),class:"jskos-vue-itemDetails-broader",onSelect:t[2]||(t[2]=t=>e.itemListOptions.clickable&&!t.row&&e.$emit("select",{item:t.item}))}),null,16,["items"]),u("div",Se,[v(e.$slots,"beforeName"),u(y,{item:e.item},null,8,["item"]),v(e.$slots,"afterName")]),e.item.license&&e.item.license.length?(p(),i("div",Te,[n(s(e.t("license"))+":",1),(p(!0),i(a,null,g(e.item.license,((t,o)=>(p(),i(k,{key:o,href:t.uri,class:"jskos-vue-itemDetails-licenseBadge"},{default:h((()=>[e.licenseBadges[t.uri]?(p(),i("img",{key:0,src:e.licenseBadges[t.uri]},null,8,["src"])):(p(),i("span",je,s(t.uri),1))])),_:2},1032,["href"])))),128))])):l("",!0),u(w,{borders:"bottom",size:"sm",class:"jskos-vue-itemDetails-tabs"},{default:h((()=>[u(L,{title:e.t("info")},{default:h((()=>[u("ul",De,[(p(!0),i(a,null,g([e.item.uri].concat(e.item.identifier).filter((e=>null!=e)),((t,o)=>(p(),i("li",{key:o},[u(k,{href:t},null,8,["href"]),t===e.item.uri?(p(),i("span",Ne," (URI)")):l("",!0)])))),128))]),u("ul",$e,[e.types.length?(p(),i("li",Oe,[u("b",null,s(e.t("type"))+":",1),n(" "+s(e.types.map((t=>e.jskos.prefLabel(t))).join(", ")),1)])):l("",!0),(p(),i(a,null,g(["created","issued","modified"],(t=>(p(),i(a,null,[e.item[t]?(p(),i("li",{key:t},[u("b",null,s(e.t(t))+":",1),n(" "+s(e.utils.dateToString(e.item[t])),1)])):l("",!0)],64)))),64)),e.item.languages?(p(),i("li",_e,[u("b",null,s(e.t("languages"))+":",1),n(" "+s(e.item.languages.join(", ")),1)])):l("",!0)]),e.jskos.languageMapContent(e.item,"definition")?(p(),i("ul",ze,[u("li",null,[u("b",null,s(e.t("definition"))+":",1)]),(p(!0),i(a,null,g(e.iterateLanguageMapContent(e.item,"definition"),(({language:e,label:t},o)=>(p(),i("li",{key:`${e}-${o}`},[n(s(t)+" ",1),u("span",Ae,"("+s(e)+")",1)])))),128))])):l("",!0)])),_:1},8,["title"]),u(L,{title:e.t("labels")},{default:h((()=>[u("ul",Ue,[(p(!0),i(a,null,g(e.iterateLanguageMapContent(e.item,"prefLabel"),(({language:e,label:t},o)=>(p(),i("li",{key:`${e}-${o}`},[n(s(t)+" ",1),u("span",Be,"("+s(e)+")",1)])))),128))]),e.jskos.languageMapContent(e.item,"altLabel")?(p(),i("ul",Pe,[u("li",null,[u("b",null,s(e.t("altLabels"))+":",1)]),(p(!0),i(a,null,g(e.iterateLanguageMapContent(e.item,"altLabel"),(({language:e,label:t},o)=>(p(),i("li",{key:`${e}-${o}`},[n(s(t)+" ",1),u("span",Me,"("+s(e)+")",1)])))),128))])):l("",!0)])),_:1},8,["title"]),e.jskos.languageMapContent(e.item,"scopeNote")?(p(),i(L,{key:0,title:e.t("scope")},{default:h((()=>[u("ul",Ve,[(p(!0),i(a,null,g(e.iterateLanguageMapContent(e.item,"scopeNote"),(({language:e,label:t},o)=>(p(),i("li",{key:`${e}-${o}`},[n(s(t)+" ",1),u("span",Ee,"("+s(e)+")",1)])))),128))])])),_:1},8,["title"])):l("",!0),e.jskos.languageMapContent(e.item,"editorialNote")?(p(),i(L,{key:1,title:e.t("editorial")},{default:h((()=>[u("ul",Ge,[(p(!0),i(a,null,g(e.iterateLanguageMapContent(e.item,"editorialNote"),(({language:e,label:t},o)=>(p(),i("li",{key:`${e}-${o}`},[n(s(t)+" ",1),u("span",Re,"("+s(e)+")",1)])))),128))])])),_:1},8,["title"])):l("",!0),v(e.$slots,"tabs")])),_:3}),u(d,b(e.itemListOptions,{items:e.item.narrower||[],class:"jskos-vue-itemDetails-narrower",onSelect:t[3]||(t[3]=t=>e.itemListOptions.clickable&&!t.row&&e.$emit("select",{item:t.item}))}),null,16,["items"])])};const qe=t({name:"Arrow",props:{direction:{type:String,required:!0,validator:e=>["up","down","left","right"].includes(e)}}}),He=c()(((e,t,o,l,n,s)=>(p(),i("div",{class:`jskos-vue-arrow jskos-vue-arrow-${e.direction}`},null,2))));qe.render=He,qe.__scopeId="data-v-141d0f7a";const Fe=t({name:"ConceptTree",components:{ItemList:ge,Arrow:qe},props:{modelValue:{type:Object,default:null},concepts:{type:Array,required:!0},hierarchy:{type:Boolean,default:!0},selectedColor:{type:String,default:"#fdbd58aa"},rowHoverColor:{type:String,default:"#fdbd58aa"},arrowHoverColor:{type:String,default:"#666"}},emits:["select","open","close","update:modelValue"],setup(t,{emit:i}){const l=e({}),n=e=>{l[e.uri]=!0,i("open",e)},s=e=>{delete l[e.uri],i("close",e)},a=e=>{let o=[],i=e.concept,n=e.depth+1;if(i&&l[i.uri])for(let l of i.narrower||[]){let e={concept:l,depth:n,isSelected:r.exports.compare(t.modelValue,l)};o.push(e),o=o.concat(a(e))}return o},c=o((()=>{let e=[];for(let o of t.concepts){let i={concept:o,depth:0,isSelected:r.exports.compare(t.modelValue,o)};e.push(i),t.hierarchy&&(e=e.concat(a(i)))}return e})),p=o((()=>({"--row-hover-color":t.rowHoverColor,"--arrow-hover-color":t.arrowHoverColor})));return{items:c,isOpen:l,open:n,close:s,toggle:e=>{l[e.uri]?s(e):n(e)},style:p,jskos:x}},methods:{scrollToUri(e){this.$refs.itemList.scrollToUri(e)}}});Fe.render=function(e,t,o,n,s,r){const c=f("arrow"),m=f("item-list");return p(),i(m,{ref:"itemList",class:"jskos-vue-conceptTree",items:e.items,style:e.style,"item-property":"concept",onSelect:t[1]||(t[1]=t=>{e.$emit("select",t),e.$emit("update:modelValue",t.item)})},{beforeItem:h((({item:t})=>[(p(!0),i(a,null,g(t.depth,(e=>(p(),i("div",{key:e,class:"jskos-vue-conceptTree-depthSpacer"})))),128)),e.hierarchy?(p(),i("div",{key:0,class:"jskos-vue-conceptTree-arrow",onClick:y((o=>e.toggle(t.concept)),["stop"])},[t.concept&&t.concept.narrower&&0!==t.concept.narrower.length?(p(),i(c,{key:0,direction:e.isOpen[t.concept.uri]?"down":"right"},null,8,["direction"])):l("",!0)],8,["onClick"])):l("",!0),e.jskos.compare(t.concept,e.modelValue)?(p(),i("div",{key:1,style:`position: absolute; top: 0; bottom: 0; left: 0; right: 0; z-index: -1; background-color: ${e.selectedColor};`},null,4)):l("",!0),v(e.$slots,"beforeItem",{item:t.concept})])),afterItem:h((({item:t})=>[v(e.$slots,"afterItem",{item:t.concept})])),_:1},8,["items","style"])};var Ke=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",ItemName:j,ItemList:ge,ItemDetails:xe,LoadingIndicator:de,Arrow:qe,ConceptTree:Fe});for(let Qe of Object.values(Ke))Qe.install||(Qe.install=e=>{e.component(Qe.name,Qe)});var We=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",install:e=>{for(let t in Ke)e.use(Ke[t])},ItemName:j,ItemList:ge,ItemDetails:xe,LoadingIndicator:de,Arrow:qe,ConceptTree:Fe});I(O).use(We).mount("#app");
