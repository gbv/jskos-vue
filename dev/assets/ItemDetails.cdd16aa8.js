var e=Object.defineProperty,t=Object.defineProperties,s=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,l=(t,s,i)=>s in t?e(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i;import{e as o,k as r,m as c,o as m,c as g,F as u,p,w as d,t as b,j as f,y as v,x as y,l as h,n as k,z as j,A as L,b as D,r as w,d as O,q as $}from"./app.299cedce.js";import{_ as z}from"./ItemName.659e824e.js";import{_ as I}from"./ItemList.a012caf4.js";import{_ as x}from"./AutoLink.6e12dad1.js";import{u as A,d as C}from"./utils.9c5057b1.js";import"./shared.99084317.js";import"./style.4b5628f1.js";const S=o({name:"ItemDetails",components:{AutoLink:x},props:{item:{type:Object,required:!0}},setup:e=>({licenseBadges:{"http://creativecommons.org/publicdomain/zero/1.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/cc-zero.svg","http://creativecommons.org/licenses/by/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg","http://creativecommons.org/licenses/by-nc-nd/3.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-nd/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-nd.svg","http://creativecommons.org/licenses/by-nc-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-nc-sa.svg","http://creativecommons.org/licenses/by-sa/4.0/":"https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg","http://opendatacommons.org/licenses/odbl/1.0/":"https://img.shields.io/badge/License-ODbL-lightgrey.svg","http://www.wtfpl.net/":"https://img.shields.io/badge/License-WTFPL-lightgrey.svg"},licenseAttribution:r((()=>{const t=(e.item.publisher||[]).find((e=>e.url));return{url:t.url||e.item.url,label:f.exports.prefLabel(t)||"?"}}))})}),P={class:"jskos-vue-itemDetails-licenseInfo"},M={key:1};S.render=function(e,t,s,i,a,n){const l=c("auto-link");return m(),g("div",P,[(m(!0),g(u,null,p(e.item.license||[],((t,s)=>(m(),g(l,{key:s,href:t.uri,title:`by ${e.licenseAttribution.label}`,class:"jskos-vue-itemDetails-licenseInfo-badge"},{default:d((()=>[e.licenseBadges[t.uri]?(m(),g("img",{key:0,src:e.licenseBadges[t.uri]},null,8,["src"])):(m(),g("span",M,b(t.uri),1))])),_:2},1032,["href","title"])))),128))])};const{draggedItem:N,addDropzone:_}=C,T={en:{showAllAncestors:"show all ancestors",showLessAncestors:"show less ancesters",created:"Created",modified:"Modified",issued:"Issued",altLabels:"Alternative Labels",definition:"Definition",info:"Info",labels:"Labels",editorial:"Editorial",scope:"Scope",license:"License",languages:"Languages",type:"Type",dropzone:"Drop an item here to select it."},de:{showAllAncestors:"zeige alle übergeordneten Konzepte",showLessAncestors:"zeige weniger übergeordnete Konzepte",created:"Erstellung",modified:"Änderung",issued:"Veröffentlicht",altLabels:"Alternative Bezeichnungen",definition:"Definition",info:"Info",labels:"Bezeichnungen",editorial:"Editorial",scope:"Scope",license:"Lizenz",languages:"Sprachen",type:"Art",dropzone:"Ziehe ein Item hierrein, um es auszuwählen."}},B=r((()=>f.exports.languagePreference.getLanguages().find((e=>T[e]))||"en")),E=e=>T[B.value][e],q=o({name:"ItemDetails",components:{ItemName:z,ItemList:I,LicenseInfo:S,Tabs:v,Tab:y,AutoLink:x},props:{item:{type:Object,required:!0},itemListOptions:{type:Object,default:()=>({})}},emits:["select"],setup(e,{emit:o}){const c=r((()=>{if(!e.item)return[];let t=[],s=e.item&&e.item.inScheme&&e.item.inScheme[0]&&e.item.inScheme[0].types||[];for(let i of e.item.type||[])"object"!=typeof i&&(i={uri:i}),i&&!["http://www.w3.org/2004/02/skos/core#Concept","http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(i.uri)&&(i=s.find((e=>f.exports.compare(e,i)))||i,t.push(i));return t})),m=r((()=>!f.exports.compare(e.item,N.value))),g=_(null,(e=>{m.value&&o("select",{item:e})}));return u=((e,t)=>{for(var s in t||(t={}))a.call(t,s)&&l(e,s,t[s]);if(i)for(var s of i(t))n.call(t,s)&&l(e,s,t[s]);return e})({utils:A,jskos:h,currentLanguage:B,t:E,iterateLanguageMapContent:(e,t)=>Object.keys(e&&e[t]||{}).map((s=>{const i=e[t][s];return(Array.isArray(i)?i:[i]).map((e=>({language:s,label:e})))})).reduce(((e,t)=>e.concat(t)),[]).filter((e=>"-"!=e.language)).sort(((s,i)=>s.language===f.exports.languagePreference.selectLanguage(e[t])&&i.language!==f.exports.languagePreference.selectLanguage(e[t])?-1:i.language===f.exports.languagePreference.selectLanguage(e[t])&&s.language!==f.exports.languagePreference.selectLanguage(e[t])?1:0)),types:c,draggedItem:N},g),t(u,s({isDraggedConceptDifferent:m}));var u}}),F={class:"jskos-vue-itemDetails-name"},K={key:0},G={class:"jskos-vue-itemDetails-list"},R={key:0,class:"jskos-vue-text-lightGrey"},U={class:"jskos-vue-itemDetails-list"},V={key:0},W={key:1},Z={key:0,class:"jskos-vue-itemDetails-list"},H={class:"jskos-vue-itemDetails-list"},J={key:0,class:"jskos-vue-itemDetails-list"},Q={class:"jskos-vue-itemDetails-list"},X={class:"jskos-vue-itemDetails-list"};q.render=function(e,t,s,i,a,n){const l=c("item-name"),o=c("license-info"),r=c("item-list"),f=c("auto-link"),v=c("tab"),y=c("tabs");return m(),g("div",{class:"jskos-vue-itemDetails",onDragover:t[4]||(t[4]=(...t)=>e.dragover&&e.dragover(...t)),onDragenter:t[5]||(t[5]=(...t)=>e.dragenter&&e.dragenter(...t)),onDragleave:t[6]||(t[6]=(...t)=>e.dragleave&&e.dragleave(...t)),onDrop:t[7]||(t[7]=(...t)=>e.drop&&e.drop(...t))},[k(" Define a dropzone which is shown only when a concept is being dragged over the component "),j(D("div",{class:"jskos-vue-itemDetails-dropzone jskos-vue-text-small"},b(e.t("dropzone")),513),[[L,e.isDraggingOver&&e.isDraggedConceptDifferent]]),D("div",F,[w(e.$slots,"beforeName"),D(l,{item:e.item},null,8,["item"]),w(e.$slots,"afterName")]),k(" License "),e.item.license&&e.item.license.length?(m(),g("div",K,[O(b(e.t("license"))+": ",1),D(o,{item:e.item},null,8,["item"])])):k("v-if",!0),k(" Ancestors "),k(" TODO: Only show part of ancestors? "),D(r,$(e.itemListOptions,{items:e.item.ancestors||[],class:"jskos-vue-itemDetails-ancestors",onSelect:t[1]||(t[1]=t=>e.$emit("select",{item:t.item}))}),null,16,["items"]),k(" Broader "),D(r,$(e.itemListOptions,{items:(e.item.broader||[]).filter((t=>!e.jskos.isContainedIn(t,e.item.ancestors||[]))),class:"jskos-vue-itemDetails-broader",onSelect:t[2]||(t[2]=t=>e.$emit("select",{item:t.item}))}),null,16,["items"]),D(y,{borders:"bottom",size:"sm",class:"jskos-vue-itemDetails-tabs"},{default:d((()=>[D(v,{title:e.t("info")},{default:d((()=>[k(" Identifier "),D("ul",G,[(m(!0),g(u,null,p([e.item.uri].concat(e.item.identifier).filter((e=>null!=e)),((t,s)=>(m(),g("li",{key:s},[D(f,{href:t},null,8,["href"]),t===e.item.uri?(m(),g("span",R," (URI)")):k("v-if",!0)])))),128))]),D("ul",U,[e.types.length?(m(),g("li",V,[D("b",null,b(e.t("type"))+":",1),O(" "+b(e.types.map((t=>e.jskos.prefLabel(t))).join(", ")),1)])):k("v-if",!0),(m(),g(u,null,p(["created","issued","modified"],(t=>(m(),g(u,null,[e.item[t]?(m(),g("li",{key:t},[D("b",null,b(e.t(t))+":",1),O(" "+b(e.utils.dateToString(e.item[t])),1)])):k("v-if",!0)],64)))),64)),e.item.languages?(m(),g("li",W,[D("b",null,b(e.t("languages"))+":",1),O(" "+b(e.item.languages.join(", ")),1)])):k("v-if",!0),k(" TODO: Publisher ")]),e.jskos.languageMapContent(e.item,"definition")?(m(),g("ul",Z,[D("li",null,[D("b",null,b(e.t("definition"))+":",1)]),(m(!0),g(u,null,p(e.iterateLanguageMapContent(e.item,"definition"),(({language:e,label:t},s)=>(m(),g("li",{key:`${e}-${s}`,lang:`${e}`},b(t),9,["lang"])))),128))])):k("v-if",!0)])),_:1},8,["title"]),D(v,{title:e.t("labels")},{default:d((()=>[k(" prefLabel "),D("ul",H,[(m(!0),g(u,null,p(e.iterateLanguageMapContent(e.item,"prefLabel"),(({language:e,label:t},s)=>(m(),g("li",{key:`${e}-${s}`,lang:`${e}`},b(t),9,["lang"])))),128))]),k(" altLabel "),e.jskos.languageMapContent(e.item,"altLabel")?(m(),g("ul",J,[D("li",null,[D("b",null,b(e.t("altLabels"))+":",1)]),(m(!0),g(u,null,p(e.iterateLanguageMapContent(e.item,"altLabel"),(({language:e,label:t},s)=>(m(),g("li",{key:`${e}-${s}`,lang:`${e}`},b(t),9,["lang"])))),128))])):k("v-if",!0)])),_:1},8,["title"]),k(" scopeNote "),e.jskos.languageMapContent(e.item,"scopeNote")?(m(),g(v,{key:0,title:e.t("scope")},{default:d((()=>[D("ul",Q,[(m(!0),g(u,null,p(e.iterateLanguageMapContent(e.item,"scopeNote"),(({language:e,label:t},s)=>(m(),g("li",{key:`${e}-${s}`,lang:`${e}`},b(t),9,["lang"])))),128))])])),_:1},8,["title"])):k("v-if",!0),k(" editorialNote "),e.jskos.languageMapContent(e.item,"editorialNote")?(m(),g(v,{key:1,title:e.t("editorial")},{default:d((()=>[D("ul",X,[(m(!0),g(u,null,p(e.iterateLanguageMapContent(e.item,"editorialNote"),(({language:e,label:t},s)=>(m(),g("li",{key:`${e}-${s}`,lang:`${e}`},b(t),9,["lang"])))),128))])])),_:1},8,["title"])):k("v-if",!0),k(" Slot for additional tabs "),w(e.$slots,"additionalTabs")])),_:3}),k(" Narrower "),D(r,$(e.itemListOptions,{items:e.item.narrower||[],class:"jskos-vue-itemDetails-narrower",onSelect:t[3]||(t[3]=t=>e.$emit("select",{item:t.item}))}),null,16,["items"])],32)};export{q as _,S as a};