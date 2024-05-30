import{j as A,l as v,c as B}from"./jskos-tools.CpjLtWvA.js";import{I as q}from"./ItemName.BXFfuZjO.js";import{I as F}from"./ItemList.DU0iaMN_.js";import{b as K,u as P}from"./style.DttjXGKa.js";import{A as G}from"./AutoLink.DNBaALqq.js";import{u as T,b as R}from"./utils.Cs71LNG2.js";import"./shared.l0sNRNKZ.js";import{_ as S,h as w,d as N,D as y,o as t,b as h,w as L,I as j,j as m,c as i,F as c,E as k,e as d,t as l,a as C,r as b,a3 as U,a5 as Z,M as z}from"./framework.DOrQYd6A.js";import{L as H}from"./LicenseInfo.CE-IUPVf.js";const M={en:{created:"Created",modified:"Modified",issued:"Issued",altLabels:"Alternative Labels",definition:"Definition",info:"Info",labels:"Labels",editorial:"Editorial",scope:"Scope",languages:"Languages",type:"Type"},de:{created:"Erstellung",modified:"Änderung",issued:"Veröffentlicht",altLabels:"Alternative Bezeichnungen",definition:"Definition",info:"Info",labels:"Bezeichnungen",editorial:"Editorial",scope:"Scope",languages:"Sprachen",type:"Art"}},O=w(()=>v.getLanguages().find(e=>M[e])||"en"),J=e=>M[O.value][e],Q=N({name:"ItemDetailsTabs",components:{Tabs:K,Tab:P,AutoLink:G},props:{item:{type:Object,required:!0}},setup(e){const a=(r,g)=>Object.keys(r&&r[g]||{}).map(o=>{const u=r[g][o];return(Array.isArray(u)?u:[u]).map(f=>({language:o,label:f}))}).reduce((o,u)=>o.concat(u),[]).filter(o=>o.language!="-").sort((o,u)=>o.language===v.selectLanguage(r[g])&&u.language!==v.selectLanguage(r[g])?-1:u.language===v.selectLanguage(r[g])&&o.language!==v.selectLanguage(r[g])?1:0),$=w(()=>{if(!e.item)return[];let r=[],g=e.item&&e.item.inScheme&&e.item.inScheme[0]&&e.item.inScheme[0].types||[];for(let o of e.item.type||[])typeof o!="object"&&(o={uri:o}),!(!o||["http://www.w3.org/2004/02/skos/core#Concept","http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(o.uri))&&(o=g.find(u=>B(u,o))||o,r.push(o));return r});return{utils:T,jskos:A,currentLanguage:O,t:J,iterateLanguageMapContent:a,types:$}}}),W={class:"jskos-vue-itemDetails-list"},X={key:0,class:"jskos-vue-text-lightGrey"},Y={class:"jskos-vue-itemDetails-list"},_={key:0},x={key:1},ee={key:0,class:"jskos-vue-itemDetails-list"},te=["lang"],se={class:"jskos-vue-itemDetails-list"},ne=["lang"],oe={key:0,class:"jskos-vue-itemDetails-list"},ie=["lang"],ae={class:"jskos-vue-itemDetails-list"},le=["lang"],re={class:"jskos-vue-itemDetails-list"},ue=["lang"];function me(e,a,$,r,g,o){const u=y("auto-link"),f=y("tab"),D=y("tabs");return t(),h(D,{borders:"bottom",size:"sm",class:"jskos-vue-itemDetails-tabs"},{default:L(()=>[j(f,{title:e.t("info")},{default:L(()=>[m("ul",W,[(t(!0),i(c,null,k([e.item.uri].concat(e.item.identifier).filter(s=>s!=null),(s,n)=>(t(),i("li",{key:n},[j(u,{href:s},null,8,["href"]),s===e.item.uri?(t(),i("span",X," (URI)")):d("",!0)]))),128))]),m("ul",Y,[e.types.length?(t(),i("li",_,[m("b",null,l(e.t("type"))+":",1),C(" "+l(e.types.map(s=>e.jskos.prefLabel(s)).join(", ")),1)])):d("",!0),(t(),i(c,null,k(["created","issued","modified"],s=>(t(),i(c,null,[e.item[s]?(t(),i("li",{key:s},[m("b",null,l(e.t(s))+":",1),C(" "+l(e.utils.dateToString(e.item[s])),1)])):d("",!0)],64))),64)),e.item.languages?(t(),i("li",x,[m("b",null,l(e.t("languages"))+":",1),C(" "+l(e.item.languages.join(", ")),1)])):d("",!0)]),e.jskos.languageMapContent(e.item,"definition")?(t(),i("ul",ee,[m("li",null,[m("b",null,l(e.t("definition"))+":",1)]),(t(!0),i(c,null,k(e.iterateLanguageMapContent(e.item,"definition"),({language:s,label:n},p)=>(t(),i("li",{key:`${s}-${p}`,lang:`${s}`},l(n),9,te))),128))])):d("",!0)]),_:1},8,["title"]),j(f,{title:e.t("labels")},{default:L(()=>[m("ul",se,[(t(!0),i(c,null,k(e.iterateLanguageMapContent(e.item,"prefLabel"),({language:s,label:n},p)=>(t(),i("li",{key:`${s}-${p}`,lang:`${s}`},l(n),9,ne))),128))]),e.jskos.languageMapContent(e.item,"altLabel")?(t(),i("ul",oe,[m("li",null,[m("b",null,l(e.t("altLabels"))+":",1)]),(t(!0),i(c,null,k(e.iterateLanguageMapContent(e.item,"altLabel"),({language:s,label:n},p)=>(t(),i("li",{key:`${s}-${p}`,lang:`${s}`},l(n),9,ie))),128))])):d("",!0)]),_:1},8,["title"]),e.jskos.languageMapContent(e.item,"scopeNote")?(t(),h(f,{key:0,title:e.t("scope")},{default:L(()=>[m("ul",ae,[(t(!0),i(c,null,k(e.iterateLanguageMapContent(e.item,"scopeNote"),({language:s,label:n},p)=>(t(),i("li",{key:`${s}-${p}`,lang:`${s}`},l(n),9,le))),128))])]),_:1},8,["title"])):d("",!0),e.jskos.languageMapContent(e.item,"editorialNote")?(t(),h(f,{key:1,title:e.t("editorial")},{default:L(()=>[m("ul",re,[(t(!0),i(c,null,k(e.iterateLanguageMapContent(e.item,"editorialNote"),({language:s,label:n},p)=>(t(),i("li",{key:`${s}-${p}`,lang:`${s}`},l(n),9,ue))),128))])]),_:1},8,["title"])):d("",!0),b(e.$slots,"additionalTabs")]),_:3})}const de=S(Q,[["render",me]]),{draggedItem:I,addDropzone:ge}=R,E={en:{showAllAncestors:"show all ancestors",showLessAncestors:"show less ancesters",license:"License",dropzone:"Drop an item here to select it."},de:{showAllAncestors:"zeige alle übergeordneten Konzepte",showLessAncestors:"zeige weniger übergeordnete Konzepte",license:"Lizenz",dropzone:"Ziehe ein Item hierrein, um es auszuwählen."}},V=w(()=>v.getLanguages().find(e=>E[e])||"en"),pe=e=>E[V.value][e],fe=N({name:"ItemDetails",components:{ItemName:q,ItemList:F,LicenseInfo:H,ItemDetailsTabs:de},props:{item:{type:Object,required:!0},itemListOptions:{type:Object,default:()=>({})},showTabs:{type:Boolean,default:!0},showAncestors:{type:Boolean,default:!0},showBroader:{type:Boolean,default:!0},showNarrower:{type:Boolean,default:!0},dropzone:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0}},emits:["select"],setup(e,{emit:a}){const $=w(()=>!B(e.item,I.value)),r=ge(null,o=>{e.dropzone&&$.value&&a("select",{item:o})}),g=w(()=>Object.assign({draggable:e.draggable},e.itemListOptions));return{utils:T,jskos:A,currentLanguage:V,t:pe,draggedItem:I,...r,isDraggedConceptDifferent:$,itemListOptions_:g}}}),ce={class:"jskos-vue-itemDetails-name"},be={key:0};function ke(e,a,$,r,g,o){const u=y("item-name"),f=y("license-info"),D=y("item-list"),s=y("item-details-tabs");return t(),i("div",{class:"jskos-vue-itemDetails",onDragover:a[3]||(a[3]=(...n)=>e.dragover&&e.dragover(...n)),onDragenter:a[4]||(a[4]=(...n)=>e.dragenter&&e.dragenter(...n)),onDragleave:a[5]||(a[5]=(...n)=>e.dragleave&&e.dragleave(...n)),onDrop:a[6]||(a[6]=(...n)=>e.drop&&e.drop(...n))},[U(m("div",{class:"jskos-vue-itemDetails-dropzone jskos-vue-text-small"},l(e.t("dropzone")),513),[[Z,e.dropzone&&e.isDraggingOver&&e.isDraggedConceptDifferent]]),m("div",ce,[b(e.$slots,"before"),b(e.$slots,"beforeName"),j(u,{item:e.item,draggable:e.draggable},null,8,["item","draggable"]),b(e.$slots,"afterName")]),e.item.license&&e.item.license.length?(t(),i("div",be,[C(l(e.t("license"))+": ",1),j(f,{item:e.item},null,8,["item"])])):d("",!0),e.showAncestors?(t(),h(D,z({key:1},e.itemListOptions_,{items:(e.item.ancestors||[]).filter(Boolean).reverse(),indent:!0,class:"jskos-vue-itemDetails-ancestors",onSelect:a[0]||(a[0]=n=>e.$emit("select",{item:n.item}))}),null,16,["items"])):d("",!0),e.showBroader?(t(),h(D,z({key:2},e.itemListOptions_,{items:(e.item.broader||[]).filter(n=>!e.jskos.isContainedIn(n,e.item.ancestors||[])),class:"jskos-vue-itemDetails-broader",onSelect:a[1]||(a[1]=n=>e.$emit("select",{item:n.item}))}),null,16,["items"])):d("",!0),b(e.$slots,"beforeTabs"),e.showTabs?(t(),h(s,{key:3,item:e.item},{additionalTabs:L(()=>[b(e.$slots,"additionalTabs")]),_:3},8,["item"])):d("",!0),b(e.$slots,"afterTabs"),e.showNarrower?(t(),h(D,z({key:4},e.itemListOptions_,{items:e.item.narrower||[],class:"jskos-vue-itemDetails-narrower",onSelect:a[2]||(a[2]=n=>e.$emit("select",{item:n.item}))}),null,16,["items"])):d("",!0),b(e.$slots,"after")],32)}const ze=S(fe,[["render",ke]]);export{ze as I,de as a};
