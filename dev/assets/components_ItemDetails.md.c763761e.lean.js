import{f as n,o as s,c as a,d as t,u as p,t as o,b as e,w as c,B as u,x as l,a as i,e as k}from"./app.d57fb543.js";import"./ItemName.45ee4917.js";import"./ItemList.daa1996a.js";import{_ as r,a as d}from"./ItemDetails.aacd9d4e.js";import"./LoadingIndicator.52cd3ce7.js";import"./shared.99084317.js";import"./Arrow.812c1b03.js";import"./ConceptTree.e1a57818.js";import"./ItemSuggest.fa29f632.js";import"./utils.0f4dc86e.js";import"./AutoLink.494f68d0.js";import"./style.4b5628f1.js";const g=i('',13),m=k(" Settings: "),q=k(' This tab was added via the "additionalTabs" slot. '),h=t("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),f=k(" 🆇 "),b=k(" ⭐️ "),v=t("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),w=i('',3),D={style:{display:"flex","flex-wrap":"wrap"}},y=i('',1),T='{"title":"ItemDetails","description":"","frontmatter":{},"headers":[{"level":2,"title":"Props","slug":"props"},{"level":2,"title":"Slots","slug":"slots"},{"level":2,"title":"Events","slug":"events"},{"level":2,"title":"CSS Variables","slug":"css-variables"},{"level":2,"title":"Examples","slug":"examples"},{"level":3,"title":"Default","slug":"default"},{"level":3,"title":"Hide tabs and show them next to component","slug":"hide-tabs-and-show-them-next-to-component"}],"relativePath":"components/ItemDetails.md","lastUpdated":1644908921151}',L={};const x=Object.assign(L,{setup:function(i){const k=n({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},item:{uri:"https://example.com/DT",notation:["DT"],license:[{uri:"http://creativecommons.org/publicdomain/zero/1.0/"},{uri:"http://example.com/license/"}],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}],publisher:[{url:"https://www.gbv.de",prefLabel:{en:"VZG"}}]}}),T=(...n)=>window.alert(...n);return(n,i)=>(s(),a("div",null,[g,t("p",null,[m,t("button",{onClick:i[0]||(i[0]=()=>{p(k).itemListOptions.indicatorByUri?(p(k).itemListOptions._indicatorByUri=p(k).itemListOptions.indicatorByUri,delete p(k).itemListOptions.indicatorByUri):(p(k).itemListOptions.indicatorByUri=p(k).itemListOptions._indicatorByUri,delete p(k).itemListOptions._indicatorByUri)})}," indicators: "+o(!!p(k).itemListOptions.indicatorByUri),1),t("button",{onClick:i[1]||(i[1]=()=>{p(k).item.scopeNote?delete p(k).item.scopeNote:p(k).item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},o(p(k).item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),e(p(r),l(p(k),{onSelect:i[2]||(i[2]=n=>T(`Clicked on item ${n.item.uri}`))}),{additionalTabs:c((()=>[e(p(u),{title:"Test"},{default:c((()=>[q])),_:1}),h])),beforeName:c((()=>[f])),afterName:c((()=>[b,v])),_:1},16),w,t("div",D,[e(p(r),l(p(k),{showTabs:!1,style:{flex:"1"},onSelect:i[3]||(i[3]=n=>T(`Clicked on item ${n.item.uri}`))}),null,16),e(p(d),{item:p(k).item,style:{flex:"0 0 280px","padding-left":"10px"}},null,8,["item"])]),y]))}});export{T as __pageData,x as default};
