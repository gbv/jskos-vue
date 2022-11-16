import"./chunks/ItemName.7852b992.js";import"./chunks/ItemList.37c02559.js";import{I as u,a as y}from"./chunks/ItemDetails.1ea46015.js";import"./chunks/LoadingIndicator.35e914a0.js";import"./chunks/Arrow.42725cdf.js";import"./chunks/ConceptTree.e6385bce.js";import"./chunks/ItemSuggest.fc45560b.js";import{v as g}from"./chunks/style.ada7e4fb.js";import"./chunks/utils.18cb2ff0.js";import{g as m,o as q,c as h,b as a,d as t,t as k,a as p,w as o,p as d,x as e,e as l}from"./app.58ffbb48.js";import"./chunks/shared.3f0a6f78.js";import"./chunks/vue-scrollto.ec7616c3.js";import"./chunks/AutoLink.8ee23c2a.js";const f=l("",13),b=a("div",{style:{position:"absolute",top:"0",right:"0"}}," \u{1F680} ",-1),v=a("div",{style:{position:"absolute",top:"0",right:"0"}}," \u2795 ",-1),D=l("",3),w={style:{display:"flex","flex-wrap":"wrap"}},T=l("",1),P='{"title":"ItemDetails","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Default","slug":"default"},{"level":3,"title":"Hide tabs and show them next to component","slug":"hide-tabs-and-show-them-next-to-component"}],"relativePath":"components/ItemDetails.md"}',_={},K=Object.assign(_,{__name:"ItemDetails",setup(x){const n=m({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],license:[{uri:"http://creativecommons.org/publicdomain/zero/1.0/"},{uri:"http://example.com/license/"}],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["D\xE9signation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Fran\xE7ais"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein \xFCbergeordnetes Konzept"}}],publisher:[{url:"https://www.gbv.de",prefLabel:{en:"VZG"}}]}}),r=(...i)=>window.alert(...i);return(i,s)=>(q(),h("div",null,[f,a("p",null,[t(" Settings: "),a("button",{onClick:s[0]||(s[0]=()=>{n.itemListOptions.indicatorByUri?(n.itemListOptions._indicatorByUri=n.itemListOptions.indicatorByUri,delete n.itemListOptions.indicatorByUri):(n.itemListOptions.indicatorByUri=n.itemListOptions._indicatorByUri,delete n.itemListOptions._indicatorByUri)})}," indicators: "+k(!!n.itemListOptions.indicatorByUri),1),a("button",{onClick:s[1]||(s[1]=()=>{n.item.scopeNote?delete n.item.scopeNote:n.item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},k(n.item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),p(e(u),d(n,{onSelect:s[2]||(s[2]=c=>r(`Clicked on item ${c.item.uri}`))}),{additionalTabs:o(()=>[p(e(g),{title:"Test"},{default:o(()=>[t(' This tab was added via the "additionalTabs" slot. ')]),_:1}),b]),beforeName:o(()=>[t(" \u{1F187} ")]),afterName:o(()=>[t(" \u2B50\uFE0F "),v]),_:1},16),D,a("div",w,[p(e(u),d(n,{showTabs:!1,style:{flex:"1"},onSelect:s[3]||(s[3]=c=>r(`Clicked on item ${c.item.uri}`))}),null,16),p(e(y),{item:n.item,style:{flex:"0 0 280px","padding-left":"10px"}},null,8,["item"])]),T]))}});export{P as __pageData,K as default};
