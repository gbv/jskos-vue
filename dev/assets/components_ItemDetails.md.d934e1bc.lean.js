import{g as n,o as s,c as a,b as t,u as p,t as o,f as e,A as c,s as l,a as i,d as u}from"./app.fc190485.js";import"./ItemName.5701cd5a.js";import"./ItemList.651432a5.js";import{_ as r}from"./ItemDetails.fc2f4c4a.js";import"./LoadingIndicator.7864ff35.js";import"./Arrow.3855e499.js";import"./ConceptTree.a6745dd9.js";import"./ItemSuggest.59c917ce.js";import"./utils.1ab7db89.js";import"./shared.d928cca0.js";import"./AutoLink.c7d6353e.js";const k=i('',12),d=u(" Settings: "),m=u(' This tab was added via the "tabs" slot. '),g=t("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),q=u(" 🆇 "),h=u(" ⭐️ "),f=t("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),b=i('',1),v='{"title":"ItemDetails","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"}],"relativePath":"components/ItemDetails.md","lastUpdated":1626091736968}',D={};const y=Object.assign(D,{expose:[],setup:function(i){const u=n({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}]}});return(n,i)=>(s(),a("div",null,[k,t("p",null,[d,t("button",{onClick:i[1]||(i[1]=()=>{p(u).itemListOptions.indicatorByUri?(p(u).itemListOptions._indicatorByUri=p(u).itemListOptions.indicatorByUri,delete p(u).itemListOptions.indicatorByUri):(p(u).itemListOptions.indicatorByUri=p(u).itemListOptions._indicatorByUri,delete p(u).itemListOptions._indicatorByUri)})}," indicators: "+o(!!p(u).itemListOptions.indicatorByUri),1),t("button",{onClick:i[2]||(i[2]=()=>{p(u).item.scopeNote?delete p(u).item.scopeNote:p(u).item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},o(p(u).item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),t(p(r),l(p(u),{onSelect:i[3]||(i[3]=n=>((...n)=>window.alert(...n))(`Clicked on item ${n.item.uri}`))}),{tabs:e((()=>[t(p(c),{title:"Test"},{default:e((()=>[m])),_:1}),g])),beforeName:e((()=>[q])),afterName:e((()=>[h,f])),_:1},16),b]))}});export default y;export{v as __pageData};