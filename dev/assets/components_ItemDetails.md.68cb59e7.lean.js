import{k as n,e as s,I as a,J as t,G as e,D as o,q as p,o as i,c,s as l,b as u,H as r,r as k,d as m,t as g,F as d,A as h,f,C as b,E as q,a as v}from"./app.5ac7d51c.js";import{_ as y}from"./ItemName.9943afb9.js";import{_ as L}from"./ItemList.6ea86514.js";import{_ as D}from"./AutoLink.03741961.js";import{u as w}from"./ConceptSearch.039c077c.js";import"./shared.690f4af6.js";import"./LoadingIndicator.730f5faf.js";import"./Arrow.4e8d8833.js";import"./ConceptTree.e4470198.js";const j={en:{showAllAncestors:"show all ancestors",showLessAncestors:"show less ancesters",created:"Created",modified:"Modified",issued:"Issued",altLabels:"Alternative Labels",definition:"Definition",info:"Info",labels:"Labels",editorial:"Editorial",scope:"Scope",license:"License",languages:"Languages",type:"Type"},de:{showAllAncestors:"zeige alle übergeordneten Konzepte",showLessAncestors:"zeige weniger übergeordnete Konzepte",created:"Erstellung",modified:"Änderung",issued:"Veröffentlicht",altLabels:"Alternative Bezeichnungen",definition:"Definition",info:"Info",labels:"Bezeichnungen",editorial:"Editorial",scope:"Scope",license:"Lizenz",languages:"Sprachen",type:"Art"}},x=n((()=>o.exports.languagePreference.getLanguages().find((n=>j[n]))||"en")),T=n=>j[x.value][n],_=s({name:"ItemDetails",components:{ItemName:y,ItemList:L,Tabs:a,Tab:t,AutoLink:D},props:{item:{type:Object,required:!0},itemListOptions:{type:Object,default:()=>({})}},emits:["select"],setup(s){const a=n((()=>{const n=(s.item.publisher||[]).find((n=>n.url));return{url:n.url||s.item.url,label:o.exports.prefLabel(n)||"?"}})),t=n((()=>{if(!s.item)return[];let n=[],a=s.item&&s.item.inScheme&&s.item.inScheme[0]&&s.item.inScheme[0].types||[];for(let t of s.item.type||[])"object"!=typeof t&&(t={uri:t}),t&&!["http://www.w3.org/2004/02/skos/core#Concept","http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(t.uri)&&(t=a.find((n=>o.exports.compare(n,t)))||t,n.push(t));return n}));return{utils:w,jskos:e,language:x,t:T,iterateLanguageMapContent:(n,s)=>Object.keys(n&&n[s]||{}).map((a=>{const t=n[s][a];return(Array.isArray(t)?t:[t]).map((n=>({language:a,label:n})))})).reduce(((n,s)=>n.concat(s)),[]).filter((n=>"-"!=n.language)).sort(((a,t)=>a.language===o.exports.languagePreference.selectLanguage(n[s])&&t.language!==o.exports.languagePreference.selectLanguage(n[s])?-1:t.language===o.exports.languagePreference.selectLanguage(n[s])&&a.language!==o.exports.languagePreference.selectLanguage(n[s])?1:0)),licenseBadges:{"http://creativecommons.org/publicdomain/zero/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","http://creativecommons.org/licenses/by/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg","http://creativecommons.org/licenses/by-nc-nd/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-nd/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg","http://creativecommons.org/licenses/by-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg","http://opendatacommons.org/licenses/odbl/1.0/":"https://img.shields.io/badge/License-ODbL-lightgrey.svg","http://www.wtfpl.net/":"https://img.shields.io/badge/License-WTFPL-lightgrey.svg"},licenseAttribution:a,types:t}}}),O={class:"jskos-vue-itemDetails"},S={class:"jskos-vue-itemDetails-name"},C={key:0},A={key:1},N={class:"jskos-vue-itemDetails-list"},I={key:0,class:"jskos-vue-text-lightGrey"},B={class:"jskos-vue-itemDetails-list"},U={key:0},E={key:1},z={key:0,class:"jskos-vue-itemDetails-list"},$={class:"jskos-vue-text-lightGrey"},P={class:"jskos-vue-itemDetails-list"},M={class:"jskos-vue-text-lightGrey"},G={key:0,class:"jskos-vue-itemDetails-list"},K={class:"jskos-vue-text-lightGrey"},R={class:"jskos-vue-itemDetails-list"},V={class:"jskos-vue-text-lightGrey"},F={class:"jskos-vue-itemDetails-list"},J={class:"jskos-vue-text-lightGrey"};_.render=function(n,s,a,t,e,o){const b=p("item-list"),q=p("item-name"),v=p("auto-link"),y=p("tab"),L=p("tabs");return i(),c("div",O,[l(" Ancestors "),l(" TODO: Only show part of ancestors? "),u(b,r(n.itemListOptions,{items:n.item.ancestors||[],class:"jskos-vue-itemDetails-ancestors",onSelect:s[1]||(s[1]=s=>n.$emit("select",{item:s.item}))}),null,16,["items"]),l(" Broader "),u(b,r(n.itemListOptions,{items:(n.item.broader||[]).filter((s=>!n.jskos.isContainedIn(s,n.item.ancestors||[]))),class:"jskos-vue-itemDetails-broader",onSelect:s[2]||(s[2]=s=>n.$emit("select",{item:s.item}))}),null,16,["items"]),u("div",S,[k(n.$slots,"beforeName"),u(q,{item:n.item},null,8,["item"]),k(n.$slots,"afterName")]),l(" License "),n.item.license&&n.item.license.length?(i(),c("div",C,[m(g(n.t("license"))+":",1),(i(!0),c(d,null,h(n.item.license,((s,a)=>(i(),c(v,{key:a,href:s.uri,class:"jskos-vue-itemDetails-licenseBadge"},{default:f((()=>[n.licenseBadges[s.uri]?(i(),c("img",{key:0,src:n.licenseBadges[s.uri]},null,8,["src"])):(i(),c("span",A,g(s.uri),1))])),_:2},1032,["href"])))),128))])):l("v-if",!0),u(L,{borders:"bottom",size:"sm",class:"jskos-vue-itemDetails-tabs"},{default:f((()=>[u(y,{title:n.t("info")},{default:f((()=>[l(" Identifier "),u("ul",N,[(i(!0),c(d,null,h([n.item.uri].concat(n.item.identifier).filter((n=>null!=n)),((s,a)=>(i(),c("li",{key:a},[u(v,{href:s},null,8,["href"]),s===n.item.uri?(i(),c("span",I," (URI)")):l("v-if",!0)])))),128))]),u("ul",B,[n.types.length?(i(),c("li",U,[u("b",null,g(n.t("type"))+":",1),m(" "+g(n.types.map((s=>n.jskos.prefLabel(s))).join(", ")),1)])):l("v-if",!0),(i(),c(d,null,h(["created","issued","modified"],(s=>(i(),c(d,null,[n.item[s]?(i(),c("li",{key:s},[u("b",null,g(n.t(s))+":",1),m(" "+g(n.utils.dateToString(n.item[s])),1)])):l("v-if",!0)],64)))),64)),n.item.languages?(i(),c("li",E,[u("b",null,g(n.t("languages"))+":",1),m(" "+g(n.item.languages.join(", ")),1)])):l("v-if",!0),l(" TODO: Publisher ")]),n.jskos.languageMapContent(n.item,"definition")?(i(),c("ul",z,[u("li",null,[u("b",null,g(n.t("definition"))+":",1)]),(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"definition"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[m(g(s)+" ",1),u("span",$,"("+g(n)+")",1)])))),128))])):l("v-if",!0)])),_:1},8,["title"]),u(y,{title:n.t("labels")},{default:f((()=>[l(" prefLabel "),u("ul",P,[(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"prefLabel"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[m(g(s)+" ",1),u("span",M,"("+g(n)+")",1)])))),128))]),l(" altLabel "),n.jskos.languageMapContent(n.item,"altLabel")?(i(),c("ul",G,[u("li",null,[u("b",null,g(n.t("altLabels"))+":",1)]),(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"altLabel"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[m(g(s)+" ",1),u("span",K,"("+g(n)+")",1)])))),128))])):l("v-if",!0)])),_:1},8,["title"]),l(" scopeNote "),n.jskos.languageMapContent(n.item,"scopeNote")?(i(),c(y,{key:0,title:n.t("scope")},{default:f((()=>[u("ul",R,[(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"scopeNote"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[m(g(s)+" ",1),u("span",V,"("+g(n)+")",1)])))),128))])])),_:1},8,["title"])):l("v-if",!0),l(" editorialNote "),n.jskos.languageMapContent(n.item,"editorialNote")?(i(),c(y,{key:1,title:n.t("editorial")},{default:f((()=>[u("ul",F,[(i(!0),c(d,null,h(n.iterateLanguageMapContent(n.item,"editorialNote"),(({language:n,label:s},a)=>(i(),c("li",{key:`${n}-${a}`},[m(g(s)+" ",1),u("span",J,"("+g(n)+")",1)])))),128))])])),_:1},8,["title"])):l("v-if",!0),l(" Slot for additional tabs "),k(n.$slots,"tabs")])),_:3}),l(" Narrower "),u(b,r(n.itemListOptions,{items:n.item.narrower||[],class:"jskos-vue-itemDetails-narrower",onSelect:s[3]||(s[3]=s=>n.$emit("select",{item:s.item}))}),null,16,["items"])])};const H=v('',10),W=m(" Settings: "),Q=m(' This tab was added via the "tabs" slot. '),X=u("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),Y=m(" 🆇 "),Z=m(" ⭐️ "),nn=u("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),sn=v('',1),an='{"title":"ItemDetails","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemDetails.md","lastUpdated":1625209779782}',tn={};const en=Object.assign(tn,{expose:[],setup:function(n){const s=b({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}]}});return(n,a)=>(i(),c("div",null,[H,u("p",null,[W,u("button",{onClick:a[1]||(a[1]=()=>{q(s).itemListOptions.indicatorByUri?(q(s).itemListOptions._indicatorByUri=q(s).itemListOptions.indicatorByUri,delete q(s).itemListOptions.indicatorByUri):(q(s).itemListOptions.indicatorByUri=q(s).itemListOptions._indicatorByUri,delete q(s).itemListOptions._indicatorByUri)})}," indicators: "+g(!!q(s).itemListOptions.indicatorByUri),1),u("button",{onClick:a[2]||(a[2]=()=>{q(s).item.scopeNote?delete q(s).item.scopeNote:q(s).item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},g(q(s).item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),u(q(_),r(q(s),{onSelect:a[3]||(a[3]=n=>((...n)=>window.alert(...n))(`Clicked on item ${n.item.uri}`))}),{tabs:f((()=>[u(q(t),{title:"Test"},{default:f((()=>[Q])),_:1}),X])),beforeName:f((()=>[Y])),afterName:f((()=>[Z,nn])),_:1},16),sn]))}});export default en;export{an as __pageData};
