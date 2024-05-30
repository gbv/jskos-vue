import{I as d,a as g}from"./chunks/ItemDetails.CCnsW7U5.js";import{u as y}from"./chunks/style.-xXEQWSy.js";import"./chunks/jskos-tools.CpjLtWvA.js";import{a2 as F,c,j as a,a as t,t as l,I as h,w as p,M as o,k,a1 as e,o as u}from"./chunks/framework.CXbGQEsj.js";import"./chunks/ItemName.C-g5_niL.js";import"./chunks/utils.CCe5VO4G.js";import"./chunks/shared.l0sNRNKZ.js";import"./chunks/ItemList.Bc5acjam.js";import"./chunks/LoadingIndicator.CWAPJBMj.js";import"./chunks/vue-scrollto.FOkUA__D.js";import"./chunks/AutoLink.DdFLTQbv.js";import"./chunks/LicenseInfo.BaQ7ewHf.js";const C=e("",13),m=a("div",{style:{position:"absolute",top:"0",right:"0"}}," 🚀 ",-1),q=a("div",{style:{position:"absolute",top:"0",right:"0"}}," ➕ ",-1),B=e("",3),D={style:{display:"flex","flex-wrap":"wrap"}},b=e("",1),P=JSON.parse('{"title":"ItemDetails","description":"","frontmatter":{},"headers":[],"relativePath":"components/ItemDetails.md","filePath":"components/ItemDetails.md"}'),f={name:"components/ItemDetails.md"},j=Object.assign(f,{setup(A){const s=F({itemListOptions:{indicatorByUri:{"https://example.com/DT2":!0,"https://example.com/DT3":!0}},dropzone:!0,draggable:!0,item:{uri:"https://example.com/DT",notation:["DT"],license:[{uri:"http://creativecommons.org/publicdomain/zero/1.0/"},{uri:"http://example.com/license/"}],prefLabel:{en:"Detailed Item",de:"Detalliertes Item"},altLabel:{fr:["Désignation alternative"],de:["Alternative Benennung","noch eine"]},editorialNote:{en:["Editorial English"],de:["Editorial Deutsch"],fr:["Editorial Français"]},identifier:["uri:detailed","test"],created:"2021-05-27",issued:"2021-05-27",modified:"2021-05-28",definition:{en:["a defintion","a second definition"],de:["eine Definition"]},narrower:[{uri:"https://example.com/DT1",notation:["DT1"],prefLabel:{en:"a Child",de:"ein Unterkonzept"}},{uri:"https://example.com/DT2",notation:["DT2"],prefLabel:{en:"another Child",de:"ein weiteres Unterkonzept"}},{uri:"https://example.com/DT3",notation:["DT3"],prefLabel:{en:"yet another Child",de:"noch ein weiteres Unterkonzept"}}],ancestors:[{uri:"https://example.com/D0",notation:["D0"],prefLabel:{en:"another Ancestor",de:"ein weiteres Elternkonzept"}},{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}}],broader:[{uri:"https://example.com/D",notation:["D"],prefLabel:{en:"an Ancestor",de:"ein Elternkonzept"}},{uri:"https://example.com/D-alt",notation:["D-alt"],prefLabel:{en:"a broader concept",de:"ein übergeordnetes Konzept"}}],publisher:[{url:"https://www.gbv.de",prefLabel:{en:"VZG"}}]}}),E=(...r)=>window.alert(...r);return(r,i)=>(u(),c("div",null,[C,a("p",null,[t(" Settings: "),a("button",{onClick:i[0]||(i[0]=()=>{s.itemListOptions.indicatorByUri?(s.itemListOptions._indicatorByUri=s.itemListOptions.indicatorByUri,delete s.itemListOptions.indicatorByUri):(s.itemListOptions.indicatorByUri=s.itemListOptions._indicatorByUri,delete s.itemListOptions._indicatorByUri)})}," indicators: "+l(!!s.itemListOptions.indicatorByUri),1),a("button",{onClick:i[1]||(i[1]=n=>s.dropzone=!s.dropzone)}," dropzone: "+l(!!s.dropzone),1),a("button",{onClick:i[2]||(i[2]=n=>s.draggable=!s.draggable)}," draggable: "+l(!!s.draggable),1),a("button",{onClick:i[3]||(i[3]=()=>{s.item.scopeNote?delete s.item.scopeNote:s.item.scopeNote={de:["Scope Deutsch"],en:["Scope English"]}})},l(s.item.scopeNote?"Remove":"Add")+" scopeNote ",1)]),h(k(d),o(s,{onSelect:i[4]||(i[4]=n=>E(`Clicked on item ${n.item.uri}`))}),{additionalTabs:p(()=>[h(k(y),{title:"Test"},{default:p(()=>[t(' This tab was added via the "additionalTabs" slot. ')]),_:1}),m]),beforeName:p(()=>[t(" 🆇 ")]),afterName:p(()=>[t(" ⭐️ "),q]),_:1},16),B,a("div",D,[h(k(d),o(s,{showTabs:!1,style:{flex:"1"},onSelect:i[5]||(i[5]=n=>E(`Clicked on item ${n.item.uri}`))}),null,16),h(k(g),{item:s.item,style:{flex:"0 0 280px","padding-left":"10px"}},null,8,["item"])]),b]))}});export{P as __pageData,j as default};
