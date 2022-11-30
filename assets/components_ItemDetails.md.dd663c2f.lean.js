import"./chunks/ItemName.aa105fd6.js";import"./chunks/ItemList.37706ccd.js";import{I as k,a as y}from"./chunks/ItemDetails.5ab0b055.js";import"./chunks/LoadingIndicator.383bc321.js";import"./chunks/Arrow.3916db28.js";import"./chunks/AutoLink.917c2d13.js";import"./chunks/ConceptTree.a2ff6510.js";import"./chunks/ItemSuggest.f4008f8f.js";import{v as g}from"./chunks/style.e065a504.js";import"./chunks/utils.a5bf753d.js";import{g as m,o as q,c as h,b as a,d as p,t as l,a as o,w as e,p as d,x as c,e as r}from"./app.5e7cbef3.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/vue-scrollto.ec7616c3.js";const f=r("",13),b=a("div",{style:{position:"absolute",top:"0",right:"0"}}," \u{1F680} ",-1),v=a("div",{style:{position:"absolute",top:"0",right:"0"}}," \u2795 ",-1),D=r("",3),w={style:{display:"flex","flex-wrap":"wrap"}},x=r("",1),P='{"title":"ItemDetails","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Default","slug":"default"},{"level":3,"title":"Hide tabs and show them next to component","slug":"hide-tabs-and-show-them-next-to-component"}],"relativePath":"components/ItemDetails.md"}',T={},$=Object.assign(T,{__name:"ItemDetails",setup(_){const n=m({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},dropzone:!0,item:{uri:"https://example.com/DT",notation:["DT"],license:[{uri:"http://creativecommons.org/publicdomain/zero/1.0/"},{uri:"http://example.com/license/"}],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["D\xE9signation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Fran\xE7ais"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D0",notation:["D0"],prefLabel:{en:"another Ancestor",de:"ein weiteres Elternkonzept"}},{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein \xFCbergeordnetes Konzept"}}],publisher:[{url:"https://www.gbv.de",prefLabel:{en:"VZG"}}]}}),u=(...i)=>window.alert(...i);return(i,s)=>(q(),h("div",null,[f,a("p",null,[p(" Settings: "),a("button",{onClick:s[0]||(s[0]=()=>{n.itemListOptions.indicatorByUri?(n.itemListOptions._indicatorByUri=n.itemListOptions.indicatorByUri,delete n.itemListOptions.indicatorByUri):(n.itemListOptions.indicatorByUri=n.itemListOptions._indicatorByUri,delete n.itemListOptions._indicatorByUri)})}," indicators: "+l(!!n.itemListOptions.indicatorByUri),1),a("button",{onClick:s[1]||(s[1]=t=>n.dropzone=!n.dropzone)}," dropzone: "+l(!!n.dropzone),1),a("button",{onClick:s[2]||(s[2]=()=>{n.item.scopeNote?delete n.item.scopeNote:n.item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},l(n.item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),o(c(k),d(n,{onSelect:s[3]||(s[3]=t=>u(`Clicked on item ${t.item.uri}`))}),{additionalTabs:e(()=>[o(c(g),{title:"Test"},{default:e(()=>[p(' This tab was added via the "additionalTabs" slot. ')]),_:1}),b]),beforeName:e(()=>[p(" \u{1F187} ")]),afterName:e(()=>[p(" \u2B50\uFE0F "),v]),_:1},16),D,a("div",w,[o(c(k),d(n,{showTabs:!1,style:{flex:"1"},onSelect:s[4]||(s[4]=t=>u(`Clicked on item ${t.item.uri}`))}),null,16),o(c(y),{item:n.item,style:{flex:"0 0 280px","padding-left":"10px"}},null,8,["item"])]),x]))}});export{P as __pageData,$ as default};
