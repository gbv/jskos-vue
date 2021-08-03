import{g as n,o as s,c as a,b as t,u as p,t as o,f as e,A as c,s as i,a as l,d as u}from"./app.bd5504d7.js";import"./ItemName.c88858eb.js";import"./ItemList.e0ef3161.js";import{_ as r}from"./ItemDetails.b71c9ddf.js";import"./LoadingIndicator.6d72b7b6.js";import"./Arrow.9bbeeb4a.js";import"./ConceptTree.86620ade.js";import"./ItemSuggest.c7cf2617.js";import"./utils.806fa3c9.js";import"./shared.99084317.js";import"./AutoLink.862e0611.js";import"./style.4b5628f1.js";const k=l('',12),d=u(" Settings: "),m=u(' This tab was added via the "tabs" slot. '),g=t("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),q=u(" 🆇 "),h=u(" ⭐️ "),b=t("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),f=l('',1),v='{"title":"ItemDetails","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemDetails.md","lastUpdated":1627971680219}',D={};const y=Object.assign(D,{expose:[],setup:function(l){const u=n({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],license:[{uri:"http://creativecommons.org/publicdomain/zero/1.0/"},{uri:"http://example.com/license/"}],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}]}});return(n,l)=>(s(),a("div",null,[k,t("p",null,[d,t("button",{onClick:l[1]||(l[1]=()=>{p(u).itemListOptions.indicatorByUri?(p(u).itemListOptions._indicatorByUri=p(u).itemListOptions.indicatorByUri,delete p(u).itemListOptions.indicatorByUri):(p(u).itemListOptions.indicatorByUri=p(u).itemListOptions._indicatorByUri,delete p(u).itemListOptions._indicatorByUri)})}," indicators: "+o(!!p(u).itemListOptions.indicatorByUri),1),t("button",{onClick:l[2]||(l[2]=()=>{p(u).item.scopeNote?delete p(u).item.scopeNote:p(u).item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},o(p(u).item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),t(p(r),i(p(u),{onSelect:l[3]||(l[3]=n=>((...n)=>window.alert(...n))(`Clicked on item ${n.item.uri}`))}),{tabs:e((()=>[t(p(c),{title:"Test"},{default:e((()=>[m])),_:1}),g])),beforeName:e((()=>[q])),afterName:e((()=>[h,b])),_:1},16),f]))}});export default y;export{v as __pageData};
