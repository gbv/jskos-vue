import{j as B,l as v,c as N,a as P}from"./jskos-tools.BngNuJFy.js";import{I as q}from"./ItemName.CuMQb6WA.js";import{I as F}from"./ItemList.CI6NDTcO.js";import{b as K,u as G}from"./style.-xXEQWSy.js";import{A as H}from"./AutoLink.DdFLTQbv.js";import{u as A,b as J}from"./utils.Du2BS91N.js";import"./shared.l0sNRNKZ.js";import{_ as O,h as $,d as T,D,o as t,b,w as L,J as j,c as i,j as d,t as o,e as a,F as p,E as y,I as C,a as w,r as k,a3 as R,a5 as U,M as I}from"./framework.CXbGQEsj.js";import{L as Z}from"./LicenseInfo.CAYN9MT4.js";const S={en:{created:"Created",modified:"Modified",issued:"Issued",altLabels:"Alternative Labels",definition:"Definition",info:"Info",identifier:"Identifier",labels:"Labels",editorial:"Editorial",scope:"Scope",languages:"Languages",type:"Type",publisher:"Publisher"},de:{created:"Erstellung",modified:"Änderung",issued:"Veröffentlicht",altLabels:"Alternative Bezeichnungen",definition:"Definition",info:"Info",identifier:"Identifier",labels:"Bezeichnungen",editorial:"Editorial",scope:"Scope",languages:"Sprachen",type:"Art",publisher:"Herausgeber"}},M=$(()=>v.getLanguages().find(e=>S[e])||"en"),Q=e=>S[M.value][e],W=T({name:"ItemDetailsTabs",components:{Tabs:K,Tab:G,AutoLink:H},props:{item:{type:Object,required:!0},flat:{type:Boolean,default:!1},fields:{type:Object,default:()=>({})}},setup(e){const r=(f,g)=>Object.keys(f&&f[g]||{}).map(l=>{const n=f[g][l];return(Array.isArray(n)?n:[n]).map(s=>({language:l,label:s}))}).reduce((l,n)=>l.concat(n),[]).filter(l=>l.language!="-").sort((l,n)=>l.language===v.selectLanguage(f[g])&&n.language!==v.selectLanguage(f[g])?-1:n.language===v.selectLanguage(f[g])&&l.language!==v.selectLanguage(f[g])?1:0),h=$(()=>{if(!e.item)return[];let f=[],g=e.item&&e.item.inScheme&&e.item.inScheme[0]&&e.item.inScheme[0].types||[];for(let l of e.item.type||[])typeof l!="object"&&(l={uri:l}),!(!l||["http://www.w3.org/2004/02/skos/core#Concept","http://www.w3.org/2004/02/skos/core#ConceptScheme"].includes(l.uri))&&(l=g.find(n=>N(n,l))||l,f.push(l));return f}),c=$(()=>Object.assign({identifier:!0,type:!0,publisher:!P(e.item),created:!0,issued:!0,modified:!0,languages:!0,definition:!0,prefLabel:!0,altLabel:!0,scopeNote:!0,editorialNote:!0},e.fields));return{utils:A,jskos:B,currentLanguage:M,t:Q,iterateLanguageMapContent:r,types:h,fields_:c}}}),X={key:0,class:"jskos-vue-itemDetails-list"},Y={key:0},_={key:0,class:"jskos-vue-text-lightGrey"},x={class:"jskos-vue-itemDetails-list"},ee={key:0},te={key:1},se={key:2},ie={key:1,class:"jskos-vue-itemDetails-list"},ne=["lang"],le={key:0,class:"jskos-vue-itemDetails-list"},ae={key:0},oe=["lang"],re={key:1,class:"jskos-vue-itemDetails-list"},ue=["lang"],de={class:"jskos-vue-itemDetails-list"},me={key:0},fe=["lang"],ge={class:"jskos-vue-itemDetails-list"},pe={key:0},be=["lang"];function ye(e,r,h,c,f,g){const l=D("auto-link");return t(),b(j(e.flat?"div":"tabs"),{borders:"bottom",size:"sm",class:"jskos-vue-itemDetails-tabs"},{default:L(()=>[["identifier","type","publisher","created","issued","modified","languages","definition"].filter(n=>e.fields_[n]).length?(t(),b(j(e.flat?"div":"tab"),{key:0,title:e.t("info")},{default:L(()=>{var n;return[e.fields_.identifier?(t(),i("ul",X,[e.flat?(t(),i("li",Y,[d("b",null,o(e.t("identifier"))+":",1)])):a("",!0),(t(!0),i(p,null,y([e.item.uri].concat(e.item.identifier).filter(s=>s!=null),(s,m)=>(t(),i("li",{key:m},[C(l,{href:s},null,8,["href"]),s===e.item.uri?(t(),i("span",_," (URI)")):a("",!0)]))),128))])):a("",!0),d("ul",x,[e.fields_.type&&e.types.length?(t(),i("li",ee,[d("b",null,o(e.t("type"))+":",1),w(" "+o(e.types.map(s=>e.jskos.prefLabel(s)).join(", ")),1)])):a("",!0),e.fields_.publisher&&((n=e.item.publisher)!=null&&n.length)?(t(),i("li",te,[d("b",null,o(e.t("publisher"))+": ",1),(t(!0),i(p,null,y(e.item.publisher,(s,m)=>(t(),i(p,{key:`publisher-${m}`},[m>0?(t(),i(p,{key:0},[w(" · ")],64)):a("",!0),C(l,{href:s.url||s.uri,text:e.jskos.prefLabel(s)},null,8,["href","text"])],64))),128))])):a("",!0),(t(!0),i(p,null,y(["created","issued","modified"].filter(s=>e.fields_[s]),s=>(t(),i(p,null,[e.item[s]?(t(),i("li",{key:s},[d("b",null,o(e.t(s))+":",1),w(" "+o(e.utils.dateToString(e.item[s])),1)])):a("",!0)],64))),256)),e.fields_.languages&&e.item.languages?(t(),i("li",se,[d("b",null,o(e.t("languages"))+":",1),w(" "+o(e.item.languages.join(", ")),1)])):a("",!0)]),e.fields_.definition&&e.jskos.languageMapContent(e.item,"definition")?(t(),i("ul",ie,[d("li",null,[d("b",null,o(e.t("definition"))+":",1)]),(t(!0),i(p,null,y(e.iterateLanguageMapContent(e.item,"definition"),({language:s,label:m},u)=>(t(),i("li",{key:`${s}-${u}`,lang:`${s}`},o(m),9,ne))),128))])):a("",!0)]}),_:1},8,["title"])):a("",!0),e.fields_.prefLabel||e.fields_.altLabel?(t(),b(j(e.flat?"div":"tab"),{key:1,title:e.t("labels")},{default:L(()=>[e.fields_.prefLabel?(t(),i("ul",le,[e.flat?(t(),i("li",ae,[d("b",null,o(e.t("labels"))+":",1)])):a("",!0),(t(!0),i(p,null,y(e.iterateLanguageMapContent(e.item,"prefLabel"),({language:n,label:s},m)=>(t(),i("li",{key:`${n}-${m}`,lang:`${n}`},o(s),9,oe))),128))])):a("",!0),e.fields_.altLabel&&e.jskos.languageMapContent(e.item,"altLabel")?(t(),i("ul",re,[d("li",null,[d("b",null,o(e.t("altLabels"))+":",1)]),(t(!0),i(p,null,y(e.iterateLanguageMapContent(e.item,"altLabel"),({language:n,label:s},m)=>(t(),i("li",{key:`${n}-${m}`,lang:`${n}`},o(s),9,ue))),128))])):a("",!0)]),_:1},8,["title"])):a("",!0),e.fields_.scopeNote&&e.jskos.languageMapContent(e.item,"scopeNote")?(t(),b(j(e.flat?"div":"tab"),{key:2,title:e.t("scope")},{default:L(()=>[d("ul",de,[e.flat?(t(),i("li",me,[d("b",null,o(e.t("scope"))+":",1)])):a("",!0),(t(!0),i(p,null,y(e.iterateLanguageMapContent(e.item,"scopeNote"),({language:n,label:s},m)=>(t(),i("li",{key:`${n}-${m}`,lang:`${n}`},o(s),9,fe))),128))])]),_:1},8,["title"])):a("",!0),e.fields_.editorialNote&&e.jskos.languageMapContent(e.item,"editorialNote")?(t(),b(j(e.flat?"div":"tab"),{key:3,title:e.t("editorial")},{default:L(()=>[d("ul",ge,[e.flat?(t(),i("li",pe,[d("b",null,o(e.t("editorial"))+":",1)])):a("",!0),(t(!0),i(p,null,y(e.iterateLanguageMapContent(e.item,"editorialNote"),({language:n,label:s},m)=>(t(),i("li",{key:`${n}-${m}`,lang:`${n}`},o(s),9,be))),128))])]),_:1},8,["title"])):a("",!0),k(e.$slots,"additionalTabs")]),_:3})}const ke=O(W,[["render",ye]]),{draggedItem:z,addDropzone:he}=J,E={en:{showAllAncestors:"show all ancestors",showLessAncestors:"show less ancesters",license:"License",dropzone:"Drop an item here to select it."},de:{showAllAncestors:"zeige alle übergeordneten Konzepte",showLessAncestors:"zeige weniger übergeordnete Konzepte",license:"Lizenz",dropzone:"Ziehe ein Item hierrein, um es auszuwählen."}},V=$(()=>v.getLanguages().find(e=>E[e])||"en"),Le=e=>E[V.value][e],ve=T({name:"ItemDetails",components:{ItemName:q,ItemList:F,LicenseInfo:Z,ItemDetailsTabs:ke},props:{item:{type:Object,required:!0},itemListOptions:{type:Object,default:()=>({})},showTabs:{type:Boolean,default:!0},showAncestors:{type:Boolean,default:!0},showBroader:{type:Boolean,default:!0},showNarrower:{type:Boolean,default:!0},dropzone:{type:Boolean,default:!0},draggable:{type:Boolean,default:!0},flat:{type:Boolean,default:!1},fields:{type:Object,default:()=>({})}},emits:["select"],setup(e,{emit:r}){const h=$(()=>!N(e.item,z.value)),c=he(null,g=>{e.dropzone&&h.value&&r("select",{item:g})}),f=$(()=>Object.assign({draggable:e.draggable},e.itemListOptions));return{utils:A,jskos:B,currentLanguage:V,t:Le,draggedItem:z,...c,isDraggedConceptDifferent:h,itemListOptions_:f}}}),$e={class:"jskos-vue-itemDetails-name"},ce={key:0};function je(e,r,h,c,f,g){const l=D("item-name"),n=D("license-info"),s=D("item-list"),m=D("item-details-tabs");return t(),i("div",{class:"jskos-vue-itemDetails",onDragover:r[3]||(r[3]=(...u)=>e.dragover&&e.dragover(...u)),onDragenter:r[4]||(r[4]=(...u)=>e.dragenter&&e.dragenter(...u)),onDragleave:r[5]||(r[5]=(...u)=>e.dragleave&&e.dragleave(...u)),onDrop:r[6]||(r[6]=(...u)=>e.drop&&e.drop(...u))},[R(d("div",{class:"jskos-vue-itemDetails-dropzone jskos-vue-text-small"},o(e.t("dropzone")),513),[[U,e.dropzone&&e.isDraggingOver&&e.isDraggedConceptDifferent]]),d("div",$e,[k(e.$slots,"before"),k(e.$slots,"beforeName"),C(l,{item:e.item,draggable:e.draggable},null,8,["item","draggable"]),k(e.$slots,"afterName")]),e.item.license&&e.item.license.length?(t(),i("div",ce,[w(o(e.t("license"))+": ",1),C(n,{item:e.item},null,8,["item"])])):a("",!0),e.showAncestors?(t(),b(s,I({key:1},e.itemListOptions_,{items:(e.item.ancestors||[]).filter(Boolean).reverse(),indent:!0,class:"jskos-vue-itemDetails-ancestors",onSelect:r[0]||(r[0]=u=>e.$emit("select",{item:u.item}))}),null,16,["items"])):a("",!0),e.showBroader?(t(),b(s,I({key:2},e.itemListOptions_,{items:(e.item.broader||[]).filter(u=>!e.jskos.isContainedIn(u,e.item.ancestors||[])),class:"jskos-vue-itemDetails-broader",onSelect:r[1]||(r[1]=u=>e.$emit("select",{item:u.item}))}),null,16,["items"])):a("",!0),k(e.$slots,"beforeTabs"),e.showTabs?(t(),b(m,{key:3,item:e.item,flat:e.flat,fields:e.fields},{additionalTabs:L(()=>[k(e.$slots,"additionalTabs")]),_:3},8,["item","flat","fields"])):a("",!0),k(e.$slots,"afterTabs"),e.showNarrower?(t(),b(s,I({key:4},e.itemListOptions_,{items:e.item.narrower||[],class:"jskos-vue-itemDetails-narrower",onSelect:r[2]||(r[2]=u=>e.$emit("select",{item:u.item}))}),null,16,["items"])):a("",!0),k(e.$slots,"after")],32)}const Te=O(ve,[["render",je]]);export{Te as I,ke as a};
